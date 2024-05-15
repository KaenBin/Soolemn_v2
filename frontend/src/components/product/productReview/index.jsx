import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { StyledRating } from "@/utils/utils";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { ColorButton } from "@/components/styled";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

export default function ProductReview() {
  return (
    <Stack width="80vw" display="flex" justifyContent="start" spacing={3}>
      <Grid2 container display="flex" justifyContent="start" columnSpacing={10}>
        <Grid2>
          <Typography variant="h5">Additional Info</Typography>
        </Grid2>
        <Grid2>
          <Typography variant="h5">Questions</Typography>
        </Grid2>
        <Grid2>
          <Typography variant="h5">Reviews</Typography>
        </Grid2>
      </Grid2>
      <Divider />
      <Typography variant="h4">Customer Reviews</Typography>
      <StyledRating
        name="customized-color"
        defaultValue={2}
        getLabelText={(value) => `${value} Star${value !== 1 ? "s" : ""}`}
        precision={0.5}
        icon={<StarIcon fontSize="inherit" />}
        emptyIcon={<StarBorderIcon fontSize="inherit" />}
      />
      15 reviews
      <Paper
        component="form"
        sx={{
          p: "10px 20px",
          display: "flex",
          alignItems: "center",
          borderRadius: "15px",
        }}
      >
        <InputBase
          sx={{ ml: 2, flex: 1, fontSize: "18px" }}
          placeholder="Enter your review"
          inputProps={{ "aria-label": "search google maps" }}
        />
        <ColorButton
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            width: "15vw",
            padding: "10px 20px",
            borderRadius: "20px",
          }}
        >
          Write Review
        </ColorButton>
      </Paper>
      {[0, 1].map((index) => (
        <>
          <Grid2
            key={index}
            container
            display="flex"
            justifyContent="space-between"
          >
            <Grid2
              xs={1.5}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Avatar sx={{ width: "60px", height: "60px" }} />
            </Grid2>
            <Grid2
              container
              xs={10.5}
              display="flex"
              justifyContent="center"
              flexDirection="column"
              spacing={2}
            >
              <Grid2>
                <Typography variant="h5">Anonymous Person</Typography>
              </Grid2>
              <Grid2>
                <StyledRating
                  name="customized-color"
                  defaultValue={2}
                  getLabelText={(value) =>
                    `${value} Star${value !== 1 ? "s" : ""}`
                  }
                  precision={0.5}
                  icon={<StarIcon fontSize="inherit" />}
                  emptyIcon={<StarBorderIcon fontSize="inherit" />}
                />
              </Grid2>
              <Grid2>
                <Typography
                  variant="body1"
                  sx={{
                    font: "400 16px/26px Inter, -apple-system, Roboto, Helvetica, sans-serif",
                  }}
                >
                  I bought it 3 weeks ago and now come back just to say “Awesome
                  Product”. I really enjoy it. At vero eos et accusamus et iusto
                  odio dignissimos ducimus qui blanditiis praesentium voluptatum
                  deleniti atque corrupt et quas molestias excepturi sint non
                  provident.
                </Typography>
              </Grid2>
              <Grid2
                container
                width="25vw"
                display="flex"
                flexDirection="row"
                justifyContent="center"
                spacing={3}
              >
                <Grid2>
                  <Typography variant="body2" fontWeight={1000}>
                    Like
                  </Typography>
                </Grid2>
                <Grid2>
                  <Typography variant="body2" fontWeight={1000}>
                    Reply
                  </Typography>
                </Grid2>
              </Grid2>
            </Grid2>
          </Grid2>
          <Divider />
        </>
      ))}
      <Button
        onClick={() => setPage(page + 1)}
        style={{
          color: "#141718",
          width: "163px",
          height: "40px",
          alignSelf: "center",
          border: "solid",
          borderWidth: "1px",
          borderColor: "#141718",
          borderRadius: 80,
        }}
      >
        Show more
      </Button>
    </Stack>
  );
}
