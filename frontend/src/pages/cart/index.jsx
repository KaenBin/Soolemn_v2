import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Step, StepLabel, Stepper } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { ColorlibStepIcon } from "./StepperComp";
import {
  setQuantity,
  removeFromCart,
  removeCartAll,
} from "@/redux/actions/profileActions";
import TableCart from "./ShoppingCart/TableCart";
import CartSummary from "./ShoppingCart/CartSummary";
import apiInstance from "../../services/apiService";

export default function Cart() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const [activeStep, setActiveStep] = React.useState(0);
  const [option, setOption] = React.useState("Normal Shipping");

  const setItemQuantity = (productId, quantity) => {
    dispatch(setQuantity(productId, quantity));
  };

  const handleDeleteFromCart = async (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleDeleteAll = async () => {
    dispatch(removeCartAll());
  };

  const handleStep = (index) => {
    setActiveStep(index);
  };

  const handleCheckout = async () => {
    await apiInstance.createCreateOut(profile.cart);
    // History.navigate("/checkout");
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
            <Grid2 xs={8}>
              <TableCart
                products={profile.cart}
                setQuantity={setItemQuantity}
                value={option}
                setValue={setOption}
                handleDeleteFromCart={handleDeleteFromCart}
                handleDeleteAll={handleDeleteAll}
              />
            </Grid2>
            <Grid2 xs={4}>
              <CartSummary
                products={profile.cart}
                setQuantity={setItemQuantity}
                value={option}
                setValue={setOption}
                handleCheckout={handleCheckout}
                handleDeleteFromCart={handleDeleteFromCart}
                handleDeleteAll={handleDeleteAll}
              />
            </Grid2>
          </Grid2>
        </Box>
      </div>
    </main>
  );
}
