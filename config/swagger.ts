// for AdonisJS v6
import path from 'node:path'
import url from 'node:url'
// ---

export default {
  path: path.dirname(url.fileURLToPath(import.meta.url)) + '/../',
  title: 'Payment MultiGateway API',
  version: '1.0.0',
  description: 'API for managing payments, products, gateways, purchases, and users',
  tagIndex: 1,
  productionEnv: 'production',
  info: {
    title: 'Payment MultiGateway API',
    version: '1.0.0',
    description: 'API for managing payments, products, gateways, purchases, and users',
  },
  snakeCase: true,

  debug: false, // set to true, to get some useful debug output
  ignore: ['/swagger', '/docs'],
  preferredPutPatch: 'PUT', // if PUT/PATCH are provided for the same route, prefer PUT
  common: {
    parameters: {}, // OpenAPI conform parameters that are commonly used
    headers: {}, // OpenAPI conform headers that are commonly used
  },
  securitySchemes: {}, // optional
  authMiddlewares: ['auth', 'auth:api'], // optional
  defaultSecurityScheme: 'BearerAuth', // optional
  persistAuthorization: true, // persist authorization between reloads on the swagger page
  showFullPath: false, // the path displayed after endpoint summary
}
