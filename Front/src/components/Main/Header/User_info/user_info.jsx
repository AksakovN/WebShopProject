import Account_button from './Account_button/account_button';
import Cart_button from './Cart_button/cart_button';
import Favourite_button from './Favourite_button/favourite_button';
import './user_info.scss';

function User_info() {
    return (
        <div className='user_info'>
            <Account_button/> 
            <Cart_button/>
            <Favourite_button/>
        </div>
    );
}

export default User_info;