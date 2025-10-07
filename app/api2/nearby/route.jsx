export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=hospital&key=${apiKey}`;

  const res = await fetch(url);
  const data = await res.json();

  return Response.json(data);
}
useEffect(() => {
  const fetchHospitals = async () => {
    try {
      const res = await fetch(`/api/nearby?lat=${latitude}&lng=${longitude}`);
      const data = await res.json();
      setHospitals(data.results);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  if (latitude && longitude) {
    fetchHospitals();
  }
}, [latitude, longitude]);