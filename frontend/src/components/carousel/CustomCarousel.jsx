import * as React from "react";
import { useTheme } from "@mui/material/styles";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSwiper } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import {
  MobileStepper,
  Button,
  Box,
  IconButton,
  Typography,
  Paper,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import SwipeableCarousel from "./SwipeableCarousel";

// const images = [
//   {
//     label: "San Francisco – Oakland Bay Bridge, United States",
//     imgPath:
//       "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60",
//   },
//   {
//     label: "Bird",
//     imgPath:
//       "https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60",
//   },
//   {
//     label: "Bali, Indonesia",
//     imgPath:
//       "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250",
//   },
//   {
//     label: "Goč, Serbia",
//     imgPath:
//       "https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60",
//   },
// ];

const CustomCarousel = (props) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = props.item.images ? props.item.images.length : 0;
  const swiper = useSwiper();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    swiper.slideNext();
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    swiper.slidePrev();
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Grid
        container
        width="290px"
        justifyContent="space-between"
        display="flex"
        mx="5px"
        position="absolute"
        top="45vh"
        zIndex="2"
      >
        <Grid>
          <IconButton
            onClick={handleBack}
            sx={{
              backgroundColor: "#ffffff",
              "&:hover": {
                color: "#ffffff",
              },
              "&:disabled": {
                color: "#ffffff",
              },
            }}
            disabled={activeStep === 0}
          >
            <KeyboardArrowLeft />
          </IconButton>
        </Grid>
        <Grid>
          <IconButton
            onClick={handleNext}
            sx={{
              backgroundColor: "#ffffff",
              "&:hover": {
                color: "#ffffff",
              },
              "&:disabled": {
                color: "#ffffff",
              },
            }}
            disabled={activeStep === maxSteps - 1}
          >
            <KeyboardArrowRight />
          </IconButton>
        </Grid>
      </Grid>
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, A11y, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        autoplay
        navigation
        pagination={{ clickable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        {props.item.images?.map((step, index) => (
          <SwiperSlide key={index}>
            <Box
              component="img"
              sx={{
                width: "100%",
                height: "55vh",
              }}
              src={step}
              // alt={step.label}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <SwipeableCarousel
        images={props.item.images ? props.item.images : null}
        activeStep={activeStep}
        maxSteps={maxSteps}
      />
    </Box>
  );
};

export default CustomCarousel;
