import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ForInnerDataContext } from '../../../../contexts/forInnerDataContext';
import './product_card.scss';

function Product_card({ marker }) {
    const { cartItem, setcartItem, totalPrice, settotalPrice } = useContext(ForInnerDataContext);
    const [img, setimg] = useState('');
    const navigate = useNavigate();
    const { setprodId } = useContext(ForInnerDataContext);

    function handlerRedirectOnProd() {
        setprodId(marker.id);
        navigate(`/product/${marker.id}`);
    }

    function handlerAddToCart() {
        if (cartItem.includes(marker.id) == false && cartItem.length < 7) {
            settotalPrice(totalPrice + parseInt(marker.price));
            const id = parseInt(marker.id);
            const name = marker.name;
            const price = parseInt(marker.price);
            const data = {id, name, price,}
            if (cartItem.length == 0) {
                setcartItem([data]);
                return;
            } else {
                setcartItem(cartItem => [...cartItem, data]);
            }
        }
    }

    useEffect(() => {
        // setimg(marker.image_url);
    }, [img])
    


    return (
        <div className='product_card' onClick={handlerRedirectOnProd}>
            <img src={img} alt="" />
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