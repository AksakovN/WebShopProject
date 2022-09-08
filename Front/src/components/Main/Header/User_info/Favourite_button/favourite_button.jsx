import { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { ForInnerDataContext } from '../../../../../contexts/forInnerDataContext';
import Cookies from 'js-cookie';
import './favourite_button.scss';

function Favourite_button() {
    const { loginInfo, favInfo, setfavInfo } = useContext(ForInnerDataContext);
    const fav_size = useRef(null);
    const [fav_number, setfav_number] = useState(0);

    function getFavProducts() {
        const token = Cookies.get('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        axios.post('http://127.0.0.1:8000/api/me', '', config)
            .then((resp) => {
                let response = [];
                if (resp.data !== 0) {
                    response = resp.data;
                }    
                localStorage.setItem('favProducts', JSON.stringify(response));        
            })
    }

    useEffect(() => {
      if (loginInfo) {
        if (localStorage.getItem('favProducts') == null) {
            getFavProducts();
            setTimeout(() => {
                setfavInfo(favInfo + 1);
            }, 1000);    
        } else {
            fav_size.current.style.display = "block";
            const localProduct = JSON.parse(localStorage.getItem('favProducts'));
            setfav_number(localProduct.length);
        }        
      } else {
        fav_size.current.style.display = "none";
        localStorage.removeItem('favProducts');
        setfav_number(0);       
      }
    }, [loginInfo, favInfo])
    

    return (
        <div className='favourite_button'>
            <img src={require("../../../../Images/favourite.png")} alt="favouriteButton" />
            <div className="fav_size" ref={fav_size}>{fav_number}</div>
        </div>
    );
}

export default Favourite_button;