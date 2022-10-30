import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { Container } from './styles';
import leaflet from 'leaflet'
import { Link } from 'react-router-dom';
import pin from '../../assets/location.png'
import { FiArrowRight } from 'react-icons/fi'


const mapIcon = leaflet.icon({
    iconUrl: pin,
    iconSize: [50, 50],
    iconAnchor: [25, 50],
    popupAnchor: [178, 2]
})

const PointDetail = () => {
    const point: any = localStorage.getItem('@points')
    const parsedPoint = JSON.parse(point)

    return (
        <Container>
            <Map center={[parsedPoint[0].latitude, parsedPoint[0].longitude]} zoom={10}>
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {parsedPoint.map((d: any) =>
                    <Marker key={d.id} icon={mapIcon} position={[d.latitude, d.longitude]}>
                        <Popup minWidth={240} maxWidth={240} className='map-popup'>
                            {d.nome}
                            <Link to={`/point/${d.id}`}>
                                <FiArrowRight size={32} color="#fff" />
                            </Link>
                        </Popup>
                    </Marker>
                )}
            </Map>
        </Container>

    )
}


export default PointDetail;