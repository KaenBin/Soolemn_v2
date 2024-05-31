import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Grid from "@mui/material/Unstable_Grid2";
import { Pagination, Breadcrumbs } from "@mui/material";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";

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

export default function ProductDetail(props) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [product, setProduct] = useState({});

  const breadcrumbs = [
    <NavLink
      onClick={() => window.history.back()}
      key="1"
      style={{ textDecoration: "none", color: "#605F5F" }}
      variant="secondary"
    >
      Products
    </NavLink>,
    <Typography key="2" variant="subBreadCumbs">
      Category
    </Typography>,
    <Typography key="3" variant="breadCumbs">
      Product Detail
    </Typography>,
  ];

  useEffect(() => {
    window.scrollTo(0, 0);

    apiInstance
      .getProduct(id)
      .then((product) => {
        console.log(product);
        setProduct(product);
      })
      .catch((error) => {
        console.log(error);
      });

    dispatch(setAuthenticating(false));
  }, []);

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
          columnSpacing={5}
        >
          <Grid>
            <ProductImage item={product} />
          </Grid>
          <Grid>
            <ProductDescription item={product} />
          </Grid>
          <Grid>
            <ProductInfo item={{ ...product, id }} />
          </Grid>
        </Grid>
        <Grid display="flex" justifyContent="center">
          <ProductReview />
        </Grid>
      </div>
    </main>
  );
}
