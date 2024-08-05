"use strict";

/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

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
          $gt: new Date(fromDate).toISOString(),
          $lt: new Date(toDate).toISOString(),
        };
      } else if (fromDate) {
        conditions.createdAt = {
          $gt: new Date(fromDate).toISOString(),
        };
      } else if (toDate) {
        conditions.createdAt = {
          $lt: new Date(toDate).toISOString(),
        };
      }
      const entries = await strapi.db.query("api::order.order").findMany({
        orderBy: { createdAt: "desc" },
        where: conditions,
        populate: {
          payment: true,
          customer: true,
          purchases: { populate: { product: { populate: { image: true } } } },
        },
      });
      return entries.map((entry) => ({
        ...entry,
        payment: entry?.payment?.type,
        customer: entry?.customer?.username,
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
      console.error(error);
      ctx.badRequest(error, "Error in fetch order list");
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
          payment: true,
          customer: true,
          purchases: { populate: { product: { populate: { image: true } } } },
        },
      });

      entry.payment = entry?.payment?.type;
      entry.customer = entry?.customer?.username;
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
      console.error(error);
      ctx.badRequest(error, "Error in fetch order detail");
    }
  },

  async applyOrder(ctx) {
    try {
      const body = ctx.request.body;
      //console.log(body);
      //console.log(ctx.request.files);
      const promisePurchase = [];
      for (let i = 0; i < body.products.length; i++) {
        promisePurchase.push(
          strapi.db.query("api::purchase.purchase").create({
            data: {
              quantity: body.products[i].quantity,
              product: body.products[i].id,
              customer: body.user_id,
            },
          })
        );
      }
      const purchaseLst = await Promise.all(promisePurchase);
      const purchaseIds = purchaseLst.map((p) => p.id);
      const order = await strapi.db.query("api::order.order").create({
        data: {
          total: body.total,
          status: "order",
          purchases: purchaseIds,
          customer: body.user_id,
        },
      });
      await strapi.db.query("api::payment.payment").create({
        data: {
          type: body.payment_type ? body.payment_type : "cash",
          order: order.id,
        },
      });
      return "Success";
    } catch (err) {
      ctx.badRequest("Error in create order payment", err);
    }
  },
}));
