import React, { useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useStripe } from "@stripe/react-stripe-js";

export default function CheckoutSuccess(prop) {
  const stripe = useStripe();
  const urlParams = new URLSearchParams(window.location.search);
  const [paymentIntent, setPaymentIntent] = React.useState();
  console.log(paymentIntent);
  useEffect(() => {
    const paymentIntentId = urlParams.get("payment_intent_client_secret");

    if (stripe)
      stripe
        .retrievePaymentIntent(paymentIntentId)
        .then((data) => {
          setPaymentIntent(data.paymentIntent);
        })
        .catch((error) => {
          console.log(error);
        });
  }, [stripe]);

  return (
    <Box
      sx={{
        width: "50%",
        height: "60vh",
        margin: "auto",
        borderRadius: 2,
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "80%",
          margin: "auto",
          marginBottom: "50px",
          marginTop: "50px",
        }}
      >
        <Grid container>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <Typography fontFamily="" variant="h6" gutterBottom>
              Thank you!
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <Typography fontFamily="" variant="h4" gutterBottom>
              Your order has been received
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "center" }}
          ></Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <Box sx={{ width: "100%" }}>
              <Grid container xs={12}>
                <Grid pl={10} xs={6}>
                  <Typography fontFamily="" variant="body1" gutterBottom>
                    Order Code
                  </Typography>
                </Grid>
                <Grid xs={6}>
                  <Typography fontFamily="" variant="body1" gutterBottom>
                    {paymentIntent?.id}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container xs={12}>
                <Grid pl={10} xs={6}>
                  <Typography fontFamily="" variant="body1" gutterBottom>
                    Date
                  </Typography>
                </Grid>
                <Grid xs={6}>
                  <Typography fontFamily="" variant="body1" gutterBottom>
                    {new Date(paymentIntent?.created * 1000).toUTCString()}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container xs={12}>
                <Grid pl={10} xs={6}>
                  <Typography fontFamily="" variant="body1" gutterBottom>
                    Total
                  </Typography>
                </Grid>
                <Grid xs={6}>
                  <Typography fontFamily="" variant="body1" gutterBottom>
                    {paymentIntent?.amount?.toLocaleString("en-US") + " VND"}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container xs={12}>
                <Grid pl={10} xs={6}>
                  <Typography fontFamily="" variant="body1" gutterBottom>
                    Payment Method
                  </Typography>
                </Grid>
                <Grid xs={6}>
                  <Typography fontFamily="" variant="body1" gutterBottom>
                    {paymentIntent ? paymentIntent?.payment_method_types[0] : 0}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
