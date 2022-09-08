import axios from 'axios';
import { useContext, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ForModalContext } from '../../../../contexts/forModalContext';
import { ForRequestsContext } from '../../../../contexts/forRequestsContext';
import Product_card from '../Product_card/product_card';
import './main_window.scss';
import Main_window_carousel from './Main_window_carousel/main_window_carousel';
import Main_window_pagination from './Main_window_pagination/main_window_pagination';

function Main_window() {
    const catalog_space = useRef(null);
    const { catalog } = useContext(ForModalContext);
    const [isOnCat, setisOnCat] = useState(false);
    const location = useLocation();
    const { products, setproducts, productsPage, setproductsPage } = useContext(ForRequestsContext);

    function prodRequest() {
        axios.get('http://127.0.0.1:8000/api/products?limit=12')
            .then((resp) => {
                setproducts(resp.data.data);
                setproductsPage(resp.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        localStorage.removeItem('productInfo');
        if (products.length < 1) {
            prodRequest();
        }
        if (catalog === true) {
            catalog_space.current.style.display = 'block';
        } else {
            catalog_space.current.style.display = 'none';
        }
        if (location.pathname === '/') {
            setisOnCat(true);
        } else {
            setisOnCat(false);
        }
    }, [catalog, products, productsPage])

    return (
        <div className="main_space">
            <div className='catalog_space' ref={catalog_space}></div>
            <div className='main_body'>
                {!!isOnCat ? <div className="carousel">
                    <Main_window_carousel />
                </div> : ''}
                {!!isOnCat ? <p> For Sale!</p> : ''}
                {!!products && products.map((e) => <Product_card key={e.id} marker={e} />)}
                {productsPage.length < 1 ? '' : <Main_window_pagination page_info={productsPage} />}
            </div>
        </div>
    );
}

export default Main_window;