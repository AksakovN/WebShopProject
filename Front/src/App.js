import { Routes, Route } from "react-router-dom";
import './App.css';
import Header from "./components/Main/Header/header";
import Favourite_window from "./components/Main/Main_body/Favourite_window/favourite_window";
import Main_window from "./components/Main/Main_body/Main_window/main_window";
import Order_window from "./components/Main/Main_body/Order_window/order_window";
import Page_not_found from "./components/Main/Main_body/Page_not_found/page_not_found";
import Product_window from "./components/Main/Main_body/Product_window/product_window";
import Search_window from "./components/Main/Main_body/Search_window/search_window";
import Breadcrumbs from "./components/Utils/Breadcrumbs/breadcrumbs";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="wrapper">
        <div className='header_space'></div>
        <Breadcrumbs />
        <Routes>
          <Route path='/' element={<Main_window />} />
          <Route path='/Category/:category' element={<Main_window />} />
          <Route path='/Page/:pageNum' element={<Main_window />} />
          <Route path='/Category/:category/Subcategory/:subcategory' element={<Main_window />} />
          <Route path='/Product/:id' element={<Product_window />} />
          <Route path='/Search' element={<Search_window />} />
          <Route path='/Favourite' element={<Favourite_window />} />
          <Route path='/Order' element={<Order_window />} />
          <Route path='*' element={<Page_not_found />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
