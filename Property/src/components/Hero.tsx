import React from "react";
import { Search, MapPin, Home, TrendingUp } from "lucide-react";

const Hero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1920')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Find Your Perfect
            <span className="text-orange-400 block">Dream Home</span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-gray-300 max-w-3xl mx-auto">
            Discover thousands of properties with advanced search, virtual
            tours, and expert guidance from trusted real estate professionals.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm">
                <Home className="h-8 w-8 text-orange-400 mx-auto mb-2" />
                <div className="text-2xl font-bold">15,000+</div>
                <div className="text-sm text-gray-300">Active Listings</div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm">
                <MapPin className="h-8 w-8 text-orange-400 mx-auto mb-2" />
                <div className="text-2xl font-bold">50+</div>
                <div className="text-sm text-gray-300">Cities Covered</div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm">
                <TrendingUp className="h-8 w-8 text-orange-400 mx-auto mb-2" />
                <div className="text-2xl font-bold">98%</div>
                <div className="text-sm text-gray-300">Success Rate</div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
              <Search className="inline-block w-5 h-5 mr-2" />
              Start Your Search
            </button>
            <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300">
              Browse Properties
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
