import axios from 'axios';
import Cookies from 'js-cookie';
import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ForRequestsContext } from '../../../../../contexts/forRequestsContext';
import './catalog_row.scss';
import Subcatalog from './Subcatalog/subcatalog';

function Catalog_row({ marker }) {
    const row = useRef(null);
    const subcatalog = useRef(null);
    const { getSubcategory, setproducts, setproductsPage } = useContext(ForRequestsContext);
    const [subCat, setsubCat] = useState([]);
    const navigate = useNavigate();

    function handlerRedirectOnCat(e) {
        e.preventDefault();
        e.stopPropagation();
        axios.post('http://127.0.0.1:8000/api/productsByCategory', { id: marker.id, idSub: null, limit: 12 })
            .then((resp) => {
                setproducts(resp.data.prod.data);
                setproductsPage(resp.data.prod);
                Cookies.set('category', resp.data.cat, { expires: (1 / 24) });
            })
            .catch((error) => {
                console.log(error);
            })
        navigate(`/${marker.name.replaceAll(' ', '_')}`);
    }

    function handlerForSubcatalog() {
        row.current.classList.add('catalog_row_hover');
        subcatalog.current.style.display = "block";
        setSubcategory();
    }
    function handlerForCloseSubcatalog() {
        row.current.classList.remove('catalog_row_hover');
        subcatalog.current.style.display = "none";
    }
    function setSubcategory() {
        setsubCat([]);
        getSubcategory.forEach(e => {
            if (e.category_id == marker.id) {
                setsubCat(subCat => [...subCat, e]);
            }
        });
    }
    useEffect(() => {

    }, [getSubcategory])


    return (
        <div className='catalog_row_wrapper'>
            <a href={`/${marker.name.replaceAll(' ', '_')}`} className='catalog_row' ref={row}
                onClick={handlerRedirectOnCat}
                onMouseEnter={handlerForSubcatalog}
                onMouseLeave={handlerForCloseSubcatalog}>
                {marker.name}
            </a>
            <div className="subcatalog_space" ref={subcatalog}>
                <div className="subcatalog_space_main">
                    <div className="subcatalog_space_box"></div>
                    {!!subCat && subCat.map((e) => <Subcatalog key={e.id} marker={e} catInfo={marker} />)}
                </div>
            </div>
        </div>

    );
}

export default Catalog_row;