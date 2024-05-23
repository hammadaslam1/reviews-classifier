/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import {
  Backdrop,
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Input,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
// import PLACEHOLDER from "../assets/placeholder/placeholder.svg";
// import SearchInput from "../components/inputs/SearchInput";
import SearchInput from "../components/inputs/SearchInput";
import { FiSearch } from "react-icons/fi";
import SentimentButton from "../components/buttons/SentimentButton";
import { ITEM_DETAILS } from "../routes/Routes";
import { useLocation, useNavigate } from "react-router-dom";
import PLACE_IMAGE from "../assets/placeholder/product_placeholder_img.jpg";
import axios from "axios";
import { BASE_URL } from "../ENV";
import { useDispatch, useSelector } from "react-redux";
import { toggleRecord } from "../redux/record/RecordReducer";
import { toggleCategory } from "../redux/category/CategoryReducer";
// import { useHistory } from 'react-router-dom'

const Products = () => {
  const dispatch = useDispatch();
  const { category } = useSelector((state) => state.category);
  const [file, setFile] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [dollar, setDollar] = useState(0);
  const [searchedItem, setSearchedItem] = useState("");
  const [sentiment, setSentiment] = useState("all");
  const [error, setError] = useState("");
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // const history = useHistory();
  const fetchData = () => {
    setLoading(true);
    const uniqueSubcategories = new Set();
    axios
      .get(`${BASE_URL}api/categories/${category}`)
      .then((products) => {
        setFile(products.data);
        setLoading(false);
        // setAllCategories(
        //   file
        //     .map((data) => data["subcategory"][0]) // Extract the first subcategory from each object
        //     .filter((subcategory) => {
        //       if (!uniqueSubcategories.has(subcategory)) {
        //         uniqueSubcategories.add(subcategory); // Add the subcategory to the set if it's not already present
        //         return true; // Include the subcategory in the result
        //       } else {
        //         return false; // Exclude the subcategory from the result
        //       }
        //     })
        // );
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        alert("server is not running...");
      });
  };
  useEffect(() => {
    fetchData();
  }, [category]);

  const handleItem = (id, cat) => {
    console.log(id);
    // navigate(ITEM_DETAILS, {
    //   state: {
    //     id: id,
    //   },
    // });
    dispatch(toggleRecord(id));
    dispatch(toggleCategory(cat));
    // setCount(1);
  };
  return (
    <Card
      elevation={0}
      sx={{
        margin: "100px 30px 30px 30px",
        padding: 3,
        backgroundColor: "transparent",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        border: "1px solid #fff",
      }}
    >
      <Backdrop
        sx={{ color: "#112d4e", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* <div style={{ border: "0px solid white", margin: 5 }}> */}
        {/* <input type="text" /> */}
        <div>
          {/*  <SentimentButton
            variant={sentiment == "all" ? "contained" : "plain"}
            sx={{
              backgroundColor: sentiment == "all" ? "#112d4e" : "#f5fadf",
              color: sentiment == "all" ? "#fff" : "#112d4e",
            }}
            onClick={() => setSentiment("all")}
            value={"All"}
          />
          <SentimentButton
            variant={sentiment == "positive" ? "contained" : "plain"}
            sx={{
              backgroundColor: sentiment == "positive" ? "#112d4e" : "#f5fadf",
              color: sentiment == "positive" ? "#fff" : "#112d4e",
            }}
            onClick={() => setSentiment("positive")}
            value={"Positive"}
          />
          <SentimentButton
            variant={sentiment == "negative" ? "contained" : "plain"}
            sx={{
              backgroundColor: sentiment == "negative" ? "#112d4e" : "#f5fadf",
              color: sentiment == "negative" ? "#fff" : "#112d4e",
            }}
            onClick={() => setSentiment("negative")}
            value={"Negative"}
          />
          <SentimentButton
            variant={sentiment == "neutral" ? "contained" : "plain"}
            sx={{
              backgroundColor: sentiment == "neutral" ? "#112d4e" : "#f5fadf",
              color: sentiment == "neutral" ? "#fff" : "#112d4e",
            }}
            onClick={() => setSentiment("neutral")}
            value={"Neutral"}
          />*/}
        </div>
        <SearchInput
          type="text"
          value={searchedItem}
          startDecorator={<FiSearch color="#6a6a6a" fontWeight="bold" />}
          onChange={(e) => {
            setSearchedItem(e.target.value);
          }}
          placeholder="search for items"
          sx={{}}
        />
        {/* </div> */}
      </Box>
      {file.length > 0 ? (
        file.map(
          (data, i) =>
            // data.subcategory[0] == "computers_laptops" &&
            // searchedItem &&
            (data.product_title[0]
              .toLowerCase()
              .includes(searchedItem.toLowerCase()) ||
              data.product_description[0]
                .toLowerCase()
                .includes(searchedItem.toLowerCase())) && (
              <Card
                elevation={10}
                key={i}
                sx={{
                  backgroundColor: "#fff",
                  width: 280,

                  margin: 1,
                  borderRadius: 3,
                }}
              >
                <CardActionArea
                  onClick={() => {
                    handleItem(data._id, category);
                    navigate(ITEM_DETAILS);
                  }}
                >
                  <div
                    style={{
                      height: 250,
                      overflow: "hidden",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {data.product_images_src != "" ? (
                      <CardMedia
                        component="img"
                        image={data.product_images_src}
                        sx={{ padding: 5 }}
                      />
                    ) : (
                      <CardMedia component="img" image={PLACE_IMAGE} />
                    )}
                  </div>
                  <CardContent>
                    <Tooltip
                      title={data.product_title}
                      followCursor={false}
                      placement="top"
                    >
                      <Typography
                        gutterBottom
                        variant="body1"
                        component="div"
                        noWrap
                        ellipsis
                        fontWeight={600}
                        color="#555"
                      >
                        {data.product_title}
                      </Typography>
                    </Tooltip>
                    <Tooltip
                      title={data.product_description}
                      sx={{ height: 20 }}
                      followCursor={false}
                      placement="top"
                    >
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        noWrap
                        ellipsis
                      >
                        {data.product_description}
                      </Typography>
                    </Tooltip>
                    <Tooltip
                      title={data.product_price}
                      sx={{ height: 25, marginTop: 2 }}
                      followCursor={true}
                      placement="top"
                    >
                      <Typography
                        variant="h6"
                        color="#112d4e99"
                        noWrap
                        ellipsis
                      >
                        {dollar
                          ? "PKR " +
                            (
                              data.product_price.replace(/[^\d\.]/g, "") *
                              dollar
                            ).toFixed(2)
                          : data.product_price != ""
                          ? data.product_price
                          : "out of stock"}
                        {/* {dollar} */}
                      </Typography>
                    </Tooltip>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    href={data.all_products_href}
                    target="_blank"
                  >
                    Visit Main Site
                  </Button>
                </CardActions>
              </Card>
            )
        )
      ) : (
        <Typography variant="h2" color="#444">
          {error}
        </Typography>
      )}
    </Card>
  );
};

export default Products;
