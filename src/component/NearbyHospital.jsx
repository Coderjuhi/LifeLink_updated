import { useEffect, useState } from "react";
import { MapPin, Navigation } from "lucide-react";

export default function NearbyHospital() {

    const [hospitals, setHospitals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        if (!navigator.geolocation) {
            setError("Location not supported");
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(

            async (position) => {

                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                try {

                    const res = await fetch(

                        `https://overpass-api.de/api/interpreter?data=
[out:json];
node["amenity"="hospital"](around:5000,${lat},${lon});
out;`

                    );

                    const data = await res.json();

                    setHospitals(data.elements);

                }
                catch {

                    setError("Failed to load hospitals");

                }

                setLoading(false);

            },

            () => {
                setError("Allow location access");
                setLoading(false);
            }

        );

    }, []);



    return (

        <div className="p-6">

            <h2 className="text-xl font-bold mb-4">

                Nearby Hospitals

            </h2>


            {loading && <p>Loading hospitals...</p>}

            {error && <p className="text-red-500">{error}</p>}


            <div className="space-y-3 max-h-[400px] overflow-y-auto">

                {hospitals.map((h, i) => (
                    <div
                        key={i}
                        className="border rounded-lg p-3"
                    >

                        <h3 className="font-semibold">

                            {h.tags?.name || "Hospital"}

                        </h3>


                        <p className="text-sm text-gray-600 flex gap-2">

                            <MapPin size={16} />

                            Nearby Location

                        </p>


                        <a
                            href={`https://www.google.com/maps?q=${h.lat},${h.lon}`}
                            target="_blank"
                            className="text-blue-600 text-sm flex gap-2 mt-2"
                        >

                            <Navigation size={16} />

                            Open in Maps

                        </a>

                    </div>
                ))}

            </div>

        </div>

    )

}