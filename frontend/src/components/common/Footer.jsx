import { Box, Button, Divider, Link, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import { YouTube } from "@mui/icons-material";

export default function Footer() {
  return (
    <Box className="footer">
      <Grid2
        display="flex"
        justifyContent="space-between"
        flexDirection="column"
      >
        <Grid2 container display="flex" justifyContent="space-between">
          <Grid2
            height="200px"
            width="50%"
            display="flex"
            justifyContent="space-between"
            flexDirection="column"
            mb="80px"
            xs={6}
          >
            <Grid2>
              <Typography variant="h3">Soolemn</Typography>
            </Grid2>
            <Grid2>
              <Typography variant="h4">
                Always in style! & <br />
                Experience the lifestyle.
              </Typography>
            </Grid2>
            <Grid2 width="25%" display="flex" justifyContent="space-between">
              <InstagramIcon fontSize="large" />
              <FacebookOutlinedIcon fontSize="large" />
              <YouTube fontSize="large" />
            </Grid2>
          </Grid2>
          <Grid2
            display="flex"
            justifyContent="space-between"
            flexDirection="column"
            mb="40px"
            xs={4}
          >
            <Grid2>
              <Link
                fontSize="16px"
                variant="button"
                color="color"
                underline="none"
                textTransform="capitalize"
              >
                Info
              </Link>
            </Grid2>
            <Grid2>
              <Link
                component="button"
                variant="button"
                color="color"
                underline="hover"
                textTransform="capitalize"
              >
                Our Policy
              </Link>
            </Grid2>
            <Grid2>
              <Link
                component="button"
                variant="button"
                color="color"
                underline="hover"
                textTransform="capitalize"
              >
                Return & Refund
              </Link>
            </Grid2>
            <Grid2>
              <Link
                component="button"
                variant="button"
                color="color"
                underline="hover"
                textTransform="capitalize"
              >
                Support
              </Link>
            </Grid2>
            <Grid2>
              <Link
                component="button"
                variant="button"
                color="color"
                underline="hover"
                textTransform="capitalize"
              >
                FAQs
              </Link>
            </Grid2>
          </Grid2>
          <Grid2
            width="100px"
            display="flex"
            justifyContent="space-between"
            flexDirection="column"
            mb="40px"
            xs={4}
          >
            <Grid2>
              <Link
                fontSize="16px"
                variant="button"
                color="color"
                underline="none"
                textTransform="capitalize"
              >
                Office
              </Link>
            </Grid2>
            <Grid2>
              <Link
                component="button"
                variant="button"
                color="color"
                underline="hover"
                textAlign="justify"
                textTransform="capitalize"
                lineHeight="40px"
              >
                111 ABC street, District 1, HCMC Vietnam
              </Link>
            </Grid2>
            <Grid2>
              <Link
                component="button"
                variant="button"
                color="color"
                underline="hover"
                textTransform="capitalize"
              >
                84-756-3237
              </Link>
            </Grid2>
          </Grid2>
        </Grid2>
        <Divider color="#d5dadc" />
        <Grid2 mt="30px" display="flex" flexDirection="row">
          <Typography mr="20px">
            Copyright © 2023 Soolemn. All rights reserved
          </Typography>
          <Divider orientation="vertical" flexItem color="#6C7275" />
          <Link
            color="#6C7275"
            component="button"
            underline="hover"
            textTransform="capitalize"
            sx={{ marginLeft: "20px" }}
          >
            Privacy Policy
          </Link>
          <Link
            color="#6C7275"
            component="button"
            underline="hover"
            textTransform="capitalize"
            sx={{ marginLeft: "20px" }}
          >
            Terms & Conditions
          </Link>
        </Grid2>
      </Grid2>
    </Box>
  );
}
