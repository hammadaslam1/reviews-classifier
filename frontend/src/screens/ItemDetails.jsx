/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable array-callback-return */
/* eslint-disable no-useless-escape */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
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
  Rating,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IMG_PLACE from "../assets/placeholder/product_placeholder_img.jpg";

const ItemDetails = ({ props }) => {
  const [file, setFile] = useState([]);
  const [dollar, setDollar] = useState(0);
  const [error, setError] = useState("");

  const [productLink, setProductLink] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productRate, setProductRate] = useState("");
  const [productRating, setProductRating] = useState("");
  const [productTitle, setProductTitle] = useState("");
  const [productReviews, setProductReviews] = useState([]);
  const [reviewTopics, setReviewTopics] = useState([]);

  const location = useLocation();
  const index = location.state - 1;
  const path = location.path;

  const stringAvatar = () => {
    return {
      sx: {
        bgcolor: `#${Math.floor(Math.random() * (999999 - 100000)) + 100000}`,
      },
    };
  };

  useEffect(() => {
    fetch(`http://127.0.0.1:8080/sentiments/${path}/${index}`)
      .then((response) => response.json())
      .then((data) => {
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
        const len = data["reviews"].length;
        for (let i = 0; i < data["reviews"].length; i++) {
          // setReviewTopics([...data["reviews"][i]["review_topics"]]);
          reviewTopics.push(data["reviews"][i]["review_topics"]);
          console.log(data["reviews"][i]["review_topics"]);
        }
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
    fetch(`http://127.0.0.1:8080/reviews/${index}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
      })
      .catch((e) => {
        if (e.message == "Failed to fetch") {
          setError("Server not found");
        }
      });
  }, []);
  return (
    <Box sx={{ marginTop: 10, padding: 5 }}>
      <Card elevation={10} sx={{ padding: 5, borderRadius: 3 }}>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <div>
            <img
              src={
                file.product_images_src !== ""
                  ? file.product_images_src
                  : IMG_PLACE
              }
              // alt={file.product_title}
              loading="lazy"
              // height={"300px"}
              style={{ maxWidth: "300px" }}
            />
          </div>
          <div style={{ flex: 2 }}>
            <Typography variant="h4" color={"#000"}>
              {productTitle}
            </Typography>
            {/* <Typography variant="h5" sx={{ fontWeight: "900" }} color={"#000"}>
              Description:
            </Typography> */}
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
          <Typography variant="h5">{productRate}</Typography>
        </div>
        <div>
          <Card elevation={0} sx={{ borderRadius: 3 }}>
            {productReviews.map((data, i) => (
              <Accordion
                key={i}
                defaultExpanded={false}
                sx={{ backgroundColor: "#6a6a6a22" }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel3-content"
                  id="panel3-header"
                  sx={{
                    backgroundColor: "#6a6a6a",
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
                        {data.reviewer_name ? data.reviewer_name : "Someone"} :{" "}
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
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {reviewTopics[i].map((item, j) => (
                      <Chip label={item} size="large" key={j} />
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
                      title={`${data.reviews.split(" ")[0]} out of 5 rating`}
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
                    <Typography>
                      {data.review_helpfulness.includes(
                        "people found this helpful"
                      )
                        ? data.review_helpfulness
                        : "no one found this helpful"}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="h4">{data.sentiment}</Typography>
                  </div>
                </AccordionActions>
              </Accordion>
            ))}
          </Card>
        </div>
      </Card>
    </Box>
  );
};

export default ItemDetails;
