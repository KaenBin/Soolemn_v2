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
      {items.map((item, index) => (
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
                width="90px"
                height="110px"
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
                <Typography>x{props.items[index].quantity}</Typography>
              </Grid2>
              <Grid2>
                <Typography>[On sale - Freeship]</Typography>
              </Grid2>
            </Grid2>
            <Grid2
              xs={4}
              display="flex"
              justifyContent="start"
              alignItems="end"
            >
              <Typography sx={{ fontSize: "13px" }}>
                Delivery Status:
              </Typography>
              {item.stripe_metadata_status ? (
                <Typography
                  color="#4caf50"
                  sx={{ fontSize: "15px", marginLeft: "10px" }}
                >
                  {item.stripe_metadata_status}
                </Typography>
              ) : (
                <Typography
                  color="#6495ED"
                  sx={{ fontSize: "15px", marginLeft: "10px" }}
                >
                  Pending
                </Typography>
              )}
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
        Total: {props.items.length} items - Total price:{" "}
        {Number(props.order.amount).toLocaleString("en-US")} VND
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
        <Typography
          sx={{ textAlign: "center", display: "flex", flexDirection: "row" }}
        >
          Expected Delivery Data:
          <div style={{ color: "red", marginLeft: "10px" }}>
            {new Date(props.order.created + 604800).toUTCString("en-US")}
          </div>
        </Typography>
        <Typography
          variant="price2"
          sx={{ textAlign: "left", marginRight: "10px" }}
        >
          Delivered by: ViettelPost
        </Typography>
      </Box>
    </Grid2>
  );
}
