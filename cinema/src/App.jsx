import React from "react";
import Tv from "./components/Tvs/Tv.jsx";
import Movies from "./components/Movies/Movies.jsx";
import Home from "./components/Home/Home.jsx";

import Layout from "./components/Layout";
import Details from "./components/Details/Details.jsx"
import "bootstrap/dist/css/bootstrap.min.css";
import "../src/App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import People from "./components/People/People.jsx";
import Gallery from "./components/Gallery.jsx";
import Images from "./components/images/Images.jsx";


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
				{ path: ":type/:id/details", element: <Details /> },
				{ path: "movies/:type/:id/details", element: <Details /> },
				{ path: "home/:type/:id/details", element: <Details /> },
				{ path: "/details/:type/:id/gallery/:actorId", element: <Gallery /> },
				{ path: "people/gallery/:actorId", element: <Gallery /> },
				{ path: ":type/:id/images", element: <Images /> },
			],
		},
	]);

	return (
		<>

			<RouterProvider router={route} />
		</>
	);
}
