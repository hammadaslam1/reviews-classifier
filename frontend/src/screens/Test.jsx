import { Input } from "@mui/joy";
import {
  Backdrop,
  Box,
  Button,
  Card,
  CircularProgress,
  FormControl,
  FormHelperText,
  FormLabel,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { DetailsCSS } from "../styles/DetailsCSS";
import axios from "axios";
import { PYTHON_URL } from "../ENV";

const Test = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);

  const handleSend = async () => {
    setLoading(true);
    console.log(stats[0]);
    try {
      const response = await axios.post(`${PYTHON_URL}/fakeness`, {
        review: input,
      });
      const result = await response.data;
      setLoading(false);
      const res = await JSON.stringify(result);
      alert(res)
      setStats(res.stats);
    } catch (error) {
      setLoading(false);
      alert(error.message);
    }
  };
  return (
    // get an input field with mui component for data request to api and a table to display response
    <Box
      sx={{
        // minHeight: "100vh",
        // minWidth: "95vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 10,
      }}
    >
      <Backdrop
        sx={{ color: "#112d4e", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div>
        <Card
          elevation={0}
          sx={{
            p: 2,
            minWidth: "450px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <FormControl sx={{ marginY: "4px", width: "100%" }}>
            <FormLabel
              sx={{ fontSize: "14px", marginBottom: "2px", color: "#112d4e" }}
            >
              Enter Your Review Text
            </FormLabel>
            <Input
              type="text"
              variant="outlined"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              sx={{ padding: "8px 12px" }}
              placeholder="I like this product."
              required
            />
            {/* <textarea {...props} /> */}
            <FormHelperText sx={{ color: "#112d4e" }}>
              This will check for its fakeness.
            </FormHelperText>
          </FormControl>
          <Button
            variant="contained"
            onClick={handleSend}
            sx={{
              backgroundColor: "#112d4e",
              textTransform: "capitalize",
              ml: 1,
              "&:hover": { backgroundColor: "#fff", color: "#112d4e" },
            }}
          >
            Send
          </Button>
        </Card>
        <div
          style={{
            padding: "1px",
            borderBottom: "2px solid #112d4e",
            margin: "10px 0",
          }}
        >
          <Typography variant="h4" textAlign={"center"} color={"#112d4e"}>
            Statistics
          </Typography>
        </div>
        <Card>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <TableCell
                    component={"h3"}
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
                  <TableCell component="td">{stats && stats[0]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={DetailsCSS.attribute}
                  >
                    Similarity with Categories
                  </TableCell>
                  <TableCell component="td">{stats && stats[1]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={DetailsCSS.attribute}
                  >
                    User's Reviews
                  </TableCell>
                  <TableCell component="td">{stats && stats[2]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={DetailsCSS.attribute}
                  >
                    Sentiment
                  </TableCell>
                  <TableCell component="td">{stats && stats[3]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={DetailsCSS.attribute}
                  >
                    Subjectivity
                  </TableCell>
                  <TableCell component="td">{stats && stats[4]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={DetailsCSS.attribute}
                  >
                    No. of Words
                  </TableCell>
                  <TableCell component="td">{stats && stats[5]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={DetailsCSS.attribute}
                  >
                    Unique Words
                  </TableCell>
                  <TableCell component="td">{stats && stats[6]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={DetailsCSS.attribute}
                  >
                    Noun Count
                  </TableCell>
                  <TableCell component="td">{stats && stats[7]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={DetailsCSS.attribute}
                  >
                    Adjective Count
                  </TableCell>
                  <TableCell component="td">{stats && stats[8]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={DetailsCSS.attribute}
                  >
                    Verb Count
                  </TableCell>
                  <TableCell component="td">{stats && stats[9]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={DetailsCSS.attribute}
                  >
                    Adverb Count
                  </TableCell>
                  <TableCell component="td">{stats && stats[10]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={DetailsCSS.attribute}
                  >
                    Articles Count
                  </TableCell>
                  <TableCell component="td">{stats && stats[11]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={DetailsCSS.attribute}
                  >
                    AUX Count
                  </TableCell>
                  <TableCell component="td">{stats && stats[12]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={DetailsCSS.attribute}
                  >
                    Authenticity
                  </TableCell>
                  <TableCell component="td">{stats && stats[13]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={DetailsCSS.attribute}
                  >
                    AT
                  </TableCell>
                  <TableCell component="td">{stats && stats[14]}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </div>
    </Box>
  );
};

export default Test;
