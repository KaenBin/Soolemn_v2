import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";

import PaymentForm from "./PaymentForm";
import apiInstance from "@/services/apiService";
import OrderSum from "./OrderSum";

const stripePromise = loadStripe(
  "pk_test_51P4emDIcJNDJCIe2VsWxjUWIhA5Q2sGY0Tb0aQuOdl62eYeWdVHTSE2XTGlqZ2jJV8TA17Q72tBKNlWoRElfHu7c00K3XUOt3C"
);

const appearance = {
  theme: "stripe",
  variables: {
    colorPrimary: "#141718",
    colorText: "#141718",
    borderRadius: "10px",
    fontWeightNormal: "500",
    fontFamily:
      "--body-font-family: -apple-system, BlinkMacSystemFont, sans-serif",
    colorBackground: "#fafafa",
  },
  rules: {
    ".Tab": {
      border: "1px solid #E0E6EB",
      boxShadow:
        "0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(18, 42, 66, 0.02)",
    },

    ".Tab:hover": {
      color: "var(--colorText)",
    },

    ".Tab--selected": {
      borderColor: "#E0E6EB",
      boxShadow:
        "0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(18, 42, 66, 0.02), 0 0 0 2px var(--colorPrimary)",
    },

    ".Input--invalid": {
      boxShadow:
        "0 1px 1px 0 rgba(0, 0, 0, 0.07), 0 0 0 2px var(--colorDanger)",
    },
  },
};

const CheckOutDetails = (props) => {
  const profile = useSelector((state) => state.profile);
  const [email, setEmail] = useState(profile.email);
  const [address, setAddress] = useState({});
  const [payment, setPayment] = useState({});
  const [clientSecret, setClientSecret] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiInstance.createPaymentIntent(props.products).then((data) => {
      setClientSecret(data.clientSecret);
      setLoading(false);
    });
  }, []);

  return (
    <Grid2 container>
      <Grid2 xs={8} sx={{ textAlign: "center" }}>
        {loading ? (
          <CircularProgress
            size={80}
            color="inherit"
            sx={{ marginTop: "25%" }}
          />
        ) : (
          <Elements
            stripe={stripePromise}
            options={{ clientSecret, appearance }}
          >
            <PaymentForm
              email={email}
              setEmail={setEmail}
              address={address}
              setAddress={setAddress}
              payment={payment}
              setPayment={setPayment}
              loading={loading}
            />
          </Elements>
        )}
      </Grid2>
      <Grid2 xs={4}>
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <Box
            sx={{
              width: "90%",
              border: "1px solid black",
              borderRadius: 2,
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.5)",
            }}
          >
            <OrderSum {...props} />
          </Box>
        </Box>
      </Grid2>
    </Grid2>
  );
};

export default CheckOutDetails;
