import { useContext } from "react";
import { WatchLaterContext } from "./Context/WatchLaterContext";
import { Link } from "react-router-dom";

export default function WatchLater() {
  const { watchLater, removeFromWatchLater } =
    useContext(WatchLaterContext);

  if (!watchLater.length) {
    return <p className="text-center mt-5">No saved items yet 🎬</p>;
  }

  return (
    <div className="container mt-4">
      <h2>Watch Later</h2>

      <div className="row">
        {watchLater.map((item) => (
          <div className="col-md-2 mb-4" key={item.id}>
            <div className="position-relative">
              <img
                className="img-fluid rounded"
                src={`https://image.tmdb.org/t/p/w500${item.poster}`}
                alt={item.title}
              />

              <button
                className="watch-later-btn saved"
                onClick={() => removeFromWatchLater(item.id)}
              >
                <img src="/delete.png" alt="remove" />
              </button>
            </div>

            <p className="small mt-2 text-center">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
