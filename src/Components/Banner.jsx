import React from 'react';
import { Link } from 'react-router';
 // Replace with your image or use a placeholder

const Banner = () => {
  return (
    <div className="flex mx-auto w-full h-150 text-center bg-sky-900">
      
        <img src="../banner.png" alt="Blood donation" className="" />
      

      <div className=" px-6 py-24 md:py-32 lg:py-40">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8 drop-shadow-lg">
            Save a Life Today
            <br />
            <span className="text-red-800">Donate Blood</span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto opacity-95">
            Your one donation can save up to three lives. Join our community of heroes and help those in need.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            
            <Link
              to="/register"
              className="px-8 py-4 bg-white text-red-700 font-bold text-lg rounded-full hover:bg-gray-100 transform hover:scale-105 transition shadow-lg"
            >
              Join as a Donor
            </Link> 
            <Link
              to="/dashboard/all-requests"
              className="px-8 py-4 bg-transparent border-4 border-white text-black font-bold text-lg rounded-full hover:bg-white hover:text-red-700 transform hover:scale-105 transition shadow-lg"
            >
              Search Donors
            </Link>
          </div>
      </div>
    </div>
  );
};

export default Banner;