import axios from 'axios';
import Cookies from 'js-cookie';
import { useContext } from 'react';
import { ForInnerDataContext } from '../../../../../contexts/forInnerDataContext';
import './user_login.scss';

function User_login() {
    const { setloginInfo } = useContext(ForInnerDataContext);
    const username = Cookies.get('userInfo').substring(0, Cookies.get('userInfo').indexOf('/'));

    function userLogout() {
        const token = Cookies.get('token');       
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        axios.post('http://127.0.0.1:8000/api/logout', '', config);
    }


    function handlerForUserLogout() {
        userLogout();
        Cookies.remove('token');
        localStorage.removeItem('favProducts');
        setloginInfo(false);
    }


    return (
        <div className='for_user_auth'>
            <p>{username}</p>
            <button onClick={handlerForUserLogout}>Logout</button>
        </div>
    );
}

export default User_login;