// components/Map.js
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useEffect, useState } from "react";

const Map = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBgsuRhjEnYP8hnRa_hs6keE0OwXROUyd8",
  });

  const [center, setCenter] = useState(null);
  const address = "L-15 7480, San Manuel, Villa Alegre, Maule";

  useEffect(() => {
    const geocodeAddress = async () => {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=AIzaSyBgsuRhjEnYP8hnRa_hs6keE0OwXROUyd8`
      );
      const data = await response.json();
      if (data.results.length > 0) {
        setCenter(data.results[0].geometry.location);
      }
    };

    geocodeAddress();
  }, []);

  if (!isLoaded) return <div>Cargando mapa...</div>;
  if (!center) return <div>Buscando dirección...</div>;

  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "400px" }}
      center={center}
      zoom={15}
    >
      <Marker position={center} />
    </GoogleMap>
  );
};

export default Map;
