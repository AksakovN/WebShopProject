import axios from 'axios';
import Cookies from 'js-cookie';
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

    function returnCategory(key) {
        switch (key) {
            case '1':
                return 'Smartphones and Telephones';
            case '2':
                return 'For Personal Computers';
            case '3':
                return 'Kitchen appliances';
            case '4':
                return 'Home appliances';
            case '5':
                return 'TV Video';
            case '6':
                return 'Audio';
            case '7':
                return 'Cams and Camcorders';
        }
    }

    function returnSubcategory(key) {
        switch (key) {
            case 1:
                return 'Smartphones';
            case 2:
                return 'Accesories for phones';
            case 3:
                return 'Graphic cards';
            case 4:
                return 'Processors';
            case 5:
                return 'Motherboards';
            case 6:
                return 'Fridges';
            case 7:
                return 'Blenders';
            case 8:
                return 'Dishwashers';
            case 9:
                return 'Wash machines';
            case 10:
                return 'Vacuum cleaners';
            case 11:
                return 'Irons';
            case 12:
                return 'Flat TVs';
            case 13:
                return 'TVs accesories';
            case 14:
                return 'Headphones';
            case 15:
                return 'Headsets';
            case 16:
                return 'Cameras';
            case 17:
                return 'Camcorders';
            case 18:
                return 'Quadcopters';
        }
    }

    function findPath() {
        const href = window.location.href;
        return href.substring(22);
    }

    useEffect(() => {
        anim.current.style.display= 'flex';
        setTimeout(() => {
            anim.current.style.display= 'none';
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
                        setStart.push(returnCategory(Cookies.get('category')));
                        setcrumbArray(setStart);
                    }
                }
            } else if (findPath().includes('product')) {
                if (localStorage.getItem('productInfo') !== null) {
                    setStart.push(returnCategory(JSON.parse(localStorage.getItem('productInfo')).reserved));
                    setStart.push(returnSubcategory(JSON.parse(localStorage.getItem('productInfo')).subcategory_id));
                    setStart.push('Current product')
                    setcrumbArray(setStart);
                }
            } else {
                if (Cookies.get('category') !== undefined && Cookies.get('subcategory') !== undefined) {
                    setStart.push(returnCategory(Cookies.get('category')));
                    const getsubCat = Cookies.get('subcategory');
                    setStart.push(returnSubcategory(parseInt(getsubCat)));
                    console.log(setStart);
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