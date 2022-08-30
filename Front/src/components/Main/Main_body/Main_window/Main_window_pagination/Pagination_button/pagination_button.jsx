import axios from 'axios';
import { useContext, useEffect, useRef, useState } from 'react';
import { ForRequestsContext } from '../../../../../../contexts/forRequestsContext';
import './pagination_button.scss';

function Pagination_button({ e, page_info, pages }) {
    const { setproducts, setproductsPage } = useContext(ForRequestsContext);
    const [checker, setchecker] = useState(0);
    const button = useRef(null);

    function handlerForNewPage(e) {
        const target = e.target.innerText;
        let url = '';
        if (target == page_info.current_page) {
            return;
        } else if (target == '<') {
            url = 'http://127.0.0.1:8000/api/products?limit=12';
        } else if (target == '>') {
            url = `${page_info.last_page_url}&limit=12`;
        } else {
            url = `${pages[target].url}&limit=12`;
        }
        restoreColor();
        button.current.style.filter = 'contrast(50%)';
        setchecker(checker + 1);
        getProductsPagination(url);
    }

    function getProductsPagination(url) {
        axios.get(url)
            .then((resp) => {
                setproducts(resp.data.data);
                setproductsPage(resp.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    function restoreColor() {
        const buttons = document.querySelectorAll('.pagination_item');
        buttons.forEach(button => {
            button.style.filter = 'unset';
        });
    }


    function convert_to_html(str) {
        let newstr = '';
        const oldstr = str.indexOf('&');
        if (oldstr != -1) {
            if (oldstr == 0) {
                newstr = '<';
            } else {
                newstr = '>';
            }
        } else {
            newstr = str;
        }
        return newstr;
    }
    useEffect(() => {
        if (page_info.current_page == e.label) {
            button.current.style.filter = 'contrast(50%)';
        } 
    }, [checker])


    return (
        <div className='pagination_item' ref={button} onClick={handlerForNewPage}>
            {convert_to_html(e.label)}
        </div>
    );
}

export default Pagination_button;