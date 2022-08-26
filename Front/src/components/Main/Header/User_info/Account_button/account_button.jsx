import './account_button.scss';

function Account_button() {
    return (
        <div className='account_button'>
            <img src={require("../../../../Images/user.png")} alt="accountButton" />
        </div>
    );
}

export default Account_button;