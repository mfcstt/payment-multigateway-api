import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'auth.user.sign_up': { paramsTuple?: []; params?: {} }
    'auth.user.login': { paramsTuple?: []; params?: {} }
    'auth.user.logout': { paramsTuple?: []; params?: {} }
    'profile.user.profile': { paramsTuple?: []; params?: {} }
    'product.create': { paramsTuple?: []; params?: {} }
    'product.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'product.delete': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'product.get_all': { paramsTuple?: []; params?: {} }
    'product.get_by_id': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'gateway.toggle': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'gateway.update_priority': { paramsTuple: [ParamValue,ParamValue]; params: {'id': ParamValue,'priority': ParamValue} }
    'purchase.create': { paramsTuple?: []; params?: {} }
    'purchase.list_all': { paramsTuple?: []; params?: {} }
    'purchase.detail': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'purchase.refund': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'client.get_all': { paramsTuple?: []; params?: {} }
    'client.client_purchases': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'user.get_all': { paramsTuple?: []; params?: {} }
    'user.get_by_id': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'user.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'user.delete': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  POST: {
    'auth.user.sign_up': { paramsTuple?: []; params?: {} }
    'auth.user.login': { paramsTuple?: []; params?: {} }
    'auth.user.logout': { paramsTuple?: []; params?: {} }
    'product.create': { paramsTuple?: []; params?: {} }
    'purchase.create': { paramsTuple?: []; params?: {} }
    'purchase.refund': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  GET: {
    'profile.user.profile': { paramsTuple?: []; params?: {} }
    'product.get_all': { paramsTuple?: []; params?: {} }
    'product.get_by_id': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'purchase.list_all': { paramsTuple?: []; params?: {} }
    'purchase.detail': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'client.get_all': { paramsTuple?: []; params?: {} }
    'client.client_purchases': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'user.get_all': { paramsTuple?: []; params?: {} }
    'user.get_by_id': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  HEAD: {
    'profile.user.profile': { paramsTuple?: []; params?: {} }
    'product.get_all': { paramsTuple?: []; params?: {} }
    'product.get_by_id': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'purchase.list_all': { paramsTuple?: []; params?: {} }
    'purchase.detail': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'client.get_all': { paramsTuple?: []; params?: {} }
    'client.client_purchases': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'user.get_all': { paramsTuple?: []; params?: {} }
    'user.get_by_id': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  PUT: {
    'product.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'gateway.toggle': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'gateway.update_priority': { paramsTuple: [ParamValue,ParamValue]; params: {'id': ParamValue,'priority': ParamValue} }
    'user.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'product.delete': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'user.delete': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}