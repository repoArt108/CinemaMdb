// Context/WatchLaterContext.jsx
import { createContext, useEffect, useState } from "react";

export const WatchLaterContext = createContext(null);

export function WatchLaterProvider({ children }) {
  const [watchLater, setWatchLater] = useState(() => {
    return JSON.parse(localStorage.getItem("watchLater")) || [];
  });

  useEffect(() => {
    localStorage.setItem("watchLater", JSON.stringify(watchLater));
  }, [watchLater]);

  const addToWatchLater = (item) => {
    setWatchLater((prev) =>
      prev.some((m) => m.id === item.id) ? prev : [...prev, item]
    );
  };

  const removeFromWatchLater = (id) => {
    setWatchLater((prev) => prev.filter((item) => item.id !== id));
  };

  const isSaved = (id) => watchLater.some((item) => item.id === id);

  return (
    <WatchLaterContext.Provider
      value={{ watchLater, addToWatchLater, removeFromWatchLater, isSaved }}
    >
      {children}
    </WatchLaterContext.Provider>
  );
}
