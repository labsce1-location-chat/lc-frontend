
<MapView
    style={{height:400, width:400 }}
    initialRegion={{
    latitude: this.props.location.lat,
    longitude: this.props.location.lon,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
    }}
    // showsUserLocation={true}
    provider="google"
>
<MapView.Marker 
    coordinate={{latitude : this.props.location.lat, longitude: this.props.location.lon}}
    title="Current Location"
    description="Your current location"
    color="blue"
/>
{this.state.chatrooms 
? Object.keys(this.state.chatrooms).map(key => {
    const room = this.state.chatrooms[key];
    return(
        <MapView.Marker 
            description={room.description} 
            title={room.name} 
            coordinate={{latitude : room.lat, longitude: room.lon}}
            key={key}
        />
    )
}) 
: null}
</MapView>