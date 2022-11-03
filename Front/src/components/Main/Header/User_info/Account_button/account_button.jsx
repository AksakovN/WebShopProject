import { useContext } from 'react';
import { ForInnerDataContext } from '../../../../../contexts/forInnerDataContext';
import { ForModalContext } from '../../../../../contexts/forModalContext';
import User_panel from '../../User_panel/user_panel';
import './account_button.scss';

function Account_button() {
    const { userPanel, setuserPanel } = useContext(ForModalContext);

    function handlerUserPanelOpen() {
        setuserPanel(true);
    }
    return (
        <div className='account_button'>
            <img src={require("../../../../Images/user.png")} onMouseEnter={handlerUserPanelOpen} alt="accountButton" />
            {userPanel && <User_panel/>}
        </div>
    );
}

export default Account_button;