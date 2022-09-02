import { useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import { ForModalContext } from '../../../../contexts/forModalContext';
import './user_panel.scss';
import User_login from './User_login/user_login';
import User_logout from './User_logout/user_logout';

function User_panel() {
    const { setuserPanel } = useContext(ForModalContext);
    function handlerCartClose() {
        setuserPanel(false);
    }

    useEffect(() => {
        // Cookies.get('user_access_key');
    }, [])
    
    return (
        <div className='cart_wrapper'  onMouseLeave={handlerCartClose}>
            <div className='user_main' >
                <div className="user_panel_body">
                    {/* <User_login/> */}
                    <User_logout/>
                    <div className="free_space"></div>
                </div>
            </div>
        </div>
    );
}

export default User_panel;