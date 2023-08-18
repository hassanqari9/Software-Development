import { useContext, useState } from 'react'
import styles from './Cart.module.css'
import Model from '../UI/Model'
import CartContext from '../../store/cart-context'
import CartItem from './CartItem'
import Checkout from './Checkout'

const Cart = (props) => {
    const [isCheckout, setIsCheckout] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [didSubmit, setDidSubmit] = useState(false)
    const cartCtx = useContext(CartContext)
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
    const hasItems = cartCtx.items.length > 0

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id)
    }
    const cartItemAddHandler = item => {
        cartCtx.addItem({ ...item, amount: 1 })
    }

    const orderHandler = () => {
        setIsCheckout(true)
    }

    const submitOrderHanlder = async (userData) => {
        setIsSubmitting(true)
        await fetch('https://react-http-95506-default-rtdb.firebaseio.com/order.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            })
        })
        setIsSubmitting(false)
        setDidSubmit(true)
        cartCtx.clearCart()
    }

    const cartItems = (
        <ul className={styles['cart-items']}>
            {cartCtx.items.map(item =>
                <CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    onAdd={cartItemAddHandler.bind(null, item)}
                />
            )}
        </ul>
    )

    const modelActions = <div className={styles.actions}>
        <button
            className={styles['button--alt']}
            onClick={props.onClose}
        >
            Close
        </button>

        {hasItems &&
            <button
                className={styles.button}
                onClick={orderHandler}
            >
                Order
            </button>}
    </div>

    const cartModelContent =
        <>
            {cartItems}
            <div className={styles.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && <Checkout onConfirm={submitOrderHanlder} onCancel={props.onClose} />}
            {!isCheckout && modelActions}
        </>
    const isSubmittingModelContent = <p>Sending order data...</p>
    const didSubmitModelContent =
        <>
            <p>Successfully send the order</p>
            <div className={styles.actions}>
                <button
                    className={styles.button}
                    onClick={props.onClose}
                >
                    Close
                </button>
            </div>
        </>

    return (
        <Model onClose={props.onClose}>
            {!isSubmitting && !didSubmit && cartModelContent}
            {isSubmitting && isSubmittingModelContent}
            {!isSubmitting && didSubmit && didSubmitModelContent}
        </Model>
    )
}

export default Cart