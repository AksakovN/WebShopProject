import axios from 'axios';
import { useContext, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ForModalContext } from '../../../../contexts/forModalContext';
import { ForRequestsContext } from '../../../../contexts/forRequestsContext';
import Pagination_element from '../../../Utils/Pagination/pagination';
import Product_card from '../Product_card/product_card';
import './main_window.scss';
import Main_window_carousel from './Main_window_carousel/main_window_carousel';
import { Helmet } from 'react-helmet-async';

function Main_window() {
    const catalog_space = useRef(null);
    const { catalog } = useContext(ForModalContext);
    const [isOnCat, setisOnCat] = useState(false);
    const location = useLocation();
    const { products, productsPage } = useContext(ForRequestsContext);

    useEffect(() => {
        localStorage.removeItem('productInfo');
        localStorage.removeItem('searchResult');
        localStorage.removeItem('searchProducts');
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
            <Helmet>
                <title>Online Shop</title>
            </Helmet>
            <div className='catalog_space' ref={catalog_space}></div>
            <div className='main_body'>
                {!!isOnCat ? <div className="carousel">
                    <Main_window_carousel />
                </div> : ''}
                {!!isOnCat ? <p> For Sale!</p> : ''}
                {!!products && products.map((e) => <Product_card key={e.id} marker={e} />)}
                {productsPage.length < 1 ? '' : <Pagination_element page_info={productsPage} marker={'main'} />}
            </div>
        </div>
    );
}

export default Main_window;