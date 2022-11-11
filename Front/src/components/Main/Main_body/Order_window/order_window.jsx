import './order_window.scss';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useRef, useState } from 'react';
import { ForModalContext } from '../../../../contexts/forModalContext';
import Order_item from './Order_item/order_item';
import Phone_number_input from '../../Header/User_panel/User_logout/Phone_number_input/phone_number_input';
import { ForInnerDataContext } from '../../../../contexts/forInnerDataContext';

function Order_window() {
    const catalog_space = useRef(null);
    const { catalog } = useContext(ForModalContext);
    const { totalPrice, settotalPrice } = useContext(ForInnerDataContext);
    const [price, setprice] = useState(0);
    const [orderStage, setorderStage] = useState(true);
    const [catalogItems, setcatalogItems] = useState([]);
    const navigate = useNavigate();
    const [number_value, setnumber_value] = useState('');
    const order_arrow = useRef(null);
    const first_order_step = useRef(null);
    const second_order_step = useRef(null);
    const second_step_div = useRef(null);
    const first_step_div = useRef(null);
    const first_step_button = useRef(null);
    const succesfull_purshare = useRef(null);
    const first_name = useRef(null);
    const last_name = useRef(null);
    let set_num_value = value => {
        setnumber_value(current => current = value);
    }

    function handlerForNextStep() {
        setorderStage(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
        first_step_button.current.classList.add('first_step_button_disabled');
        order_arrow.current.style.display = 'block';
        order_arrow.current.style.top = '0';
        second_order_step.current.style.display = 'block';
        first_order_step.current.style.filter = 'contrast(50%)';
        second_step_div.current.style.display = 'block';
        second_step_div.current.classList.remove('s_s_anim_reverse');
        first_step_div.current.classList.add('f_s_anim');
        first_step_div.current.classList.remove('f_s_anim_reverse');
    }

    

    function handlerForPrevStep() {
        setorderStage(true);
        first_step_button.current.classList.remove('first_step_button_disabled');
        order_arrow.current.style.display = 'none';
        order_arrow.current.style.top = '-200px';
        second_order_step.current.style.display = 'none';
        first_order_step.current.style.filter = 'contrast(100%)';
        first_step_div.current.classList.add('f_s_anim_reverse');
        first_step_div.current.classList.remove('f_s_anim');
        second_step_div.current.classList.add('s_s_anim_reverse');
        setTimeout(() => {
            second_step_div.current.style.display = 'none';
        }, 900);
    }

    function handlerForOrderSend(e) {
        e.preventDefault();
        if (first_name.current.value.trim() == '') {
            first_name.current.style.border = '1px solid red';
            return;
        } else if (last_name.current.value.trim() == '') {
            last_name.current.style.border = '1px solid red';
            return;
        }
        succesfull_purshare.current.style.display = 'flex';
        localStorage.removeItem('cartInfo');  
        setTimeout(() => {
            settotalPrice(totalPrice + 1);
        }, 1000);
    }

    function handlerForNameCheck() {
        first_name.current.style.border = '1px solid rgb(133, 133, 133)';
        last_name.current.style.border = '1px solid rgb(133, 133, 133)';
    }



    function checkPriceLength(priceLength) {
        switch (priceLength) {
            case 4:
                return 1;
            case 5:
                return 2;
            case 6:
                return 3;
            case 7:
                return [1, 4];
            case 8:
                return [2, 5];
            case 9:
                return [3, 6];
        }
    }

    useEffect(() => {
        if (localStorage.getItem('cartInfo') == null) {
            navigate('/');
        } else {
            succesfull_purshare.current.style.display = 'none';
            const new_price = JSON.parse(localStorage.getItem('cartInfo'));
            let new_price_count = 0
            let price_res = 0;
            new_price.forEach(e => {
                new_price_count += parseInt(e.price) * parseInt(e.count);
            });
            if (new_price_count.toString().length > 3) {
                const price_count = checkPriceLength(new_price_count.toString().length);
                if (price_count[1] !== undefined) {
                    price_res = [new_price_count.toString().slice(0, price_count[0]), ',', new_price_count.toString().slice(price_count[0])].join('');
                    price_res = [price_res.toString().slice(0, price_count[1] + 1), ',', price_res.toString().slice(price_count[1] + 1)].join('');
                } else {
                    price_res = [new_price_count.toString().slice(0, price_count), ',', new_price_count.toString().slice(price_count)].join('');
                }
            } else {
                price_res = new_price_count;
            }
            setprice(price_res);
            setcatalogItems(JSON.parse(localStorage.getItem('cartInfo')));
            if (catalog === true) {
                catalog_space.current.style.display = 'block';
            } else {
                catalog_space.current.style.display = 'none';
            }
        }
    }, [catalog, totalPrice])

    return (
        <div className="main_space">
            <Helmet>
                <title>New order</title>
            </Helmet>
            <div className='catalog_space' ref={catalog_space}></div>
            <div className='main_body'>
                <div className="succesfull_purshare" ref={succesfull_purshare}>
                    <div className="succesfull_purshare_text">
                        Purshare succesfull!
                        <img src={require('../../../Images/checkBlue.png')} alt="OrderSuccess" />
                    </div>
                </div>
                <div className="order_body">
                    <div className="orders">
                        <div ref={first_order_step} className="order_step">1</div>
                        <img ref={order_arrow} src={require('../../../Images/arrows.png')} alt="arrows" />
                        <div ref={second_order_step} className="order_step">2</div>
                    </div>
                    {orderStage ? <div className="step_name">Approve your orders</div> : <div className="step_name">Enter contact data</div>}
                    <div className="steps">
                        <div className="first_step" ref={first_step_div}>
                            {catalogItems.map((e) => <Order_item key={e.id} mark={e} index={catalogItems.indexOf(e)} />)}
                        </div>
                        <div className="second_step" ref={second_step_div}>
                            <form action="">
                                <svg viewBox="0 0 400 15" color='white' >
                                    <text x="40%" y="80%">First Name</text>
                                </svg>
                                <input type="text" name="Fname" required ref={first_name} onClick={handlerForNameCheck}/>
                                <svg viewBox="0 0 400 15" color='white' >
                                    <text x="40%" y="80%">Last Name</text>
                                </svg>
                                <input type="text" name="Lname" required ref={last_name} onClick={handlerForNameCheck}/>
                                <svg viewBox="0 0 400 15" color='white' >
                                    <text x="35%" y="80%">Contact number</text>
                                </svg>
                                <Phone_number_input num_value={set_num_value} marker={'order'}/>
                                <svg viewBox="0 0 400 15" color='white' >
                                    <text x="35%" y="80%">Place of delivery</text>
                                </svg>
                                <select name='Location'>
                                    <option value='First place'>First place</option>
                                    <option value='Second place'>Second place</option>
                                    <option value='Third place'>Third place</option>
                                </select>
                                <div className="order_form_buttons">
                                    <div className="first_step_button" onClick={handlerForPrevStep}>
                                        <svg viewBox="0 0 70 22" color='white' >
                                            <text x="10%" y="100%">{'<'} Back</text>
                                        </svg>
                                    </div>
                                    <button className="first_step_button" onClick={handlerForOrderSend}>
                                        <svg viewBox="0 0 60 10" color='white' >
                                            <text x="18%" y="100%">Order</text>
                                        </svg>
                                    </button>
                                </div>
                            </form>


                        </div>
                    </div>
                    <div className="order_total_price">
                        Total: <span>{price}</span> ₴
                    </div>
                    <div className="order_buttons">
                        <div className="first_step_button" ref={first_step_button} onClick={handlerForNextStep}>Next {'>'}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Order_window;