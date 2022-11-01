import './order_window.scss';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useRef, useState } from 'react';
import { ForModalContext } from '../../../../contexts/forModalContext';
import Order_item from './Order_item/order_item';

function Order_window() {
    const catalog_space = useRef(null);
    const { catalog } = useContext(ForModalContext);
    const [catalogItems, setcatalogItems] = useState([]);
    const navigate = useNavigate();
    

    useEffect(() => {
        if (localStorage.getItem('cartInfo') == null) {
            navigate('/');
        } else {
            if (catalogItems.length < 1) {
                setcatalogItems(JSON.parse(localStorage.getItem('cartInfo')));
            }
            if (catalog === true) {
                catalog_space.current.style.display = 'block';
            } else {
                catalog_space.current.style.display = 'none';
            }
        } 
    }, [catalog, catalogItems])
    
    return (
        <div className="main_space">
            <Helmet>
                <title>New order</title>
            </Helmet>
            <div className='catalog_space' ref={catalog_space}></div>
            <div className='main_body'>
                {catalogItems.map((e) => <Order_item key={e.id} mark={e} index={catalogItems.indexOf(e)}/>)}
            </div>
        </div>
    );
}

export default Order_window;