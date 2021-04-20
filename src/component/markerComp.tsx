import {  Marker, Popup, useMap  } from 'react-leaflet';
import { LatLngExpression, IconOptions, Icon } from 'leaflet';

const MarkerComp = ({coords, logoUrl}:{coords:LatLngExpression, logoUrl:string}) => {
    const smap = useMap();
    smap.setView(coords, 17);

    const iconOptions:IconOptions = {
      iconUrl: logoUrl,
      iconSize: [50, 50],
      iconAnchor: [25, 50],
      popupAnchor: [0, -50],
    } 

    const ic = new Icon(iconOptions);


    return (
      <Marker position={coords} icon={ic}>
        <Popup>
            
        </Popup>
      </Marker>
    );
}

export default MarkerComp;