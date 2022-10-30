import styled from 'styled-components'


export const Container = styled.div`
     .leaflet-container{
        width: 100%;
        height: 850px;
        border-radius: 8px;
        margin-bottom: 24px;
    }

   .map-popup .leaflet-popup-content-wrapper {
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 20px;
    box-shadow: none;
    }

   .map-popup .leaflet-popup-content {
        color: #0089a5;
        font-size: 20px;
        font-weight: bold;
        margin: 8px 12px;

        display: flex;
        justify-content: space-between;
        align-items: center;
    }

   .map-popup .leaflet-popup-content a {
        width: 40px;
        height: 40px;
        background-color: #15c3b6;
        box-shadow: 17.286821365356445px 27.65891456604004px 41.488372802734375px 0px #178EA6 16%;
        border-radius: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

   .map-popup .leaflet-popup-tip-container {
        display: none;
    }

    .map-popup .leaflet-popup-close-button {
        display: none;
    }
`