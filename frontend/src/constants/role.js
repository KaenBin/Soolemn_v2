import { createElement } from "react";
import HomeIcon from "@mui/icons-material/Home";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import ArchiveIcon from "@mui/icons-material/Archive";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import StoreIcon from "@mui/icons-material/Store";

export const VendorSideBar = [
  {
    title: "Dashboard",
    link: "/dashboard",
    icon: createElement(HomeIcon, null),
  },
  {
    title: "Manage Orders",
    link: "/order/manage",
    icon: createElement(ArchiveIcon, null),
  },
  {
    title: "Manage Products",
    link: "/product/manage",
    icon: createElement(Inventory2OutlinedIcon, null),
  },
  {
    title: "Manage Transport",
    link: "/transport/manage",
    icon: createElement(LocalShippingIcon, null),
  },
  {
    title: "Manage Shop",
    link: "/shop/manage",
    icon: createElement(StoreIcon, null),
  },
];

export const AdminSideBar = [
  {
    title: "Dashboard",
    link: "/dashboard",
    icon: createElement(HomeIcon, null),
  },
  {
    title: "Manage Users",
    link: "admin/users",
    icon: createElement(ManageAccountsOutlinedIcon, null),
  },
];
