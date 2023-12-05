import { Card, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const index = () => {
  const [file, setFile] = useState({
    'message': 'none'
  });
  useEffect(() => {
    fetch("http://127.0.0.1:8080/api/home")
      .then((response) => response.json())
      .then((data) => setFile(data));
  }, []);

  return <>
  </>;
};

export default index;
