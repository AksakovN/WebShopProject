import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ForInnerDataContext } from '../../../../../contexts/forInnerDataContext';
import './order_item.scss';

function Order_item({ mark, index }) {
    const [count, setcount] = useState(mark.count);
    const [price, setprice] = useState(mark.price);
    const [image, setimage] = useState('');
    const navigate = useNavigate();
    const count_display = useRef(null);
    const button_minus = useRef(null);
    const { totalPrice, settotalPrice, setprodId } = useContext(ForInnerDataContext);

    function getLocalStorage() {
        return JSON.parse(localStorage.getItem('cartInfo'));
    }
    function checkerHandler(checker) {
        if (checker[index].count > 1 && button_minus.current.classList.contains('low_count')) {
            button_minus.current.classList.remove('low_count');
        }
    }

    function handlerRedirectOnProd(e) {
        e.preventDefault();
        setprodId(mark.id);
        navigate(`/Product/${mark.id}`);

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
            if (checker[index].count < 2) {
                button_minus.current.classList.add('low_count');
            }
        }
        setprice(mark.price * count);
        setimage(mark.image_url);
    }, [count, totalPrice])

    return (
        <div className='order_item_main'>
            <a href={`/Product/${mark.id}`} onClick={handlerRedirectOnProd}><img src={image} alt="" /></a>
            <div className="order_list_info">
                <a href={`/Product/${mark.id}`} onClick={handlerRedirectOnProd}><div className="order_item_name">{mark.name}</div></a>
                <hr />
                <div className="order_item_lover_panel">
                    <div className="order_item_price">Price: {price} ₴</div>
                    <div className="order_item_control">
                        <div className="order_button_minus low_count" ref={button_minus} onClick={handlerButtonMinus}></div>
                        <div className="order_count_display" ref={count_display}>{count}</div>
                        <div className="order_button_plus" onClick={handlerButtonPlus}></div>
                        <div className="order_button_delete" onClick={handlerButtonDelete}><img src={require('../../../../Images/recycle-bin.png')} alt="" /></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Order_item;