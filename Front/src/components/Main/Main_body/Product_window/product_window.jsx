import axios from 'axios';
import { useLocation } from 'react-router-dom'
import { useContext, useEffect, useRef, useState } from 'react';
import { ForModalContext } from '../../../../contexts/forModalContext';
import './product_window.scss';

function Product_window() {
    const { catalog } = useContext(ForModalContext);
    const catalog_space = useRef(null);
    const image_space = useRef(null);
    const location = useLocation();
    const [prodInfo, setprodInfo] = useState([]);

    function getProduct() {
        const item_id = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);
        axios.post('http://127.0.0.1:8000/api/product', { id: item_id })
            .then((resp) => {
                setprodInfo(resp.data);
                localStorage.setItem('productInfo', JSON.stringify(resp.data));
            })
            .catch((error) => {
                console.log(error);
            })
    }

    function handlerImageHoverOn() {
        image_space.current.classList.add('img_hover');
    }
    function handlerImageHoverOff() {
        image_space.current.classList.remove('img_hover');
    }


    useEffect(() => {
        if (prodInfo.length < 1) {
            if (localStorage.getItem('productInfo') == null) {
                getProduct();
            } else {
                setprodInfo(JSON.parse(localStorage.getItem('productInfo')));
            }        
        } 
        if (catalog == true) {
            catalog_space.current.style.display = 'block';
        } else {
            catalog_space.current.style.display = 'none';
        }
    }, [catalog, prodInfo])


    return (
        <div className='wrapper'>
            <div className='header_space'></div>
            <div className="main_space">
                <div className='catalog_space' ref={catalog_space}></div>
                <div className='product_body'>
                    <div className="img_part">
                        <div className="img_space" ref={image_space}>
                            <img src={prodInfo.image_url} alt=""
                                onClick={handlerImageHoverOn}
                                onMouseLeave={handlerImageHoverOff}
                            />
                        </div>
                        <div className="img_footer">
                            <div className="rating">
                                mb rating
                            </div>
                            <div className="add_to_fav">
                                <img src={require("../../../Images/favourite_b.png")} alt="" />
                                Add to favourite
                            </div>
                        </div>
                    </div>
                    <div className="info_part">
                        <div className="product_name">{prodInfo.name}</div>
                        <div className="price_box">
                            <div className="product_price">{prodInfo.price} ₴</div>
                            <div className="add_to_cart_button">
                                <img src={require('../../../Images/cart.png')} alt="" />
                            </div>
                        </div>
                        <div className="description">
                            {prodInfo.description}
                        </div>
                    </div>
                    <div className="commentary_part">
                        commentary here
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Product_window;