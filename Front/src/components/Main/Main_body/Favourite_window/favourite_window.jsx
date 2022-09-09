import axios from 'axios';
import Cookies from 'js-cookie';
import { useContext, useEffect, useState } from 'react';
import { ForInnerDataContext } from '../../../../contexts/forInnerDataContext';
import Product_card from '../Product_card/product_card';
import './favourite_window.scss';


function Favourite_window() {
    const { favInfo, setfavInfo } = useContext(ForInnerDataContext);
    const [products, setproducts] = useState([]);

    function getProduct() {
        const LocalArray = JSON.parse(localStorage.getItem('favProducts'));
        axios.post('http://127.0.0.1:8000/api/favourite', { array: LocalArray, limit: 12 })
            .then((resp) => {
                const newArray = [];
                let newValue = '';
                resp.data.forEach(e => {
                    newValue = e.pop();
                    newArray.push(newValue);
                });
                setproducts(newArray);
            })
            .catch((error) => {
                console.log(error);
            })
    }

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
        if (localStorage.getItem('favProducts') == null) {
            getFavProducts();
            setfavInfo(favInfo + 1);
        } else {
            getProduct();
        }
        console.log(products);
    }, [favInfo])

    return (
        <div className="main_space">
            <div className='catalog_space'></div>
            <div className='main_body'>
                {!!products && products.map((e) => <Product_card key={e.id} marker={e} />)}
            </div>
        </div>
    );
}

export default Favourite_window;