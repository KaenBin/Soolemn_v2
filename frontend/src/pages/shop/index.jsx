import {
  Box,
  Grid,
  Avatar,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "@/utils/themeUtils";
import mockProducts from "@/mockdata/products";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Header from "@/components/common/Header";
import { useSelector } from "react-redux";
import { CustomButton, CustomIconButton } from "@/components/styled";
import { useState } from "react";

const ShopManage = () => {
  const [selectedTab, setSelectedTab] = useState("Information");

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case "Information":
        return <div>Information</div>;
      case "Products":
        return <div>Products</div>;
      default:
        return null;
    }
  };

  return (
    <Box m="20px" width="100%">
      <Header title="SHOP" subtitle="Managing your Shop" />
      <Grid container xs={12}>
        <Grid xs={4}>
          <div style={{ backgroundColor: "#F3F5F7", width: "90%" }}>
            <div style={{ padding: "50px" }}>
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Avatar sx={{ width: 100, height: 100 }} />
              </Grid>
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <h2>Shop Name</h2>
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
                      onClick={() => handleTabClick("Information")}
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
                        <b>Information</b>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow
                      onClick={() => handleTabClick("Details")}
                      sx={{
                        "&:hover": {
                          backgroundColor: "#e0e0e0",
                          cursor: "pointer",
                        },
                      }}
                    >
                      <TableCell align="center" sx={{ border: "none" }}>
                        Details
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
    </Box>
  );
};

export default ShopManage;
