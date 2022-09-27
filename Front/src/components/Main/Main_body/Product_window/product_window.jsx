import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useContext, useEffect, useRef, useState } from 'react';
import { ForModalContext } from '../../../../contexts/forModalContext';
import './product_window.scss';
import { ForInnerDataContext } from '../../../../contexts/forInnerDataContext';
import Commentary_section from './Commetary_section/commentary_section';
import { Rating } from 'react-simple-star-rating';
import Cookies from 'js-cookie';

function Product_window() {
    const { catalog } = useContext(ForModalContext);
    const { totalPrice, settotalPrice, loginInfo, favInfo, setfavInfo } = useContext(ForInnerDataContext);
    const [isInFav, setisInFav] = useState(false);
    const catalog_space = useRef(null);
    const image_space = useRef(null);
    const commentAnim = useRef(null);
    const location = useLocation();
    const [prodInfo, setprodInfo] = useState([]);
    const [rating, setRating] = useState(0);
    const [commentaryShown, setcommentaryShown] = useState(false);
    const [commentaryData, setcommentaryData] = useState([]);
    const [addCommentarySection, setaddCommentarySection] = useState(true);
    const [userCommentary, setuserCommentary] = useState([]);

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

    function getCommentaries() {
        let Uid = '';
        if (loginInfo) {
            const userInfo = Cookies.get('userInfo');
            Uid = userInfo.substring((userInfo.indexOf('/') + 1));
        }
        axios.post('http://127.0.0.1:8000/api/getCommentaries', { id: prodInfo.id, Uid:Uid })
            .then((resp) => {
                setcommentaryData(resp.data.comment);
                if (resp.data.userComment === null) {
                    setaddCommentarySection(true);
                    return;
                }
                setuserCommentary(resp.data.userComment); //null
                setaddCommentarySection(false); 
            })
    }

    function checkIfFav() {
        if (localStorage.getItem('favProducts') !== null) {
            const LocalArray = JSON.parse(localStorage.getItem('favProducts'));
            LocalArray.forEach(e => {
                if (e.id == prodInfo.id) {
                    setisInFav(true);
                }
            });
        }
    }

    function handlerImageHoverOn() {
        image_space.current.classList.add('img_hover');
    }

    function handlerImageHoverOff() {
        image_space.current.classList.remove('img_hover');
    }

    function addToLocal(LocalName, data) {
        let JsonData = '';
        if (LocalName == 'cartInfo') {
            JsonData = data;
        } else {
            JsonData = { id: prodInfo.id };
        }
        if (localStorage.getItem(LocalName) == null) {
            localStorage.setItem(LocalName, JSON.stringify([JsonData]));
        } else {
            const LocalArray = JSON.parse(localStorage.getItem(LocalName));
            let close_count = 0;
            LocalArray.forEach(e => {
                if (e.id == prodInfo.id) {
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
        }
    }

    function handlerAddToCart() {
        const id = parseInt(prodInfo.id);
        const name = prodInfo.name;
        const price = parseInt(prodInfo.price);
        const image_url = prodInfo.image_url;
        const count = 1;
        const data = { id, name, price, image_url, count };
        addToLocal('cartInfo', data);
        settotalPrice(totalPrice + 1);
    }

    function handlerForShowCommentary() {     
        if (commentaryShown == false) {
            commentAnim.current.style.display = 'block';
            getCommentaries();
            setTimeout(() => {
                commentAnim.current.style.display = 'none';
                setcommentaryShown(!commentaryShown);
                setTimeout(() => {
                    window.scrollTo({top:1000, behavior: "smooth"})
                }, 100);
            }, 1000);
        } else {
            window.scrollTo({top:0, behavior: "smooth"});
            commentAnim.current.style.display = 'none';
            setcommentaryShown(!commentaryShown);
        }
    }

    useEffect(() => {
        window.scrollTo({top:0, behavior: "smooth"});
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
        if (loginInfo) {
            getCommentaries();
            setTimeout(() => {
                checkIfFav(); 
            }, 1000);
        } else {
            setisInFav(false);
        }
        setRating(prodInfo.rating);
    }, [catalog, prodInfo, loginInfo])

    return (
        <div className="main_space">
            <div className='catalog_space' ref={catalog_space}></div>
            <div className='product_body'>
                {/* добавить свайпер с рекламой? */}
                <div className="left_section">
                    <div className="img_part">
                        <div className="img_space" ref={image_space}>
                            <img src={prodInfo.image_url} alt=""
                                onClick={handlerImageHoverOn}
                                onMouseLeave={handlerImageHoverOff}
                            />
                        </div>
                        <div className="img_footer">
                            <div className="rating">
                                <Rating ratingValue={rating * 10} allowHalfIcon={true} readonly={true} />  <p>{rating}</p>
                            </div>
                            <div className="add_to_fav">
                                <img src={require(isInFav ? "../../../Images/checkB.png" : "../../../Images/favourite_b.png")}
                                    alt="favourite button" onClick={handlerAddToFav} />
                                {isInFav ? 'Added' : 'Add to favourite'}
                            </div>
                        </div>
                    </div>
                    <div className="commentary_button">
                        <div className="open_commentary_button" onClick={handlerForShowCommentary}>
                            {commentaryShown ? 'Hide rewiews' : `Show rewiews (${prodInfo.ratingEntries})`}
                        </div>
                    </div>
                    <div className="commentary_anim" ref={commentAnim}>
                        <hr/><hr/><hr/><hr/>
                    </div>
                    {commentaryShown ? <div className="commentary_part">
                        <Commentary_section commentData={commentaryData} productId={prodInfo.id} 
                        addCommentarySection={addCommentarySection} userCommentary={userCommentary}/>
                    </div> : ''}
                </div>
                <div className="right_section">
                    <div className="info_part">
                        <div className="product_name">{prodInfo.name}</div>
                        <div className="price_box">
                            <div className="product_price">{prodInfo.price} ₴</div>
                            <div className="add_to_cart_button" onClick={handlerAddToCart}>
                                <img src={require('../../../Images/cart.png')} alt="" />
                            </div>
                        </div>
                        <div className="description">
                            {prodInfo.description}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Product_window;