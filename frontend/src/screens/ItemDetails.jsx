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
  Box,
  Button,
  Card,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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

  const location = useLocation();
  const index = location.state - 1;

  useEffect(() => {
    fetch(`http://127.0.0.1:8080/sentiments/${index}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setFile(data);
        setProductImage(data["product_images_src"][0]);
        setProductLink(data["all_products_href"][0]);
        setProductPrice(data["product_price"][0]);
        setProductRate(data["product_ratings"][0]);
        setProductRating(data["product_rating_points"][0]);
        setProductTitle(data["product_title"][0]);
        setProductDesc(data["product_description"][0]);
        setProductReviews(data["reviews"]);
      })
      .catch((e) => {
        if (e.message == "Failed to fetch") {
          setError("Server not found");
          // console.log("Server not found");
        }
      });
    fetch(
      "http://apilayer.net/api/live?access_key=e5a71c0c6b6e74ad5e1a3c81b24c4d8f&currencies=USD,PKR"
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.quotes['USDPKR']);
        data &&
          data.quotes &&
          // data.quotes["USDPKR"] &&
          setDollar(data.quotes["USDPKR"]);
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
        <img
          src={file.product_images_src}
          alt={file.product_title}
          loading="lazy"
          height={"300px"}
          style={{ alignSelf: "center" }}
        />
        <Typography variant="h1">{index}</Typography>
        <div>
          <Typography variant="h5" color={"#000"}>
            title::::::::::::::::::: {productTitle}
          </Typography>
          <Typography variant="h5" color={"#000"}>
            description::::::::::::: {productDesc}
          </Typography>
          <Typography variant="h5" color={"#000"}>
            link:::::::::::::::::::: {productLink}
          </Typography>
          <Typography variant="h5" color={"#000"}>
            price::::::::::::::::::: {productPrice.split(".")[0]}
            <Typography variant="caption">
              {productPrice.split(".")[1]}
            </Typography>
          </Typography>
          <Typography variant="h5" color={"#000"}>
            reviews:::::::::::::::::: {productRate.split(" ")[0]}
          </Typography>
          <Typography variant="h5" color={"#000"}>
            average rating:::::::::::::::::: {productRating}
          </Typography>
          {/* <Typography variant="h5" color={"#000"}>
            {productTitle}
          </Typography> */}
          <Typography variant="h3" color={"#000"}>
            Reviews
          </Typography>
          <div>
            <Card elevation={0}>
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
                  >
                    <Typography variant="h5">
                      review {i+1} : {data.review_title}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>{data.review_body}</AccordionDetails>
                  <AccordionActions>
                    <Button>Cancel</Button>
                    <Button>Agree</Button>
                  </AccordionActions>
                </Accordion>
              ))}
            </Card>
          </div>
        </div>
      </Card>
    </Box>
  );
};

export default ItemDetails;
