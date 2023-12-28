import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import PLACEHOLDER from "../assets/placeholder/placeholder.svg";

const Home = () => {
  const [file, setFile] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:8080/")
      .then((response) => response.json())
      .then((data) => {
        console.log("found");
        setFile(data);
      });
  }, []);
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
      {file.map((data, i) => (
        <Card key={i} sx={{ backgroundColor: "#fff", width: "30%", margin: 2 }}>
          <CardActionArea href={data.all_products_href} target="_blank">
            <CardMedia
              component="img"
              height="300"
              image={data.product_images_src}
              // image={PLACEHOLDER}
              // alt="green iguana"
            />
            <CardContent>
              <Tooltip title={data.product_title} followCursor={true}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  noWrap
                  ellipsis
                >
                  {data.product_title}
                </Typography>
              </Tooltip>
              <Tooltip
                title={data.product_description}
                sx={{ height: 20 }}
                followCursor={true}
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
      ))}
    </Card>
  );
};

export default Home;
