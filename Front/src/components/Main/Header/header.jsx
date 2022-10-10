import axios from 'axios';
import Cookies from 'js-cookie';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ForInnerDataContext } from '../../../contexts/forInnerDataContext';
import { ForRequestsContext } from '../../../contexts/forRequestsContext';
import Burger from './Burger/burger';
import './header.scss';
import Search from './Search/search';
import User_info from './User_info/user_info';

function Header() {
    const navigate = useNavigate();
    const { loginInfo, setloginInfo } = useContext(ForInnerDataContext);
    const { setproducts, setproductsPage } = useContext(ForRequestsContext);

    function handlerredirectOnMain(e) {
        e.preventDefault();
        prodRequest();
        navigate('/');
    }

    function prodRequest() {
        axios.get('http://127.0.0.1:8000/api/products?limit=12')
            .then((resp) => {
                setproducts(resp.data.data);
                setproductsPage(resp.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        if (Cookies.get('token') != undefined) {
            setloginInfo(true);
        } else {
            setloginInfo(false);
        }
    }, [loginInfo])

    return (
        <nav>
            <Burger />
            <div className='logo' >
                <a href='' onClick={handlerredirectOnMain}>
                    <img src={require("../../Images/250-2508817_shop-png-black-and-white-pluspng-word-shop.png")} alt="Shop logo" />
                </a>
            </div>
            <Search />
            <User_info />
        </nav>
    );
}

export default Header;