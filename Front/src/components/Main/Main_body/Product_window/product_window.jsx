import axios from 'axios';
import { useContext, useEffect, useRef, useState } from 'react';
import { ForInnerDataContext } from '../../../../contexts/forInnerDataContext';
import { ForModalContext } from '../../../../contexts/forModalContext';
import './product_window.scss';

function Product_window() {
    const { prodId } = useContext(ForInnerDataContext);
    const { catalog } = useContext(ForModalContext);
    const catalog_space = useRef(null);
    const [prodInfo, setprodInfo] = useState([]);

    function getProduct() {
        axios.post('http://127.0.0.1:8000/api/product', { id: prodId })
            .then((resp) => {
                setprodInfo(resp.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }


    useEffect(() => {
        if (prodInfo.length < 1) {
            getProduct();
        }
        if (catalog == true) {
            catalog_space.current.style.display = 'block';
        } else {
            catalog_space.current.style.display = 'none';
        }
    }, [prodInfo, catalog])


    return (
        <div className='wrapper'>
            <div className='header_space'></div>
            <div className="main_space">
                <div className='catalog_space' ref={catalog_space}></div>
                <div className='product_body'>
                    hello
                </div>
            </div>
        </div>
    );
}

export default Product_window;