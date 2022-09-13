import './commentary.scss';
import { Rating } from 'react-simple-star-rating';
import { useState } from 'react';

function Commentary({ commentData }) {
    const [rating, setRating] = useState(commentData.rating);

    const commentDate = commentData.updated_at;
    const clearIndex = commentDate.indexOf('T');
    const date = commentDate.substring(0, clearIndex);
    

    // console.log(commentData);


    return (
        <div className='single_commentary'>
            <div className="comment_header">
                <div className="login_name">{commentData.user_login}</div>
                <div className="comment_date">{date}</div>
            </div>
            <div className="hr"></div>
            <div className="comment_main">
                <div className="comment_body">{commentData.body}</div>
                <div className="comment_info">
                    <div className="rating">
                        <Rating ratingValue={rating * 10} allowHalfIcon={true} readonly={true} size={30}/>  <p>{rating}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Commentary;