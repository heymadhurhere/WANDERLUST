maptilersdk.config.apiKey = mapToken;

fetch(
  `https://api.maptiler.com/geocoding/${encodeURIComponent(
    placeName
  )}.json?key=${mapToken}`
)
  .then((response) => response.json())
  .then((data) => {
    if (data.features && data.features.length > 0) {
      const [lng, lat] = data.features[0].center;
      const map = new maptilersdk.Map({
        container: "map",
        style: maptilersdk.MapStyle.STREETS,
        center: [lng, lat],
        zoom: 10,
        attributionControl: true // Optional: hides MapTiler attribution
      });

    } else {
      alert("Location not found on map.");
    }
  })
  .catch((err) => {
    console.error("Geocoding error:", err);
    alert("Error finding location on map.");
  });
