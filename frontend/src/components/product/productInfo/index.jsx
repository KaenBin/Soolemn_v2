import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Popover,
  Button,
  CardActionArea,
  Container,
  IconButton,
  Rating,
  ButtonBase,
  Box,
  Divider,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  TableCell,
  Stack,
  Paper,
  TextField,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { Link, useParams } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import { tableCellClasses } from "@mui/material/TableCell";
import StoreIcon from "@mui/icons-material/Store";
import InputAdornment from "@mui/material/InputAdornment";
import { Add, Remove } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";

import img from "@/assets/OIP.jpg";
import { StyledRating } from "@/utils/utils";
import SimilarProducts from "../similarProducts";
import mock_product from "@/mockdata/products";
import {
  ToggleColor,
  CustomButtonGroup,
  NotificationModal,
} from "@/components/common";
import { updateProfile } from "@/redux/actions/profileActions";
import apiInstance from "@/services/apiService";
import { addToCart } from "../../../redux/actions/profileActions";

const ProductInfo = (props) => {
  const [expanded, setExpanded] = React.useState(false);
  const [quantity, setQuantity] = React.useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [notificationOpen, setNotificationOpen] = useState(false);
  const dispatch = useDispatch();

  const handleIncrease = () => {
    setQuantity(Number(quantity + 1));
  };

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(Number(quantity - 1));
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const handleChangeColor = (color) => {
    setSelectedColor(color);
  };

  const handlePurchase = async () => {
    await apiInstance.getCheckoutUrl(props.item.id, quantity);
  };

  const ImageUrl =
    props.item?.images?.length > 0 ? props.item?.images[0] : null;

  const handleAddToCart = async () => {
    try {
      dispatch(addToCart({ productId: props.item?.id, quantity }));
      setNotificationOpen(true);
    } catch (error) {
      alert("Failed to add product to cart.");
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <>
      <Box
        border={2}
        borderColor="tertiary.main"
        borderRadius={5}
        p={2}
        sx={{
          width: 400,
          height: "80vh",
        }}
      >
        <TableContainer>
          <Table>
            <TableBody
              sx={{
                [`& .${tableCellClasses.root}`]: {
                  border: "none",
                },
              }}
            >
              <TableRow>
                <TableCell
                  rowSpan={2}
                  align="center"
                  style={{
                    padding: "0",
                  }}
                >
                  <StoreIcon style={{ width: "100px", height: "100px" }} />
                </TableCell>
                <TableCell style={{ padding: "0" }}>
                  <Typography variant="price3">
                    {"Seller: " + props.item?.metadata?.vendorId}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ padding: "0" }}>
                  <StyledRating
                    name="customized-color"
                    defaultValue={2}
                    getLabelText={(value) =>
                      `${value} Star${value !== 1 ? "s" : ""}`
                    }
                    precision={0.5}
                    icon={<StarIcon fontSize="inherit" />}
                    emptyIcon={<StarBorderIcon fontSize="inherit" />}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Typography variant="price3" m={3}>
          {props.item?.name}
        </Typography>
        <Divider />
        <Typography variant="breadCumbs" fontWeight={500} m={3}>
          Shipping fee:{" "}
          {(10000).toLocaleString("en-US") +
            " " +
            props.item?.metadata?.currency?.toUpperCase()}
        </Typography>

        {props.item?.color ? (
          <Stack direction="row" spacing="auto" m={3}>
            <Typography variant="price4" fontWeight={500}>
              Choose Color
            </Typography>
            <ToggleColor
              colorOptions={props.item?.color}
              selectedColor={selectedColor}
              handleChangeColor={handleChangeColor}
            />
          </Stack>
        ) : null}

        <Typography variant="price3" component="h1" fontWeight={500} m={3}>
          Total:{" "}
          {(10000 + props.item?.metadata?.price * quantity).toLocaleString(
            "en-US"
          ) +
            " " +
            props.item?.metadata?.currency?.toUpperCase()}
        </Typography>
        <TextField
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          sx={{
            color: "#121212",
            backgroundColor: "#F5F5F5",
            marginLeft: 3,
          }}
          InputProps={{
            inputProps: { min: 0 },
            sx: {
              input: {
                textAlign: "center",
                width: 25,
              },
            },
            startAdornment: (
              <InputAdornment position="start">
                <IconButton onClick={handleDecrease}>
                  <Remove />
                </IconButton>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleIncrease}>
                  <Add />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Stack spacing={3} mt={2}>
          <Button
            onClick={() => handlePurchase()}
            sx={{
              color: "#FEFEFE",
              backgroundColor: "#008060",
              width: "300px",
              height: "7vh",
              alignSelf: "center",
              "&:hover": {
                backgroundColor: "#008060",
                opacity: 0.75,
              },
            }}
            title="Buy Now"
          >
            Buy Now
          </Button>
          <Button
            onClick={handleAddToCart}
            sx={{
              color: "#FEFEFE",
              backgroundColor: "#141718",
              width: "300px",
              height: "7vh",
              alignSelf: "center",
              "&:hover": {
                backgroundColor: "#141718",
                opacity: 0.75,
              },
            }}
            title="Add to Cart"
          >
            Add to Cart
          </Button>
        </Stack>
      </Box>
      <NotificationModal
        open={notificationOpen}
        handleClose={() => setNotificationOpen(false)}
      />
    </>
  );
};

export default ProductInfo;
