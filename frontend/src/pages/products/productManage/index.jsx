import {
  Box,
  Button,
  IconButton,
  TextField,
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
import { CustomButton, CustomIconButton } from "@/components/styled";
import { useEffect, useState } from "react";
import apiInstance from "@/services/apiService";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
const ProductManage = () => {
  const products = useSelector((state) => state.products);
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [analysisArray, setAnalysisArray] = useState([]);
  const colors = tokens(theme.palette.mode);
  const [quantity, setQuantity] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const [quantities, setQuantities] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const handleSetQuantity = (index, value) => {
    const newQuantity = [...quantity];
    newQuantity[index] = value;
    setQuantity(newQuantity);
  };
  const handleAddQuantity = (index) => {
    const newQuantity = [...quantities];
    newQuantity[index] = quantity[index];
    setQuantities(newQuantity);
    setQuantity([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]); // Clear the input field
    console.log(quantities);
  };
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await apiInstance.calculateAllMinMax();
      setAnalysisArray(response.data.result);
      setLoading(false);
    };
    fetchData();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    {
      field: "name",
      headerName: "Name",
      align: "left",
      flex: 2,
      // cellClassName: "name-column--cell",
    },
    {
      field: "description",
      headerName: "Description",
      headerAlign: "left",
      align: "left",
      flex: 2,
    },
    {
      field: "stripe_metadata_price",
      headerName: "Price",
      align: "center",
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "stripe_metadata_category",
      headerName: "Category",
      flex: 1,
    },
    {
      field: "stripe_metadata_subcategory",
      headerName: "Subcategory",
      flex: 1,
    },
    {
      field: "stripe_metadata_group",
      headerName: "Group",
      flex: 1,
    },
    {
      field: "supply",
      headerName: "Supply",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: ({ row }) => {
        const getColor = () => {
          if (row.stripe_metadata_quantity < row.analysisArray?.reorderPoint) {
            return "red";
          } else if (
            row.stripe_metadata_quantity < row.analysisArray?.minInventory
          ) {
            return "#D4AC0D";
          } else return "green";
        };
        if (loading) {
          return <Box>...</Box>;
        } else {
          return (
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
              color={getColor}
            >
              <Box mr={1}>
                {Number(row.stripe_metadata_quantity) +
                  Number(quantities[row.index] || 0) ||
                  row.stripe_metadata_stock}
              </Box>
              <Box>/</Box>
              <Box ml={1}>{row.stripe_metadata_stock}</Box>
            </Box>
          );
        }
      },
    },
    {
      field: "add_supply",
      headerName: "Add Supply",
      headerAlign: "center",
      align: "center",
      flex: 2,
      renderCell: ({ row: { index } }) => {
        return (
          <>
            <TextField
              variant="outlined"
              value={quantity[index]}
              onChange={(e) => handleSetQuantity(index, e.target.value)}
              type="number"
              sx={{
                width: "100px",
                height: "100%",
              }}
            />
            <CustomButton
              startIcon={<ArrowForwardIosIcon />}
              onClick={() => handleAddQuantity(index)}
              sx={{
                width: "20px",
                height: "40px",
                // fontSize: "12px",
                // left: "85%",
              }}
            >
              {/* Add */}
            </CustomButton>
          </>
        );
      },
    },
  ];

  return (
    <Box m="20px" width="100%">
      <Header title="PRODUCTS" subtitle="Managing your Products" />
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
        {/* <Typography variant="h5" sx={{ color: colors.grey[100] }}>
          Products
        </Typography> */}
        <CustomButton
          startIcon={<AddCircleIcon />}
          onClick={() => History.navigate("/product/add")}
          sx={{
            width: "150px",
            height: "40px",
            fontSize: "12px",
            left: "85%",
          }}
        >
          Add Product
        </CustomButton>
        <DataGrid
          checkboxSelection
          rows={products.items.map((product, index) => {
            return { ...product, analysisArray: analysisArray[index], index };
          })}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default ProductManage;
