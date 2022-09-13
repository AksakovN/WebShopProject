import axios from 'axios';
import Cookies from 'js-cookie';
import { useContext, useEffect, useRef, useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import TextareaAutosize from 'react-textarea-autosize';
import { ForInnerDataContext } from '../../../../../contexts/forInnerDataContext';
import Commentary from './Commentary/commentary';
import './commentary_section.scss';

function Commentary_section({ commentData, productId }) {
    const { loginInfo } = useContext(ForInnerDataContext);
    const [rating, setrating] = useState(0);
    const [addCommentary, setaddCommentary] = useState(false);
    const [addCommentarySection, setaddCommentarySection] = useState(false);
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

    function commentCheck() {
        const userInfo = Cookies.get('userInfo');
        const indexOfSl = userInfo.indexOf('/');
        const Uid = userInfo.substring((indexOfSl + 1));
        let count = 0;
        commentData.forEach(e => {
            if (e.id == Uid) {
                count += 1;
            }
        });
        if (count === 0) {
            return true;
        } else {
            return false;
        }
    }

    function handlerForShowAddCommentary() {
        setaddCommentary(true);
    }

    function handlerForSendCommentary() {
        if (commentBody.current.value.trim() !== '' && rating > 0) {
            sendCommentary();
        }
    }

    useEffect(() => {
        if (loginInfo) {
            const bool = commentCheck();
            setaddCommentarySection(bool);
        } else {
            setaddCommentarySection(false);
        }
    }, [loginInfo])



    return (
        <div className='commentary_section'>
            {addCommentarySection ? <div className="add_commentary_section">
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
            </div> : ''}
            {commentData.length > 0 ? commentData.map((e) => <Commentary commentData={e} key={e.id} />) : ''}
        </div>

    );
}

export default Commentary_section;