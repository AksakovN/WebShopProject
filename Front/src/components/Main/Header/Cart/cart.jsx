import { useContext, useEffect, useRef, useState } from 'react';
import { ForInnerDataContext } from '../../../../contexts/forInnerDataContext';
import { ForModalContext } from '../../../../contexts/forModalContext';
import './cart.scss';
import Cart_item from './Cart_item/cart_item';

function Cart() {
    const cart_wrapper = useRef(null);
    const { setcart } = useContext(ForModalContext);
    const { cartItem, totalPrice } = useContext(ForInnerDataContext);
    const [price, setprice] = useState(0);





    function handlerCartClose() {
        setcart(false);
    }
    useEffect(() => {
        setprice(totalPrice);
    }, [cartItem, totalPrice])
    
    return (
        <div className='cart_wrapper' ref={cart_wrapper} onMouseLeave={handlerCartClose}>
            <div className='cart_main' >
                <div className="cart_header">
                    <div className="cart_total_price">
                        <div>Total price:</div>
                        <div>{price} ₴</div>
                    </div>
                    <div className="cart_buy_button">
                        {cartItem.length > 0 ? <button>Order</button> : 'Cart is empty'}
                    </div>
                </div>
                <div className="cart_body">
                    {cartItem.length > 0 ? cartItem.map((e) => <Cart_item key={e.id} mark={e} index={cartItem.indexOf(e)}/>) : ''}
                </div>
            </div>
        </div>
    );
}

export default Cart;