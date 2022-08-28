import { useContext, useEffect, useRef, useState } from 'react';
import { ForInnerDataContext } from '../../../../../contexts/forInnerDataContext';
import { ForModalContext } from '../../../../../contexts/forModalContext';
import Cart from '../../Cart/cart';
import './cart_button.scss';

function Cart_button() {
    const cart_button = useRef(null);
    const cart_size = useRef(null);
    const [cart_count, setcart_count] = useState(0);
    const { cart, setcart } = useContext(ForModalContext);
    const { totalPrice } = useContext(ForInnerDataContext);

    function handlerCartOpen() {
        setcart(true);
    }

    useEffect(() => {
      if (localStorage.getItem('cartInfo') == null) {
        cart_size.current.style.display = "none";
        setcart_count(0);
      } else {
        cart_size.current.style.display = "block";
        const localProduct = JSON.parse(localStorage.getItem('cartInfo'));
        setcart_count(localProduct.length);
      }
    }, [totalPrice]);
    
    
    return (
        <div className='cart_button'>
            <img src={require("../../../../Images/cart.png")} alt="cartButton" 
            ref={cart_button} onMouseEnter={handlerCartOpen}/>
            <div className="cart_size" ref={cart_size}>{cart_count}</div>
            {cart ? <Cart/> : ''}
        </div>
    );
}

export default Cart_button;