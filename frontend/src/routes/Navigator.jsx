// import Navbar from "@/components/navbar/Navbar";
// import Home from "@/screens/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HOME, ITEM_DETAILS } from "./Routes";
import Navbar from '../components/navbar/Navbar'
import Home from '../screens/Home'
import ItemDetails from '../screens/ItemDetails'

const Navigator = () => {
    // console.log('hello');
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path={HOME} element={<Home />} />
        <Route path={ITEM_DETAILS} element={<ItemDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Navigator;
