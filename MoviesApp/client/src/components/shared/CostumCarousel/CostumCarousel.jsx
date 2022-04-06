// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import classes from "./CostumCarousel.module.css";

// import required modules
import { Pagination } from "swiper";

export default function CostumCarousel({ movies }) {
  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
      >
        {movies.map((movie) => {
          return (
            <SwiperSlide key={movie._id}>
              <img src={movie.img} alt="" className={classes.image} />
              <div className={classes.gradient}>
                <h5 className={classes.title}>{movie.title}</h5>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
