import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ForInnerDataContext } from '../../../../contexts/forInnerDataContext';
import './product_card.scss';

function Product_card({ marker }) {
    const { totalPrice, settotalPrice } = useContext(ForInnerDataContext);
    const [img, setimg] = useState('');
    const navigate = useNavigate();
    const { setprodId } = useContext(ForInnerDataContext);

    function handlerRedirectOnProd() {
        setprodId(marker.id);
        navigate(`/product/${marker.id}`);

    }

    function handlerAddToCart() {
        const id = parseInt(marker.id);
        const name = marker.name;
        const price = parseInt(marker.price);
        const image_url = marker.image_url;
        const count = 1;
        const data = {id, name, price, image_url, count}
        if (localStorage.getItem('cartInfo') == null) {
            localStorage.setItem('cartInfo', JSON.stringify([data]));
        } else {
            const cart_array = JSON.parse(localStorage.getItem('cartInfo'));
            let close_count = 0;
            cart_array.forEach(e => {
                if (e.id == marker.id) {
                    close_count++;
                }
            });
            if (close_count > 0) {
                return;
            }
            cart_array.push(data);
            localStorage.setItem('cartInfo', JSON.stringify(cart_array));
        }
        settotalPrice(totalPrice + 1);
    }

    useEffect(() => {
        // setimg(marker.image_url);
    }, [img])
    


    return (
        <div className='product_card' >
            <img src={img} alt="" onClick={handlerRedirectOnProd}/>
            <div className="product_card_menu">
                <img src={require("../../../Images/favourite.png")} alt="addToFavourite" />
                <img src={require("../../../Images/cart.png")} alt="addToCart" onClick={handlerAddToCart} />
            </div>
            <div className="product_card_titles">
                <div className="title_for_name">
                    {marker.name}
                </div>
                <div className="title_for_price">
                    Price: <br />{marker.price} ₴
                </div>
            </div>
        </div>
    );
}

export default Product_card;