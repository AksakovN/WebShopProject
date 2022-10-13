import { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { ForModalContext } from '../../../../../contexts/forModalContext';
import { ForInnerDataContext } from '../../../../../contexts/forInnerDataContext';
import Cookies from 'js-cookie';
import './favourite_button.scss';
import { useNavigate } from 'react-router-dom';

function Favourite_button() {
    const { loginInfo, favInfo } = useContext(ForInnerDataContext);
    const { setuserPanel } = useContext(ForModalContext);
    const fav_size = useRef(null);
    const [fav_number, setfav_number] = useState(0);
    const navigate = useNavigate();

    function setFavProducts() {
        const LocalArray = JSON.parse(localStorage.getItem('favProducts'));
        const token = Cookies.get('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        axios.post('http://127.0.0.1:8000/api/addFav', { id: LocalArray }, config)
    }

    function handlerForFavouriteWindow(e) {
        e.preventDefault();
        if (loginInfo) {
            setFavProducts();
            navigate('/Favourite');
        } else {
            setuserPanel(true);
        }
    }

    useEffect(() => {
        if (loginInfo) {
            if (JSON.parse(localStorage.getItem('favProducts')).length < 1) {
                fav_size.current.style.display = "none";
                setfav_number(0);
            } else if (localStorage.getItem('favProducts') !== null) {
                fav_size.current.style.display = "block";
                const localProduct = JSON.parse(localStorage.getItem('favProducts'));
                setfav_number(localProduct.length);
            }
        } else {
            fav_size.current.style.display = "none";
            setfav_number(0);
        }
    }, [loginInfo, favInfo])


    return (
        <div className='favourite_button'>
            <a href={'/Favourite'}><img src={require("../../../../Images/favourite.png")} alt="favouriteButton" onClick={handlerForFavouriteWindow} /></a>
            <div className="fav_size" ref={fav_size}>{fav_number}</div>
        </div>
    );
}

export default Favourite_button;