import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";

import { Box, Button, ButtonGroup } from "@mui/material";

import ChooseColor from "./ChooseColor";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

function TableCart(props) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="center">Price&nbsp;($)</TableCell>
            <TableCell align="center">Subtotal&nbsp;($)</TableCell>
            <TableCell align="center">
              <DeleteIcon
                onClick={props.handleDeleteAll}
                aria-label="expand row"
                style={{ cursor: "pointer" }}
              ></DeleteIcon>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.products?.length > 0 ? (
            props.products?.map((row, index) => (
              <TableRow key={index} sx={{ "& > *": { borderBottom: "unset" } }}>
                <TableCell component="th" scope="row">
                  <Box sx={{ width: "100%" }}>
                    <Grid2 container>
                      <Grid2 xs={8}>
                        <img src={row.image} alt="Logo" width="120px" />
                      </Grid2>
                      <Grid2 xs={4}>
                        <Grid2 xs={12}>
                          <Grid2 xs={12}>
                            <Grid2 xs={12}>
                              <Typography
                                fontFamily=""
                                variant="h6"
                                gutterBottom
                              >
                                {row.name}
                              </Typography>
                            </Grid2>
                            <Grid2 xs={12}>
                              <Typography
                                fontFamily=""
                                variant="body1"
                                gutterBottom
                              >
                                Color: {row.color}
                              </Typography>
                            </Grid2>
                          </Grid2>
                          <Grid2 xs={12}>
                            <ChooseColor
                              row={row}
                              handleColorChange={props.handleColorChange}
                            />
                          </Grid2>
                        </Grid2>
                      </Grid2>
                    </Grid2>
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <ButtonGroup
                    variant="outlined"
                    aria-label="Basic button group"
                  >
                    <Button
                      onClick={() =>
                        props.setQuantity(row.product_id, row.quantity - 1)
                      }
                      disabled={row.quantity === 1 ? true : false}
                    >
                      <RemoveIcon />
                    </Button>
                    <Button>{row.quantity}</Button>
                    <Button
                      onClick={() =>
                        props.setQuantity(row.product_id, row.quantity + 1)
                      }
                    >
                      <AddIcon />
                    </Button>
                  </ButtonGroup>
                </TableCell>
                <TableCell align="center">{row.price}</TableCell>
                <TableCell align="center">{row.price * row.quantity}</TableCell>
                <TableCell align="center">
                  <DeleteIcon
                    aria-label="expand row"
                    onClick={() => {
                      props.handleDeleteFromCart(row.product_id);
                    }}
                    style={{ cursor: "pointer" }}
                  ></DeleteIcon>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <></>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableCart;
