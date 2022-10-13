import axios from 'axios';
import Cookies from 'js-cookie';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ForRequestsContext } from '../../../../../../contexts/forRequestsContext';
import './subcatalog.scss';

function Subcatalog({ marker, catInfo }) {
    const navigate = useNavigate();
    const { setproducts, setproductsPage } = useContext(ForRequestsContext);

    function handlerRedirectOnCat(e) {
        e.preventDefault();
        e.stopPropagation();
        axios.post('http://127.0.0.1:8000/api/productsByCategory', {id: catInfo.id, idSub: marker.id, limit:12})
        .then((resp) => {
            setproducts(resp.data.prod.data);
            setproductsPage(resp.data.prod);
            Cookies.set('category', resp.data.cat, { expires: (1 / 24) });
            Cookies.set('subcategory', resp.data.subCat, { expires: (1 / 24) });
        })
        .catch((error) => {
            console.log(error);
        })
        navigate(`/Category/${catInfo.name.replaceAll(' ', '_')}/Subcategory/${marker.name.replaceAll(' ', '_')}`);
    }
    
    return (
        <div className='subcatalog'>
            <a href={`/Category/${catInfo.name.replaceAll(' ', '_')}/Subcategory/${marker.name.replaceAll(' ', '_')}`} onClick={handlerRedirectOnCat}>{marker.name}</a>
        </div>
    );
}

export default Subcatalog;