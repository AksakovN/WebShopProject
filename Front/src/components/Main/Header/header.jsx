import { useNavigate } from 'react-router-dom';
import Burger from './Burger/burger';
import './header.scss';
import Search from './Search/search';
import User_info from './User_info/user_info';

function Header() {
    const navigate = useNavigate();

    function handlerredirectOnMain() {
        navigate('/');
    }
    return (
        <nav>
            <Burger />
            <div className='logo' onClick={handlerredirectOnMain}>
                <a href="">
                    <img src={require("../../Images/250-2508817_shop-png-black-and-white-pluspng-word-shop.png")} alt="Shop logo" />
                </a>
            </div>
            <Search />
            <User_info />
        </nav>
    );
}

export default Header;