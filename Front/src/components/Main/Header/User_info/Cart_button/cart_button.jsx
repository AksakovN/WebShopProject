import { useContext, useEffect, useRef } from 'react';
import { ForInnerDataContext } from '../../../../../contexts/forInnerDataContext';
import { ForModalContext } from '../../../../../contexts/forModalContext';
import Cart from '../../Cart/cart';
import './cart_button.scss';

function Cart_button() {
    const cart_button = useRef(null);
    const cart_size = useRef(null);
    const { cart, setcart } = useContext(ForModalContext);
    const { cartItem, totalPrice } = useContext(ForInnerDataContext);

    function handlerCartOpen() {
        setcart(true);
    }

    useEffect(() => {
      if (cartItem.length == 0) {
        cart_size.current.style.display = "none";
      } else {
        cart_size.current.style.display = "block";
      }
    }, [totalPrice]);
    
    
    return (
        <div className='cart_button'>
            <img src={require("../../../../Images/cart.png")} alt="cartButton" 
            ref={cart_button} onMouseEnter={handlerCartOpen}/>
            <div className="cart_size" ref={cart_size}>{cartItem.length}</div>
            {cart ? <Cart/> : ''}
        </div>
    );
}

export default Cart_button;