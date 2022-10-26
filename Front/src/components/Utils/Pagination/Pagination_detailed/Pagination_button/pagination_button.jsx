import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ForModalContext } from '../../../../../contexts/forModalContext';
import './pagination_button.scss';

function Pagination_button({ e, page_info }) {
    const { setpagination_detail } = useContext(ForModalContext);
    const navigate = useNavigate();
    const [checker, setchecker] = useState(0);
    const [modal_open, setmodal_open] = useState(false);
    const [modal_error, setmodal_error] = useState(false);
    const button = useRef(null);
    const modal = useRef(null);    

    function handlerForNewPage(event) {
        event.stopPropagation();
        event.preventDefault();
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
        navigate(`/Page/${page}`);
        restoreColor();
        button.current.style.filter = 'contrast(50%)';
        button.current.style.pointerEvents = 'none';
        setchecker(checker + 1);
        setpagination_detail(false);
    }

    function restoreColor() {
        const buttons = document.querySelectorAll('.pagination_item');
        buttons.forEach(button => {
            button.style.filter = 'unset';
            button.style.pointerEvents = 'auto';
        });
    }

    useEffect(() => {
        if (page_info.current_page == e.label) {
            button.current.style.filter = 'contrast(50%)';
            button.current.style.pointerEvents = 'none';
        }
    }, [checker])


    return (
        <a href={`/Page/${e.label}`} className='pagination_item' ref={button} onClick={handlerForNewPage}>
            {modal_open && <div className="modal_for_enter_page" >
                Jump to page: (1-{page_info.last_page})
                <input type="text" className='pagination_input' ref={modal} />
                <div className="pag_modal_button">Done</div>
                {modal_error && <div className="pag_modal_button_error">Wrong page number!</div>}
            </div>}
            {e.label}
        </a>
    );
}

export default Pagination_button;