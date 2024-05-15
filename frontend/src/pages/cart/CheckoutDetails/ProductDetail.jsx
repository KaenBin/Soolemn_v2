import React from "react";
import Typography from "@mui/material/Typography";
import { Box, Grid } from "@mui/material";
import Divider from "@mui/material/Divider";

function ProductDetail(prop) {
  const row = prop.productinfo;
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container>
        <Grid xs={4} sx={{ display: "flex", alignItems: "center" }}>
          <img src={row.image} width="90px" alt="Logo" />
        </Grid>
        <Grid container item xs={8}>
          <Grid container item xs={12}>
            <Grid container item xs={12}>
              <Grid
                item
                xs={12}
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography fontFamily="" variant="h6" gutterBottom>
                  {row.name}
                </Typography>
                <Typography fontFamily="" variant="h5">
                  ${row.quantity * row.price}
                </Typography>
              </Grid>
              <Grid xs={12}>
                <Typography fontFamily="" variant="body1" gutterBottom>
                  Color: {row.color}
                </Typography>
              </Grid>
              <Grid xs={12}>
                <Typography fontFamily="" variant="body1" gutterBottom>
                  Quantity: {row.quantity}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid xs={12}>
          <Divider />
        </Grid>
      </Grid>
    </Box>
  );
}

export default ProductDetail;
