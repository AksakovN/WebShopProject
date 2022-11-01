import axios from 'axios';
import Cookies from 'js-cookie';
import { useLocation } from 'react-router-dom';
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
    const [addCommentary, setaddCommentary] = useState(true);
    const [newComment, setnewComment] = useState(false);
    const commentBody = useRef(null);
    const ratingRef = useRef(null);
    const commentAnim = useRef(null);
    const [commentaryShown, setcommentaryShown] = useState(false);
    const [showCom, setshowCom] = useState(true);
    const [addCommentarySection, setaddCommentarySection] = useState(true);
    const [userCommentary, setuserCommentary] = useState([]);
    const location = useLocation();



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
                let comments = [];
                if (resp.data.userComment[0] == null) {
                    setaddCommentarySection(true);
                    comments = resp.data.comment.data;
                } else {
                    resp.data.comment.data.forEach(e => {
                        if (e.id !== resp.data.userComment[0].id) {
                            comments.push(e);
                        } else {
                            setshowCom(false);
                        }
                    });
                    setuserCommentary(resp.data.userComment[0]);
                    setaddCommentarySection(false);
                }
                setcommentData(comments);
                setcommentPagination(resp.data.comment);
                
            })
    }

    function sendCommentary() {
        const userInfo = Cookies.get('userInfo');
        const indexOfSl = userInfo.indexOf('/');
        const id = productId.id;
        const login = userInfo.substring(0, indexOfSl);
        const Uid = userInfo.substring((indexOfSl + 1));
        const body = commentBody.current.value;
        const ratingValue = rating;
        const userComm = { id: id, login: login, Uid: Uid, body: body, rating: ratingValue };
        axios.post('http://127.0.0.1:8000/api/setCommentary', userComm);
        userComm.likedUsers = 0;
        userComm.dislikedUsers = 0;
        setuserCommentary(userComm);
    }

    function handlerForShowAddCommentary() {
        if (loginInfo) {
            setaddCommentary(!addCommentary);
            setnewComment(!newComment);
        } else {
            setuserPanel(true);
            setaddCommentary(true);
            setnewComment(false);
        }
    }

    function handlerForSendCommentary() {
        if (commentBody.current.value.trim() !== '' && rating > 0) {
            sendCommentary();
            setcommentSection(false);
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
        setcommentaryShown(false);
    }, [loginInfo, commentData, location])



    return (
        <div className='commentary_section'>
            <div className="commentary_button">
                <div className="open_commentary_button" onClick={handlerForShowCommentary}>
                    {commentaryShown ? 'Hide reviews' : `Show reviews (${productId.ratingEntries})`}
                </div>
            </div>
            <div className="commentary_anim" ref={commentAnim}>
                <hr /><hr /><hr /><hr />
            </div>
            {commentaryShown ? <div className="commentary_part">
                {commentSection ? <div className="add_commentary_section">
                    {addCommentary ? <div className="show_add_commentary_button" onClick={handlerForShowAddCommentary}>
                        Add review
                    </div> : <div className="show_add_commentary_button" onClick={handlerForShowAddCommentary}>
                        Close
                    </div>
                    }
                    {newComment && <div className='add_commentary'>
                        <div className="text_area_space">
                            <p>Let your review: </p>
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
                    </div>
                    }
                </div> : <div className='userCommentary'>
                    <p>Your review:</p>
                    <Commentary commentData={userCommentary} readonly={false} /><hr /></div>}
                {commentData.length > 0 ? commentData.map((e) => <Commentary commentData={e} readonly={true} key={e.id} />)
                    : showCom && <div>
                        No reviews yet...
                    </div>
                }
                <div className="comment_pagination">
                    <Pagination_element page_info={commentPagination} marker={'comment'} />
                </div>
            </div> : ''}
        </div>

    );
}

export default Commentary_section;