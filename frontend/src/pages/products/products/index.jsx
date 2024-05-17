import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Unstable_Grid2";
import { Pagination } from "@mui/material";

import { setAuthenticating } from "@/redux/actions/miscActions";
import { ProductGroup, ProductGroup2 } from "@/components/product";
import mock_product from "@/mockdata/products";
import apiInstance from "@/services/apiService";
import { useLocation } from "react-router-dom";
import { searchFilter } from "@/utils/utils";

export default function ProductOverview(props) {
  const dispatch = useDispatch();
  const location = useLocation();
  const { searchQuery } = location.state || {};
  const products = useSelector((state) => state.products);

  useEffect(
    () => () => {
      dispatch(setAuthenticating(false));
    },
    []
  );

  return (
    <main className="content">
      <div className="home">
        <Grid
          container
          minHeight={160}
          display="flex"
          justifyContent="center"
          alignItems="center"
          direction="column"
        >
          <ProductGroup2
            title="Exclusive deal"
            list={searchFilter(products.items, searchQuery) || products.items}
            block={15}
          />
        </Grid>
      </div>
    </main>
  );
}
