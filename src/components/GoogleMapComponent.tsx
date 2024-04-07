// components/GoogleMapComponent.jsx
import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 35.00732286464024,
  lng: 137.04393933616961
};

const GoogleMapComponent = () => {
  return (
    <div className="container mx-auto p-4 mt-5">
      <h2 className="text-2xl font-semibold text-center mb-4">教室までの地図</h2>
      <LoadScript googleMapsApiKey="AIzaSyAIl5EuEGf-iIhgxAWdz2B18bTsRdkKzX8">
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={16}>
          <Marker
            position={center}
            // label={{
            //   text: "明海学院知立校内",
            //   fontSize: "16px",
            //   className: "custom-label",
            //   color: "red"
            // }}
          />
        </GoogleMap>
      </LoadScript>
      <div className="mt-4 text-center">
        <p>教室: 明海学院 知立校内</p>
      </div>
    </div>
  );
};

export default GoogleMapComponent;

