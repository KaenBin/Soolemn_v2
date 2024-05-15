export type OverlayGeometry = google.maps.Marker;

export interface DrawResult {
  type: google.maps.drawing.OverlayType;
  overlay: OverlayGeometry;
}

export interface Snapshot {
  radius?: number;
  center?: google.maps.LatLngLiteral;
  position?: google.maps.LatLngLiteral;
  path?: Array<google.maps.LatLng>;
  bounds?: google.maps.LatLngBoundsLiteral;
}

export interface Overlay {
  type: google.maps.drawing.OverlayType;
  geometry: OverlayGeometry;
  snapshot: Snapshot;
}

export interface State {
  now: Overlay;
}

export enum DrawingActionKind {
  SET_OVERLAY = "SET_OVERLAY",
  UPDATE_OVERLAYS = "UPDATE_OVERLAYS",
}

export interface ActionWithTypeOnly {
  type: Exclude<DrawingActionKind, DrawingActionKind.SET_OVERLAY>;
}

export interface SetOverlayAction {
  type: DrawingActionKind.SET_OVERLAY;
  payload: DrawResult;
}

export type Action = ActionWithTypeOnly | SetOverlayAction;

export function isMarker(
  overlay: OverlayGeometry
): overlay is google.maps.Marker {
  return (overlay as google.maps.Marker).getPosition !== undefined;
}
