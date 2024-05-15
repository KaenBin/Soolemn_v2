import React, {
  useEffect,
  useState,
  useCallback,
  useReducer,
  useRef,
} from "react";
import {
  Map,
  AdvancedMarker,
  useMapsLibrary,
  useMap,
  useAdvancedMarkerRef,
  InfoWindow,
  MapControl,
  ControlPosition,
} from "@vis.gl/react-google-maps";
import Combobox from "react-widgets/Combobox";
import "react-widgets/styles.css";

import reducer, {
  useDrawingManagerEvents,
  useOverlaySnapshots,
} from "./mapHooks/setMarker";
import { useDrawingManager } from "./mapHooks/drawingManager";
import { DrawingActionKind } from "@/constants/type";
import { geocodeLatLng } from "./mapMethods";

interface Props {
  place: google.maps.places.PlaceResult | null;
}

interface drawProps {
  drawingManager: google.maps.drawing.DrawingManager | null;
}

type ControlProps = {
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
};

export const MapAPI = ({ setPlace }) => {
  const map = useMap();
  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);
  console.log(selectedPlace);

  useEffect(() => {
    setPlace(selectedPlace);
  }, [selectedPlace]);

  return (
    <>
      <Map
        mapId="966d75fb71e1b62c"
        defaultCenter={{ lat: 10.762622, lng: 106.660172 }}
        defaultZoom={15}
        gestureHandling={"greedy"}
        fullscreenControl={false}
        onClick={(event) => {
          geocodeLatLng(
            {
              latLng: event.detail.latLng,
              map,
            },
            { onPlaceSelect: setSelectedPlace }
          );
        }}
      >
        <MapControl position={ControlPosition.TOP_CENTER}>
          <AutocompleteCustomHybrid onPlaceSelect={setSelectedPlace} />
          {/* <MarkerControl drawingManager={drawingManager} /> */}
        </MapControl>
        <MarkerWithInfowindow place={selectedPlace} />
        {/* <Directions /> */}
      </Map>
      <MapHandler place={selectedPlace} />
    </>
  );
};

// DIRECTION

function Directions() {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const [directionsService, setDirectionsService] =
    useState<google.maps.DirectionsService>();
  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer>();
  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
  const [routeIndex, setRouteIndex] = useState(0);
  const selected = routes[routeIndex];
  const leg = selected?.legs[0];

  // Initialize directions service and renderer
  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
  }, [routesLibrary, map]);

  // Use directions service
  useEffect(() => {
    if (!directionsService || !directionsRenderer) return;

    directionsService
      .route({
        origin: "100 Front St, Toronto ON",
        destination: "500 College St, Toronto ON",
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
        setRoutes(response.routes);
      });

    return () => directionsRenderer.setMap(null);
  }, [directionsService, directionsRenderer]);

  // Update direction route
  useEffect(() => {
    if (!directionsRenderer) return;
    directionsRenderer.setRouteIndex(routeIndex);
  }, [routeIndex, directionsRenderer]);

  if (!leg) return null;

  return (
    <div className="directions">
      <h2>{selected.summary}</h2>
      <p>
        {leg.start_address.split(",")[0]} to {leg.end_address.split(",")[0]}
      </p>
      <p>Distance: {leg.distance?.text}</p>
      <p>Duration: {leg.duration?.text}</p>

      <h2>Other Routes</h2>
      <ul>
        {routes.map((route, index) => (
          <li key={route.summary}>
            <button onClick={() => setRouteIndex(index)}>
              {route.summary}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// AUTOCOMPLETE
// This uses the Combobox from "react-widgets" (https://jquense.github.io/react-widgets/docs/Combobox)
const AutocompleteCustomHybrid = ({ onPlaceSelect }: ControlProps) => {
  const map = useMap();
  const places = useMapsLibrary("places");

  // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompleteSessionToken
  const [sessionToken, setSessionToken] =
    useState<google.maps.places.AutocompleteSessionToken>();

  // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service
  const [autocompleteService, setAutocompleteService] =
    useState<google.maps.places.AutocompleteService | null>(null);

  // https://developers.google.com/maps/documentation/javascript/reference/places-service
  const [placesService, setPlacesService] =
    useState<google.maps.places.PlacesService | null>(null);

  const [predictionResults, setPredictionResults] = useState<
    Array<google.maps.places.AutocompletePrediction>
  >([]);

  const [inputValue, setInputValue] = useState<string>("");

  const [fetchingData, setFetchingData] = useState<boolean>(false);

  useEffect(() => {
    if (!places || !map) return;

    setAutocompleteService(new places.AutocompleteService());
    setPlacesService(new places.PlacesService(map));
    setSessionToken(new places.AutocompleteSessionToken());

    return () => setAutocompleteService(null);
  }, [map, places]);

  const fetchPredictions = useCallback(
    async (inputValue: string) => {
      if (!autocompleteService || !inputValue) {
        return;
      }

      setFetchingData(true);

      const request = { input: inputValue, sessionToken };
      const response = await autocompleteService.getPlacePredictions(request);

      setPredictionResults(response.predictions);
      setFetchingData(false);
    },
    [autocompleteService, sessionToken]
  );

  const onInputChange = useCallback(
    (value: google.maps.places.AutocompletePrediction | string) => {
      if (typeof value === "string") {
        setInputValue(value);
        fetchPredictions(value);
      }
    },
    [fetchPredictions]
  );

  const onSelect = useCallback(
    (prediction: google.maps.places.AutocompletePrediction | string) => {
      if (!places || typeof prediction === "string") return;

      setFetchingData(true);

      const detailRequestOptions = {
        placeId: prediction.place_id,
        fields: ["geometry", "name", "formatted_address"],
        sessionToken,
      };

      const detailsRequestCallback = (
        placeDetails: google.maps.places.PlaceResult | null
      ) => {
        onPlaceSelect(placeDetails);
        setInputValue(placeDetails?.formatted_address ?? "");
        setSessionToken(new places.AutocompleteSessionToken());

        setFetchingData(false);
      };

      placesService?.getDetails(detailRequestOptions, detailsRequestCallback);
    },
    [onPlaceSelect, places, placesService, sessionToken]
  );

  return (
    <div className="autocomplete-container">
      <Combobox
        placeholder="Search for a place"
        data={predictionResults}
        dataKey="place_id"
        textField="description"
        value={inputValue}
        onChange={onInputChange}
        onSelect={onSelect}
        busy={fetchingData}
        // Since the Autocomplete Service API already returns filtered results
        // always want to display them all.
        filter={() => true}
        focusFirstItem={true}
        hideEmptyPopup
        hideCaret
      />
    </div>
  );
};

const MapHandler = ({ place }: Props) => {
  const map = useMap();
  console.log(map, place);
  useEffect(() => {
    if (!map || !place) return;

    if (place.geometry?.viewport) {
      map.fitBounds(place.geometry?.viewport);
    }
  }, [map, place]);

  return null;
};

const MarkerWithInfowindow = ({ place }: Props) => {
  const [infowindowOpen, setInfowindowOpen] = useState(true);
  const [markerRef, marker] = useAdvancedMarkerRef();

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        onClick={() => setInfowindowOpen(true)}
        position={place?.geometry?.location}
        title={"Your location"}
      />
      {infowindowOpen && (
        <InfoWindow
          anchor={marker}
          maxWidth={200}
          onCloseClick={() => setInfowindowOpen(false)}
        >
          {place?.formatted_address.split(",").map((address) => (
            <div key={address}>{address}</div>
          ))}
        </InfoWindow>
      )}
    </>
  );
};

const MarkerControl = ({ drawingManager }: drawProps) => {
  const map = useMap();

  const [state, dispatch] = useReducer(reducer, {
    now: null,
  });

  const overlaysShouldUpdateRef = useRef<boolean>(false);

  useDrawingManagerEvents(drawingManager, overlaysShouldUpdateRef, dispatch);
  useOverlaySnapshots(map, state, overlaysShouldUpdateRef);

  return null;
};
