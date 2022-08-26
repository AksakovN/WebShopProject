import { Routes, Route } from "react-router-dom";
import './App.css';
import Header from "./components/Main/Header/header";
import Main_window from "./components/Main/Main_body/Main_window/main_window";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Main_window />} />
      </Routes>
    </div>
  );
}

export default App;
