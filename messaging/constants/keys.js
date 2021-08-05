/**
 * Routing Keys
 */
module.exports = {
  /** @summary use this key if your order msg route is orderserv -> restserv */
  ORDERSERV_TO_RESTSERV: "restserv_order_key",
  /** @summary use this key if your order msg route is restserv -> orderserv */
  RESTSERV_TO_ORDERSERV: "orderserv_order_key",

  /** @summary use this key if your table req msg route is orderserv -> restserv */
  ORDERSERV_TO_RESTSERV_TAB_REQ: "restserv_tab_req_key",
  /** @summary use this key if your table req msg route is restserv -> orderserv */
  RESTSERV_TO_ORDERSERV_TAB_REQ: "orderserv_tab_req_key",
};
