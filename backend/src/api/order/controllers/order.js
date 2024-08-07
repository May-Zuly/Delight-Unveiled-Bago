"use strict";
const { eachDayOfInterval, formatISO, format, subDays } = require("date-fns");

/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

const limit = 999999;

const getDataByDateRange = (data) => {
  const today = new Date();
  const startDate = subDays(today, 6);
  const dates = eachDayOfInterval({ start: startDate, end: today });
  const formattedDates = dates.map((date) => format(date, "yyyy-MM-dd"));

  const result = [];
  formattedDates.forEach((date) => {
    const targetData = data.filter(
      (d) => format(d.createdAt, "yyyy-MM-dd") === date
    );
    let count = 0;
    targetData.forEach((t) => {
      count += t.total ? parseInt(t.total) : 1;
    });
    result.push({
      date,
      value: count,
    });
  });
  return result;
};

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async orderList(ctx) {
    try {
      const query = ctx.request.query;
      const userId = query.user_id;
      const fromDate = query.from;
      const toDate = query.to;

      const conditions = {};
      if (userId) {
        conditions.customer = { id: userId };
      }
      if (fromDate && toDate) {
        conditions.createdAt = {
          $gt: format(fromDate, "yyyy-MM-dd"),
          $lt: format(toDate, "yyyy-MM-dd"),
        };
      } else if (fromDate) {
        conditions.createdAt = {
          $gt: format(fromDate, "yyyy-MM-dd"),
        };
      } else if (toDate) {
        conditions.createdAt = {
          $lt: format(toDate, "yyyy-MM-dd"),
        };
      }
      const entries = await strapi.db.query("api::order.order").findMany({
        orderBy: { createdAt: "desc" },
        where: conditions,
        populate: {
          image: true,
          payment: true,
          customer: true,
          purchases: { populate: { product: { populate: { image: true } } } },
        },
        limit,
      });
      return entries.map((entry) => ({
        ...entry,
        payment: entry?.payment?.type,
        customer: entry?.customer?.username,
        phoneNumber: entry?.customer?.phoneNumber,
        image: entry.image?.url,
        purchases:
          entry?.purchases.length > 0
            ? entry?.purchases.map((p) => ({
                product_name: p.product?.name,
                product_description: p.product?.description,
                product_image: p.product?.image?.url,
                product_price: p.product?.price,
                quantity: p?.quantity,
              }))
            : [],
      }));
    } catch (error) {
      ctx.badRequest(error, "Error in fetch order list");
    }
  },

  async orderAnalysis(ctx) {
    try {
      const currentDate = new Date();

      const startOfWeek = subDays(currentDate, 7);
      const endOfWeek = currentDate;

      const formattedStartOfWeek = formatISO(startOfWeek);
      const formattedEndOfWeek = formatISO(endOfWeek);

      const weekOrders = await strapi.db.query("api::order.order").findMany({
        where: {
          createdAt: {
            $gt: formattedStartOfWeek,
            $lt: formattedEndOfWeek,
          },
        },
        limit,
      });
      const barChart = getDataByDateRange(weekOrders);
      const weekProducts = await strapi.db
        .query("api::product.product")
        .findMany({
          where: {
            createdAt: {
              $gt: formattedStartOfWeek,
              $lt: formattedEndOfWeek,
            },
          },
          limit,
        });
      const pieChart = getDataByDateRange(weekProducts);
      const products = await strapi.db.query("api::product.product").findMany({
        limit,
      });
      const orders = await strapi.db.query("api::order.order").findMany({
        limit,
      });
      const customers = await strapi
        .query("plugin::users-permissions.user")
        .findMany({ where: { type: "customer" } });
      const producers = await strapi
        .query("plugin::users-permissions.user")
        .findMany({ where: { type: "producer" } });
      return {
        barChart,
        pieChart,
        customerCount: customers.length,
        producerCount: producers.length,
        productCount: products.length,
        orderCount: orders.length,
      };
    } catch (err) {
      ctx.badRequest(err, "Error in fetch order analysis data!");
    }
  },

  async orderDetail(ctx) {
    try {
      const id = ctx.request.params.id;

      if (!id) {
        ctx.badRequest("ID is required");
      }

      const entry = await strapi.db.query("api::order.order").findOne({
        where: { id },
        populate: {
          image: true,
          payment: true,
          customer: true,
          purchases: { populate: { product: { populate: { image: true } } } },
        },
      });

      entry.payment = entry?.payment?.type;
      entry.customer = entry?.customer?.username;
      entry.phoneNumber = entry?.customer?.phoneNumber;
      entry.image = entry.image?.url;
      entry.purchases =
        entry.purchases.length > 0
          ? entry.purchases.map((p) => ({
              product_name: p.product?.name,
              product_description: p.product?.description,
              product_image: p.product?.image?.url,
              product_price: p.product?.price,
              quantity: p?.quantity,
            }))
          : [];

      return entry;
    } catch (error) {
      ctx.badRequest(error, "Error in fetch order detail");
    }
  },

  async applyOrder(ctx) {
    try {
      let body = ctx.request.body;
      let data = body;
      let file = null;
      let createdFiles = null;
      if (body.data) {
        data = JSON.parse(body.data);
      }
      if (ctx.request.files) {
        file = ctx.request.files["files.image"];
        createdFiles = await strapi.plugins.upload.services.upload.upload({
          data: {
            fileInfo: {
              name: "Order",
              caption: "Order",
              alternativeText: "Order",
            },
          },
          files: file,
        });
      }
      const promisePurchase = [];
      for (let i = 0; i < data.products.length; i++) {
        promisePurchase.push(
          strapi.db.query("api::purchase.purchase").create({
            data: {
              quantity: data.products[i].quantity,
              product: data.products[i].id,
              customer: data.user_id,
            },
          })
        );
      }
      const purchaseLst = await Promise.all(promisePurchase);
      const purchaseIds = purchaseLst.map((p) => p.id);

      const order = await strapi.db.query("api::order.order").create({
        data: {
          total: data.total,
          status: "order",
          purchases: purchaseIds,
          customer: data.user_id,
          image: createdFiles ? createdFiles[0].id : null,
        },
      });
      await strapi.db.query("api::payment.payment").create({
        data: {
          type: data.payment_type ? data.payment_type : "cash",
          order: order.id,
        },
      });
      return "Success";
    } catch (err) {
      ctx.badRequest(err, "Error in create order payment");
    }
  },
}));
