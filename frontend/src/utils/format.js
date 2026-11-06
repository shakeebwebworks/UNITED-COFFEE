export const formatPrice = (n) => '\u20B9' + Number(n || 0).toLocaleString('en-IN')

export const calcTotals = (subtotal) => {
  const delivery = subtotal === 0 || subtotal >= 999 ? 0 : 49
  const tax = Math.round(subtotal * 0.05)
  return { subtotal, delivery, tax, total: subtotal + delivery + tax }
}