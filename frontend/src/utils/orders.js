import api, { apiError } from '../api/client.js'

export async function placeOrder(payload) {
  try {
    const { data } = await api.post('/orders/', payload)
    return data
  } catch (err) {
    throw new Error(apiError(err, 'Could not place your order.'))
  }
}

export async function getOrders() {
  const { data } = await api.get('/orders/')
  return data
}