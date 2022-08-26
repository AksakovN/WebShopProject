import { useContext, useEffect, useRef, useState } from 'react';
import { ForInnerDataContext } from '../../../../../contexts/forInnerDataContext';
import { ForRequestsContext } from '../../../../../contexts/forRequestsContext';
import './cart_item.scss';

function Cart_item({mark, index}) {
    const [count, setcount] = useState(1);
    const [price, setprice] = useState(mark.price);
    const [image, setimage] = useState('');
    const count_display = useRef(null);
    const button_minus = useRef(null);
    const {totalPrice, settotalPrice, cartItem, setcartItem } = useContext(ForInnerDataContext);
    const { products } = useContext(ForRequestsContext);



    function handlerButtonMinus() {
        if (count < 3) {
            button_minus.current.classList.add('low_count');
        }
        setcount(count - 1);
        settotalPrice(totalPrice - mark.price);
    }
    function handlerButtonPlus() {
        if (count >= 1 && button_minus.current.classList.contains('low_count')) {
            button_minus.current.classList.remove('low_count');
        }
        setcount(count + 1);
        settotalPrice(totalPrice + mark.price);
    }
    function handlerButtonDelete() {
        settotalPrice(totalPrice - price);
        let newCartItem = cartItem;
        newCartItem.splice(index, 1);
        setcartItem(newCartItem);
    }
    useEffect(() => {
      setprice(mark.price * count);
      setimage(products[mark.id - 1].image_url);
    }, [count])
    
    return (
        <div className='cart_item_main'>
            <img src={image} alt="" />
            <div className="cart_item_control">
                <div className="button_minus low_count" ref={button_minus} onClick={handlerButtonMinus}></div>
                <div className="count_display" ref={count_display}>{count}</div>
                <div className="button_plus" onClick={handlerButtonPlus}></div>
                <div className="button_delete" onClick={handlerButtonDelete}><img src={require('../../../../Images/recycle-bin.png')} alt="" /></div>
            </div>
            <div className="cart_item_text">
                <div className="cart_item_name">{mark.name}</div>
                <div className="cart_item_price">Price: <br /> {price} ₴</div>
            </div>
        </div>       
    );
}

export default Cart_item;