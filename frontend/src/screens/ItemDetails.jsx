/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable array-callback-return */
/* eslint-disable no-useless-escape */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  LinearProgress,
  Rating,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IMG_PLACE from "../assets/placeholder/product_placeholder_img.jpg";
import { FiThumbsUp } from "react-icons/fi";

const ItemDetails = ({ props }) => {
  const [file, setFile] = useState([]);
  const [dollar, setDollar] = useState(0);
  const [error, setError] = useState("");
  const [data, setData] = useState([]);

  const [productLink, setProductLink] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productRate, setProductRate] = useState("");
  const [productRating, setProductRating] = useState("");
  const [productTitle, setProductTitle] = useState("");
  const [productReviews, setProductReviews] = useState([]);
  const [reviewTopics, setReviewTopics] = useState([]);
  const [category, setCategory] = useState({});

  const location = useLocation();
  const id = location.state.id;
  // const index = location.state.index - 1;
  // const fullPath = location.state.fullPath;
  // const path = location.state.path;

  const stringAvatar = () => {
    return {
      sx: {
        bgcolor: `#${Math.floor(Math.random() * (999999 - 100000)) + 100000}`,
      },
    };
  };
  const database = () => {
    // console.log(path);
    // console.log(index);
    console.log(id);
    fetch(`http://127.0.0.1:3001/api/categories/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // console.log(data["reviews"][0]["review_topics"]);
        setFile(data);
        setProductImage(data["product_images_src"][0]);
        setProductLink(data["all_products_href"][0]);
        setProductPrice(data["product_price"][0]);
        setProductRate(data["product_ratings"][0]);
        setProductRating(data["product_rating_points"][0]);
        setProductTitle(data["product_title"][0]);
        setProductDesc(data["product_description"][0]);
        setProductReviews(data["reviews"]);
        setCategory({
          category: data["category"][0],
          subcategory: data["subcategory"][0],
        });
        const len = data["reviews"].length;
        for (let i = 0; i < data["reviews"].length; i++) {
          // setReviewTopics([...data["reviews"][i]["review_topics"]]);
          reviewTopics.push(data["reviews"][i]["review_topics"]);
          console.log(data["reviews"][i]["review_topics"]);
        }
        console.log(file.product_images_src[0]);
      })
      .then(() => {
        for (const key in productReviews) {
          console.log(key);
        }
      })
      .catch((e) => {
        if (e.message == "Failed to fetch") {
          setError("Server not found");
        }
      });
  };
  const fetchData = async () => {
    try {
      const response = await fetch(
        "mongodb://localhost:27017/OpinioMine/computers_laptops"
      ); // Assuming backend server is running on the same host
      console.log(response);
      const jsonData = await response.json();
      setData(jsonData);
      console.log(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    }
  };
  useEffect(() => {
    database();
    // const index = location.state - 1;
    // const path = location.path;
    // console.log(path);
    // database();
    // fetch(`http://127.0.0.1:8080/reviews/${fullPath}/${index}`)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     // console.log(data);
    //   })
    //   .catch((e) => {
    //     if (e.message == "Failed to fetch") {
    //       setError("Server not found");
    //     }
    //   });
  }, []);
  return (
    <Box sx={{ marginTop: 10, padding: 5 }}>
      {category != {} && (
        <h2>{category.category + ">" + category.subcategory}</h2>
      )}
      <Card elevation={10} sx={{ padding: 5, borderRadius: 3 }}>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <div style={{ margin: "2rem" }}>
            <img
              src={productImage !== "" ? productImage : IMG_PLACE}
              alt={file.product_title}
              loading="lazy"
              // height={"300px"}
              style={{ maxWidth: "300px" }}
            />
          </div>
          <div style={{ flex: 2 }}>
            <Typography variant="h4" color={"#000"}>
              {productTitle}
            </Typography>
            <Typography
              variant="body1"
              color={"#000"}
              sx={{ margin: 1, marginX: 3, textAlign: "justify" }}
            >
              {productDesc}
            </Typography>
            <Typography
              variant="h5"
              color={"#000"}
              sx={{ margin: 1, marginX: 3, textAlign: "justify" }}
            >
              {productPrice.length > 0 && productPrice.split(".")[0]}
              <Typography variant="overline">
                {productPrice.length > 0
                  ? productPrice.split(".")[1]
                  : "Out of Stock"}
              </Typography>
            </Typography>
            <Tooltip title={`${productRating} out of 5 rating`} followCursor>
              <div
                style={{
                  width: "fit-content",
                  margin: 1,
                  marginLeft: "20px",
                  textAlign: "justify",
                }}
              >
                <Rating
                  name="half-rating"
                  defaultValue={productRating}
                  value={productRating}
                  precision={0.1}
                  readOnly
                />
              </div>
            </Tooltip>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            alignItems: "center",
            padding: "10px 20px 0 20px",
            marginTop: "50px",
          }}
        >
          <Typography variant="h4" color={"#000"}>
            Reviews
          </Typography>
          <Typography variant="h5">
            {productRate.split(" ")[0]} reviews
          </Typography>
        </div>
        <div>
          <Box>
            <Typography variant="h4" sx={{ textAlign: "center", my: 2 }}>
              Helpful Reviews
            </Typography>
          </Box>
          <Card elevation={0} sx={{ borderRadius: 3 }}>
            {productReviews.map(
              (data, i) =>
                data.review_helpfulness >= 0.5 && (
                  <Accordion
                    key={i}
                    defaultExpanded={false}
                    sx={{ backgroundColor: "#112d4e33" }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon htmlColor="#fff" />}
                      aria-controls="panel3-content"
                      id="panel3-header"
                      sx={{
                        backgroundColor: "#112d4e",
                        color: "#fff",
                        display: "flex",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                      }}
                    >
                      <Tooltip title={data.reviewer_name}>
                        <Avatar
                          {...stringAvatar()}
                          children={data.reviewer_name[0]}
                          // src={auth.currentUser.photoURL}
                        />
                      </Tooltip>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: "100%",
                          marginLeft: "15px",
                        }}
                      >
                        <div>
                          <Typography variant="h5">
                            {data.reviewer_name
                              ? data.reviewer_name
                              : "Someone"}{" "}
                            :{" "}
                            <Typography variant="subtitle1">
                              {data.review_title}
                            </Typography>
                          </Typography>
                        </div>
                        <Typography
                          variant="caption"
                          sx={{ textAlign: "right", marginX: 5 }}
                        >
                          {data.reviewer_country_date}
                        </Typography>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails>{data.review_body}</AccordionDetails>
                    <AccordionDetails sx={{ marginX: 5, padding: "0" }}>
                      <Typography variant="caption" sx={{ fontWeight: "bold" }}>
                        Topics discussed in the review.
                      </Typography>
                    </AccordionDetails>
                    <AccordionDetails>
                      <div
                        style={{ display: "flex", flexWrap: "wrap", gap: 8 }}
                      >
                        {reviewTopics[i].map((item, j) => (
                          <Chip
                            label={item}
                            size="large"
                            sx={{ backgroundColor: "#112d4e", color: "#fff" }}
                            key={j}
                          />
                        ))}
                      </div>
                    </AccordionDetails>
                    <AccordionActions
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingX: 5,
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Tooltip
                          title={`${
                            data.reviews ? data.reviews.split(" ")[0] : "0"
                          } out of 5 rating`}
                          followCursor
                        >
                          <div
                            style={{
                              width: "fit-content",
                              margin: 1,
                              marginLeft: "20px",
                              marginRight: "30px",
                              textAlign: "justify",
                            }}
                          >
                            <Rating
                              name="half-rating"
                              defaultValue={data.reviews.split(" ")[0]}
                              value={data.reviews.split(" ")[0]}
                              precision={0.1}
                              readOnly
                            />
                          </div>
                        </Tooltip>
                        <Typography
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          {/* {data.review_votes} people found this helpful */}
                          <Typography variant="h6" fontWeight={700}>
                            Helpful
                          </Typography>
                          <LinearProgress
                            variant="determinate"
                            sx={{
                              "& .MuiLinearProgress-barColorPrimary": {
                                backgroundColor: "#112d4e",
                              },
                              width: "clamp(70px, 10vw, 200px)",
                              height: "10px",
                              mx: 1,
                              borderRadius: "10px",
                            }}
                            value={parseInt(data.review_helpfulness * 100)}
                          />
                          <Typography variant="h6" fontWeight={700}>
                            {parseInt(data.review_helpfulness * 100)}%
                          </Typography>
                        </Typography>
                      </div>
                      <div>
                        <Typography
                          variant="h4"
                          sx={{
                            display: "flex",
                            alignitems: "end",
                            justifycontent: "space-between",
                          }}
                        >
                          <Typography variant="h6" fontWeight={700}>
                            {data.review_votes}
                          </Typography>
                          <ThumbUpIcon sx={{ color: "#112d4e" }} />
                        </Typography>
                      </div>
                    </AccordionActions>
                  </Accordion>
                )
            )}
          </Card>
          {/* {error}
          {data.map((item, index) => (
            <li key={index}>{JSON.stringify(item)}</li>
          ))} */}
        </div>
      </Card>
    </Box>
  );
};

export default ItemDetails;
