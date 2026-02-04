import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { PacmanLoader } from "react-spinners";
import "./Home.css";
import { box } from "./Context/Context";
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

  // useEffect(() => {
  //   getData();
  // }, [searchQuery]);

  let getShowName = (mediaType, index) =>
    mediaType === "tv" ? dataApi[index].name : dataApi[index].title;

  const getMediaPath = (item) =>
    item.media_type === "tv"
      ? `details/${item.media_type}/${item.id}`
      : `details/${item.media_type}/${item.id}`;

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
  return (
    <div className="container">
      {/* <h4>Results :{searchQuery}</h4> */}
      {/* <h4>{showName}</h4> */}
      <h4 className="text-center mt-4">Trending</h4>
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
                  {item.vote_average ? (
                    <div className="rating-badge">
                      {item.vote_average.toFixed(1)}
                    </div>
                  ) : (
                    <div>0.0</div>
                  )}
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
  );
}
