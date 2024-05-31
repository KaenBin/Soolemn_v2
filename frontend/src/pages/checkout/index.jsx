import React, { useEffect, useState } from "react";
import { Box, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { useStripe } from "@stripe/react-stripe-js";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useSelector } from "react-redux";
import { logEvent } from "firebase/analytics";

import { ColorlibStepIcon } from "../cart/StepperComp";
import apiInstance from "@/services/apiService";
import { analytics } from "@/services/firebase";

export default function Checkout() {
  //   const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeStep, setActiveStep] = React.useState(2);
  console.log(orders);
  useEffect(() => {
    apiInstance
      .getOrders()
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
        logEvent(analytics, "purchase", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //   const stripe = useStripe();
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const [paymentIntent, setPaymentIntent] = React.useState();
  //   console.log(paymentIntent);
  //   useEffect(() => {
  //     const paymentIntentId = urlParams.get("payment_intent_client_secret");

  //     if (stripe)
  //       stripe
  //         .retrievePaymentIntent(paymentIntentId)
  //         .then((data) => {
  //           setPaymentIntent(data.paymentIntent);
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //         });
  //   }, [stripe]);
  const paymentIntent = {
    id: "pi_3PFqidIcJNDJCIe200IMNWEO",
    created: Date.now(),
    amount: 20000,
    payment_method_types: ["card"],
  };
  return (
    <main className="content">
      <div className="home">
        <Box sx={{ width: "80%", margin: "auto" }}>
          <Grid2
            container
            spacing={0}
            justifyContent="center"
            alignItems="center"
            marginTop="32px"
            marginBottom="32px"
          >
            <Grid2 xs={12} sx={{ display: "flex", justifyContent: "center" }}>
              <Box sx={{ width: "60%", marginBottom: "50px" }}>
                <Stepper activeStep={activeStep}>
                  {["Shopping Cart", "Checkout Details", "Checkout"].map(
                    (label, index) => (
                      <Step key={label}>
                        <StepLabel
                          StepIconComponent={ColorlibStepIcon}
                          onClick={() => handleStep(index)}
                          cursor={index === 2 ? "none" : "pointer"}
                        >
                          {label}
                        </StepLabel>
                      </Step>
                    )
                  )}
                </Stepper>
              </Box>
            </Grid2>
          </Grid2>
          <Grid2 container xs={12} sx={{ paddingBottom: "16px" }}>
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
                <Grid2 container>
                  <Grid2
                    item
                    xs={12}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <Typography fontFamily="" variant="h6" gutterBottom>
                      Thank you!
                    </Typography>
                  </Grid2>
                  <Grid2
                    item
                    xs={12}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <Typography fontFamily="" variant="h4" gutterBottom>
                      Your order has been received
                    </Typography>
                  </Grid2>
                  <Grid2
                    item
                    xs={12}
                    sx={{ display: "flex", justifyContent: "center" }}
                  ></Grid2>
                  <Grid2
                    item
                    xs={12}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "20px",
                    }}
                  >
                    <Box sx={{ width: "100%" }}>
                      <Grid2 container xs={12}>
                        <Grid2 pl={10} xs={6}>
                          <Typography
                            fontFamily=""
                            variant="body1"
                            gutterBottom
                          >
                            Order Code
                          </Typography>
                        </Grid2>
                        <Grid2 xs={6}>
                          <Typography
                            fontFamily=""
                            variant="body1"
                            gutterBottom
                          >
                            {orders[orders.length - 1]?.id}
                          </Typography>
                        </Grid2>
                      </Grid2>
                      <Grid2 container xs={12}>
                        <Grid2 pl={10} xs={6}>
                          <Typography
                            fontFamily=""
                            variant="body1"
                            gutterBottom
                          >
                            Date
                          </Typography>
                        </Grid2>
                        <Grid2 xs={6}>
                          <Typography
                            fontFamily=""
                            variant="body1"
                            gutterBottom
                          >
                            {new Date(
                              orders[orders.length - 1]?.created * 1000
                            ).toUTCString()}
                          </Typography>
                        </Grid2>
                      </Grid2>
                      <Grid2 container xs={12}>
                        <Grid2 pl={10} xs={6}>
                          <Typography
                            fontFamily=""
                            variant="body1"
                            gutterBottom
                          >
                            Total
                          </Typography>
                        </Grid2>
                        <Grid2 xs={6}>
                          <Typography
                            fontFamily=""
                            variant="body1"
                            gutterBottom
                          >
                            {orders[orders.length - 1]?.amount?.toLocaleString(
                              "en-US"
                            ) + " VND"}
                          </Typography>
                        </Grid2>
                      </Grid2>
                      <Grid2 container xs={12}>
                        <Grid2 pl={10} xs={6}>
                          <Typography
                            fontFamily=""
                            variant="body1"
                            gutterBottom
                          >
                            Payment Method
                          </Typography>
                        </Grid2>
                        <Grid2 xs={6}>
                          <Typography
                            fontFamily=""
                            variant="body1"
                            gutterBottom
                          >
                            {orders[orders.length - 1]
                              ? orders[orders.length - 1]
                                  ?.payment_method_types[0]
                              : 0}
                          </Typography>
                        </Grid2>
                      </Grid2>
                    </Box>
                  </Grid2>
                </Grid2>
              </Box>
            </Box>
          </Grid2>
        </Box>
      </div>
    </main>
  );
}
