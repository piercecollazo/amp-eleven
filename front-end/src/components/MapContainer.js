import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

 
const style = {
    width: '100%',
    height: '400px'
  }
  

export class MapContainer extends React.Component {


    onMarkerClick = () => {

    }

    onInfoWindowClose = () => {

    }

    render() {
        return (
            <Map 
                google={window.google} 
                zoom={16}
                style={style}
                initialCenter={{lat:40.7572648, lng:-74.004355}}
                >
 
            <Marker onClick={this.onMarkerClick}
                    name={'Current location'} />
     
            <InfoWindow onClose={this.onInfoWindowClose}>
                <div>
                  <h1>{`Hi hello`}</h1>
                </div>
            </InfoWindow>
          </Map>
        )
    }

}
 
export default GoogleApiWrapper({
    apiKey: 'AIzaSyDa3ZgaFjE_4zLZVnhXe4wn3HVChGwuQMg'
})(MapContainer);