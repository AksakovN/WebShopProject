import Product_card from '../../Product_card/product_card';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';
import 'swiper/scss';
import "swiper/scss/pagination";
import './product_window_carousel.scss';
import { ForRequestsContext } from '../../../../../contexts/forRequestsContext';


function Product_window_carousel() {
    const [products, setproducts] = useState([]);
    const { prodInfo } = useContext(ForRequestsContext);

    function getProducts() {
        if (prodInfo.length == 0) {
            return;
        }
        axios.post('http://127.0.0.1:8000/api/productsByCategory', { id: null, idSub: prodInfo.subcategory_id, prodId: prodInfo.id })
            .then((resp) => {
                setproducts(resp.data);
            })
    }

    useEffect(() => {
            getProducts();
    }, [ prodInfo])


    return (
        <div className='prod_carousel_body'>
            <p className='carousel_body_text'> You also would like...</p>
            <Swiper
                slidesPerView={3}
                spaceBetween={25}
                loop={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Autoplay, Pagination]}
                className="mySwiper"
            >
                {!!products && products.map((e) => <SwiperSlide key={e.id}><Product_card marker={e} /></SwiperSlide>)}
            </Swiper>

        </div>
    );
}
export default Product_window_carousel;

