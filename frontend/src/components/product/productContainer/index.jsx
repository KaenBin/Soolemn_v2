import * as React from "react";
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
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";

import img from "@/assets/OIP.jpg";
import { StyledRating } from "@/utils/utils";
import { Link, useParams } from "react-router-dom";
import apiInstance from "@/services/apiService";

const ProductContainer = (props) => {
  const handleProduct = () => History.navigate(`/product/${props.item.id}`);

  return (
    <Card
      id={"product-" + props.idx}
      key={props.idx}
      sx={{
        width: 260,
        height: 410,
        marginRight: "auto",
        marginLeft: "auto",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.4)",
      }}
    >
      <CardActionArea onClick={handleProduct}>
        <CardMedia
          aria-owns="mouse-over-popover"
          aria-haspopup="true"
          component="img"
          height="320"
          image={props.item.images[0] ? props.item.images[0] : img}
          alt="the image of a product"
        />
        {/* {props.size != "small" && <Typography variant="status">NEW</Typography>}
        {props.size != "small" && (
          <Typography
            style={{
              top: "12%",
              color: "#FEFEFE",
              backgroundColor: "#38CB89",
            }}
            variant="status"
          >
            -50%
          </Typography>
        )} */}
        <CardContent>
          <StyledRating
            name="customized-color"
            defaultValue={2}
            getLabelText={(value) => `${value} Star${value !== 1 ? "s" : ""}`}
            precision={0.5}
            icon={<StarIcon fontSize="inherit" />}
            emptyIcon={<StarBorderIcon fontSize="inherit" />}
          />{" "}
          <Typography
            id="product-name"
            noWrap
            gutterBottom
            variant="price1"
            maxWidth="205"
          >
            {props.item.name}
          </Typography>
          <Typography
            id={"discount-price-" + props.idx}
            display="inline"
            variant="price1"
          >
            {/* ${(props.item.price / 2).toFixed(2)} */}
            {Number(props.item?.stripe_metadata_price || 0).toLocaleString(
              "en-US"
            )}{" "}
            VND
          </Typography>{" "}
          {true ? (
            <Typography
              display="inline"
              style={{ textDecorationLine: "line-through" }}
              variant="price2"
            >
              {Number(props.item?.stripe_metadata_price || 0).toLocaleString(
                "en-US"
              ) || 0}{" "}
              VND{" "}
            </Typography>
          ) : (
            <></>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductContainer;
