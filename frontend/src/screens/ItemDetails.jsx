/* eslint-disable array-callback-return */
/* eslint-disable no-useless-escape */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import { Box, Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ItemDetails = ({ props }) => {
  const [file, setFile] = useState([]);
  const [dollar, setDollar] = useState(0);
  const [searchedItem, setSearchedItem] = useState("");
  const [sentiment, setSentiment] = useState("all");
  const [error, setError] = useState("");
  //   const { id } = props.match.params;
  const location = useLocation();
  const index = location.state - 1;
  useEffect(() => {
    fetch("http://127.0.0.1:8080/")
      .then((response) => response.json())
      .then((data) => {
        console.log(data[index]);
        // setFile(data[index]);
        file.push(data[index])
        console.log(file && file["reviews"]);
        console.log(file && file["reviews"]);
        file["reviews"].map((data, i) => {
          console.log(file["reviews"][0]);
        });
      })
      .catch((e) => {
        if (e.message == "Failed to fetch") {
          setError("Server not found");
          console.log("Server not found");
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
    <Box sx={{ marginTop: 10 }}>
      {/* <Typography variant="h3" color={"#023d65"}>
        record is{" "}
        {(file.product_price[0].replace(/[^\d\.]/g, "") * dollar).toFixed(2)}{" "}
        and index is {index}
      </Typography> */}
      <Card>
        <img
          src={file.product_images_src}
          alt={file.product_title}
          loading="lazy"
          height={"100px"}
        />
        {file.length>0 &&
          file["reviews"].map((data, i) => (
            <div>
              <Typography variant="h5" key={i}>
                {data.review_title}
              </Typography>
              <Typography variant="h5" key={i}>
                Reviewer Name: {data.reviewer_name}
              </Typography>
              <Typography variant="h5" key={i}>
                {data.review_body}
              </Typography>
            </div>
          ))
          }
      </Card>
    </Box>
  );
};

export default ItemDetails;
