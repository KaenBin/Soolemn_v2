import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useState } from "react";

interface LatLngProps {
  latLng: google.maps.LatLngLiteral | null;
  map: google.maps.Map | null;
}

type ControlProps = {
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
};

export async function geocodeLatLng(
  { latLng, map }: LatLngProps,
  { onPlaceSelect }: ControlProps
) {
  const geocoder = new google.maps.Geocoder();
  const service = new google.maps.places.PlacesService(map);

  return geocoder
    .geocode({ location: latLng })
    .then((response) => {
      if (response.results[0]) {
        const request = {
          placeId: response.results[0].place_id,
          fields: ["name", "formatted_address", "place_id", "geometry"],
        };

        service.getDetails(request, (place, status) => {
          if (
            status === google.maps.places.PlacesServiceStatus.OK &&
            place?.geometry?.location
          )
            onPlaceSelect(place);
        });
      }
    })
    .catch((e) => window.alert("Geocoder failed due to: " + e));
}
