import { useContext } from 'react';
import { ForInnerDataContext } from '../../../../contexts/forInnerDataContext';
import './page_not_found.scss';

function Page_not_found() {
    const { forPNF } = useContext(ForInnerDataContext);
    
    return (
        <div className='main_space page_not_found'>
            <h1>404</h1>
            <h3>Page</h3><br />
            {forPNF}
            <h3>not found!</h3>
            <img src={require('../../../Images/page_not_found.gif')} alt="page_not_found" />
        </div>
    );
}

export default Page_not_found;