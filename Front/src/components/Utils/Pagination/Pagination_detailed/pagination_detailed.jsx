import { useContext, useEffect, useState } from 'react';
import { ForRequestsContext } from '../../../../contexts/forRequestsContext';
import Pagination_button from './Pagination_button/pagination_button';
import './pagination_detailed.scss';


function Pagination_detailed({ page_info, pag_page }) {
    const { productsPage } = useContext(ForRequestsContext);
    const [pag_array, setpag_array] = useState(pag_page);

    for (let i = 0; i < pag_array.length; i++) {
        Object.defineProperty(pag_array[i], 'key', {value: i});   
    }

    useEffect(() => {
        setpag_array(pag_page);
    }, [productsPage])
    

    return (
        <div className="pagination_detail">
            {!!pag_array && pag_array.map((e) => <Pagination_button key={e.key} e={e} page_info={page_info} pages={pag_array} />)}
        </div>
    );
}

export default Pagination_detailed;