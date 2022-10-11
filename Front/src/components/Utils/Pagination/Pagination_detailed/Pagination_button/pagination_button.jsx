import axios from 'axios';
import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ForModalContext } from '../../../../../contexts/forModalContext';
// import { ForRequestsContext } from '../../../../../contexts/forRequestsContext';
import './pagination_button.scss';

function Pagination_button({ e, page_info }) {
    // const { setproducts, setproductsPage } = useContext(ForRequestsContext);
    const { setpagination_detail } = useContext(ForModalContext);
    const navigate = useNavigate();
    const [checker, setchecker] = useState(0);
    const [modal_open, setmodal_open] = useState(false);
    const [modal_error, setmodal_error] = useState(false);
    const button = useRef(null);
    const modal = useRef(null);    

    function handlerForNewPage(event) {
        event.stopPropagation();
        let page = e.label;
        if (event.target.outerText == '...') {
            if (modal_open == false) {
                setmodal_open(true);
                return;
            }
        } else if (event.target.classList[0] == "pag_modal_button") {
            setmodal_error(false);
            let value = modal.current.value;
            if (value !== '' && value >= 1 && value <= page_info.last_page) {
                page = value;
            } else {
                setmodal_error(true);
                return;
            }

        } else if (event.target.classList[0] == "modal_for_enter_page" || event.target.classList[0] == 'pagination_input') {
            return;
        }
        navigate(`/page/${page}`);
        restoreColor();
        button.current.style.filter = 'contrast(50%)';
        setchecker(checker + 1);
        setpagination_detail(false);
    }

    // function getProductsPagination(url) {
    //     axios.get(url)
    //         .then((resp) => {
    //             setproducts(resp.data.data);
    //             setproductsPage(resp.data);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         })
    // }

    function restoreColor() {
        const buttons = document.querySelectorAll('.pagination_item');
        buttons.forEach(button => {
            button.style.filter = 'unset';
        });
    }

    useEffect(() => {
        if (page_info.current_page == e.label) {
            button.current.style.filter = 'contrast(50%)';
        }
    }, [checker])


    return (
        <div className='pagination_item' ref={button} onClick={handlerForNewPage}>
            {modal_open && <div className="modal_for_enter_page" >
                Jump to page: (1-{page_info.last_page})
                <input type="text" className='pagination_input' ref={modal} />
                <div className="pag_modal_button">Done</div>
                {modal_error && <div className="pag_modal_button_error">Wrong page number!</div>}
            </div>}
            {e.label}
        </div>
    );
}

export default Pagination_button;