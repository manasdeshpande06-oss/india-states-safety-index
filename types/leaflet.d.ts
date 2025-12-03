declare module 'leaflet' {
  // minimal shim to satisfy editor when @types/leaflet isn't installed
  export const map: any;
  export const tileLayer: any;
  export const Marker: any;
  export default any;
}
