import React from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const SwipeableCarousel = (props) => (
  <Swiper
    // install Swiper modules
    modules={[Navigation, A11y]}
    spaceBetween={50}
    slidesPerView={3}
    navigation
    onSwiper={(swiper) => console.log(swiper)}
    onSlideChange={() => console.log("slide change")}
  >
    {props.images?.map((step, index) => (
      <SwiperSlide key={index}>
        <Box
          component="img"
          sx={{
            width: "100px",
            height: "20vh",
            // display: "block",
            // maxWidth: 400,
            // overflow: "hidden",
            // boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.4)",
          }}
          src={step}
          // alt={step.label}
        />
      </SwiperSlide>
    ))}
  </Swiper>
);

export default SwipeableCarousel;
