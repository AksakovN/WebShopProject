import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate();


    function handlerCartClose() {
        setcart(false);
    }
    function handlerForOrderButton(e) {
        e.preventDefault();
        navigate('/Order');
    }

    function checkPriceLength(priceLength) {
        switch (priceLength) {
            case 4:
                return 1;
            case 5:
                return 2;
            case 6:
                return 3;
            case 7:
                return [1, 4];
            case 8:
                return [2, 5];
            case 9:
                return [3, 6];
        }
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
            let price_res = 0;
            new_price.forEach(e => {
                new_price_count += parseInt(e.price) * parseInt(e.count);
            });
            if (new_price_count.toString().length > 3) {
                const price_count = checkPriceLength(new_price_count.toString().length);
                if (price_count[1] !== undefined) {
                    price_res = [new_price_count.toString().slice(0, price_count[0]), ',', new_price_count.toString().slice(price_count[0])].join(''); 
                    price_res = [price_res.toString().slice(0, price_count[1] + 1), ',', price_res.toString().slice(price_count[1] + 1)].join(''); 
                } else {
                    price_res = [new_price_count.toString().slice(0, price_count), ',', new_price_count.toString().slice(price_count)].join(''); 
                }
            } else {
                price_res = new_price_count;
            }
            setprice(price_res);
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
                    <div className="cart_buy_button" onClick={handlerForOrderButton}>
                        {cartItems.length > 0 ? <a href='/Order'>Order</a> : 'Cart is empty'}
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