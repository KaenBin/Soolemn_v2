import { useEffectm, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Paper,
  Typography,
  TextField,
  Card,
  CardHeader,
  CardContent,
  IconButton,
  CardMedia,
  CardActions,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import product1 from "../../assets/OIP.jpg";
import apiInstance from "../../services/apiService";

import { setAuthenticating } from "@/redux/actions/miscActions";
import OrderHistory from "./OrderHistory";
import AccountDetails from "./AccountDetails";
import OrderInfo from "./OrderInfo";
// import mock_product from "@/mockdata/products";
// import { ProductGroup } from "@/components/product";

export default function Account() {
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState("Account");
  const [userData, setUserData] = useState([]);
  const [imageUrl, setImageUrl] = useState();
  const profile = useSelector((state) => state.profile);
  console.log(profile);
  const currentUser = apiInstance.getCurrentUser();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await apiInstance.getUser(currentUser.email);
        console.log(userData);
        setUserData(userData);
      } catch (error) {
        console.error("Error occurred:", error);
      }
    };

    getUserData();
  }, [currentUser.email]);

  useEffect(
    () => () => {
      dispatch(setAuthenticating(false));
    },
    []
  );

  useEffect(() => {
    apiInstance
      .loadImage("gs://soolemn-cc5b9.appspot.com/defaultAvatar.jpg")
      .then((url) => {
        setImageUrl(url);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(grey[900]),
    backgroundColor: grey[900],
    "&:hover": {
      backgroundColor: grey[500],
    },
  }));

  const handleTabClick = (tabName) => {
    setSelectedTab(tabName);
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case "Account":
        return <AccountDetails profile={profile} />;
      case "Address":
        return (
          <>
            <Grid container xs={12} spacing={5}>
              <Grid xs={6}>
                <Card sx={{ border: "2px solid black" }}>
                  <CardHeader
                    action={
                      <IconButton aria-label="settings">
                        <EditIcon />
                        <Typography variant="body1" sx={{ marginLeft: "4px" }}>
                          Edit
                        </Typography>
                      </IconButton>
                    }
                    title="Billing Address"
                    subheader="Sofia Havertz"
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      (+1) 234 567 890
                      <br />
                      345 Long Island, NewYork, United States
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid xs={6}>
                <Card sx={{ border: "2px solid black" }}>
                  <CardHeader
                    action={
                      <IconButton aria-label="settings">
                        <EditIcon />
                        <Typography variant="body1" sx={{ marginLeft: "4px" }}>
                          Edit
                        </Typography>
                      </IconButton>
                    }
                    title="Shipping Address"
                    subheader="Sofia Havertz"
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      (+1) 234 567 890
                      <br />
                      345 Long Island, NewYork, United States
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </>
        );
      case "Order":
        return <OrderHistory handleTabClick={handleTabClick} />;
      case "Order Info":
        return <OrderInfo />;
      case "Wishlist":
        return (
          <>
            <TableContainer
              component={Paper}
              sx={{
                // width: "80vw",
                margin: "auto",
                marginTop: "3%",
              }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Product</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow
                  // key={index}
                  >
                    <TableCell>
                      <IconButton>
                        <CloseIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <Grid
                        container
                        xs={12}
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Grid xs={4}>
                          <img
                            src={product1}
                            alt="product1"
                            width="75"
                            height="75"
                          />
                        </Grid>
                        <Grid xs={8}>
                          <b>Tray Table</b>
                          <br />
                          <p>Color: Black</p>
                        </Grid>
                      </Grid>
                    </TableCell>
                    <TableCell>$19.19</TableCell>
                    <TableCell>
                      <ColorButton variant="contained">Add to cart</ColorButton>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <main className="content">
      <div className="home">
        <div style={{ width: "80%", margin: "auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              fontSize: "20px",
              marginBottom: "5px",
            }}
          >
            <h1>My Account</h1>
          </div>
          <Grid container xs={12}>
            <Grid xs={4}>
              <div style={{ backgroundColor: "#F3F5F7", width: "90%" }}>
                <div style={{ padding: "50px" }}>
                  <Grid
                    item
                    xs={12}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <Avatar sx={{ width: 100, height: 100 }} src={imageUrl} />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <h2>{profile?.username}</h2>
                  </Grid>
                  <TableContainer
                    component={Paper}
                    sx={{
                      width: "90%",
                      margin: "auto",
                      backgroundColor: "transparent",
                      boxShadow: "none",
                      border: "none",
                      marginTop: "15px",
                    }}
                  >
                    <Table>
                      <TableHead>
                        <TableRow
                          onClick={() => handleTabClick("Account")}
                          sx={{
                            "&:hover": {
                              backgroundColor: "#e0e0e0",
                              cursor: "pointer",
                            },
                          }}
                        >
                          <TableCell
                            align="center"
                            sx={{ borderColor: "black", fontSize: "18px" }}
                          >
                            <b>Account</b>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow
                          onClick={() => handleTabClick("Address")}
                          sx={{
                            "&:hover": {
                              backgroundColor: "#e0e0e0",
                              cursor: "pointer",
                            },
                          }}
                        >
                          <TableCell align="center" sx={{ border: "none" }}>
                            Address
                          </TableCell>
                        </TableRow>
                        <TableRow
                          onClick={() => handleTabClick("Order")}
                          sx={{
                            "&:hover": {
                              backgroundColor: "#e0e0e0",
                              cursor: "pointer",
                            },
                          }}
                        >
                          <TableCell align="center" sx={{ border: "none" }}>
                            Order
                          </TableCell>
                        </TableRow>
                        <TableRow
                          onClick={() => handleTabClick("Wishlist")}
                          sx={{
                            "&:hover": {
                              backgroundColor: "#e0e0e0",
                              cursor: "pointer",
                            },
                          }}
                        >
                          <TableCell align="center" sx={{ border: "none" }}>
                            Wishlist
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </div>
            </Grid>
            <Grid xs={8}>
              <h2>Your {selectedTab}</h2>
              {renderTabContent()}
            </Grid>
          </Grid>
        </div>
      </div>
    </main>
  );
}
