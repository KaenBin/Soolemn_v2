import {
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
  useTheme,
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
import { useEffect, useState } from "react";
import apiInstance from "../../../services/apiService";

const OrderManage = () => {
  const [orders, setOrders] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  console.log(orders);
  useEffect(() => {
    const getAllOrders = async () => {
      const res = await apiInstance.getAllOrders();
      setOrders(res.data);
    };
    getAllOrders();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", flex: 2 },
    {
      field: "customer",
      headerName: "Customer",
      headerAlign: "center",
      align: "center",
      flex: 2,
      // cellClassName: "name-column--cell",
    },
    {
      field: "amount",
      headerName: "Total Payment",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "created",
      headerName: "Date Purchase",
      align: "center",
      headerAlign: "center",
      flex: 2,
    },
    {
      field: "status",
      headerName: "Payment Status",
      align: "center",
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "delivery_status",
      headerName: "Delivery Status",
      align: "center",
      headerAlign: "center",
      flex: 1,
      valueGetter: (value, row) => {
        return row.metadata.delivery_status || "Delivered";
      },
    },
    {
      headerName: "Action",
      headerAlign: "center",
      align: "center",
      flex: 3,
      renderCell: ({ row: { id, status, metadata } }) => {
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking
          apiInstance.updateOrder(id, {
            metadata: { delivery_status: "Delivering" },
          });
          return alert("Approve Order");
        };

        return (
          <>
            {status == "succeeded" && (
              <Stack
                key={id}
                height="100%"
                direction="row"
                spacing={2}
                mx={2}
                alignItems="center"
                justifyContent="center"
              >
                <Button
                  onClick={onClick}
                  sx={{
                    color: "white",
                    width: "60%",
                    m: "0 auto",
                    p: "8px",
                    display: "flex",
                    justifyContent: "center",
                    backgroundColor: colors.greenAccent[700],
                    borderRadius: "4px",
                  }}
                  disabled={
                    metadata.delivery_status == "Delivering" ||
                    metadata.delivery_status == "Delivered"
                  }
                >
                  {metadata.delivery_status == "Delivering" ||
                  metadata.delivery_status == "Delivered"
                    ? "Approved"
                    : "Approve"}
                </Button>
                {metadata.delivery_status == "Pending" && (
                  <Button
                    onClick={onClick}
                    sx={{
                      color: "white",
                      width: "60%",
                      m: "0 auto",
                      p: "8px",
                      display: "flex",
                      justifyContent: "center",
                      backgroundColor: colors.redAccent[700],
                      borderRadius: "4px",
                    }}
                  >
                    Decline
                  </Button>
                )}
              </Stack>
            )}
          </>
        );
      },
    },
  ];

  return (
    <Box m="20px" width="100%">
      <Header title="ORDERS" subtitle="Managing your Orders" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={orders} columns={columns} />
      </Box>
    </Box>
  );
};

export default OrderManage;
