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
  Paper,
  Rating,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IMG_PLACE from "../assets/placeholder/product_placeholder_img.jpg";
import { FiThumbsUp } from "react-icons/fi";
import { BASE_URL } from "../ENV";
import { useSelector } from "react-redux";
import { DetailsCSS } from "../styles/DetailsCSS";

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
  const [cat, setCat] = useState([]);
  const [length, setLength] = useState(0);

  const { record } = useSelector((state) => state.record);
  const { category } = useSelector((state) => state.category);

  // const location = useLocation();
  // const id = location.state.id;
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
    fetch(`${BASE_URL}api/categories/${category}/${record}`)
      .then((response) => response.json())
      .then((data) => {
        setFile(data);
        setProductImage(data["product_images_src"]);
        setProductLink(data["all_products_href"]);
        setProductPrice(data["product_price"]);
        setProductRate(data["product_ratings"]);
        setProductRating(data["product_rating_points"]);
        setProductTitle(data["product_title"]);
        setProductDesc(data["product_description"]);
        setProductReviews(data["reviews"]);
        setCat(data["category"]);
        setLength(data["category"].length);
        const len = data["reviews"].length;
        for (let i = 0; i < data["reviews"].length; i++) {
          reviewTopics.push(data["reviews"][i]["review_topics"]);
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
  };
  useEffect(() => {
    database();
  }, []);
  return (
    <Box sx={DetailsCSS.mainBox}>
      {length > 0 &&
        new Array(length - 1)
          .fill(1)
          .map((data, i) => <><span style={DetailsCSS.category}>{cat[i]}</span><span>{" > "}</span></>)}
      {length > 1 && <span style={DetailsCSS.category}>{cat[length - 1]}</span>}
      <Card elevation={10} sx={DetailsCSS.firstChild}>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <div style={{ margin: "2rem" }}>
            <img
              src={productImage !== "" ? productImage : IMG_PLACE}
              alt={file.product_title}
              loading="lazy"
              style={{ maxWidth: "300px" }}
            />
          </div>
          <div style={{ flex: 2 }}>
            <Typography variant="h5" color={"#112d4e"} fontWeight={600}>
              {productTitle}
            </Typography>
            <Typography
              variant="body2"
              color={"#000"}
              sx={DetailsCSS.description}
            >
              {productDesc}
            </Typography>
            <Typography variant="h5" color={"#000"} sx={DetailsCSS.description}>
              {productPrice.length > 0 && `${productPrice}`}
              <Typography variant="overline">
                {productPrice.length > 0 ? productPrice.split : "Out of Stock"}
              </Typography>
            </Typography>
            <Tooltip
              title={`${productRating} out of 5 rating`}
              placement="top"
              followCursor
            >
              <div style={DetailsCSS.topRating}>
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
        <div style={DetailsCSS.reviews}>
          <Typography variant="h5" color={"#000"}>
            Reviews
          </Typography>
          <Typography variant="h6">{productRate} ratings</Typography>
        </div>
        <div>
          <Box>
            <Typography variant="h5" sx={DetailsCSS.hgHeading}>
              Human Generated Reviews
            </Typography>
          </Box>
          <Card elevation={0} sx={{ borderRadius: 3 }}>
            {productReviews.map(
              (data, i) =>
                // data.review_helpfulness >= 0.5 &&
                data.review_fakeness == 1 && (
                  <Accordion
                    key={i}
                    defaultExpanded={false}
                    sx={{ backgroundColor: "#112d4e33" }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon htmlColor="#fff" />}
                      aria-controls="panel3-content"
                      id="panel3-header"
                      sx={DetailsCSS.reviewSummary}
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
                          placement="top"
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
                    <Accordion
                      sx={{
                        backgroundColor: "#112d4e33",
                        m: 3,
                        borderRadius: "5px",
                        overflow: "hidden",
                      }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon htmlColor="#fff" />}
                        aria-controls="panel3-content"
                        id="panel3-header"
                        sx={DetailsCSS.reviewSummary}
                      >
                        <Typography variant="h6">Review Stats</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <TableContainer component={Paper}>
                          <Table
                            sx={{ minWidth: 700 }}
                            aria-label="customized table"
                          >
                            <TableHead>
                              <TableRow>
                                <TableCell
                                component={'h3'}
                                  sx={{
                                    backgroundColor: "#112d4e",
                                    color: "#fff",
                                    fontWeight: "600",
                                  }}
                                >
                                  Attribute
                                </TableCell>
                                <TableCell
                                  sx={{
                                    backgroundColor: "#112d4e",
                                    color: "#fff",
                                    fontWeight: "600",
                                  }}
                                >
                                  Value {"(usually between 0 and 1)"}
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <TableRow>
                                <TableCell
                                  component="th"
                                  scope="row"
                                  sx={DetailsCSS.attribute}
                                >
                                  Similarity with Description
                                </TableCell>
                                <TableCell component="td">
                                  {data.similarity_text_description.toFixed(4)}
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell
                                  component="th"
                                  scope="row"
                                  sx={DetailsCSS.attribute}
                                >
                                  Similarity with Categories
                                </TableCell>
                                <TableCell component="td">
                                  {data.similarity_text_categories.toFixed(4)}
                                </TableCell>
                              </TableRow>
                              {/* <TableRow>
                                <TableCell
                                  component="th"
                                  scope="row"
                                  sx={DetailsCSS.attribute}
                                >
                                  Review Length
                                </TableCell>
                                <TableCell component="td">
                                  {data.review_length}
                                </TableCell>
                              </TableRow> */}
                              <TableRow>
                                <TableCell
                                  component="th"
                                  scope="row"
                                  sx={DetailsCSS.attribute}
                                >
                                  User's Reviews
                                </TableCell>
                                <TableCell component="td">
                                  {data.reviews_count.toFixed(4)}
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell
                                  component="th"
                                  scope="row"
                                  sx={DetailsCSS.attribute}
                                >
                                  Sentiment
                                </TableCell>
                                <TableCell component="td">
                                  {data.review_stats.Sentiment.toFixed(4)}
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell
                                  component="th"
                                  scope="row"
                                  sx={DetailsCSS.attribute}
                                >
                                  Subjectivity
                                </TableCell>
                                <TableCell component="td">
                                  {data.review_stats.Subjectivity.toFixed(4)}
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell
                                  component="th"
                                  scope="row"
                                  sx={DetailsCSS.attribute}
                                >
                                  No. of Words
                                </TableCell>
                                <TableCell component="td">
                                  {data.review_stats.Word_count.toFixed(4)}
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell
                                  component="th"
                                  scope="row"
                                  sx={DetailsCSS.attribute}
                                >
                                  Unique Words
                                </TableCell>
                                <TableCell component="td">
                                  {data.review_stats.Unique_words.toFixed(4)}
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell
                                  component="th"
                                  scope="row"
                                  sx={DetailsCSS.attribute}
                                >
                                  Noun Count
                                </TableCell>
                                <TableCell component="td">
                                  {data.review_stats.Noun_count.toFixed(4)}
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell
                                  component="th"
                                  scope="row"
                                  sx={DetailsCSS.attribute}
                                >
                                  Adjective Count
                                </TableCell>
                                <TableCell component="td">
                                  {data.review_stats.Adj_count.toFixed(4)}
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell
                                  component="th"
                                  scope="row"
                                  sx={DetailsCSS.attribute}
                                >
                                  Verb Count
                                </TableCell>
                                <TableCell component="td">
                                  {data.review_stats.Verb_count.toFixed(4)}
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell
                                  component="th"
                                  scope="row"
                                  sx={DetailsCSS.attribute}
                                >
                                  Adverb Count
                                </TableCell>
                                <TableCell component="td">
                                  {data.review_stats.Adv_count.toFixed(4)}
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell
                                  component="th"
                                  scope="row"
                                  sx={DetailsCSS.attribute}
                                >
                                  Articles Count
                                </TableCell>
                                <TableCell component="td">
                                  {data.review_stats.Art_count.toFixed(4)}
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell
                                  component="th"
                                  scope="row"
                                  sx={DetailsCSS.attribute}
                                >
                                  AUX Count
                                </TableCell>
                                <TableCell component="td">
                                  {data.review_stats.Aux_count.toFixed(4)}
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell
                                  component="th"
                                  scope="row"
                                  sx={DetailsCSS.attribute}
                                >
                                  Authenticity
                                </TableCell>
                                <TableCell component="td">
                                  {data.review_stats.Authenticity.toFixed(4)}
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell
                                  component="th"
                                  scope="row"
                                  sx={DetailsCSS.attribute}
                                >
                                  AT
                                </TableCell>
                                <TableCell component="td">
                                  {data.review_stats.AT.toFixed(4)}
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </AccordionDetails>
                    </Accordion>
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
