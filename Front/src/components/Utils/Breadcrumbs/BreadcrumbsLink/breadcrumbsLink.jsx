import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './breadcrumbsLink.scss';

function BreadcrumbsLink({ link, array }) {
    const location = useLocation();
    const cramb = useRef(null);
    const [url, seturl] = useState('/');



    useEffect(() => {
        if (location.pathname !== '' && url == '/') {
            if (array[2] && link == array[2]) {
                seturl(`/Category/${array[1].replaceAll(' ', '_')}/Subcategory/${array[2].replaceAll(' ', '_')}`);
            } else if (array[1] && link == array[1]) {
                seturl(`/Category/${array[1].replaceAll(' ', '_')}`); 
            }
        }
    }, [location, url])
    
    
    return (
        <a className='crumb' ref={cramb} href={url}>
            {' > '}{link}
        </a>
    );
}

export default BreadcrumbsLink;