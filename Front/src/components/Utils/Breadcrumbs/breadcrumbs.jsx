import axios from 'axios';
import Cookies from 'js-cookie';
import { returnCategory } from './bcfunctions';
import { getCategory } from './bcfunctions';
import { returnSubcategory } from './bcfunctions';
import { getSubcategory } from './bcfunctions';
import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { ForRequestsContext } from '../../../contexts/forRequestsContext';
import './breadcrumbs.scss';

function Breadcrumbs() {
    const navigate = useNavigate();
    const location = useLocation();
    const [crumbArray, setcrumbArray] = useState(['Main']);
    const anim = useRef(null);
    const { setproducts, setproductsPage, prodInfo } = useContext(ForRequestsContext);


    function handlerForCrumbRedirect(e) {
        e.stopPropagation();
        e.preventDefault();
        const text = e.target.innerText;
        let idSub = '';
        let id = '';
        let navPath = '';
        if (text.substring(2) == crumbArray[crumbArray.length - 1]) {
            return;
        } else if (text.substring(2) == crumbArray[0]) {
            navPath = '/';
        } else if (text.substring(2) == crumbArray[1]) {
            navPath = `/${crumbArray[1].replaceAll(' ', '_')}`;
            idSub = null;
            if (crumbArray.length == 4) {
                id = JSON.parse(localStorage.getItem('productInfo')).reserved;
            } else if (crumbArray.length == 3) {
                id = Cookies.get('category');
            } else {
                id = Cookies.get('category');
            }

        } else if (text.substring(2) == crumbArray[2]) {
            navPath = `/${crumbArray[1].replaceAll(' ', '_')}/${crumbArray[2].replaceAll(' ', '_')}`;
            if (crumbArray.length == 4) {
                id = JSON.parse(localStorage.getItem('productInfo')).reserved;
                idSub = JSON.parse(localStorage.getItem('productInfo')).subcategory_id;
            } else {
                id = Cookies.get('category');
                idSub = Cookies.get('subcategory');
            }
        }
        handlerRedirectOnCat(id, idSub);
        navigate(navPath);
    }

    function handlerRedirectOnCat(id, idSub) {
        axios.post('http://127.0.0.1:8000/api/productsByCategory', { id: id, idSub: idSub, limit: 12 })
            .then((resp) => {
                setproducts(resp.data.prod.data);
                setproductsPage(resp.data.prod);
                Cookies.set('category', resp.data.cat, { expires: (1 / 24) });
                Cookies.set('subcategory', resp.data.subCat, { expires: (1 / 24) });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    function getProduct() {
        const item_id = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);
        axios.post('http://127.0.0.1:8000/api/product', { id: item_id })
            .then((resp) => {
                localStorage.setItem('productInfo', JSON.stringify(resp.data));
                const setStart = ['Main'];
                setStart.push(returnCategory(resp.data.reserved));
                setStart.puch(returnSubcategory(resp.data.subcategory_id));
                setStart.push('Current product');
                setcrumbArray(setStart);
            })
    }



    function findPath() {
        const href = window.location.href;
        return href.substring(22);
    }

    useEffect(() => {
        anim.current.style.display = 'flex';
        setTimeout(() => {
            anim.current.style.display = 'none';
        }, 1000);
        setTimeout(() => {
            setcrumbArray(['Main']);
            const setStart = ['Main'];
            if (findPath().indexOf('/') == -1) {
                if (findPath() == '') {
                    return;
                } else if (findPath().includes('search')) {
                    setStart.push('Search result')
                    setcrumbArray(setStart);
                } else if (findPath().includes('favourite')) {
                    setStart.push('Favourite products page')
                    setcrumbArray(setStart);
                } else {
                    if (Cookies.get('category') !== undefined) {
                        Cookies.set('category', returnCategory(findPath()), { expires: (1 / 24) });
                        setStart.push(findPath().replaceAll('_', ' '));
                        handlerRedirectOnCat(getCategory(findPath()), null);
                        setcrumbArray(setStart);
                    } else {
                        setStart.push(findPath().replaceAll('_', ' '));
                        handlerRedirectOnCat(getCategory(findPath()), null);
                        console.log(findPath());
                        setcrumbArray(setStart);
                    }
                }
            } else if (findPath().includes('product')) {
                if (localStorage.getItem('productInfo') !== null) {
                    setStart.push(returnCategory(JSON.parse(localStorage.getItem('productInfo')).reserved));
                    setStart.push(returnSubcategory(JSON.parse(localStorage.getItem('productInfo')).subcategory_id));
                    setStart.push('Current product');
                    setcrumbArray(setStart);
                } else {
                    getProduct();
                }
            } else if (findPath().includes('page')) {
                const currPage = findPath().substring(5);
                if (currPage == 1) {
                    navigate('/');
                }
                axios.get(`http://127.0.0.1:8000/api/products?page=${currPage}&limit=12`)
                    .then((resp) => {
                        setproducts(resp.data.data);
                        setproductsPage(resp.data);
                    })
            } else {
                const urlPath = findPath();
                const iUrlPath = urlPath.indexOf('/');
                const catPath = urlPath.substring(0, iUrlPath - 1);
                const subcatPath = urlPath.substring(iUrlPath + 1);
                if (Cookies.get('category') !== undefined && Cookies.get('subcategory') !== undefined) {
                    Cookies.set('category', returnCategory(catPath), { expires: (1 / 24) });
                    Cookies.set('subcategory', returnSubcategory(subcatPath), { expires: (1 / 24) });
                    setStart.push(catPath.replaceAll('_', ' '));
                    setStart.push(subcatPath.replaceAll('_', ' '));
                    console.log(setStart);
                    handlerRedirectOnCat(getCategory(catPath), getSubcategory(subcatPath));
                    setcrumbArray(setStart);
                } else {
                    setStart.push(catPath.replaceAll('_', ' '));
                    setStart.push(subcatPath.replaceAll('_', ' '));
                    handlerRedirectOnCat(getCategory(catPath), getSubcategory(subcatPath));
                    setcrumbArray(setStart);
                }
            }
        }, 500);
    }, [location, prodInfo])



    return (
        <div className="breadcrumbs">
            {crumbArray.map((e) => <a className='crumb' onClick={handlerForCrumbRedirect} key={e}>{' > '}{e}</a>)}
            <div className="page_load" ref={anim}>
                <div className="page_load_anim">
                    <hr /><hr /><hr /><hr />
                </div>
            </div>
        </div>
    );
}

export default Breadcrumbs;