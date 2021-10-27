const key = 'CART';

export const getGuestCart = () => {
    const cart = JSON.parse(localStorage.getItem(key));

    if (cart) {
        return cart
    }
    
    clearGuestCart();
    return getGuestCart()
}

export const clearGuestCart = () => {
    const cart = { orderitems: [] }
    setGuestCart(cart)
}

export const setGuestCart = (cart) => {
    localStorage.setItem(key, JSON.stringify(cart))
}