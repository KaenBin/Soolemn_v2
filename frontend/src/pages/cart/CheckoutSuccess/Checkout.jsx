import { Elements } from "@stripe/react-stripe-js";
import CheckoutSuccess from "./CheckoutSuccess";
import { stripePromise } from "@/services/stripePayment";

export default function Checkout() {
  const urlParams = new URLSearchParams(window.location.search);
  const clientSecret = urlParams.get("payment_intent_client_secret");

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
      }}
    >
      <CheckoutSuccess />
    </Elements>
  );
}
