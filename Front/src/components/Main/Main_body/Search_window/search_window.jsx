import { useContext, useEffect, useRef } from 'react';
import { ForModalContext } from '../../../../contexts/forModalContext';
import { ForRequestsContext } from '../../../../contexts/forRequestsContext';
import Main_window_pagination from '../Main_window/Main_window_pagination/main_window_pagination';
import Product_card from '../Product_card/product_card';
import './search_window.scss';

function Search_window() {
    const catalog_space = useRef(null);
    const { catalog } = useContext(ForModalContext);
    const { products, setproducts, productsPage, setproductsPage } = useContext(ForRequestsContext);

    useEffect(() => {
        if (catalog == true) {
            catalog_space.current.style.display = 'block';
        } else {
            catalog_space.current.style.display = 'none';
        }
    }, [catalog])

    return (
        <div className="wrapper">
            <div className='header_space'></div>
            <div className="main_space">
                <div className='catalog_space' ref={catalog_space}></div>
                <div className='main_body'>
                    {!!products && products.map((e) => <Product_card key={e.id} marker={e} />)}
                    {productsPage.length < 1 ? '' : <Main_window_pagination page_info={productsPage} />}
                </div>
            </div>
        </div>
    );
}

export default Search_window;