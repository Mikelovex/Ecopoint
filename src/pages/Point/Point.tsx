import { doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { getDoc, } from 'firebase/firestore';
import { db } from '../../services/Firebase';
import { useParams } from "react-router-dom";
import { Map, TileLayer, Marker } from "react-leaflet";
import leaflet from 'leaflet'
import pin from '../../assets/location.png'


import { Container } from './styles'
import { Flex, Text } from "@chakra-ui/react";

const mapIcon = leaflet.icon({
    iconUrl: pin,
    iconSize: [50, 50],
    iconAnchor: [25, 50],
    popupAnchor: [178, 2]
})

const Point = () => {
    const [pointData, setPointData] = useState<any>()

    const params = useParams()

    useEffect(() => {
        const docRef = doc(db, 'points', `${params.id}`)
        getDoc(docRef).then((doc) => {
            setPointData(doc.data())
        })
    }, [])


    return (
        <Container>
            {pointData && (
                <main>
                    <div className="point-details">
                        <img src={pointData?.imagem} />
                        <div className="point-details-content">
                            <Flex>
                                <Flex flexDirection="column" gap={2}>
                                    <Text fontSize="4xl" fontStyle="italic" color="#322153" fontWeight="bold">{pointData.nome}</Text>
                                    <Text fontSize="2xl" width={96} fontStyle="italic" color="#34cb79" fontWeight="bold">{pointData.items.join(', ')}</Text>
                                    <Text as="p" color="#322153">{pointData.estado}, {pointData.cidade}</Text>
                                    <Text as="p" color="#322153">{pointData.endereco}</Text>
                                </Flex>
                            </Flex>
                            <div className="map-container">
                                <Map
                                    center={[pointData.latitude, pointData.longitude]}
                                    zoom={16}
                                    style={{ width: '100%', height: 280 }}
                                    dragging={false}
                                    touchZoom={false}
                                    zoomControl={false}
                                    scrollWheelZoom={false}
                                    doubleClickZoom={false}
                                >
                                    <TileLayer
                                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <Marker icon={mapIcon} position={[pointData.latitude, pointData.longitude]} />
                                </Map>
                                <footer>
                                    <a href={`https://www.google.com/maps/dir/?api=1&destination=${pointData?.latitude}, ${pointData?.longitude}`} target="_blank" rel="noopener noreferrer">Ver rotas no Google Maps</a>
                                </footer>
                            </div>
                        </div>
                    </div>
                </main>
            )}
        </Container>
    )
}

export default Point