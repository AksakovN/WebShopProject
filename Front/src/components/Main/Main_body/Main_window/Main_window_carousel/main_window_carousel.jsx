import Product_card from '../../Product_card/product_card';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';
import 'swiper/scss';
import "swiper/scss/pagination";
import './main_window_carousel.scss';


function Main_window_carousel() {
    const [products, setproducts] = useState([]);


    function getProducts() {
        axios.get('http://127.0.0.1:8000/api/products_for_main')
            .then((resp) => {
                setproducts(resp.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        if (products.length < 1) {
            getProducts();
        }
    }, [products])


    return (
        <div className='carousel_body'>
            <p> Discounts!</p>
            <Swiper
                slidesPerView={3}
                spaceBetween={25}
                loop={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                pagination={{
                  clickable: true,
                }}
                modules={[Autoplay, Pagination]}
                className="mySwiper"
            >
                {!!products && products.map((e) => <SwiperSlide key={e.id}><Product_card  marker={e} /></SwiperSlide>)}
            </Swiper>
            
        </div>
    );
}
export default Main_window_carousel;

