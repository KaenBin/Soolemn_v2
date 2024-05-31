import * as React from "react";
import { Link, NavLink } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import {
  Avatar,
  AppBar,
  Stack,
  Box,
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
  InputBase,
  Badge,
  MenuItem,
  Menu,
  Button,
  Divider,
  CssBaseline,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import { useDispatch, useSelector } from "react-redux";
import Popover from "@mui/material/Popover";

import { signOut } from "@/redux/actions/authActions";
import * as ROUTE from "@/constants/routes";
import apiInstance from "@/services/apiService";
import { Search } from "../search/Search";

// const Search = styled("div")(({ theme }) => ({
//   position: "relative",
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.black, 0.15),
//   "&:hover": {
//     backgroundColor: alpha(theme.palette.common.black, 0.25),
//   },
//   marginRight: theme.spacing(2),
//   marginLeft: theme.spacing(2),
//   width: "100%",
//   [theme.breakpoints.up("sm")]: {
//     marginLeft: theme.spacing(3),
//     width: "auto",
//   },
// }));
// const SearchIconWrapper = styled("div")(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: "100%",
//   position: "absolute",
//   pointerEvents: "none",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
// }));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20vw",
    },
  },
}));

const badgeStyle = {
  "& .MuiBadge-badge": {
    color: "white",
    backgroundColor: "#141718",
  },
};

export default function TopBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEL, setAnchorEL] = React.useState(null);
  const dispatch = useDispatch();
  const [avatar, setAvatar] = React.useState();
  const [imageUrl, setImageUrl] = React.useState();
  const profile = useSelector((state) => state.profile);
  const isMenuOpen = Boolean(anchorEl);
  const menuId = "primary-search-account-menu";
  const [searchQuery, setSearchQuery] = React.useState("");
  const currentUser = apiInstance.getCurrentUser();
  const [userData, setUserData] = React.useState([]);
  // const [cartLength, setCartLength] = React.useState(0);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handlePopoverOpen = (event) => {
    setAnchorEL(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEL(null);
  };

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter")
      History.navigate("/products", { state: { searchQuery } });
  };

  const open = Boolean(anchorEL);

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      disableScrollLock={true}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      style={{ padding: 0 }}
      open={isMenuOpen}
      onClose={() => handleMenuClose()}
    >
      <MenuItem
        onClick={() => {
          History.navigate("/account");
          handleMenuClose();
        }}
      >
        My account
      </MenuItem>
      <MenuItem
        onClick={() => {
          dispatch(signOut());
          handleMenuClose();
        }}
      >
        Sign Out
      </MenuItem>
    </Menu>
  );

  React.useEffect(() => {
    apiInstance
      .loadImage("gs://soolemn-cc5b9.appspot.com/defaultAvatar.jpg")
      .then((url) => {
        setImageUrl(url);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  React.useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await apiInstance.getUser(currentUser.email);

        setUserData(userData);
        // setCartLength(userData.cart.length);
      } catch (error) {
        console.error("Error occurred:", error);
      }
    };
    getUserData();
  }, [currentUser]);

  // const cartData = userData?.cart?.length || 0;

  // React.useEffect(() => {
  //   setCartLength(cartData);
  // }, [userData]);

  const cartItems = useSelector((state) => state.cart.cart);

  return (
    <Box sx={{ display: "flex" }} boxShadow={3}>
      <AppBar position="absolute" color="info">
        <Toolbar>
          <Stack
            width="100%"
            direction="row"
            alignItems="center"
            justifyContent="space-around"
            spacing={5}
          >
            <Typography
              variant="h5"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" }, fontWeight: "500" }}
            >
              <Link to="/home" className="navigation">
                Soolemn
              </Link>
            </Typography>
            <Stack
              id="navigation-menu"
              direction="row"
              alignItems="center"
              justifyContent="center"
            >
              <NavLink
                className="navigation"
                to={ROUTE.HOME}
                style={{ fontWeight: "500" }}
              >
                Home
              </NavLink>
              <NavLink
                id="products-page"
                className="navigation"
                to={ROUTE.PRODUCTS}
                style={{ fontWeight: "500" }}
              >
                Product
              </NavLink>
            </Stack>
            <div style={{ display: { xs: "none", md: "block" }, width: "25%" }}>
              <Search />
            </div>
            {/* <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                id="search"
                placeholder="Search…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchSubmit}
                inputProps={{ "aria-label": "search" }}
              />
            </Search> */}
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              spacing={1}
            >
              <Stack
                sx={{ display: { xs: "none", md: "flex" } }}
                direction="row"
                alignItems="center"
                justifyContent="center"
                spacing={1}
              >
                <Tooltip title="Open settings">
                  <Avatar
                    id="my"
                    alt="Account"
                    // src={imageUrl}
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    style={{ cursor: "pointer" }}
                  />
                </Tooltip>
                {renderMenu}
                <IconButton
                  size="large"
                  aria-label="show your wallet"
                  color="inherit"
                  onMouseEnter={handlePopoverOpen}
                  onMouseLeave={handlePopoverClose}
                >
                  <Badge sx={badgeStyle}>
                    <AccountBalanceWalletOutlinedIcon />
                  </Badge>
                  <Popover
                    id="mouse-over-popover"
                    sx={{
                      pointerEvents: "none",
                    }}
                    aria-haspopup="true"
                    edge="end"
                    open={open}
                    anchorEl={anchorEL}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    onClose={handlePopoverClose}
                    disableScrollLock
                    disableRestoreFocus
                  >
                    <Box
                      sx={{
                        padding: 2,
                        borderRadius: 20,
                      }}
                    >
                      <Divider sx={{ width: "80px" }}>Wallet</Divider>
                      <Typography pt={1}>Balance: ${profile.wallet}</Typography>
                    </Box>
                  </Popover>
                </IconButton>
                <IconButton
                  size="large"
                  aria-label="show 3 new notifications"
                  color="inherit"
                >
                  <Badge badgeContent={3} sx={badgeStyle}>
                    <NotificationsOutlinedIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  size="large"
                  aria-label="show 2 items in shopping cart"
                  color="inherit"
                  component={Link}
                  to={ROUTE.CART}
                >
                  <Badge badgeContent={cartItems?.length} sx={badgeStyle}>
                    <LocalMallOutlinedIcon />
                  </Badge>
                </IconButton>
              </Stack>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
