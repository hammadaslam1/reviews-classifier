/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import "../../styles/globals.css";
import React from "react";
import DevicesIcon from "@mui/icons-material/Devices";
import { Gite, Kitchen } from "@mui/icons-material";

export const category = [
  "Electronics",
  "Tools & Home Improvement",
  "Computers & Accessories",
  "Men's Fashion",
  "Women's Fashion",
  "Wifi and Networking",
];

export const subCat = [
  {
    category: "Electronics",
    name: "Camera & Phones",
    fullPath: "electronics/camera_and_photo.json",
    path: "electronics",
    icon: <DevicesIcon />,
  },
  {
    category: "Tools & Home Improvement",
    name: "Appliances",
    fullPath: "tools_and_home_improvement/appliances.json",
    path: "appliances",
    icon: <Kitchen />,
  },
  {
    category: "Tools & Home Improvement",
    name: "Home Improvement",
    fullPath: "tools_and_home_improvement/home_improvement.json",
    path: "home",
    icon: <Gite />,
  },
  {
    category: "Tools & Home Improvement",
    name: "Kitchen and Bath Fixtures",
    fullPath: "tools_and_home_improvement/kitchen_bath_fixtures.json",
    path: "kitchen",
    icon: <Kitchen />,
  },
  {
    category: "Computers & Accessories",
    name: "Computers & Tablets",
    fullPath: "computers/computers.json",
    path: "computers",
    icon: <DevicesIcon />,
  },
  {
    category: "Men's Fashion",
    name: "Men's Jackets",
    fullPath: "mens_fashion/mens_jackets.json",
    path: "mens_fashion",
    icon: <DevicesIcon />,
  },
  {
    category: "Men's Fashion",
    name: "Men's Shoes",
    fullPath: "mens_fashion/mens_running_shoes.json",
    path: "mens_fashion",
    icon: <DevicesIcon />,
  },
  {
    category: "Men's Fashion",
    name: "Men's Watches",
    fullPath: "mens_fashion/mens_watches.json",
    path: "mens_fashion",
    icon: <DevicesIcon />,
  },
  {
    category: "Women's Fashion",
    name: "Women's Jackets",
    fullPath: "womens_fashion/womens_casual_jackets.json",
    path: "womens_fashion",
    icon: <DevicesIcon />,
  },
];
