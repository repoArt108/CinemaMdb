import React from "react";
import Tv from "./components/Tv";
import Movies from "./components/Movies";
import Home from "./components/Home";

import Layout from "./components/Layout";
import Details from "./components/Details/Details.jsx"
import "bootstrap/dist/css/bootstrap.min.css";
import "../src/App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import People from "./components/People";
import Gallery from "./components/Gallery.jsx";


export default function App() {
	let route = createBrowserRouter([
		{
			path: "",
			element: <Layout />,
			children: [
				{ path: "", element: <Home /> },
				{ path: "/home", element: <Home /> },
				{ path: "/movies", element: <Movies /> },
				{ path: "/tv", element: <Tv /> },
				{ path: "/people", element: <People /> },
				{ path: "tv/details/:type/:id", element: <Details /> },
				{ path: "movies/details/:type/:id", element: <Details /> },
				{ path: "details/:type/:id", element: <Details /> },
				{ path: "home/details/:type/:id", element: <Details /> },
				{ path: "/details/:type/:id/gallery/:actorId", element: <Gallery /> },
				{ path: "people/gallery/:actorId", element: <Gallery /> },
			],
		},
	]);

	return (
		<>	
			
			<RouterProvider router={route} />
		</>
	);
}
