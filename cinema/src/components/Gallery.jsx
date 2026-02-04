import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { PacmanLoader } from "react-spinners";
import { box } from "./Context/Context";

export default function Gallery() {
  const { actorId } = useParams();
  let [dataApi, setDataApi] = useState(null);
  let [personData, setPersonData] = useState(null);
  let {searchQuery}= useContext(box)
  
  useEffect(() => {
  if (!actorId) return;

  async function fetchData() {
    try {
      const [imagesRes, personRes] = await Promise.all([
        axios.get(
          `https://api.themoviedb.org/3/person/${actorId}/images?api_key=690446d6babfb9692828157f6de2487a`
        ),
        axios.get(
          `https://api.themoviedb.org/3/person/${actorId}?api_key=690446d6babfb9692828157f6de2487a`
        ),
      ]);

      setDataApi(imagesRes.data.profiles);
      setPersonData(personRes.data);
      // console.log(personRes.data.name)
      // console.log(imagesRes.data.profiles)
    } catch (error) {
      console.error("Failed to fetch person data:", error);
    }
  }

  fetchData();
}, [actorId,searchQuery]);
  // async function fetchImage() {
  //   const { data } = await axios.get(
  //     `https://api.themoviedb.org/3/person/${actorId}/images?api_key=690446d6babfb9692828157f6de2487a`,
  //   );
  //   setDataApi(data.profiles);
  //   // console.log(data.profiles);
    
  // }
  // async function fetchPersonData() {
  //   const { data } = await axios.get(
  //     `https://api.themoviedb.org/3/person/${actorId}?api_key=690446d6babfb9692828157f6de2487a`,
  //   );
  //   setPersonData(data);
  //   console.log(data);
  // }
  // useEffect(() => {
  //   const t = setTimeout(fetchImage, 400);
  //   return () => clearTimeout(t);
  // }, [searchQuery,actorId]);
  return (
    <div className="container text-white movies-container">
      {personData?(<h4>{personData.name}</h4>):""}

      {dataApi ? (
        <div className="row">
          {dataApi.map((item, index) => (
            <div className="col-lg-3 col-md-6 py-4" key={index}>
              <div className="movie-card">
                <div  className="movie-link">
                  <div className="image-wrapper">
                    <img
                      className="poster"
                      src={`https://image.tmdb.org/t/p/w500${item.file_path}`}
                      alt={item.title}
                    />
                  </div>
                  <div className="movie-content">
                  </div>
                </div>
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
