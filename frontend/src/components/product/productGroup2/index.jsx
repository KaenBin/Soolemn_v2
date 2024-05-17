import * as React from "react";
import Carousel from "react-multi-carousel";
import Grid from "@mui/material/Unstable_Grid2";
import { Box, Button, Pagination, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import "react-multi-carousel/lib/styles.css";
import ProductContainer from "../productContainer";
import ProductList from "../productList";
import { ListPagination } from "@/components/pagination";
import {
  NormalFilter,
  CheckboxFilter,
  FreeSoloFilter,
} from "@/components/filter";
import mock_product from "@/mockdata/products";
import mock_categories from "@/mockdata/categories";
import { Sort, Price, Category } from "@/constants/filters";
import { listFilter } from "@/utils/utils";
import { useEffect } from "react";
import Error from "../../../pages/error";

const ProductGroup2 = (props) => {
  const [page, setPage] = React.useState(0);
  const [category, setCategory] = React.useState([]);
  const [minPrice, setMinPrice] = React.useState(Price[0].value);
  const [maxPrice, setMaxPrice] = React.useState(Price[Price.length - 1].value);
  const [sort, setSort] = React.useState(Sort[0].value);
  const [filtered, setFiltered] = React.useState(props.list);
  const [error, setError] = React.useState(false);

  useEffect(() => {
    setPage(props.list.length ? 1 : 0);
  }, [props.list]);

  useEffect(() => {
    setFiltered(listFilter(props.list, category, minPrice, maxPrice));
    setError(!listFilter(props.list, category, minPrice, maxPrice).length);
  }, [props.list, category, minPrice, maxPrice, sort]);

  return (
    <Box width="90vw">
      <Grid
        container
        flexDirection="column"
        columnSpacing={3}
        rowSpacing={{ xs: 1, sm: 2, md: 3 }}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Grid
          container
          flexDirection="row"
          rowSpacing={{ xs: 1, sm: 2, md: 3 }}
          width="100%"
          display="flex"
          justifyContent="space-between"
        >
          <Grid>
            <CheckboxFilter
              value={category}
              setValue={setCategory}
              type="CATEGORIES"
              list={Category}
            />
          </Grid>
          <Grid
            flexDirection="row"
            width="30vw"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <FreeSoloFilter
              id="min-price"
              value={minPrice}
              setValue={setMinPrice}
              type="$ MINIMUM"
              list={Price.slice(0, Price.length - 1)}
            />
            <ArrowBackIosNewIcon height="100%" />
            <FreeSoloFilter
              id="max-price"
              value={maxPrice}
              setValue={setMaxPrice}
              type="$ MAXIMUM"
              list={Price.slice(1)}
            />
          </Grid>
          <Grid>
            <NormalFilter
              value={sort}
              setValue={setSort}
              type="SORT BY"
              list={Sort}
            />
          </Grid>
        </Grid>
        <Grid display="flex" justifyContent="center">
          {error ? (
            <Error title="product" />
          ) : (
            <ProductList list={filtered.slice(0, (page - 1) * 20 + 20)} />
          )}
        </Grid>
        {page * 20 < filtered.length ? (
          <Grid>
            <Button
              onClick={() => setPage(page + 1)}
              style={{
                color: "#141718",
                width: "163px",
                height: "40px",
                alignSelf: "center",
                border: "solid",
                borderColor: "#141718",
                borderRadius: 80,
              }}
            >
              Show more
            </Button>
          </Grid>
        ) : (
          <></>
        )}
      </Grid>
    </Box>
  );
};

export default ProductGroup2;
