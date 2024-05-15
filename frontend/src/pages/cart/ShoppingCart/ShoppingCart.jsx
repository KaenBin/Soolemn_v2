import { Box } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import TableCart from "./TableCart";
import CartSummary from "./CartSummary";

export default function ShoppingCart(props) {
  return (
    <Grid2 container xs={12} sx={{ paddingBottom: "16px" }}>
      <Grid2 xs={8}>
        <TableCart {...props} />
      </Grid2>
      <Grid2 xs={4}>
        <CartSummary {...props} />
      </Grid2>
    </Grid2>
  );
}
