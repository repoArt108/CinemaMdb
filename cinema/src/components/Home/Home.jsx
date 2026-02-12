import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { PacmanLoader } from "react-spinners";
import { box } from "../Context/Context";

export default function Home() {
  const [dataApi, setDataApi] = useState([]);
  let { searchQuery } = useContext(box);

  async function getData() {
    let response;
    if (searchQuery && searchQuery.trim() !== "") {
      response = await axios.get("https://api.themoviedb.org/3/search/multi", {
        params: {
          api_key: "690446d6babfb9692828157f6de2487a",
          query: searchQuery,
        },
      });
    } else {
      response = await axios.get(
        "https://api.themoviedb.org/3/trending/all/day",
        {
          params: {
            api_key: "690446d6babfb9692828157f6de2487a",
          },
        },
      );
    }

    setDataApi(response.data.results);
  }

  useEffect(() => {
    const t = setTimeout(getData, 400);
    return () => clearTimeout(t);
  }, [searchQuery]);

  let getShowName = (mediaType, index) =>
    mediaType === "tv" ? dataApi[index].name : dataApi[index].title;

  const getMediaPath = (item) =>
    item.media_type === "tv"
      ? `${item.media_type}/${item.id}/details`
      : `${item.media_type}/${item.id}/details`;

  if (!dataApi) {
    return (
      <div className="alter-trailer">
        <div className="text-white mt-3">
          <div className="d-flex justify-content-center pb-3">
            <PacmanLoader color="#0d9ffc" size={20} />
          </div>
          Loading....
        </div>
      </div>
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 6000,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    pauseOnHover: false,
  };
  return (
    <div className="">
      {/* <h4>Results :{searchQuery}</h4> */}
      {/* <h4>{showName}</h4> */}
      {/* ================= HERO SECTION ================= */}

      <section className="hero-slider mb-5">
      <Slider {...settings}>
        {dataApi?.slice(0, 5).map((item) => (
          <div key={item.id} className="hero-slide">
            
            {/* Backdrop */}
            <img
              className="hero-backdrop"
              src={
                item.backdrop_path
                  ? `https://image.tmdb.org/t/p/original${item.backdrop_path}`
                  : "/fallback.jpg"
              }
              alt={item.title || item.name}
            />

            

            
            <div className="hero-overlay"></div>
            <div className="container hero-content-homex ps-5 ms-5 w-100">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="hero-title">
                Discover Movies & TV Shows
              </h1>
              <p className="hero-subtitle">
                Explore trending titles, discover new favorites, and track
                what you love — all in one place.
              </p>

              <div className="hero-buttons mt-4">
                <Link to="/movies" className="btn btn-primary me-3">
                  Browse Movies
                </Link>
                <Link to="/tv" className="btn btn-outline-light">
                  Browse TV Shows
                </Link>
              </div>
            </div>
          </div>
        </div>

          </div>
        ))}
      </Slider>
    </section>
      <div className="container">
        <h4 className=" mt-4">Trending</h4>
        {dataApi ? (
          <div className="row">
            {dataApi.map((item, index) => (
              <div className="col-lg-3 col-md-6 py-4" key={index}>
                <div className="movie-card">
                  <Link
                    key={item.id}
                    to={getMediaPath(item)}
                    className="movie=link"
                  >
                    <div className="upper-rating-home">
                      {item.vote_average ? (
                        <div className="rating-badge-home">
                          {item.vote_average.toFixed(1)}
                        </div>
                      ) : (
                        // <div className="rating-badge">0.0</div>
                        ""
                      )}
                      <div className="saving-badge-home">
                        <span className="saving-svg">
                          <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fas"
                            data-icon="bookmark"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 384 512"
                            className="svg-inline--fa fa-bookmark"
                          >
                            <path
                              fill="currentColor"
                              d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"
                              className=""
                            ></path>
                          </svg>
                        </span>
                      </div>
                    </div>
                    <div className="image-wrapper">
                      <img
                        className="poster"
                        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                        alt={item.title}
                      />
                    </div>

                    <div className="movie-content">
                      {/* {showName(item.media_type)} */}
                      {/* <span className="text-danger">{index}</span> */}
                      <h3 className="movie-title">
                        {getShowName(item.media_type, index)}
                      </h3>
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
      </div>
    </div>
  );
}
