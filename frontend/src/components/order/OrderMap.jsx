// import { MapAPI } from "@/services/mapApi";
// import { Header } from "@/components/common";
// import { APIProvider } from "@vis.gl/react-google-maps";
// import { useState } from "react";

// const API_KEY = "AIzaSyCWI8_yFpceIVAh19niOQX8hMrzhoYCwQ8";

import "mapbox-gl/dist/mapbox-gl.css";
import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken =
  "pk.eyJ1IjoicGhhbm1haXRhbmxvaSIsImEiOiJjbHc1NjUxM3QwcTJtMnJxZXNoOXVibG92In0.3qD6h1Bpb71JDF20zjFAnA";

import "./orderMap.css";
import geoJson from "@/mockdata/chicago-park.json";
import apiInstance from "../../services/apiService";

const Marker = ({ onClick, children, feature }) => {
  const _onClick = () => {
    onClick(feature.properties.description);
  };

  return (
    <button onClick={_onClick} className="marker">
      {children}
    </button>
  );
};

export default function OrderMap(props) {
  //   const [place, setPlace] = useState();
  //   return (
  //     <main className="content" style={{ justifyContent: "center" }}>
  //       <div style={{ height: "80vh", width: "80vw" }}>
  //         <Header title="WELCOME TO MAP API TESTING" />
  //         <div>Place of choice: {place?.formatted_address}</div>
  //         <APIProvider apiKey={API_KEY}>
  //           <MapAPI setPlace={setPlace} />
  //         </APIProvider>
  //       </div>
  //     </main>
  //   );
  console.log(props);
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(11);
  const start = [106.80554190309847, 10.880654899634294];

  // create a function to make a directions request
  async function getRoute() {
    // make a directions request using cycling profile
    // an arbitrary start will always be the same
    // only the end or destination will change
    const response = await fetch(
      `https://api.mapbox.com/search/geocode/v6/forward?address_line1=${props.address.line1}&region=${props.address.state}&postcode=${props.address.postal_code}&country=${props.address.country}&access_token=${mapboxgl.accessToken}`,
      { method: "GET" }
    );
    const end = await response.json();
    const query = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/cycling/${start[0]},${start[1]};${end?.features[0].geometry.coordinates[0]},${end?.features[0].geometry.coordinates[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
      { method: "GET" }
    );
    const json = await query.json();
    const data = json.routes[0];
    const route = data.geometry.coordinates;
    const geojson = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: route,
      },
    };
    if (map.current.getSource("route")) {
      map.current.getSource("route").setData(geojson);
    } else {
      map.current.addLayer({
        id: "route",
        type: "line",
        source: {
          type: "geojson",
          data: geojson,
        },
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#3887be",
          "line-width": 5,
          "line-opacity": 0.75,
        },
      });
    }
  }

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: start,
      zoom: zoom,
    });
    // map.current.on("move", () => {
    //   setLng(map.current.getCenter().lng.toFixed(4));
    //   setLat(map.current.getCenter().lat.toFixed(4));
    //   setZoom(map.current.getZoom().toFixed(2));
    // });
    // geoJson.features.forEach((feature) => {
    //   new mapboxgl.Marker()
    //     .setLngLat(feature.geometry.coordinates)
    //     .addTo(map.current);
    // });
    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");
    map.current.on("load", () => {
      getRoute();
      //   map.current.addLayer({
      //     id: "point",
      //     type: "circle",
      //     source: {
      //       type: "geojson",
      //       data: {
      //         type: "FeatureCollection",
      //         features: [
      //           {
      //             type: "Feature",
      //             properties: {},
      //             geometry: {
      //               type: "Point",
      //               coordinates: start,
      //             },
      //           },
      //         ],
      //       },
      //     },
      //     paint: {
      //       "circle-radius": 10,
      //       "circle-color": "#3887be",
      //     },
      //   });
      // this is where the code from the next step will go
    });
  });

  return (
    <div>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} style={{ width: "50vw", height: "70vh" }} />
    </div>
  );
}
