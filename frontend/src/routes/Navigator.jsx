// import Navbar from "@/components/navbar/Navbar";
// import Home from "@/screens/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HOME, ITEMS, ITEM_DETAILS } from "./Routes";
import Navbar from "../components/navbar/Navbar";
import Home from "../screens/Home";
import ItemDetails from "../screens/ItemDetails";
import Items from "../screens/Items";
import { Box, CssBaseline } from "@mui/material";

const Navigator = () => {
  // console.log('hello');
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path={HOME} element={<Home />} />
          <Route path={ITEMS} element={<Items />} />
          <Route path={ITEM_DETAILS} element={<ItemDetails />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
};

export default Navigator;
