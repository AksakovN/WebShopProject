import './commentary.scss';
import { Rating } from 'react-simple-star-rating';
import { useContext, useEffect, useRef, useState } from 'react';
import { ForInnerDataContext } from '../../../../../../contexts/forInnerDataContext';
import axios from 'axios';
import Cookies from 'js-cookie';
import TextareaAutosize from 'react-textarea-autosize';

function Commentary({ commentData, readonly }) {
    const { loginInfo } = useContext(ForInnerDataContext);
    const [rating, setRating] = useState(commentData.rating);//????
    const [like, setlike] = useState(commentData.likes);
    const [commentText, setcommentText] = useState(commentData.body);
    const [dislike, setdislike] = useState(commentData.dislikes);
    const [startLikeUser, setstartLikeUser] = useState(commentData.likedUsers);
    const [startDislikeUser, setstartDislikeUser] = useState(commentData.dislikedUsers);
    const [commentChange, setcommentChange] = useState(true);
    const [isLiked, setisLiked] = useState(false);
    const [isDisliked, setisDisliked] = useState(false);
    const likeButton = useRef(null);
    const dislikeButton = useRef(null);
    const ratingRef = useRef(null);
    const commentBody = useRef(null);
    let date = '';

    if (readonly) {
        const commentDate = commentData.created_at;
        const clearIndex = commentDate.indexOf('T');
        date = commentDate.substring(0, clearIndex);
    }


    const handleRating = (rate) => {
        setRating(rate / 10);
    }

    function changeLike(index, likeUsers, dislikeUsers, likeNum) {
        const id = commentData.id;
        const userInfo = Cookies.get('userInfo');
        const Uid = userInfo.substring((userInfo.indexOf('/') + 1));
        axios.post('http://127.0.0.1:8000/api/changeLikes', { userId: Uid, id, index: index, likeBody: likeNum, likeUsers: likeUsers, dislikeBody: dislike, dislikeUsers: dislikeUsers });
    }

    function changeComment() {
        const userInfo = Cookies.get('userInfo');
        const Uid = userInfo.substring((userInfo.indexOf('/') + 1));
        axios.post('http://127.0.0.1:8000/api/changeCommentary', { id: Uid, body: commentText, rating: rating })
    }

    ////////////////////////////////////////////////////////////////
    function forSetUsers(likeResp, likeResult) {
        if (likeResp == 'like') {
            setstartLikeUser(likeResult);
        } else if (likeResp == 'dislike') {
            setstartDislikeUser(likeResult);
        }
    }

    function changeArray(users, start, like) {
        const userInfo = Cookies.get('userInfo');
        const Uid = userInfo.substring((userInfo.indexOf('/') + 1));
        let currUsers = [users];
        if (currUsers[0] === null) {
            if (start == 'state') {
                return false;
            } else {
                forSetUsers(like, Uid)
                return Uid;
            }
        }
        if (readonly) {
            currUsers = users.split(',');
        }
        let index = -1;
        for (let i = 0; i < currUsers.length; i++) {
            if (currUsers[i] == Uid) {
                index = i;
            }
        }
        if (index == -1) {
            if (start == 'state') {
                currUsers = false;
            } else {
                if (currUsers[0] == ['']) {
                    forSetUsers(like, null);
                    return null;
                } else {
                    currUsers.push(Uid);
                    const newUsers = currUsers.join();
                    forSetUsers(like, newUsers);
                    return newUsers;
                }
            }
        } else {
            if (start == 'state') {
                currUsers = true;
            } else {
                if (currUsers.length === 1) {
                    forSetUsers(like, null);
                    return null;
                } else {
                    currUsers.splice(index, 1);
                    const newUsers = currUsers.join();
                    forSetUsers(like, newUsers);
                    return newUsers;
                }
            }
        }

    }
    ///////////////////////////////////////////////////////
    function handlerForLikeSend() {
        if (readonly) {
            if (loginInfo) {
                likeButton.current.style.display = 'block';
                setTimeout(() => {
                    likeButton.current.style.display = 'none';
                }, 1000);
                let likeNum = '';
                if (isLiked === true) {
                    setlike(like - 1);
                    setisLiked(false);
                    likeNum = like - 1;
                } else {
                    setlike(like + 1);
                    setisLiked(true);
                    likeNum = like + 1;
                    if (isDisliked === true || isDisliked === undefined) {
                        let dislikeNum = '';
                        setdislike(dislike - 1);
                        setisDisliked(false);
                        dislikeNum = dislike - 1;
                        const dislikeUsers = changeArray(startDislikeUser, '', 'dislike');
                        changeLike('dislike', '', dislikeUsers, dislikeNum);
                    }
                }
                const likeUsers = changeArray(startLikeUser, '', 'like');
                changeLike('like', likeUsers, '', likeNum);
            }
        }
    }

    function handlerForDislikeSend() {
        if (readonly) {
            if (loginInfo) {
                dislikeButton.current.style.display = 'block';
                setTimeout(() => {
                    dislikeButton.current.style.display = 'none';
                }, 1000);
                let likeNum = '';
                if (isDisliked === true) {
                    setdislike(dislike - 1);
                    setisDisliked(false);
                    likeNum = dislike - 1;
                } else {
                    setdislike(dislike + 1);
                    setisDisliked(true);
                    likeNum = dislike + 1;
                    if (isLiked === true || isLiked === undefined) {
                        let dislikeNum = '';
                        setlike(like - 1);
                        setisLiked(false);
                        dislikeNum = like - 1;
                        const likeUsers = changeArray(startLikeUser, '', 'like');
                        changeLike('like', likeUsers, '', dislikeNum);
                    }
                }
                const dislikeUsers = changeArray(startDislikeUser, '', 'dislike');
                changeLike('dislike', '', dislikeUsers, likeNum);
            }
        }
    }

    function handlerForCommentChange() {
        setcommentText(commentBody.current.value);
    }

    function handlerForEditComment() {
        setcommentChange(false);
    }

    function handlerForCloseEditComment() {
        setcommentChange(true);
    }

    function handlerForEditButton() {
        setcommentChange(true);
        changeComment();
    }
    //////////////////////////////////////////////////////////////////////

    useEffect(() => {
        if (loginInfo) {
            setisLiked(changeArray(startLikeUser, 'state', ''));
            setisDisliked(changeArray(startDislikeUser, 'state', ''));
        }
    }, [loginInfo])



    return (
        <div className='single_commentary'>
            <div className="comment_header">
                <div className="login_name">{commentData.user_login}</div>
                {readonly ? '' : commentChange ? <div className="change_comment"><img src={require("../../../../../Images/pen.png")}
                    alt="edit" onClick={handlerForEditComment} /></div> : <div className="change_comment"><img src={require("../../../../../Images/cancel.png")}
                        alt="edit" onClick={handlerForCloseEditComment} /></div>}
                <div className="comment_date">{date}</div>
            </div>
            <div className="hr"></div>
            <div className="comment_main">
                <div className="comment_body">{commentChange ? commentText : <TextareaAutosize ref={commentBody}
                    value={commentText} onChange={handlerForCommentChange} />}</div>
                <div className="comment_info">
                    <div className="rating">
                        {commentChange ? <Rating ratingValue={rating * 10} allowHalfIcon={true} readonly={true} size={30} />
                            : <Rating onClick={handleRating} ref={ratingRef} ratingValue={rating * 10} allowHalfIcon={true} size={30} />}  <p>{rating}</p>
                    </div>
                    <div className="likes">
                        <div className="like_button">
                            <div className="like_animation" ref={likeButton}></div>
                            <img src={require("../../../../../Images/like.png")}
                                alt="like" onClick={handlerForLikeSend} />
                            <p>{like}</p>
                        </div>
                        <div className="dislike_button">
                            <div className="dislike_animation" ref={dislikeButton}></div>
                            <img src={require("../../../../../Images/dislike.png")}
                                alt="like" onClick={handlerForDislikeSend} />
                            <p>{dislike}</p>
                        </div>
                    </div>
                </div>
            </div>
            {commentChange ? '' : <div className="edit_button"><p onClick={handlerForEditButton}>Save</p></div>}
        </div>
    );
}

export default Commentary;

