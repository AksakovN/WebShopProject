import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useContext, useRef, useState } from 'react';
import { ForInnerDataContext } from '../../../../../contexts/forInnerDataContext';
import { ForModalContext } from '../../../../../contexts/forModalContext';
import Phone_number_input from './Phone_number_input/phone_number_input';
import './user_logout.scss';

function User_logout() {
    const { setuserPanel } = useContext(ForModalContext);
    const { setloginInfo } = useContext(ForInnerDataContext);
    const [switchLogin, setswitchLogin] = useState(false);
    const [vrongEmail, setvrongEmail] = useState(false);
    const [existedEmail, setexistedEmail] = useState(false);
    const [vrongPassword, setvrongPassword] = useState(false);
    const [vrongRepPassword, setvrongRepPassword] = useState(false);
    const [shortPassword, setshortPassword] = useState(false);
    const [wrondLogin, setwrondLogin] = useState(false);
    const [number_value, setnumber_value] = useState('');
    const textRef = useRef(null);
    const passwordRef = useRef(null);
    const rep_passwordRef = useRef(null);
    const emailRef = useRef(null);

    function handlerSwitchToLogin() {
        setswitchLogin(false);
    }

    function handlerSwitchToReg() {
        setswitchLogin(true);
    }

    const set_num_value = value => {
        setnumber_value(current => current = value);
    }

    function registerAccData(login, password, email, number) {
        axios.post('http://127.0.0.1:8000/api/register', { login: login, password: password, email: email, number: number })
            .then((resp) => {
                Cookies.set('token', resp.data.access_token, { expires: 1 }); 
                const forToken = `${resp.data.login}/${resp.data.id}`;
                Cookies.set('userInfo', forToken, { expires: 1 });  
                setloginInfo(true);
            })
            .catch(() => {
                setexistedEmail(true);
            })
    }

    function loginAcc(email, password) {
        axios.post('http://127.0.0.1:8000/api/login', { password: password, email: email })
            .then((resp) => {           
                if (resp.data.error) {
                    setvrongPassword(true);
                } else {
                    Cookies.set('token', resp.data.access_token, { expires: 1 });
                    Cookies.set('userInfo', [`${resp.data.login}/${resp.data.id}`], { expires: 1 });
                    setloginInfo(true);
                }
            })
    }
    function resetErrors() {
        setvrongEmail(false);
        setexistedEmail(false);
        setvrongPassword(false);
        setvrongRepPassword(false);
        setshortPassword(false);
        setwrondLogin(false);
    }

    function handlerForUserPanelClose() {
        setuserPanel(false);
    }

    function handlerForSendAccInfo(e) {
        e.preventDefault();
        resetErrors();
        const password = passwordRef.current.value;
        const email = emailRef.current.value;
        if (!(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/.test(email))) {
            setvrongEmail(true);
            return;
        }
        if (switchLogin) {
            const login = textRef.current.value;
            const rep_password = rep_passwordRef.current.value;
            const mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})");
            if (!mediumRegex.test(password)) {
                setshortPassword(true);
                return;
            } else if (password != rep_password) {
                setvrongRepPassword(true);
                return;
            } else if (login.trim() == '') {
                setwrondLogin(true);
                return;
            }
            setuserPanel(false);    
            registerAccData(textRef.current.value, password, email, number_value);       
        } else {
            loginAcc(email, password);          
        }
    }


    return (
        <div className='for_user_auth'>
            {switchLogin && <div className='background' onClick={handlerForUserPanelClose}></div>}
            <form className="for_user_login">
                <div className="login_control_buttons">
                    {switchLogin ? <p onClick={handlerSwitchToLogin}>Login</p> :
                        <p onClick={handlerSwitchToReg}>Register?</p>}
                </div>

                <div className="email_area">
                    Email: <br />
                    <input type="email" ref={emailRef} required />
                    {vrongEmail && <div className="input_error">Invalid email!</div>}
                    {existedEmail && <div className="input_error">This email already registered!</div>}
                </div>
                <div className="pass_a">
                    Password: <br />
                    <input type="password" ref={passwordRef} required />
                    {vrongPassword && <div className="input_error">Invalid login data!</div>}
                    {shortPassword && <div className="input_error">Password must contain at least one numeric, one capital letter and at least 8 symbols!</div>}
                </div>
                {switchLogin ? <div className="for_user_register">  
                    <div className="repeat_pass_a">
                        Repeat password: <br />
                        <input type="password" ref={rep_passwordRef} required />
                        {vrongRepPassword && <div className="input_error">Passwords doesn't match!</div>}
                    </div>
                    <div className="login_area">
                        Login: <br />
                        <input type="text" ref={textRef} required />
                        {wrondLogin && <div className="input_error">Login is too short!</div>}
                    </div>
                    <div className="phone_number_area">
                        Phone number: <br />
                        <Phone_number_input num_value={set_num_value} />
                    </div>
                </div> : ''}
                <button onClick={handlerForSendAccInfo}>{switchLogin ? 'Register' : 'Log In'}</button>
            </form>
        </div>
    );
}

export default User_logout;