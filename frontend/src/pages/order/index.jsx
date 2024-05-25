import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Grid from "@mui/material/Unstable_Grid2";
import { Pagination, Breadcrumbs } from "@mui/material";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useParams } from "react-router";
import { NavLink, useLocation } from "react-router-dom";

import { setAuthenticating } from "@/redux/actions/miscActions";
import {
  ProductGroup,
  ProductGroup2,
  ProductImage,
  ProductDescription,
  ProductInfo,
} from "@/components/product";
import mock_product from "@/mockdata/products";
import apiInstance from "@/services/apiService";
import { ProductReview } from "@/components/product";
import OrderProduct from "@/components/order/OrderProduct";
import OrderMap from "@/components/order/OrderMap";

export default function OrderDetails(props) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const location = useLocation();
  const [order, setOrder] = useState(location.state.order);
  console.log(order);

  useEffect(() => {
    if (order) return;
    apiInstance
      .getOrder(id)
      .then((order) => {
        console.log(order);
        setOrder(order);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const breadcrumbs = [
    <Typography key="1" variant="subBreadCumbs">
      Accounts
    </Typography>,
    <NavLink
      onClick={() => History.navigate("/account")}
      key="2"
      style={{ textDecoration: "none", color: "#605F5F" }}
      variant="secondary"
    >
      Order History
    </NavLink>,
    <Typography key="3" variant="breadCumbs">
      Order Detail
    </Typography>,
  ];

  return (
    <main className="content">
      <div className="home">
        <Breadcrumbs
          separator="›"
          aria-label="breadcrumb"
          sx={{ marginBottom: "3vh" }}
        >
          {breadcrumbs}
        </Breadcrumbs>
        <Grid
          container
          minHeight={160}
          display="flex"
          justifyContent="center"
          alignItems="center"
          columnSpacing={5}
        >
          <Grid>
            <OrderProduct items={order.items} order={order} />
          </Grid>
          <Grid>
            <OrderMap address={order.charges.data[0].billing_details.address} />
          </Grid>
        </Grid>
      </div>
    </main>
  );
}
