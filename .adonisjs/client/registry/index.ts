/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'auth.user.sign_up': {
    methods: ["POST"],
    pattern: '/auth/signup',
    tokens: [{"old":"/auth/signup","type":0,"val":"auth","end":""},{"old":"/auth/signup","type":0,"val":"signup","end":""}],
    types: placeholder as Registry['auth.user.sign_up']['types'],
  },
  'auth.user.login': {
    methods: ["POST"],
    pattern: '/auth/login',
    tokens: [{"old":"/auth/login","type":0,"val":"auth","end":""},{"old":"/auth/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['auth.user.login']['types'],
  },
  'auth.user.logout': {
    methods: ["POST"],
    pattern: '/auth/logout',
    tokens: [{"old":"/auth/logout","type":0,"val":"auth","end":""},{"old":"/auth/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['auth.user.logout']['types'],
  },
  'profile.user.profile': {
    methods: ["GET","HEAD"],
    pattern: '/account/profile',
    tokens: [{"old":"/account/profile","type":0,"val":"account","end":""},{"old":"/account/profile","type":0,"val":"profile","end":""}],
    types: placeholder as Registry['profile.user.profile']['types'],
  },
  'product.create': {
    methods: ["POST"],
    pattern: '/products',
    tokens: [{"old":"/products","type":0,"val":"products","end":""}],
    types: placeholder as Registry['product.create']['types'],
  },
  'product.update': {
    methods: ["PUT"],
    pattern: '/products/:id',
    tokens: [{"old":"/products/:id","type":0,"val":"products","end":""},{"old":"/products/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['product.update']['types'],
  },
  'product.delete': {
    methods: ["DELETE"],
    pattern: '/products/:id',
    tokens: [{"old":"/products/:id","type":0,"val":"products","end":""},{"old":"/products/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['product.delete']['types'],
  },
  'product.get_all': {
    methods: ["GET","HEAD"],
    pattern: '/products',
    tokens: [{"old":"/products","type":0,"val":"products","end":""}],
    types: placeholder as Registry['product.get_all']['types'],
  },
  'product.get_by_id': {
    methods: ["GET","HEAD"],
    pattern: '/products/:id',
    tokens: [{"old":"/products/:id","type":0,"val":"products","end":""},{"old":"/products/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['product.get_by_id']['types'],
  },
  'gateway.toggle': {
    methods: ["PUT"],
    pattern: '/gateways/:id',
    tokens: [{"old":"/gateways/:id","type":0,"val":"gateways","end":""},{"old":"/gateways/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['gateway.toggle']['types'],
  },
  'gateway.update_priority': {
    methods: ["PUT"],
    pattern: '/gateways/:id/priority/:priority',
    tokens: [{"old":"/gateways/:id/priority/:priority","type":0,"val":"gateways","end":""},{"old":"/gateways/:id/priority/:priority","type":1,"val":"id","end":""},{"old":"/gateways/:id/priority/:priority","type":0,"val":"priority","end":""},{"old":"/gateways/:id/priority/:priority","type":1,"val":"priority","end":""}],
    types: placeholder as Registry['gateway.update_priority']['types'],
  },
  'purchase.create': {
    methods: ["POST"],
    pattern: '/purchases',
    tokens: [{"old":"/purchases","type":0,"val":"purchases","end":""}],
    types: placeholder as Registry['purchase.create']['types'],
  },
  'purchase.list_all': {
    methods: ["GET","HEAD"],
    pattern: '/purchases',
    tokens: [{"old":"/purchases","type":0,"val":"purchases","end":""}],
    types: placeholder as Registry['purchase.list_all']['types'],
  },
  'purchase.detail': {
    methods: ["GET","HEAD"],
    pattern: '/purchases/:id',
    tokens: [{"old":"/purchases/:id","type":0,"val":"purchases","end":""},{"old":"/purchases/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['purchase.detail']['types'],
  },
  'purchase.refund': {
    methods: ["POST"],
    pattern: '/purchases/:id/refund',
    tokens: [{"old":"/purchases/:id/refund","type":0,"val":"purchases","end":""},{"old":"/purchases/:id/refund","type":1,"val":"id","end":""},{"old":"/purchases/:id/refund","type":0,"val":"refund","end":""}],
    types: placeholder as Registry['purchase.refund']['types'],
  },
  'client.get_all': {
    methods: ["GET","HEAD"],
    pattern: '/clients',
    tokens: [{"old":"/clients","type":0,"val":"clients","end":""}],
    types: placeholder as Registry['client.get_all']['types'],
  },
  'client.client_purchases': {
    methods: ["GET","HEAD"],
    pattern: '/clients/:id/purchases',
    tokens: [{"old":"/clients/:id/purchases","type":0,"val":"clients","end":""},{"old":"/clients/:id/purchases","type":1,"val":"id","end":""},{"old":"/clients/:id/purchases","type":0,"val":"purchases","end":""}],
    types: placeholder as Registry['client.client_purchases']['types'],
  },
  'user.get_all': {
    methods: ["GET","HEAD"],
    pattern: '/users',
    tokens: [{"old":"/users","type":0,"val":"users","end":""}],
    types: placeholder as Registry['user.get_all']['types'],
  },
  'user.get_by_id': {
    methods: ["GET","HEAD"],
    pattern: '/users/:id',
    tokens: [{"old":"/users/:id","type":0,"val":"users","end":""},{"old":"/users/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['user.get_by_id']['types'],
  },
  'user.update': {
    methods: ["PUT"],
    pattern: '/users/:id',
    tokens: [{"old":"/users/:id","type":0,"val":"users","end":""},{"old":"/users/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['user.update']['types'],
  },
  'user.delete': {
    methods: ["DELETE"],
    pattern: '/users/:id',
    tokens: [{"old":"/users/:id","type":0,"val":"users","end":""},{"old":"/users/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['user.delete']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
