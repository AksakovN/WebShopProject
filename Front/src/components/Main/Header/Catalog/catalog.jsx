import axios from 'axios';
import { useContext, useEffect, useRef } from 'react';
import { ForModalContext } from '../../../../contexts/forModalContext';
import { ForRequestsContext } from '../../../../contexts/forRequestsContext';
import './catalog.scss';
import Catalog_row from './Catalog_rows/catalog_row';

function Catalog() {
    const { catalog, setcatalog } = useContext(ForModalContext);
    const { getCatalog, setgetCatalog, getSubcategory, setgetSubcategory } = useContext(ForRequestsContext);

    function handlerBurgerHoverLeave() {
        setcatalog(false);
    }

    function getCatalogData() {
        axios.get('http://127.0.0.1:8000/api/categories')
            .then((resp) => {
                setgetCatalog(resp.data)
            })
            .catch((error) => {
                console.log(error);
            })

        axios.get('http://127.0.0.1:8000/api/subcategories')
            .then((resp) => {
                setgetSubcategory(resp.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        if (getCatalog.length < 1 || getSubcategory.length < 1) {
            getCatalogData();
        }
    }, [getCatalog])

    return (
        <div>
            <div className='background'></div>
            <div className='cat_area' onMouseLeave={handlerBurgerHoverLeave}>
                <div className='cat_main' onMouseLeave={handlerBurgerHoverLeave}>
                    <div className="catalog_upper"></div>
                    <div className="catalog_rows">
                        {!!getCatalog && getCatalog.map((e) => <Catalog_row key={e.id} marker={e} />)}
                    </div>
                    <footer>Footer</footer>
                </div>
            </div>
        </div>

    );
}

export default Catalog;