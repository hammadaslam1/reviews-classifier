/* eslint-disable no-unused-vars */
import { Input } from "@mui/joy";
import { InputBase, alpha, styled } from "@mui/material";
// import { FiSearch } from "react-icons/fi";

const SearchInput = ({ sx = {}, ...props }) => {
  const SearchBar = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.45),
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 1.5),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1.5, 1, 1.5, 1),
      paddingLeft: `calc(1em + ${theme.spacing(3)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      height: '100%',
    },
  }));
  return (
    // <SearchBar
    //   sx={{
    //     // height: "50%",
    //     backgroundColor: "#00000059",
    //     color: "white",
    //     borderRadius: "5px",
    //     alignItems: "center",
    //     ...sx,
    //   }}
    // >
    //   <SearchIconWrapper>
    //     <FiSearch fontSize={props.fontSize} />
    //   </SearchIconWrapper>
    //   <StyledInputBase
    //     sx={{ fontSize: "13px", width: '100%', }}
    //     placeholder={ph ? ph : "Search for an item"}
    //     inputProps={{ "aria-label": "search" }}
    //     // value={props.value}
    //     // onChange={props.onChange}
    //     {...props}
    //   />
    // </SearchBar>
    <Input
      variant="plain"
      sx={{ backgroundColor: "#ffffffcc", marginY: "15px", borderRadius: '8px', ...sx }}
      {...props}
    />
  );
};

export default SearchInput;