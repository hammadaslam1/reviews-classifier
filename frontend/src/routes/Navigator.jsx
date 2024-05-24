// import Navbar from "@/components/navbar/Navbar";
// import Home from "@/screens/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HOME, ITEMS, ITEM_DETAILS, PRODUCTS, TEST } from "./Routes";
import Navbar from "../components/navbar/Navbar";
import Home from "../screens/Home";
import ItemDetails from "../screens/ItemDetails";
import { Box, CssBaseline } from "@mui/material";
import Products from "../screens/Products";
import Test from "../screens/Test";

const Navigator = () => {
  // console.log('hello');
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path={HOME} element={<Home />} />
          <Route path={PRODUCTS} element={<Products />} />
          <Route path={ITEM_DETAILS} element={<ItemDetails />} />
          {/* <Route path={TEST} element={<Test />} /> */}
        </Routes>
      </BrowserRouter>
    </Box>
  );
};

export default Navigator;
