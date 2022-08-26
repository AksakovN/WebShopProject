import './search.scss';

function Search() {


    return (
        <div className='s_space'>
            <input type={"text"} className='s_area'></input>
            <div className='s_button'>
                <img src={require('../../../Images/search.png')} alt="searchButton" />
            </div>
        </div>
        
    );
}

export default Search;