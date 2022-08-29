import { useContext, useEffect, useRef, useState } from 'react';
import { ForInnerDataContext } from '../../../../../contexts/forInnerDataContext';
import './cart_item.scss';

function Cart_item({ mark, index }) {
    const [count, setcount] = useState(mark.count);
    const [price, setprice] = useState(mark.price);
    const [image, setimage] = useState('');
    const count_display = useRef(null);
    const button_minus = useRef(null);
    const { totalPrice, settotalPrice } = useContext(ForInnerDataContext);

    function getLocalStorage() {
        return JSON.parse(localStorage.getItem('cartInfo'));
    }
    function checkerHandler(checker) {
        if (checker[index].count > 1 && button_minus.current.classList.contains('low_count')) {
            button_minus.current.classList.remove('low_count');
        }
    }

    function localProdChange(new_count) {
        const localProduct = getLocalStorage();
        const id = parseInt(mark.id);
        const name = mark.name;
        const price = parseInt(mark.price);
        const image_url = mark.image_url;
        const count = new_count;
        const data = { id, name, price, image_url, count }
        localProduct.splice(index, 1, data);
        localStorage.setItem('cartInfo', JSON.stringify(localProduct));
    }

    function handlerButtonMinus() {
        const checker = getLocalStorage();
        if (checker[index].count < 3) {
            button_minus.current.classList.add('low_count');
        }
        setcount(count - 1);
        localProdChange(count - 1);
        settotalPrice(totalPrice + 1);
    }
    function handlerButtonPlus() {
        setcount(count + 1);
        localProdChange(count + 1);
        const checker = getLocalStorage();
        checkerHandler(checker);
        settotalPrice(totalPrice + 1);
    }
    function handlerButtonDelete() {
        settotalPrice(totalPrice + 1);
        const localProduct = getLocalStorage();
        localProduct.splice(index, 1);
        if (localProduct.length < 1) {
            localStorage.removeItem('cartInfo');
            return;
        }
        localStorage.setItem('cartInfo', JSON.stringify(localProduct));
    }
    useEffect(() => {
        const checker = getLocalStorage();
        if (localStorage.getItem('cartInfo') !== null && !!checker[index]) {
            checkerHandler(checker);
        }   
        setprice(mark.price * count);
        setimage(mark.image_url);
    }, [count, totalPrice])

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