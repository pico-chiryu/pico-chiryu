// components/GoogleMapComponent.jsx
import React from 'react';
import { GoogleMap, LoadScript, Marker, OverlayView } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = { lat: 35.00713577868109, lng: 137.04426733631635 };

const GoogleMapComponent = () => {
  return (
    <div className="container mx-auto p-4 mt-5 text-center">
      <div className="inline-block">
        <h2 className="text-xl font-semibold mb-2">教室までの地図</h2>
        <div className="h-1 bg-customGreen w-full mb-6"></div>
      </div>
      <LoadScript googleMapsApiKey="AIzaSyDqAEltZB0OOCXxm25kotZDeTqGi26Utfg">
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={16}>
          <Marker position={center} />
          <OverlayView
            position={{ lat: center.lat + 0.000000002, lng: center.lng + 0.0006 }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className="label bg-white p-2 rounded shadow-md transform -translate-y-full -translate-x-1/2">
              <span className="text-red-500 font-bold text-sm whitespace-nowrap">明海学院 知立校内</span>
            </div>
          </OverlayView>
        </GoogleMap>
      </LoadScript>
      <div className="mt-4 text-center">
        <p>住所: 愛知県知立市中町中61-1</p>
        <br />
        <p className="text-sm">
          アクセス: 名鉄「知立」駅から東へ進み、「ホテルクラウンパレス知立」さんの交差点を南へ。
          <br />
          駅から徒歩５分。「中町」交差点すぐ、県道５１号線沿いになります。
        </p>
        <br />
        <p className="text-sm">電話番号: 080-4306-4119</p>
        <br />
        <p className="text-sm">受付時間: 13:30~21:00 (日曜・祝日、毎月29日~31日を除く)</p>
        <br />
        <p className="text-sm">
          ※上記はお問い合わせ専用ダイヤルとなります。
          <br />
          塾生の保護者様は、「塾長直通携帯」におかけください。
        </p>
      </div>
    </div>
  );
};

export default GoogleMapComponent;

