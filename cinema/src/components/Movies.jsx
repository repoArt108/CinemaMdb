import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PacmanLoader } from "react-spinners";
import Slider from "react-slick";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Movies.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { box } from "./Context/Context";

export default function Movies() {
  let [dataApi, setDataApi] = useState([]);
  let {show,searchQuery}= useContext(box)
  

  async function getData() {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/${show}/movie?api_key=690446d6babfb9692828157f6de2487a`,
      {
        params: {
          query: searchQuery,
        },
      },
    );
    setDataApi(data.results);
    // console.log(data.results);
  }

  useEffect(() => {
    getData();
  }, [searchQuery,]);

  
  var settings = {
    className: "center",
    centerPadding: "60px",
    // dots: true,
    centerMode: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 4, slidesToScroll: 4 } },
      { breakpoint: 700, settings: { slidesToShow: 2, slidesToScroll: 2 } },
    ],
  };

  return (
    <div className="container text-white movies-container">
      {/* <h4>Results :{searchQuery}</h4> */}

      <div className="slider-container">
        <Slider {...settings}>
          {dataApi.map((item) => (
            <Link
              key={item.id}
              to={`details/movie/${item.id}`}
              className="movie-link-slider"
            >
              <img
                className="poster-img"
                src={
                  item.poster_path
                    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                    : "/images/poster-fallback.jpg"
                }
                alt={item.title}
                loading="lazy"
              />
              <div className="movie-content">
                <h3 className="movie-title">{item.title}</h3>
                <p className="movie-overview">{item.overview}</p>
              </div>
            </Link>
          ))}
        </Slider>
      </div>
      {dataApi ? (
        <div className="row">
          {dataApi.map((item, index) => (
            <div className="col-lg-3 col-md-6 py-4" key={index}>
              <div className="movie-card">
                <Link to={`details/movie/${item.id}`} className="movie-link">
                  <div className="rating-badge">
                    {item.vote_average.toFixed(1)}
                  </div>
                  <div className="image-wrapper">
                    <img
                      className="poster"
                      src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                      alt={item.title}
                    />
                  </div>
                  <div className="movie-content">
                    <h3 className="movie-title">{item.title}</h3>
                    <p className="movie-overview">{item.overview}</p>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className=" d-flex justify-content-center">
          <PacmanLoader color="#0d9ffc" size={20} />
        </div>
      )}
      {/* <PacmanLoader/> */}
    </div>
  );
}
