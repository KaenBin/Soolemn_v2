import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Unstable_Grid2";
// import { Pagination } from "@mui/material";
import {
  InstantSearch,
  HierarchicalMenu,
  Hits,
  Pagination,
  RefinementList,
  RangeInput,
  Configure,
} from "react-instantsearch-hooks-web";
import {
  NormalFilter,
  CheckboxFilter,
  FreeSoloFilter,
} from "@/components/filter";
import { setAuthenticating } from "@/redux/actions/miscActions";
import { ProductGroup, ProductGroup2 } from "@/components/product";
import mock_product from "@/mockdata/products";
import apiInstance from "@/services/apiService";
import { useLocation } from "react-router-dom";
import { searchFilter } from "@/utils/utils";
import { Panel } from "../../../components/search/Panel";
import { INSTANT_SEARCH_HIERARCHICAL_ATTRIBUTES } from "../../../constants/search";
import algoliasearch from "algoliasearch/lite";
import Hit from "../../../components/search/Hit";
import { Sort, Price, Category } from "@/constants/filters";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
const searchClient = algoliasearch(
  "VV539RUE30",
  "b1d2f207e0d35844f4b4595c2a84464a"
);

export default function ProductOverview(props) {
  const dispatch = useDispatch();
  const location = useLocation();
  const { searchQuery } = location.state || {};
  const products = useSelector((state) => state.products);
  const [minPrice, setMinPrice] = React.useState(Price[0].value);
  const [maxPrice, setMaxPrice] = React.useState(Price[Price.length - 1].value);
  const [sort, setSort] = React.useState(Sort[0].value);
  useEffect(
    () => () => {
      dispatch(setAuthenticating(false));
    },
    []
  );

  return (
    <main className="content">
      <div className="home">
        <InstantSearch searchClient={searchClient} indexName="products" routing>
          <Configure
            attributesToSnippet={["name:7", "description:15"]}
            snippetEllipsisText="…"
            hitsPerPage={15}
          />
          <Grid
            container
            minHeight={160}
            width="100%"
            display="flex"
            justifyContent="center"
            direction="row"
            spacing={10}
          >
            <Grid item mt={5}>
              <Panel header="Categories">
                <HierarchicalMenu
                  attributes={INSTANT_SEARCH_HIERARCHICAL_ATTRIBUTES}
                />
              </Panel>
              <Panel header="Price Range">
                <RangeInput
                  container="#range-input"
                  attribute="metadata.price"
                />
              </Panel>
            </Grid>
            <Grid item xs={9}>
              <Hits hitComponent={Hit} />
              <Pagination />
            </Grid>
          </Grid>
        </InstantSearch>

        {/* <ProductGroup2
            title="Exclusive deal"
            list={searchFilter(products.items, searchQuery) || products.items}
            block={15}
          /> */}
      </div>
    </main>
  );
}
