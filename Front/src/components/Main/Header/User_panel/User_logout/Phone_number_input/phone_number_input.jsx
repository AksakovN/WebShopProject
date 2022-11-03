import { useContext, useEffect, useRef } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './phone_number_input.scss';
import { ForInnerDataContext } from '../../../../../../contexts/forInnerDataContext';

function Phone_number_input({ num_value, marker }) {
    const input = useRef(null);
    const { loginInfo } = useContext(ForInnerDataContext);
    const isNumericInput = (e) => {
        const key = e.keyCode;
        return ((key >= 48 && key <= 57) ||
            (key >= 96 && key <= 105)
        );
    };

    const isModifierKey = (e) => {
        const key = e.keyCode;
        return (e.shiftKey === true || key === 35 || key === 36) ||
            (key === 8 || key === 9 || key === 13 || key === 46) ||
            (key > 36 && key < 41) ||
            (

                (e.ctrlKey === true || e.metaKey === true) &&
                (key === 65 || key === 67 || key === 86 || key === 88 || key === 90)
            )
    };

    const enforceFormat = (e) => {
        if (!isNumericInput(e) && !isModifierKey(e)) {
            e.preventDefault();
        }
    };

    const formatToPhone = (e) => {
        if (isModifierKey(e)) { return; }

        const input = e.target.value.replace(/\D/g, '').substring(0, 10);
        const areaCode = input.substring(0, 3);
        const middle = input.substring(3, 6);
        const last = input.substring(6, 10);

        if (input.length > 6) { e.target.value = `(${areaCode}) ${middle} - ${last}`; }
        else if (input.length > 3) { e.target.value = `(${areaCode}) ${middle}`; }
        else if (input.length > 0) { e.target.value = `(${areaCode}`; }
        if (marker = 'login') {
            num_value(e.target.value);
        }
    };

    function checkPhoneNumber() {
        const token = Cookies.get('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        axios.post('http://127.0.0.1:8000/api/getNumber', '', config)
            .then((resp) => {
                input.current.value = resp.data;
            })
    }

    useEffect(() => {
      if (marker == 'order') {
        if (Cookies.get('token') !== undefined) {
            checkPhoneNumber();
        } else {
            input.current.value = '';
        }
      }
    }, [loginInfo])
    
    return (
        <input ref={input} id="phoneNumber" onKeyDown={enforceFormat} onKeyUp={formatToPhone} maxLength="16" required />
    );
}

export default Phone_number_input;