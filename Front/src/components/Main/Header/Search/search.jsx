import axios from 'axios';
import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ForRequestsContext } from '../../../../contexts/forRequestsContext';
import './search.scss';

function Search() {
    const search_space = useRef(null);
    const search_button = useRef(null);
    const search_response = useRef(null);
    const [searchResult, setsearchResult] = useState(0);
    const navigate = useNavigate();
    const { setproducts, setproductsPage } = useContext(ForRequestsContext);

    function getSearchResult() {
        const search_text = search_space.current.value;
        if (search_text.trim() != '' && search_text.trim().length >= 3) {
            search_space.current.value = '';
            axios.post('http://127.0.0.1:8000/api/search', { text: search_text, limit: 12 })
                .then((resp) => {                 
                        setproducts(resp.data.data);
                        setproductsPage(resp.data);    
                        navigate('/search');              
                })
                .catch(() => {
                    setsearchResult(2);
                    search_response.current.style.display = 'block';
                    return;
                })         
        } else {
            setsearchResult(1);
            search_response.current.style.display = 'block';
        }
    }
    function handlerRemoveResponse() {
        setsearchResult(0);
        search_response.current.style.diplay = 'none';
    }
    function handlerKeyUp(e) {
        if (e.key == 'Enter') {
            getSearchResult();
        }
    }
    function handlerButtonPress() {
        getSearchResult();
    }

    useEffect(() => {

    }, [searchResult])



    return (
        <div className='s_space'>
            <input type={"text"} ref={search_space} onKeyUp={handlerKeyUp} onClick={handlerRemoveResponse} className='s_area'></input>
            <div className='s_button' ref={search_button} onClick={handlerButtonPress}>
                <div className="search_response" ref={search_response}>
                    {searchResult == 1 ? 'Request is incorrect. You need at least 3 letters.' : ''}
                    {searchResult == 2 ? 'Request is not found.' : ''}
                </div>
                <img src={require('../../../Images/search.png')} alt="searchButton" />
            </div>
        </div>

    );
}

export default Search;