import { useContext, useEffect, useState } from 'react';
import { ForRequestsContext } from '../../../../../contexts/forRequestsContext';
import './main_window_pagination.scss';
import Pagination_button from './Pagination_button/pagination_button';

function Main_window_pagination({ page_info }) {
    const [pages, setpages] = useState(page_info.links);
    const { productsPage } = useContext(ForRequestsContext);

    useEffect(() => {
        setpages(page_info.links);
    }, [productsPage])

    return (
        <div>
            <div className="pagination_space">
                {!!pages && pages.map((e) => <Pagination_button key={e.label} e={e} page_info={page_info} pages={pages}/>)}
            </div>
        </div>
    );
}

export default Main_window_pagination;