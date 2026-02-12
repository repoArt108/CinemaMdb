import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PacmanLoader } from "react-spinners";
import Slider from "react-slick";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Tvs/Tv.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { box } from "../Context/Context";
export default function Tv() {
  let [dataApi, setDataApi] = useState([]);
  let { show, searchQuery } = useContext(box)

  async function getData() {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/${show}/tv?api_key=690446d6babfb9692828157f6de2487a`,
      {
        params: {
          query: searchQuery,
        },
      },
    );
    setDataApi(data.results);
  }

  useEffect(() => {
    getData();
  }, [searchQuery]);

  var settings = {
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    pauseOnHover: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 4, slidesToScroll: 4 } },
      { breakpoint: 700, settings: { slidesToShow: 2, slidesToScroll: 2 } },
    ],
  };
  return (
    <div>
      <div className="container text-white tv-container">
        {/* <h4>Results :{searchQuery}</h4> */}
        <div className="tv-slider">
          <h4 className="mb-4">Trending</h4>
          <Slider {...settings}>
            {dataApi.map((item) => (
              <Link
                key={item.id}
                to={`${item.id}/details`}
                className="tv-link-slider"
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
                <div className="tv-content">
                  <h3 className="tv-title">{item.title}</h3>
                  <p className="tv-overview">{item.overview}</p>
                </div>
              </Link>
            ))}
          </Slider>
        </div>

        {dataApi ? (
          <div className="row">
            {dataApi.map((item, index) => (
              <div className="col-lg-3 col-md-6 py-4" key={index}>
                <div className="tv-card">
                  <Link to={`${item.id}/details`} className="tv-link">
                    <div className="upper-rating-tv">
                      {item.vote_average ? (
                        <div className="rating-badge-tv">
                          {item.vote_average.toFixed(1)}
                        </div>
                      ) : (
                        // <div className="rating-badge">0.0</div>
                        ""
                      )}
                      <div className="saving-badge-tv">
                        <span className="saving-svg"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bookmark" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="svg-inline--fa fa-bookmark"><path fill="currentColor" d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z" className=""></path></svg></span>
                      </div>
                    </div>
                    <div className="image-wrapper">
                      <img
                        className="poster"
                        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                        alt={item.title}
                      />
                      A
                    </div>
                    <div className="tv-content">
                      <h3 className="tv-title">{item.name}</h3>
                      <p className="tv-overview">{item.overview}</p>
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
