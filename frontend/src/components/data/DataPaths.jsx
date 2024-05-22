/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import "../../styles/globals.css";
import React from "react";
import DevicesIcon from "@mui/icons-material/Devices";
import { Gite, Kitchen } from "@mui/icons-material";

export const category = [
  "Appliances",
  "Electronics",
  "Tools & Home Improvement",
  "Clothing, Shoes & Jewelry",
  "Computers and Accessories",
  "Home & Kitchen",
];

export const subCat = [
  {
    category: "Appliances",
    name: "Appliances",
    fullPath: "appliances",
    path: "appliances",
    icon: <Kitchen />,
  },
  {
    category: "Electronics",
    name: "Camera & Photo",
    fullPath: "camera_and_photo",
    path: "electronics",
    icon: <DevicesIcon />,
  },
  {
    category: "Electronics",
    name: "Computer & Laptop",
    fullPath: "computers_laptops",
    path: "home",
    icon: <Gite />,
  },
  {
    category: "Computers and Accessories",
    name: "Computer & Tablet",
    fullPath: "computers_tablets",
    path: "kitchen",
    icon: <Kitchen />,
  },
  {
    category: "Tools & Home Improvement",
    name: "Home Improvement",
    fullPath: "home_improvement",
    path: "computers",
    icon: <DevicesIcon />,
  },
  {
    category: "Home & Kitchen",
    name: "Kitchen & Bath Fixtures",
    fullPath: "kitchen_bath_fixtures",
    path: "mens_fashion",
    icon: <DevicesIcon />,
  },
  {
    category: "Clothing, Shoes & Jewelry",
    name: "Men's Jackets",
    fullPath: "mens_jackets",
    path: "mens_fashion",
    icon: <DevicesIcon />,
  },
  {
    category: "Clothing, Shoes & Jewelry",
    name: "Men's Running Shoes",
    fullPath: "mens_running_shoes",
    path: "mens_fashion",
    icon: <DevicesIcon />,
  },
  {
    category: "Clothing, Shoes & Jewelry",
    name: "Men's Smart Watches",
    fullPath: "mens_smart_watches",
    path: "womens_fashion",
    icon: <DevicesIcon />,
  },
  {
    category: "Clothing, Shoes & Jewelry",
    name: "Men's Wrist Watches",
    fullPath: "mens_wrist_watches",
    path: "womens_fashion",
    icon: <DevicesIcon />,
  },
  {
    category: "Electronics",
    name: "Wifi & Networking",
    fullPath: "wifi_and_networking",
    path: "womens_fashion",
    icon: <DevicesIcon />,
  },
];
