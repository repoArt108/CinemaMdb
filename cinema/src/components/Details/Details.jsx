import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Details/details.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { PacmanLoader } from "react-spinners";

export default function Details() {
  const { id, type } = useParams();
  const [details, setDetails] = useState(null);
  const [actors, setCreditsCasting] = useState([]);
  const [crews, setCreditsCrews] = useState([]);
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);
  const [isTrailerLoading, setIsTrailerLoading] = useState(true);

  useEffect(() => {
    async function fetchDetails() {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${type}/${id}?api_key=690446d6babfb9692828157f6de2487a`,
      );
      setDetails(data);
    }
    async function fetchCredits() {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=690446d6babfb9692828157f6de2487a`,
      );

      setCreditsCasting(data.cast);
      setCreditsCrews(data.crew);
      console.log(data.cast);
    }
    async function fetchTrailer() {
      setIsTrailerLoading(true);
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=690446d6babfb9692828157f6de2487a`,
      );
      if (!data.results || data.results.length === 0) {
        setTrailerKey(null);
        setIsTrailerLoading(false);
        return;
      }
      // 1️⃣ Try to find official trailer
      const officialTrailer = data.results.find(
        (video) => video.site === "YouTube" && video.type === "Trailer",
      );
      // 2️⃣ Fallback to any YouTube video
      const fallbackVideo = data.results.find(
        (video) => video.site === "YouTube",
      );

      setTrailerKey(officialTrailer?.key || fallbackVideo?.key || null);
      setIsTrailerLoading(false);
    }

    fetchDetails();
    fetchTrailer();
    fetchCredits();
  }, [id, type]);
  // console.log()
  const directors = crews
    .filter(
      (item) =>
        item.known_for_department === "Directing" || item.job === "Director",
    )
    .filter(
      (item, index, self) => index === self.findIndex((p) => p.id === item.id),
    )
    .slice(0, 1); // 👈 only first 2

  const writers = crews
    .filter(
      (item) =>
        item.known_for_department === "Writing" || item.job === "Writer",
    )
    .filter(
      (item, index, self) => index === self.findIndex((p) => p.id === item.id),
    )
    .slice(0, 1); // 👈 only first 2

  let getShowName = (mediaType) =>
    mediaType === "tv" ? details.name : details.title;
  let getShowRelease = (mediaType) =>
    mediaType === "tv" ? details.first_air_date : details.release_date;

  if (!details) {
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
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 5 } },
      { breakpoint: 992, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 576, settings: { slidesToShow: 2 } },
    ],
  };

  return (
    <>
      <div className="details-page">
        <div
          className="custom-bg"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w780${details.backdrop_path})`,
          }}
        >
          <div className="container hero-content">
            <div className="row d-flex py-4 gap-3">
              <div className="img-wrapper">
                <div className="poster-img">
                  <img
                    src={`https://image.tmdb.org/t/p/w300${details.poster_path}`}
                    alt={getShowName(type)}
                  />
                </div>
              </div>

              <div className="col">
                <div className="data-details">
                  <h2>
                    <a
                      href={details.homepage}
                      target="blank"
                      className="link-title"
                    >
                      {getShowName(type)}
                    </a>
                    <span>
                      {" "}
                      ({new Date(getShowRelease(type)).getFullYear()})
                    </span>
                  </h2>

                  <div className="meta">
                    <span>
                      {getShowRelease(type)} ({details.origin_country[0]})
                    </span>
                    <span className="genres">
                      {details.genres.map((g) => g.name).join(" • ")}
                    </span>
                    <span className="runtime">
                      {type === "movie"
                        ? `${Math.floor(details.runtime / 60)}h ${details.runtime % 60}m`
                        : ""}
                    </span>
                  </div>

                  <p className="tagline">{details.tagline}</p>
                  <h3>Overview</h3>
                  <p className="overview">{details.overview}</p>
                  {isTrailerLoading ? (
                    <div className="d-flex align-items-center gap-2 mt-3">
                      <PacmanLoader color="#0d9ffc" size={16} />
                      <span className="text-muted">Checking trailer...</span>
                    </div>
                  ) : trailerKey ? (
                    <button
                      className="trailer-btn"
                      onClick={() => setShowTrailer(true)}
                    >
                      ▶ Watch Trailer
                    </button>
                  ) : (
                    <p className="mt-3">Trailer not available</p>
                  )}

                  <div className="people-grid">
                    {directors.map((item) => (
                      <div className="profile" key={item.id}>
                        <p className="name">{item.name}</p>
                        <p className="role">Director</p>
                      </div>
                    ))}
                    {writers.map((item) => (
                      <div className="profile" key={item.id}>
                        <p className="name">{item.name}</p>
                        <p className="role">Writer</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {showTrailer && trailerKey && (
            <div className="trailer-overlay">
              <button
                className="close-trailer"
                onClick={() => setShowTrailer(false)}
              >
                ✕
              </button>
              <div className="trailer-modal">
                <iframe
                  src={`https://www.youtube.com/embed/${trailerKey}?autoplay=0`}
                  title={`${getShowName(type)} | Official Trailer`}
                  allow="encrypted-media"
                  allowFullScreen
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="cast-slider">
        <div className="container">
          <h3 className="section-title">Cast</h3>
          <Slider {...settings}>
            {actors.map((actor) => (
              <Link
                key={actor.id}
                to={`/details/${type}/${id}/gallery/${actor.id}`}
                className="cast-card"
              >
                <div className="cast-image">
                  <img
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
                        : "/images/person-fallback.jpg"
                    }
                    alt={actor.name}
                    loading="lazy"
                  />
                </div>

                <div className="cast-info">
                  <h4 className="cast-name">{actor.name}</h4>
                  <p className="cast-role">{actor.character}</p>
                </div>
              </Link>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
}
