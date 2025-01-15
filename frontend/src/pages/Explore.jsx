import React from 'react';
import { Link } from 'react-router-dom';
import { images } from '../assets/index.js';

const regions = [
    { name: "Mountain Ranges", image: images.mountain, description: "Explore scenic mountain destinations." },
    { name: "Beaches", image: images.beach, description: "Relax at beautiful beach locations." },
    { name: "Forests", image: images.forest, description: "Discover lush forests and unique wildlife." },
    { name: "Deserts", image: images.desert, description: "Experience the serene and vast desert landscapes." },
    { name: "Lakes and Rivers", image: images.lake, description: "Visit tranquil lakes and flowing rivers." },
    { name: "Waterfalls", image: images.waterfall, description: "Marvel at stunning waterfalls around the world." },
    { name: "Islands and Archipelagos", image: images.island, description: "Unwind on exotic islands and archipelagos." },
    { name: "Caves and Caverns", image: images.caves, description: "Explore mysterious caves and caverns." },
    { name: "Wetlands and Marshes", image: images.wetland, description: "Discover diverse wildlife in wetlands and marshes." },
    { name: "Glaciers and Polar Regions", image: images.glacier, description: "Witness majestic glaciers and polar landscapes." },
    { name: "Canyons and Gorges", image: images.canyon, description: "Hike through breathtaking canyons and gorges." },
    { name: "Volcanoes", image: images.volcano, description: "Visit volcanic landscapes with unique formations." },
];

function Explore() {
    return (
        <div className="flex flex-col items-center p-6 md:p-8 bg-gradient-to-br from-gray-900 via-gray-700 to-gray-900 text-gray-100 min-h-screen">
            
            {/* Heading section */}
            <h2 className="text-3xl md:text-4xl w-fit font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-400 via-white to-gray-400 mb-6 md:mb-8">
                Explore by Region
            </h2>

            {/* Regions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                {regions.map((region, index) => (
                    <Link
                        to={`/explore-region/${index}`}
                        key={index}  // Using index as a unique key here
                        className="block group relative overflow-hidden rounded-lg shadow-md"
                    >
                        <img
                            src={region.image}
                            alt={`Image of ${region.name}`}
                            className="w-full h-48 sm:h-60 lg:h-72 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-60 opacity-100 flex items-center justify-center">
                            <div className="text-center text-white p-3">
                                <h3 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2 bg-clip-text text-transparent bg-gradient-to-r from-gray-400 via-white to-gray-400">
                                    {region.name}
                                </h3>
                                <p className="text-xs sm:text-sm group-hover:text-gray-200 transition-colors duration-300">
                                    {region.description}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Explore;
