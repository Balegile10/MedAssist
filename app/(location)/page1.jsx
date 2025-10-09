// app/location/page.tsx
export default function LocationPage() {
  return <div className="p-4 text-white bg-red-700">Location Page Loaded</div>;
}

// app/location/page.tsx
import LocationMap from "@/components/LocationMap";

export default function LocationPage() {
  return <LocationMap />;
}