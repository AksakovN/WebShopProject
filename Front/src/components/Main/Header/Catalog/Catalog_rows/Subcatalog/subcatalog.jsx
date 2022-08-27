import axios from 'axios';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ForRequestsContext } from '../../../../../../contexts/forRequestsContext';
import './subcatalog.scss';

function Subcatalog({ marker }) {
    const navigate = useNavigate();
    const { setproducts } = useContext(ForRequestsContext);

    function handlerRedirectOnCat() {
        axios.post('http://127.0.0.1:8000/api/productsByCategory', {id:marker.id})
        .then((resp) => {
            setproducts(resp.data)
        })
        .catch((error) => {
            console.log(error);
        })
        navigate(`/${marker.name}`);
    }
    
    return (
        <div className='subcatalog'>
            <p onClick={handlerRedirectOnCat}>{marker.name}</p>
        </div>
    );
}

export default Subcatalog;