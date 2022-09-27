import axios from 'axios';
import Cookies from 'js-cookie';
import { useContext, useEffect, useRef, useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import TextareaAutosize from 'react-textarea-autosize';
import { ForInnerDataContext } from '../../../../../contexts/forInnerDataContext';
import { ForModalContext } from '../../../../../contexts/forModalContext';
import Commentary from './Commentary/commentary';
import './commentary_section.scss';

function Commentary_section({ commentData, productId, addCommentarySection, userCommentary }) {
    const { setuserPanel } = useContext(ForModalContext);
    const [commentSection, setcommentSection] = useState(true);
    const { loginInfo } = useContext(ForInnerDataContext);
    const [rating, setrating] = useState(0);
    const [addCommentary, setaddCommentary] = useState(false);
    const commentBody = useRef(null);
    const ratingRef = useRef(null);


    const handleRating = (rate) => {
        setrating(rate / 10);
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

    useEffect(() => {
        if (loginInfo) {
            setcommentSection(addCommentarySection);
        } else {
            setcommentSection(true);
        }
    }, [loginInfo])



    return (
        <div className='commentary_section'>
            {commentSection ? <div className="add_commentary_section">
                {addCommentary ? '' : <div className="show_add_commentary_button" onClick={handlerForShowAddCommentary}>
                    Add rewiew
                </div>}
                {addCommentary ? <div className='add_commentary'>
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
                </div> : ''}
                
            </div> : <div className='userCommentary'><p>Your rewiew:</p>
            <Commentary commentData={userCommentary} readonly={false}/><hr /></div>}
            {commentData.length > 0 ? commentData.map((e) => <Commentary commentData={e} readonly={true} key={e.id} />) : ''}
        </div>

    );
}

export default Commentary_section;