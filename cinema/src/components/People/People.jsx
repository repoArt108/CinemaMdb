import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PacmanLoader } from "react-spinners";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import './People.css'
import { box } from "../Context/Context.jsx";
export default function People() {
  let [dataApi, setDataApi] = useState([]);
  let { show, searchQuery } = useContext(box)


  async function getData() {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/${show}/person?api_key=690446d6babfb9692828157f6de2487a`,
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
    dots: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 4, slidesToScroll: 4 } },
      { breakpoint: 700, settings: { slidesToShow: 2, slidesToScroll: 2 } },
    ],
  };

  return (
    <div className="container text-white movies-container">
      {/* <h4>Results :{searchQuery}</h4> */}

      <div className="movie-slider">
        <Slider {...settings}>
          {dataApi.map((item, index) => (
            <div key={index}>
              <Link
                key={item.id}
                to={`gallery/${item.id}`}
                className="movie-link-slider"
              >
                <img
                  className="poster-img"
                  src={
                    item.profile_path
                      ? `https://image.tmdb.org/t/p/w500${item.profile_path}`
                      : "/images/poster-fallback.jpg"
                  }
                  alt={item.name}
                  loading="lazy"
                />
                <div className="movie-content">
                  <h3 className="movie-title">{item.name}</h3>
                  {/* <p className="movie-overview">{item.overview}</p> */}
                </div>
              </Link>

            </div>
          ))}
        </Slider>
      </div>
      {dataApi ? (
        <div className="row">
          {dataApi.map((item, index) => (
            <div className="col-lg-3 col-md-6 py-4" key={index}>
              <div className="movie-card">
                <Link to={`gallery/${item.id}`} className="movie-link">


                  {/* {item.popularity ? (
                    <div className="rating-badge">
                      {item.popularity.toFixed(1)}
                    </div>
                  ) : (
                    <div>""</div>
                  )} */}
                    <div className="upper-rating-home">
                    {item.popularity ? (
                      <div className="rating-badge-home">
                        {item.popularity.toFixed(1)}
                      </div>
                    ) : (
                      // <div className="rating-badge">0.0</div>
                      ""
                    )}
                    <div className="saving-badge-home">
                      <span className="saving-svg"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bookmark" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="svg-inline--fa fa-bookmark"><path fill="currentColor" d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z" className=""></path></svg></span>
                    </div>
                  </div>
                  <div className="image-wrapper">
                    <img
                      className="poster"
                      src={`https://image.tmdb.org/t/p/w500${item.profile_path}`}
                      alt={item.title}
                    />
                  </div>
                  <div className="movie-content">
                    <h3 className="movie-title">{item.name}</h3>
                    {/* <p className="movie-overview">{item.overview}</p> */}
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
