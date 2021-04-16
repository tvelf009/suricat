import { MapContainer, TileLayer } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';


export const MapComp = ({coords, children}:{coords:LatLngExpression, children:any}) => {

    return (
        <MapContainer center={coords} zoom={17} scrollWheelZoom={true} style={{height: "600px", width: "100%"}}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors" />
          {children}
      </MapContainer>
    )
}
