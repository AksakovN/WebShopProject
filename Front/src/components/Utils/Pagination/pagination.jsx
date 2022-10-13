import axios from 'axios';
import Cookies from 'js-cookie';
import { useContext, useEffect, useRef, useState } from 'react';
import { ForInnerDataContext } from '../../../contexts/forInnerDataContext';
import { ForModalContext } from '../../../contexts/forModalContext';
import { useNavigate } from 'react-router-dom';
import { ForRequestsContext } from '../../../contexts/forRequestsContext';
import './pagination.scss';
import Pagination_detailed from './Pagination_detailed/pagination_detailed';

function Pagination_element({ page_info, marker }) {
    const [pages, setpages] = useState(page_info.links);
    const [pag_page, setpag_page] = useState(pages.slice(1, (pages.length - 1)));
    const { productsPage, setproductsPage, setproducts } = useContext(ForRequestsContext);
    const { loginInfo, commentData, setcommentData, setcommentPagination } = useContext(ForInnerDataContext);
    const { pagination_detail, setpagination_detail } = useContext(ForModalContext);
    const [prodInfo, setprodInfo] = useState([]);
    const navigate = useNavigate();
    const prev = useRef(null);
    const next = useRef(null);
    let path = true;
    if (marker == 'comment') {
        path = false;
    }

    function getProductsPagination(url) {
        setpagination_detail(false);
        if (marker == 'main') {
            axios.get(url)
                .then((resp) => {
                    setproducts(resp.data.data);
                    setproductsPage(resp.data);
                })
                .catch((error) => {
                    console.log(error);
                })
        } else {
            let Uid = '';
            if (loginInfo) {
                const userInfo = Cookies.get('userInfo');
                Uid = userInfo.substring((userInfo.indexOf('/') + 1));
            }
            axios.post(url, { id: prodInfo.id, Uid: Uid })
                .then((resp) => {
                    setcommentData(resp.data.comment.data);
                    setcommentPagination(resp.data.comment);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    function handlerForPagesChange(e) {
        e.preventDefault();
        if (e.target.outerText == 'Previous') {
            let url = '';
            if (marker == 'main') {
                navigate(`/Page/${page_info.current_page - 1}`);
                setpagination_detail(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
                return;
            } else {
                url = `http://127.0.0.1:8000/api/getCommentaries?page=${page_info.current_page - 1}&limit=5`
            }
            getProductsPagination(url);  
            
        } else if (e.target.outerText == 'Next') {
            let url = '';
            if (marker == 'main') {
                navigate(`/Page/${page_info.current_page + 1}`);
                setpagination_detail(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
                return;
            } else {
                url = `http://127.0.0.1:8000/api/getCommentaries?page=${page_info.current_page + 1}&limit=5`
            }
            getProductsPagination(url);  
        } else {
            if (pagination_detail == true) {
                setpagination_detail(false);
                return;
            }
            setpag_page(pages.slice(1, (pages.length - 1)));
            setpagination_detail(true);
        }
    }

    useEffect(() => {
        if (page_info.last_page == 1) {
            prev.current.classList.add("button_disabled");
            next.current.classList.add("button_disabled");
        } else if (page_info.current_page == 1) {
            prev.current.classList.add("button_disabled");
            next.current.classList.remove("button_disabled");
        } else if (page_info.current_page == page_info.last_page) {
            next.current.classList.add("button_disabled");
            prev.current.classList.remove("button_disabled");
        } else {
            prev.current.classList.remove("button_disabled");
            next.current.classList.remove("button_disabled");
        }
        if (marker == 'comment') {
            setprodInfo(JSON.parse(localStorage.getItem('productInfo')));
        }

        setpag_page(pages.slice(1, (pages.length - 1)));
        setpages(page_info.links);
    }, [productsPage, commentData])

    return (
        <div className="pagination_area">
            <div className="pagination_space">
                {pagination_detail && <Pagination_detailed page_info={page_info} pag_page={pag_page} />}
                <div className="pagination_control">
                    <a href={`/Page/${page_info.current_page - 1}`} onClick={handlerForPagesChange}><div className="pag_button" ref={prev}>Previous</div></a>
                    {path && <div className="pag_button_detail" onClick={handlerForPagesChange}>...</div>}
                    <a href={`/Page/${page_info.current_page + 1}`} onClick={handlerForPagesChange}><div className="pag_button" ref={next}>Next</div></a>
                </div>
            </div>
        </div>
    );
}

export default Pagination_element;