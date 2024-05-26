import {
  Backdrop,
  Box,
  Button,
  Divider,
  Modal,
  Typography,
} from "@mui/material";
import { orderFilter } from "@/utils/utils";
import { useSelector } from "react-redux";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React from "react";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

export default function OrderProduct(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const products = useSelector((state) => state.products);
  const items = orderFilter(products.items, props.items);
  console.log(items, props);

  const statuses = [
    { date: "2023-05-01", status: "Pending" },
    { date: "2023-05-02", status: "Delivering" },
    { date: "2023-05-03", status: "Cancel" },
    { date: "2023-05-03", status: "Delivered" },
  ];

  const textColor = (status) => {
    if (status === "Cancel") {
      return "#DE3163";
    } else if (status === "Delivered") {
      return "#4caf50";
    } else {
      return "#6495ED";
    }
  };

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
              <Typography sx={{ fontSize: "12px" }}>
                Delivery Status:
              </Typography>
              <Button
                onClick={handleOpen}
                sx={{
                  color: textColor(item.stripe_metadata_status || "Pending"),
                  fontSize: "14px",
                  marginLeft: "5px",
                  textDecoration: "underline",
                }}
              >
                {item.stripe_metadata_status || "Pending"}
              </Button>
            </Grid2>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              sx={{ backgroundColor: "rgba(223, 223, 223, 0.3)" }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 400,
                  bgcolor: "background.paper",
                  border: "2px solid #000",
                  borderRadius: "20px",
                  boxShadow: 24,
                  p: 4,
                }}
              >
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                  mb="10px"
                >
                  Order ID: SPXVN034061123275
                </Typography>
                <Divider />
                {statuses.map((item, index) => (
                  <Box key={index} sx={{ py: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography
                        variant="body1"
                        sx={{ flex: 1, fontSize: "16px" }}
                      >
                        {item.date}
                      </Typography>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mx: 2 }}
                      >
                        <Divider sx={{ flex: 1 }} />
                        <LocalShippingIcon
                          sx={{
                            mx: 1,
                            p: 0.5,
                            color: "#d5dadc",
                            backgroundColor: "#48C9B0",
                            borderRadius: "50%",
                            height: "30px",
                            width: "30px",
                          }}
                        />
                        <Divider sx={{ flex: 1 }} />
                      </Box>
                      <Typography
                        variant="body1"
                        sx={{
                          flex: 1,
                          fontSize: "18px",
                          color: textColor(item.status),
                        }}
                      >
                        {item.status}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Modal>
          </Grid2>
          <Typography
            width="100px"
            variant="price2"
            sx={{ textAlign: "center" }}
          >
            {Number(item.stripe_metadata_price).toLocaleString("en-US")} VND
          </Typography>
          <Typography
            width="100px"
            variant="price1"
            sx={{ textAlign: "center" }}
          >
            {Number(item.stripe_metadata_price).toLocaleString("en-US")} VND
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
