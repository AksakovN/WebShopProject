import './favourite_button.scss';

function Favourite_button() {
    return (
        <div className='favourite_button'>
            <img src={require("../../../../Images/favourite.png")} alt="favouriteButton" />
        </div>
    );
}

export default Favourite_button;