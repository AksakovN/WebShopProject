import axios from 'axios';
import { useContext, useEffect, useRef, useState } from 'react';
import { ForModalContext } from '../../../../contexts/forModalContext';
import { ForRequestsContext } from '../../../../contexts/forRequestsContext';
import Product_card from '../Product_card/product_card';
import './main_window.scss';

function Main_window() {
    const catalog_space = useRef(null);
    const { catalog } = useContext(ForModalContext);
    const { products, setproducts } = useContext(ForRequestsContext);

    function prodRequest() {
        axios.get('http://127.0.0.1:8000/api/products')
        .then((resp) =>{ setproducts(resp.data)
        })
        .catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        if (products.length < 1) {
            prodRequest();
        } 
        if (catalog == true) {
            catalog_space.current.style.display = 'block';
        } else {
            catalog_space.current.style.display = 'none';
        }
        console.log(products);
    }, [catalog, products])

    return (
        <div className="wrapper">
            <div className='header_space'></div>
            <div className="main_space">
                <div className='catalog_space' ref={catalog_space}></div>
                <div className='main_body'>
                    {!!products && products.map((e) => <Product_card key={e.id} marker={e}/>)}
                </div>
            </div>

        </div>
    );
}

export default Main_window;