import './App.css';
import {GoogleMap, useLoadScript, Marker} from "@react-google-maps/api"
import React from 'react';
// const axios = require('axios')

function App() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  })
  if(!isLoaded) return (
    <React.Fragment>
      <div>Loading...</div>
    </React.Fragment>
  )
  
  return (
    <div className="map">
      <Map coordinates = {{lat:20.29, lng:85.82}}/>
    </div>
  );
}

function Map({coordinates}) {
  const mapContainerStyle = {
    width : '100vw',
    height : '100vh',
    overflow: 'hidden'
  }
  return(
    <GoogleMap zoom ={15} center={coordinates} 
      mapContainerStyle={mapContainerStyle} 
      className="map-container">
      <Marker position={coordinates}/>
    </GoogleMap>
  )
}

export default App;
