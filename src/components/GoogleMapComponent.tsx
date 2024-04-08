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
    <div className="container mx-auto p-4 mt-5 text-center">
    <div className="inline-block">
      <h2 className="text-2xl font-semibold mb-2">教室までの地図</h2>
      <div className="h-1 bg-customGreen w-full mb-6"></div>
    </div>
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
      ```jsx
<div className="mt-4 text-center">
  <p><span className="text-red-500">教室: 明海学院 知立校内</span></p>
  
  <p>住所: 愛知県知立市中町中61-1</p><br />
  
  <p>アクセス: 名鉄「知立」駅から東へ進み、「ホテルクラウンパレス知立」さんの交差点を南へ。<br />
  駅から徒歩５分。「中町」交差点すぐ、県道５１号線沿いになります。</p><br />
  
  <p>電話番号: 0120-6055-35</p><br />
  
  <p>受付時間: 13:30~21:00 (日曜・祝日、毎月29日~31日を除く)</p>
  
  <p>※上記はお問い合わせ専用ダイヤルとなります。<br />
  塾生の保護者様は、「塾長直通携帯」におかけください。</p>
</div>

    </div>
  );
};

export default GoogleMapComponent;

