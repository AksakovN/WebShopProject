import { useContext, useEffect, useRef, useState } from 'react';
import { ForInnerDataContext } from '../../../../contexts/forInnerDataContext';
import { ForModalContext } from '../../../../contexts/forModalContext';
import './cart.scss';
import Cart_item from './Cart_item/cart_item';

function Cart() {
    const cart_wrapper = useRef(null);
    const { setcart } = useContext(ForModalContext);
    const { totalPrice } = useContext(ForInnerDataContext);
    const [price, setprice] = useState(0);
    const [cartItems, setcartItems] = useState([]);


    function handlerCartClose() {
        setcart(false);
    }

    useEffect(() => {
        if (localStorage.getItem('cartInfo') == null) {
            setcartItems([]);
        } else {
            setcartItems(JSON.parse(localStorage.getItem('cartInfo')));
        }

        if (localStorage.getItem('cartInfo') !== null) {
            const new_price = JSON.parse(localStorage.getItem('cartInfo'));
            let new_price_count = 0
            new_price.forEach(e => {
                new_price_count += parseInt(e.price) * parseInt(e.count);
            });
            setprice(new_price_count);
        } else {
            setprice(0);
        }

    }, [totalPrice])

    return (
        <div className='cart_wrapper' ref={cart_wrapper} onMouseLeave={handlerCartClose}>
            <div className='cart_main' >
                <div className="cart_header">
                    <div className="cart_total_price">
                        <div>Total price:</div>
                        <div>{price} ₴</div>
                    </div>
                    <div className="cart_buy_button">
                        {cartItems.length > 0 ? <button>Order</button> : 'Cart is empty'}
                    </div>
                </div>
                <div className="cart_body">
                    {cartItems.length > 0 ? cartItems.map((e) => <Cart_item key={e.id} mark={e} index={cartItems.indexOf(e)} />) : ''}
                </div>
            </div>
        </div>
    );
}

export default Cart;