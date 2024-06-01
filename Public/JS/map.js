mapboxgl.accessToken = mapToken
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        center: coordinates, // starting position [lng, lat]
        zoom: 6 // starting zoom
    });

const marker = new mapboxgl.Marker({color: "red"})
.setLngLat(coordinates)
.setPopup(new mapboxgl.Popup({offset: 25}).setHTML("<p><b>Exact location wil be provided after booking...</b></p>"))
.addTo(map)