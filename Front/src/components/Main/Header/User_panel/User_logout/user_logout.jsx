import { useEffect, useRef, useState } from 'react';
import Phone_number_input from './Phone_number_input/phone_number_input';
import './user_logout.scss';

function User_logout() {
    const [switchLogin, setswitchLogin] = useState(false);

    function handlerSwitchToLogin() {
        setswitchLogin(false);
    }

    function handlerSwitchToReg() {
        setswitchLogin(true);
    }



    return (
        <div className='for_user_auth'>
            <form className="for_user_login">
                <div className="login_control_buttons">
                    {switchLogin ? <p onClick={handlerSwitchToLogin}>Login</p> : 
                    <p onClick={handlerSwitchToReg}>Register?</p>}
                </div>
                <div className="login_area">
                    Login: <br />
                    <input type="text" required/>
                </div>
                <div className="pass_a">
                    Password: <br />
                    <input type="password" required/>
                </div>
                {switchLogin ? <div className="for_user_register">
                    <div className="repeat_pass_a">
                        Repeat password: <br />
                        <input type="password" required/>
                    </div>
                    <div className="email_area">
                        Email: <br />
                        <input type="email" required/>
                    </div>
                    <div className="phone_number_area">
                        Phone number: <br />
                        <Phone_number_input />
                    </div>
                </div> : ''}
            </form>
        </div>
    );
}

export default User_logout;