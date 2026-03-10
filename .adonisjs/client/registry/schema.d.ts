/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'auth.new_account.store': {
    methods: ["POST"]
    pattern: '/auth/signup'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').signupValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user').signupValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/new_account_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/new_account_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'auth.access_token.store': {
    methods: ["POST"]
    pattern: '/auth/login'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').loginValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user').loginValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/access_token_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/access_token_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'auth.access_token.destroy': {
    methods: ["POST"]
    pattern: '/auth/logout'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/access_token_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/access_token_controller').default['destroy']>>>
    }
  }
  'profile.profile.show': {
    methods: ["GET","HEAD"]
    pattern: '/account/profile'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/profile_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/profile_controller').default['show']>>>
    }
  }
  'product.create': {
    methods: ["POST"]
    pattern: '/products'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/products').createProductValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/products').createProductValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/product_controller').default['create']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/product_controller').default['create']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'product.update': {
    methods: ["PUT"]
    pattern: '/products/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/products').updateProductValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/products').updateProductValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/product_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/product_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'product.delete': {
    methods: ["DELETE"]
    pattern: '/products/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/product_controller').default['delete']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/product_controller').default['delete']>>>
    }
  }
  'product.get_all': {
    methods: ["GET","HEAD"]
    pattern: '/products'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/product_controller').default['getAll']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/product_controller').default['getAll']>>>
    }
  }
  'product.get_by_id': {
    methods: ["GET","HEAD"]
    pattern: '/products/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/product_controller').default['getById']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/product_controller').default['getById']>>>
    }
  }
  'gateway.toggle': {
    methods: ["PUT"]
    pattern: '/gateways/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/gateway_controller').default['toggle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/gateway_controller').default['toggle']>>>
    }
  }
  'gateway.update_priority': {
    methods: ["PUT"]
    pattern: '/gateways/:id/priority/:priority'
    types: {
      body: {}
      paramsTuple: [ParamValue, ParamValue]
      params: { id: ParamValue; priority: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/gateway_controller').default['updatePriority']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/gateway_controller').default['updatePriority']>>>
    }
  }
  'purchase.create': {
    methods: ["POST"]
    pattern: '/purchases'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/purchase').createPurchaseValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/purchase').createPurchaseValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/purchase_controller').default['create']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/purchase_controller').default['create']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'purchase.list_all': {
    methods: ["GET","HEAD"]
    pattern: '/purchases'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/purchase_controller').default['listAll']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/purchase_controller').default['listAll']>>>
    }
  }
  'purchase.detail': {
    methods: ["GET","HEAD"]
    pattern: '/purchases/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/purchase_controller').default['detail']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/purchase_controller').default['detail']>>>
    }
  }
  'client.get_all': {
    methods: ["GET","HEAD"]
    pattern: '/clients'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/client_controller').default['getAll']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/client_controller').default['getAll']>>>
    }
  }
  'client.client_purchases': {
    methods: ["GET","HEAD"]
    pattern: '/clients/:id/purchases'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/client_controller').default['clientPurchases']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/client_controller').default['clientPurchases']>>>
    }
  }
}
