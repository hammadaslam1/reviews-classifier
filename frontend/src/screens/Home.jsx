/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
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
import { useNavigate } from "react-router-dom";
// import { useHistory } from 'react-router-dom'

const Home = () => {
  const [file, setFile] = useState([]);
  const [dollar, setDollar] = useState(0);
  const [searchedItem, setSearchedItem] = useState("");
  const [sentiment, setSentiment] = useState("all");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  // const history = useHistory();
  useEffect(() => {
    fetch("http://127.0.0.1:8080/")
      .then((response) => response.json())
      .then((data) => {
        // console.log("found");
        setFile(data);
      })
      .catch((e) => {
        if (e.message == "Failed to fetch") {
          setError("Server not found");
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

  const handleItem = (index) => {
    navigate(ITEM_DETAILS, { state: index });
  };
  // const [data, setData] = useState([]);
  // let [count, setCount] = useState(0);
  // const getData = () => {
  //   fetch("../../../dataset/amazon_computers.json", {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       setFile(data);
  //     });
  // };
  // useEffect(() => {
  //   getData();
  // }, []);
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
          <SentimentButton
            variant={sentiment == "all" ? "contained" : "plain"}
            sx={{
              backgroundColor: sentiment == "all" ? "#023d65" : "#f5fadf",
              color: sentiment == "all" ? "#fff" : "#023d65",
            }}
            onClick={() => setSentiment("all")}
            value={"All"}
          />
          <SentimentButton
            variant={sentiment == "positive" ? "contained" : "plain"}
            sx={{
              backgroundColor: sentiment == "positive" ? "#023d65" : "#f5fadf",
              color: sentiment == "positive" ? "#fff" : "#023d65",
            }}
            onClick={() => setSentiment("positive")}
            value={"Positive"}
          />
          <SentimentButton
            variant={sentiment == "negative" ? "contained" : "plain"}
            sx={{
              backgroundColor: sentiment == "negative" ? "#023d65" : "#f5fadf",
              color: sentiment == "negative" ? "#fff" : "#023d65",
            }}
            onClick={() => setSentiment("negative")}
            value={"Negative"}
          />
          <SentimentButton
            variant={sentiment == "neutral" ? "contained" : "plain"}
            sx={{
              backgroundColor: sentiment == "neutral" ? "#023d65" : "#f5fadf",
              color: sentiment == "neutral" ? "#fff" : "#023d65",
            }}
            onClick={() => setSentiment("neutral")}
            value={"Neutral"}
          />
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
            // console.log(data.product_title[0])&&
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
                  width: 350,
                  margin: 2,
                  borderRadius: 3,
                }}
              >
                <CardActionArea
                  // href={data.all_products_href[0]}
                  // href={`${ITEM_DETAILS}?id=${i}`}
                  // href={ITEM_DETAILS}
                  onClick={() => {
                    handleItem(i+1);
                  }}
                  target="_blank"
                >
                  <CardMedia
                    component="img"
                    height="300"
                    image={data.product_images_src[0]}
                    // image={PLACEHOLDER}
                    // alt="green iguana"
                  />
                  <CardContent>
                    <Tooltip title={data.product_title[0]} followCursor={true}>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        noWrap
                        ellipsis
                      >
                        {data.product_title[0]}
                      </Typography>
                    </Tooltip>
                    <Tooltip
                      title={data.product_description[0]}
                      sx={{ height: 20 }}
                      followCursor={true}
                    >
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        noWrap
                        ellipsis
                      >
                        {data.product_description[0]}
                      </Typography>
                    </Tooltip>
                    <Tooltip
                      title={data.product_price[0]}
                      sx={{ height: 25, marginTop: 2 }}
                      followCursor={false}
                    >
                      <Typography
                        variant="h5"
                        color="text.secondary"
                        noWrap
                        ellipsis
                      >
                        {dollar
                          ? "PKR " +
                            (
                              data.product_price[0].replace(/[^\d\.]/g, "") *
                              dollar
                            ).toFixed(2)
                          : data.product_price[0]
                          ? data.product_price[0]
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
                    href={data.all_products_href[0]}
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

export default Home;