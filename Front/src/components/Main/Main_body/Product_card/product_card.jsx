import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ForInnerDataContext } from '../../../../contexts/forInnerDataContext';
import { ForModalContext } from '../../../../contexts/forModalContext';
import './product_card.scss';

function Product_card({ marker }) {
    const { totalPrice, settotalPrice, loginInfo, favInfo, setfavInfo } = useContext(ForInnerDataContext);
    const { setuserPanel } = useContext(ForModalContext);
    const [img, setimg] = useState('');
    const [isInFav, setisInFav] = useState(false);
    const navigate = useNavigate();
    const { setprodId } = useContext(ForInnerDataContext);
    const prodImg = useRef(null);

    function checkIfFav() {
        if (localStorage.getItem('favProducts') !== null) {
            const LocalArray = JSON.parse(localStorage.getItem('favProducts'));
            LocalArray.forEach(e => {
                if (e.id == marker.id) {
                    setisInFav(true);
                }
            });
        }
    }

    function handlerRedirectOnProd(e) {
        e.preventDefault();
        setprodId(marker.id);
        navigate(`/Product/${marker.id}`);

    }

    function addToLocal(LocalName, data) {
        let JsonData = '';
        if (LocalName == 'cartInfo') {
            JsonData = data;
        } else {
            JsonData = { id: marker.id };
        }
        if (localStorage.getItem(LocalName) == null) {
            localStorage.setItem(LocalName, JSON.stringify([JsonData]));
        } else {
            const LocalArray = JSON.parse(localStorage.getItem(LocalName));
            let close_count = 0;
            LocalArray.forEach(e => {
                if (e.id == marker.id) {
                    close_count = e.id;
                }
            });
            if (close_count > 0) {
                if (LocalName == 'favProducts') {
                    setisInFav(false);
                    const newLocalArray = LocalArray.filter(function (e) { return e.id != close_count });
                    const LocalData = JSON.stringify(newLocalArray);
                    localStorage.setItem(LocalName, LocalData);
                    setfavInfo(favInfo + 1);
                }
                return;
            } else {
                LocalArray.push(JsonData);
                const LocalData = JSON.stringify(LocalArray);
                if (LocalName == 'favProducts') {
                    setisInFav(true);
                    setfavInfo(favInfo + 1);
                }
                localStorage.setItem(LocalName, LocalData);
            }
        }
    }

    function handlerAddToFav() {
        if (loginInfo) {
            addToLocal('favProducts', '');
        } else {
            setuserPanel(true);
        }
    }

    function handlerAddToCart() {
        const id = parseInt(marker.id);
        const name = marker.name;
        const price = parseInt(marker.price);
        const image_url = marker.image_url;
        const count = 1;
        const data = { id, name, price, image_url, count };
        addToLocal('cartInfo', data);
        settotalPrice(totalPrice + 1);
    }

    useEffect(() => {
        setimg(marker.image_url);
        if (marker.imgSize == 0) {
            prodImg.current.style.width = '100px';
        } else {
            prodImg.current.style.width = '190px';
        }
        if (loginInfo) {
            setTimeout(() => {
                checkIfFav();
            }, 1000);
        } else {
            setisInFav(false);
        }

    }, [loginInfo])


    return (
        <div className='product_card' >
            <div className="product_card_head">
                <a href={`/Product/${marker.id}`} onClick={handlerRedirectOnProd}><img src={img} ref={prodImg} alt="" /></a>
                <div className="product_card_menu">
                    <img src={require(isInFav ? "../../../Images/check.png" : "../../../Images/favourite.png")}
                        alt="addToFavourite" onClick={handlerAddToFav} />
                    <img src={require("../../../Images/cart.png")} alt="addToCart" onClick={handlerAddToCart} />
                </div>
            </div>
            <div className="product_card_titles">
                <a href={`/Product/${marker.id}`} className="title_for_name" onClick={handlerRedirectOnProd}>
                    {marker.name}
                </a>
                <div className="title_for_price">
                    Price: <br /><div className="title_for_price_act">{marker.price} ₴</div>
                </div>
            </div>
        </div>
    );
}


export default React.memo(Product_card);