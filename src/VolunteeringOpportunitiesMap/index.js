import React, { Component } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import Pin from './volunteer-opportunity-pin';
import './style.css';

const MAPBOX_TOKEN = "pk.eyJ1IjoiYW1ob3VlbCIsImEiOiJjamxzYmY1cDIwMGJwM3BwaDJjenQwbW80In0.GiTCZZwyjGsxC_LIsJtX5g";

class VolunteeringOpportunitiesMap extends Component {

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

    _renderMarker(volunteeringOpportunity, i) {
        const {latitude, longitude, title} = volunteeringOpportunity;
        // const style = {
        //     display: this.props.displayTitle
        // }
        return (
            <Marker key={i} longitude={longitude} latitude={latitude} >
                <div className="volunteering-opportunities-map-title-wrapper" >
                    <Pin size={20} />
                    <div className="volunteering-opportunities-map-title">{title}</div>
                </div>
            </Marker>
        );
    }

    render() {
        const { volunteeringOpportunities } = this.props;
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
                {volunteeringOpportunities.length > 0 && volunteeringOpportunities.map(this._renderMarker)}
            </ReactMapGL>
        );
    }
}

export default VolunteeringOpportunitiesMap;