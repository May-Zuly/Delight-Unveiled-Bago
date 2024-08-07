module.exports = {
  routes: [
    {
      method: "GET",
      path: "/order/list",
      handler: "order.orderList",
    },
    {
      method: "GET",
      path: "/order/analysis",
      handler: "order.orderAnalysis",
    },
    {
      method: "GET",
      path: "/order/detail/:id",
      handler: "order.orderDetail",
    },
    {
      method: "POST",
      path: "/order/apply",
      handler: "order.applyOrder",
    },
  ],
};
