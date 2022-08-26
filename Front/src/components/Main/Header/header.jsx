import Burger from './Burger/burger';
import './header.scss';
import Search from './Search/search';
import User_info from './User_info/user_info';

function Header() {
    return (
        <nav>
            <Burger />
            <div className='logo'>
                <a href="">
                    <img src={require("../../Images/250-2508817_shop-png-black-and-white-pluspng-word-shop.png")} alt="Shop logo" />
                </a>
            </div>
            <Search/>
            <User_info/>
        </nav>
    );
}

export default Header;