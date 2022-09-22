import './App.css';
import {GoogleMap, useLoadScript, Marker} from "@react-google-maps/api"
import {React, useState} from 'react';
import logo from "./images/awtoLogo.png"
const {hashSync} = require('bcryptjs')

function App() {

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  })
  if(!isLoaded) return (
    <>
      <div>Loading...</div>
    </>
  )
  
  
  return (
    <div className='page-container'>
      <RegForm/>
      <Map coordinates = {{lat:20.29, lng:85.82}}/>
    </div>
  );
}

function Map({coordinates}) {

  const [markerPosition, setMarker] = useState({lat:20.29, lng:85.82});

  const mapContainerStyle = {
    width : '100vw',
    height : '100vh',
    overflow: 'hidden'
  }

  const mapClickHandler = (eventData)=>{

      console.log(`Longitude: ${eventData.latLng.lng()}°E, Latitude: ${eventData.latLng.lat()}°N`)
      setMarker(eventData.latLng)

      var placeID = eventData.placeId
      if(placeID)
      sessionStorage.setItem('placeID', placeID)
  }

  return(
    <GoogleMap 
      zoom ={15} 
      center={coordinates} 
      mapContainerStyle={mapContainerStyle} 
      onClick={mapClickHandler}
      id="map">
      <Marker 
      position={markerPosition} 
      animation={window.google.maps.Animation.BOUNCE}
      />
    </GoogleMap>
  )
}

function RegForm() {
  const [email,setEmail] = useState('')
  const [vendorName,setVendorName] = useState('')
  const [address, setAddress] = useState('')
  const [contact, setContact] = useState('')
  const [password, setPassword] = useState('')

  fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${sessionStorage.getItem('placeID')}&key=${process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,{
    headers: {}
  })
  .then((placeDetails)=>{
  console.log(placeDetails)
  })
  .catch(()=>{
    console.log(`error occurred`);
  })
  
  const handleSubmit = async (e)=>{
    e.preventDefault();
    var hashedPass = hashSync(password,10)
    console.log(hashedPass)
    fetch('http://localhost:5000/register',{
      method:'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body:JSON.stringify({
        'name' : vendorName,
        'email' : email,
        'address': address,
        'contact' : contact,
        'password' : hashedPass
      })
    })
    .then((response)=>{
      console.log(response.body)
    })
  }
  return(
    <div className='form-container' onSubmit={handleSubmit}>
      <form>
      <img src={logo} alt='' />
      <div className='header'>Sign Up</div>
        <div className='fields'>
          <label>Name</label>
          <input
          type='vendor-name'
          id='vendor-name'
          name='vendor-name'
          value={vendorName}
          required={true}
          onChange={(e) => setVendorName(e.target.value)}/>
        </div>
        <div className='fields'>
          <label>Email</label>
          <input
          type='email'
          id='email'
          name='email'
          value={email}
          required={true}
          onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className='fields'>
          <label>Contact</label>
          <input
          type='contact'
          id='contact'
          name='contact'
          value={contact}
          required={true}
          onChange={(e) => setContact(e.target.value)}/>
        </div>
        <div className='fields'>
          <label>Passsword</label>
          <input
          type='password'
          id='password'
          name='password'
          placeholder='Enter a password'
          value={password}
          required={true}
          onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div className='fields'>
          <label>Address</label>
          <input
          type='address'
          id='address'
          name='address'
          placeholder='select from the map beside'
          value={address}
          required={true}
          onChange={(e) => setAddress(e.target.value)}/>
        </div>
        <button>Submit</button>
      </form>
    </div>
  )
}
export default App;
