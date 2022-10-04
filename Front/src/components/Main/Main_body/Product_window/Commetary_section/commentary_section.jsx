import axios from 'axios';
import Cookies from 'js-cookie';
import { useContext, useEffect, useRef, useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import TextareaAutosize from 'react-textarea-autosize';
import { ForInnerDataContext } from '../../../../../contexts/forInnerDataContext';
import { ForModalContext } from '../../../../../contexts/forModalContext';
import Pagination_element from '../../../../Utils/Pagination/pagination';
import Commentary from './Commentary/commentary';
import './commentary_section.scss';

function Commentary_section({ productId }) {
    const { setuserPanel } = useContext(ForModalContext);
    const [commentSection, setcommentSection] = useState(true);
    const { loginInfo, commentData, setcommentData, commentPagination, setcommentPagination } = useContext(ForInnerDataContext);
    const [rating, setrating] = useState(0);
    const [addCommentary, setaddCommentary] = useState(false);
    const commentBody = useRef(null);
    const ratingRef = useRef(null);
    const commentAnim = useRef(null);
    const [commentaryShown, setcommentaryShown] = useState(false);
    const [addCommentarySection, setaddCommentarySection] = useState(true);
    const [userCommentary, setuserCommentary] = useState([]);


    const handleRating = (rate) => {
        setrating(rate / 10);
    }

    

    function getCommentaries() {
        let Uid = '';
        if (loginInfo) {
            const userInfo = Cookies.get('userInfo');
            Uid = userInfo.substring((userInfo.indexOf('/') + 1));
        }
        axios.post('http://127.0.0.1:8000/api/getCommentaries?limit=5', { id: productId.id, Uid: Uid })
            .then((resp) => {
                setcommentData(resp.data.comment.data);
                setcommentPagination(resp.data.comment);
                if (resp.data.userComment === null) {
                    setaddCommentarySection(true);
                    return;
                }
                setuserCommentary(resp.data.userComment);
                setaddCommentarySection(false);
            })
    }

    function sendCommentary() {
        const userInfo = Cookies.get('userInfo');
        const indexOfSl = userInfo.indexOf('/');
        const id = productId;
        const login = userInfo.substring(0, indexOfSl);
        const Uid = userInfo.substring((indexOfSl + 1));
        const body = commentBody.current.value;
        const ratingValue = rating;
        axios.post('http://127.0.0.1:8000/api/setCommentary', { id: id, login: login, Uid: Uid, body: body, rating: ratingValue })
    }

    function handlerForShowAddCommentary() {
        if (loginInfo) {
            setaddCommentary(true);
        } else {
            setuserPanel(true);
        }
    }

    function handlerForSendCommentary() {
        if (commentBody.current.value.trim() !== '' && rating > 0) {
            sendCommentary();
        }
    }

    function handlerForShowCommentary() {
        if (commentaryShown == false) {
            commentAnim.current.style.display = 'block';
            getCommentaries();
            setTimeout(() => {
                commentAnim.current.style.display = 'none';
                setcommentaryShown(!commentaryShown);
                setTimeout(() => {
                    window.scrollTo({ top: 1000, behavior: "smooth" })
                }, 100);
            }, 1000);
        } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
            commentAnim.current.style.display = 'none';
            setcommentaryShown(!commentaryShown);
        }
    }

    useEffect(() => {
        if (loginInfo) { 
            setcommentSection(addCommentarySection);
        } else {
            setcommentSection(true);
        }
    }, [loginInfo, commentData])



    return (
        <div className='commentary_section'>
            <div className="commentary_button">
                <div className="open_commentary_button" onClick={handlerForShowCommentary}>
                    {commentaryShown ? 'Hide rewiews' : `Show rewiews (${productId.ratingEntries})`}
                </div>
            </div>
            <div className="commentary_anim" ref={commentAnim}>
                <hr /><hr /><hr /><hr />
            </div>
            {commentaryShown ? <div className="commentary_part">
                {commentSection ? <div className="add_commentary_section">
                    {addCommentary && <div className="show_add_commentary_button" onClick={handlerForShowAddCommentary}>
                        Add rewiew
                    </div>}
                    {addCommentary && <div className='add_commentary'>
                        <div className="text_area_space">
                            <p>Let your rewiew: </p>
                            <TextareaAutosize ref={commentBody} />
                        </div>
                        <div className="send_action_space">
                            <div className="rating">
                                <p>Let your rating:</p>
                                <Rating onClick={handleRating} ref={ratingRef} ratingValue={rating * 10} allowHalfIcon={true} size={30} />
                                <p>{rating}</p>
                            </div>
                            <div className='send_commentary_button' onClick={handlerForSendCommentary}>Send</div>
                        </div>
                    </div>}

                </div> : <div className='userCommentary'><p>Your rewiew:</p>
                    <Commentary commentData={userCommentary} readonly={false} /><hr /></div>}
                {commentData.length > 0 ? commentData.map((e) => <Commentary commentData={e} readonly={true} key={e.id} />) : ''}
                <div className="comment_pagination">
                    <Pagination_element page_info={commentPagination} marker={'comment'} />
                </div>
            </div> : ''}
        </div>

    );
}

export default Commentary_section;