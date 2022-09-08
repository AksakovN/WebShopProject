import { useContext } from 'react';
import { ForModalContext } from '../../../../contexts/forModalContext';
import './user_panel.scss';
import User_login from './User_login/user_login';
import User_logout from './User_logout/user_logout';
import { ForInnerDataContext } from '../../../../contexts/forInnerDataContext';

function User_panel() {
    const { setuserPanel } = useContext(ForModalContext);
    const { loginInfo } = useContext(ForInnerDataContext);

    function handlerCartClose() {
        setuserPanel(false);
    }

    return (
        <div className='cart_wrapper' onMouseLeave={handlerCartClose}>
            <div className='user_main'>        
                <div className="user_panel_body" >
                    {loginInfo ? <User_login/> : <User_logout />}      
                    {/* <div className="free_space"></div> */}
                </div>
            </div>
        </div>
    );
}

export default User_panel;