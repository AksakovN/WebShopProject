import { useContext, useEffect, useRef } from 'react';
import { ForModalContext } from '../../../../contexts/forModalContext';
import Catalog from '../Catalog/catalog';
import './burger.scss';

function Burger() {
    const { catalog, setcatalog } = useContext(ForModalContext);
    const forCatalog = useRef(null);

    function handlerBurgerHoverEnter() {
        forCatalog.current.classList.toggle('b_areaEnter');
        setcatalog(true);
    }
    
    useEffect(() => {
      if (catalog == false) {
        forCatalog.current.classList.remove('b_areaEnter');
      }
    }, [catalog])
    
    return (
        <div className='b_main'>
            <div className='b_area' ref={forCatalog}
                onMouseEnter={handlerBurgerHoverEnter} >
                <div className='b_middle'>

                </div>
            </div>
            {catalog ? <Catalog/> : ''}
        </div>
        
    );
}

export default Burger;