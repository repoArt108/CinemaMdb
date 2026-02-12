import { useContext } from "react";
import { WatchLaterContext } from "./Context/WatchLaterContext";

export default function WatchLaterButton({ item }) {
  const { addToWatchLater, removeFromWatchLater, isSaved } =
    useContext(WatchLaterContext);

  const saved = isSaved(item.id);

  return (
    <button
      className={`watch-later-btn ${saved ? "saved" : ""}`}
      onClick={() =>
        saved ? removeFromWatchLater(item.id) : addToWatchLater(item)
      }
    >
      <img
        src={saved ? "/bookmark-fill.png" : "/bookmark.png"}
        alt="watch later"
      />
    </button>
  );
}
