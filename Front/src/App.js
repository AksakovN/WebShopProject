import { Routes, Route } from "react-router-dom";
import './App.css';
import Header from "./components/Main/Header/header";
import Main_window from "./components/Main/Main_body/Main_window/main_window";
import Product_window from "./components/Main/Main_body/Product_window/product_window";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Main_window />} />
        <Route path='/:category' element={<Main_window />} />
        <Route path='/product/:id' element={<Product_window />} />
      </Routes>
    </div>
  );
}

export default App;
