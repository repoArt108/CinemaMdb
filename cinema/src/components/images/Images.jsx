import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PacmanLoader } from "react-spinners";
import { Link } from "react-router-dom";
export default function Images() {
    let {id,type} = useParams()
    // console.log(id)
    let [dataApi, setDataApi] = useState('');

    async function getData() {
        let {data}  = await axios.get(
            `https://api.themoviedb.org/3/${type}/${id}/images?api_key=690446d6babfb9692828157f6de2487a`
        );
        setDataApi(data.backdrops);
        // console.log(data.backdrops[0].file_path)
    }
    useEffect(() => {
        const t = setTimeout(getData, 400);
        return () => clearTimeout(t);
      }, [setDataApi]);
    return <div>
        {dataApi ? (
        <div className="row">
          {dataApi.map((item, index) => (
            <div className="col-lg-3 col-md-6 py-4" key={index}>
              <div className="movie-card">
                <Link to={`gallery/${item.id}`} className="movie-link">
                  
                    
                   
                 
                  <div className="image-wrapper">
                    <img
                      className="poster"
                      src={`https://image.tmdb.org/t/p/w500${item.file_path}`}
                      alt={item.title}
                    />
                  </div>
                  
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className=" d-flex justify-content-center align-items-center mt-5 pt-5">
          <PacmanLoader color="#0d9ffc" size={20} />
        </div>
      )}
    </div>;
}
