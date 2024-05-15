import { Box, Divider, Typography } from "@mui/material";
import { orderFilter } from "@/utils/utils";
import { useSelector } from "react-redux";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

export default function OrderProduct(props) {
  const products = useSelector((state) => state.products);
  const items = orderFilter(products.items, props.items);
  console.log(items, props);
  return (
    <Grid2 width="40vw">
      {items.map((item) => (
        <Box
          key={item.id}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            backgroundColor: "#EEEEEE",
            padding: "10px",
            margin: "10px",
          }}
        >
          <Grid2 container display="flex">
            <Grid2 xs={3}>
              <img
                src={item.images[0]}
                alt={item.name}
                width="100px"
                height="100px"
              />
            </Grid2>
            <Grid2
              xs={5}
              container
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              pt="10px"
            >
              <Grid2>
                <Typography>{item.name}</Typography>
              </Grid2>
              <Grid2>
                <Typography variant="price2">
                  Category: {item.stripe_metadata_category}
                </Typography>
              </Grid2>
              <Grid2>
                <Typography>x3</Typography>
              </Grid2>
              <Grid2>
                <Typography>[On sale - Shipping]</Typography>
              </Grid2>
            </Grid2>
            <Grid2 xs={4}>
              <Typography>Delivery Status</Typography>
            </Grid2>
          </Grid2>
          <Typography
            width="100px"
            variant="price2"
            sx={{ textAlign: "center" }}
          >
            {Number(item.stripe_metadata_price).toLocaleString("en-US")}VND
          </Typography>
          <Typography
            width="100px"
            variant="price1"
            sx={{ textAlign: "center" }}
          >
            {Number(item.stripe_metadata_price).toLocaleString("en-US")}VND
          </Typography>
        </Box>
      ))}
      <Divider style={{ margin: "10px" }} />
      <Typography style={{ margin: "10px" }}>
        Total: 3 items - Total price:
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "#EEEEEE",
          padding: "10px",
          margin: "10px",
        }}
      >
        <Typography sx={{ textAlign: "center" }}>
          Expected Delivery Data: 170000
        </Typography>
        <Typography variant="price2" sx={{ textAlign: "center" }}>
          Delivered by: ViettelPost
        </Typography>
      </Box>
    </Grid2>
  );
}
