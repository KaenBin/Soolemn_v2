import { useState } from "react";
import {
  LinkAuthenticationElement,
  PaymentElement,
  AddressElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Box, Typography } from "@mui/material";
import { ColorButton } from "@/components/styled";

const PaymentForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [messages, setMessages] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessages(`${messages}<br />Submitting payment...`);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/success`,
      },
    });

    if (error) {
      console.log(error);
      // handle error
      setMessages(`${messages}<br />${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          width: "100%",
          border: "1px solid black",
          borderRadius: "5px",
          padding: "20px 40px 20px 40px",
          marginBottom: "20px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.5)",
        }}
      >
        <Typography fontSize="20px" fontWeight="600" variant="h5" gutterBottom>
          Contact information
        </Typography>
        <LinkAuthenticationElement
          onChange={(event) => {
            props.setEmail(event.value.email);
          }}
          options={{ defaultValues: { email: props.email } }}
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          border: "1px solid black",
          borderRadius: "5px",
          marginBottom: "20px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.5)",
        }}
      >
        <Box
          sx={{
            width: "90%",
            margin: "auto",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          <Typography
            fontSize="20px"
            fontWeight="600"
            variant="h5"
            mb="20px"
            gutterBottom
          >
            Shipping Address
          </Typography>
          <AddressElement
            options={{ mode: "shipping", allowedCountries: ["US", "VN"] }}
            onChange={(event) => {
              props.setAddress(event.value);
            }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          border: "1px solid black",
          borderRadius: "5px",
          marginBottom: "20px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.5)",
        }}
      >
        <Box
          sx={{
            width: "90%",
            margin: "auto",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          <Typography
            fontSize="20px"
            fontWeight="600"
            variant="h5"
            gutterBottom
          >
            Payment Method
          </Typography>
          <PaymentElement
            onChange={(event) => {
              props.setPayment(event.value);
            }}
          />
        </Box>
      </Box>
      <ColorButton
        type="submit"
        variant="contained"
        color="primary"
        sx={{ width: "100%", padding: "15px 40px", borderRadius: "10px" }}
      >
        Place Order
      </ColorButton>
    </form>
  );
};

export default PaymentForm;
