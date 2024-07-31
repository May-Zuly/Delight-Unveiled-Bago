"use strict";

/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async applyOrder(ctx) {
    try {
      const body = ctx.request.body;
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
