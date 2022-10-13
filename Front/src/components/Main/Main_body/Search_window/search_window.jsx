import { useContext, useEffect, useRef } from 'react';
import { ForModalContext } from '../../../../contexts/forModalContext';
import { ForRequestsContext } from '../../../../contexts/forRequestsContext';
import Pagination_element from '../../../Utils/Pagination/pagination';
import Product_card from '../Product_card/product_card';
import './search_window.scss';

function Search_window() {
    const catalog_space = useRef(null);
    const { catalog } = useContext(ForModalContext);
    const { products, setproducts, productsPage, setproductsPage } = useContext(ForRequestsContext);

    useEffect(() => {
        if (localStorage.getItem('searchResult') !== null && products.length == 0) {
            setproducts(JSON.parse(localStorage.getItem('searchProducts')));
            setproductsPage(JSON.parse(localStorage.getItem('searchResult')));
        }
        if (catalog == true) {
            catalog_space.current.style.display = 'block';
        } else {
            catalog_space.current.style.display = 'none';
        }
    }, [catalog, products])


    return (
        <div className="main_space">
            <div className='catalog_space' ref={catalog_space}></div>
            <div className='main_body'>
                {products.length < 1 && <p>No results</p>}
                {!!products && products.map((e) => <Product_card key={e.id} marker={e} />)}
                {productsPage.length < 1 ? '' : <Pagination_element page_info={productsPage} marker={'main'}/>}
            </div>
        </div>
    );
}

export default Search_window;