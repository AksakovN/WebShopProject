import { useContext, useEffect, useRef, useState } from 'react';
import { ForRequestsContext } from '../../../../../contexts/forRequestsContext';
import './catalog_row.scss';
import Subcatalog from './Subcatalog/subcatalog';

function Catalog_row({ marker }) {
    const row = useRef(null);
    const subcatalog = useRef(null);
    const { getSubcategory } = useContext(ForRequestsContext);
    const [subCat, setsubCat] = useState([]);

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
        <div className='catalog_row' ref={row}
            onMouseEnter={handlerForSubcatalog}
            onMouseLeave={handlerForCloseSubcatalog}>
            {marker.name}
            <div className="subcatalog_space" ref={subcatalog}>
                <div className="subcatalog_space_main">
                    <div className="subcatalog_space_box"></div>
                    {!!subCat && subCat.map((e) => <Subcatalog key={e.id} marker={e} />)}
                </div>
            </div>
        </div>
    );
}

export default Catalog_row;