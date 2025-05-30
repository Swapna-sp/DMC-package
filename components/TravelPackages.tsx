"use client";
import React, { useEffect, useState } from "react";

// Define the structure of a package
interface Package {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  duration: number;
  price: number;
}

const TravelPackages = ({ apiUrl }: { apiUrl: string }) => {
  const [packages, setPackages] = useState<Package[]>([]); // Define the state with type
  const [loading, setLoading] = useState(true);

  // Fetch packages from the API
  const fetchPackages = async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setPackages(data); // Set the data into state
    } catch (err) {
      console.error("Failed to fetch packages:", err);
      setPackages([]); // Clear the packages array in case of an error
    } finally {
      setLoading(false); // Turn off loading indicator after fetching is done
    }
  };

  useEffect(() => {
    fetchPackages(); // Fetch packages when the component mounts or apiUrl changes
  }, [apiUrl]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-6 mt-6 mb-20">
      {loading ? (
        <div className="col-span-full text-center text-gray-500">Loading...</div>
      ) : packages.length > 0 ? (
        packages.map((pkg) => (
          <div key={pkg.id} className="bg-white rounded-lg shadow-md overflow-hidden relative">
            <img src={pkg.imageUrl} alt={pkg.title} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{pkg.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{pkg.description}</p>
              <div className="mt-2 flex justify-between text-sm text-gray-500">
                <span>{pkg.duration} days</span>
                <span>${pkg.price}</span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-full text-center text-gray-500">No packages available</div>
      )}
    </div>
  );
};

export default TravelPackages;
