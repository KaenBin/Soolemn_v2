import algoliasearch from "algoliasearch/lite";
import "instantsearch.css/themes/satellite.css";
import { Dropdown } from "@mui/base/Dropdown";
import { Menu } from "@mui/base/Menu";
import { MenuButton as BaseMenuButton } from "@mui/base/MenuButton";
import { MenuItem as BaseMenuItem, menuItemClasses } from "@mui/base/MenuItem";
import { styled } from "@mui/system";
import {
  Configure,
  HierarchicalMenu,
  Hits,
  InstantSearch,
  Pagination,
} from "react-instantsearch-hooks-web";

import "./Search.css";
import { Hit } from "./Hit";
import { Autocomplete } from "./Autocomplete";
import { Panel } from "./Panel";
import { INSTANT_SEARCH_HIERARCHICAL_ATTRIBUTES } from "../../constants/search";
import React from "react";
import { getAlgoliaResults } from "@algolia/autocomplete-js";
import { ProductItem } from "./ProductItem";

const searchClient = algoliasearch(
  "VV539RUE30",
  "b1d2f207e0d35844f4b4595c2a84464a"
);

const blue = {
  50: "#F0F7FF",
  100: "#C2E0FF",
  200: "#99CCF3",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E6",
  700: "#0059B3",
  800: "#004C99",
  900: "#003A75",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const MenuItem = styled(BaseMenuItem)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;
  user-select: none;

  &:last-of-type {
    border-bottom: none;
  }

  &:focus {
    outline: 3px solid "#99CCF3";
    background-color: "#E5EAF2";
    color: "#1C2025";
  }

  &.${menuItemClasses.disabled} {
    color: "#B0B8C4";
  }
  `
);

const MenuButton = styled(BaseMenuButton)(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  padding: 8px 16px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  background: "#fff";
  border: 1px solid "#DAE2ED";
  color: "#1C2025";
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

  &:hover {
    background: ${theme.palette.mode === "dark" ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === "dark" ? grey[600] : grey[300]};
  }

  &:active {
    background: ${theme.palette.mode === "dark" ? grey[700] : grey[100]};
  }

  &:focus-visible {
    box-shadow: 0 0 0 4px ${
      theme.palette.mode === "dark" ? blue[300] : blue[200]
    };
    outline: none;
  }
  `
);

export const Search = () => {
  return (
    <InstantSearch searchClient={searchClient} indexName="products" routing>
      <Configure
        attributesToSnippet={["name:7", "description:15"]}
        snippetEllipsisText="…"
        hitsPerPage={5}
      />
      <div className="ais-InstantSearch">
        <Autocomplete
          openOnFocus={true}
          searchClient={searchClient}
          placeholder="Search products"
          detachedMediaQuery="none"
          getSources={({ query }) => [
            {
              sourceId: "products",
              getItems() {
                return getAlgoliaResults({
                  searchClient,
                  queries: [
                    {
                      indexName: "products",
                      query,
                    },
                  ],
                });
              },
              templates: {
                item({ item, components }) {
                  return <ProductItem hit={item} components={components} />;
                },
              },
            },
          ]}
        />
        {/* <Panel header="Categories">
          <HierarchicalMenu
            attributes={INSTANT_SEARCH_HIERARCHICAL_ATTRIBUTES}
          />
        </Panel> */}
      </div>
    </InstantSearch>
  );
};
