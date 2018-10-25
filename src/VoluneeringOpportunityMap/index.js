import React, { Component } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import Pin from './volunteer-opportunity-pin';
import './style.css';

const MAPBOX_TOKEN = "pk.eyJ1IjoiYW1ob3VlbCIsImEiOiJjamxzYmY1cDIwMGJwM3BwaDJjenQwbW80In0.GiTCZZwyjGsxC_LIsJtX5g";

class VolunteeringOpportunityMap extends Component {

    constructor(props) {
        super(props)

        this.state = {
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight,
                latitude: 40.7410986,
                longitude: -73.997623,
                zoom: 11
            }
        }
    }

    render() {
        const { latitude, longitude } = this.props.volunteeringOpportunity;
        const { viewport } = this.state;
        return (

            <ReactMapGL
                {...viewport}
                width={350}
                height={350}
                mapStyle="mapbox://styles/mapbox/light-v9"
                onViewportChange={(viewport) => this.setState({ viewport })}
                mapboxApiAccessToken={MAPBOX_TOKEN}
            >
                <Marker longitude={longitude} latitude={latitude} >
                    <Pin size={20} />
                </Marker>
            </ReactMapGL>
        );
    }
}

export default VolunteeringOpportunityMap;