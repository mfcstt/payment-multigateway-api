/**
 * Product API - Functional Tests (TDD)
 * Tests the full HTTP flow through controller -> use case -> repository
 */
import { test } from '@japa/runner'
import User from '#models/user'
import Product from '#models/product'

test.group('Product API', (group) => {
  let adminToken: string
  let userToken: string

  group.setup(async () => {
    const adminUser = await User.firstOrCreate(
      { email: 'admin-product-test@email.com' },
      {
        email: 'admin-product-test@email.com',
        fullName: 'Admin Test',
        password: 'password123',
        role: 'admin',
      }
    )
    const userUser = await User.firstOrCreate(
      { email: 'user-product-test@email.com' },
      {
        email: 'user-product-test@email.com',
        fullName: 'User Test',
        password: 'password123',
        role: 'user',
      }
    )
    const adminTokens = await User.accessTokens.create(adminUser)
    const userTokens = await User.accessTokens.create(userUser)
    adminToken = adminTokens.value!.release()
    userToken = userTokens.value!.release()
  })

  test('getAll: should return products list', async ({ client }) => {
    const response = await client.get('/products').bearerToken(adminToken)

    response.assertStatus(200)
    response.assertBodyContains({})
  })

  test('create: admin can create product', async ({ client }) => {
    const response = await client
      .post('/products')
      .bearerToken(adminToken)
      .json({ name: 'Test Product', amount: 99.99 })

    response.assertStatus(201)
    response.assertBodyContains({
      name: 'Test Product',
      amount: 99.99,
    })
  })

  test('create: user with role "user" cannot create product', async ({ client }) => {
    const response = await client
      .post('/products')
      .bearerToken(userToken)
      .json({ name: 'Forbidden Product', amount: 10 })

    response.assertStatus(403)
    response.assertBodyContains({ errors: [{ message: 'Access denied' }] })
  })

  test('create: requires authentication', async ({ client }) => {
    const response = await client
      .post('/products')
      .json({ name: 'Test', amount: 10 })

    response.assertStatus(401)
  })

  test('create: validates input', async ({ client }) => {
    const response = await client
      .post('/products')
      .bearerToken(adminToken)
      .json({ name: '', amount: -1 })

    response.assertStatus(422)
  })

  test('getById: should return product', async ({ client }) => {
    const product = await Product.create({ name: 'Get Test', amount: 50 })
    const response = await client
      .get(`/products/${product.id}`)
      .bearerToken(adminToken)

    response.assertStatus(200)
    response.assertBodyContains({ id: product.id, name: 'Get Test' })
    await product.delete()
  })

  test('update: admin can update product', async ({ client }) => {
    const product = await Product.create({ name: 'To Update', amount: 10 })
    const response = await client
      .put(`/products/${product.id}`)
      .bearerToken(adminToken)
      .json({ name: 'Updated Product', amount: 20 })

    response.assertStatus(200)
    response.assertBodyContains({ name: 'Updated Product', amount: 20 })
  })

  test('delete: admin can delete product', async ({ client, assert }) => {
    const product = await Product.create({ name: 'To Delete', amount: 5 })
    const response = await client
      .delete(`/products/${product.id}`)
      .bearerToken(adminToken)

    response.assertStatus(200)
    response.assertBodyContains({ message: 'Product deleted successfully' })
    const deleted = await Product.find(product.id)
    assert.isNull(deleted)
  })
})
