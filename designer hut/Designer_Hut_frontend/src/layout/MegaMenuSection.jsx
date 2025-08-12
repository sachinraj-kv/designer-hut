import React from 'react'
import { Link } from 'react-router-dom';

const  MegaMenuSection = () =>{
  return (
    <div className="w-56 bg-white rounded-xl shadow-lg p-4 border border-gray-200">
      <ul className="text-gray-700 font-medium space-y-2">
        <Link to={"/jobpost"}>
          {" "}
          <li className="px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            {" "}
            Post job
          </li>
        </Link>
        <Link to={"jobview"}>
          <li className="px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            View job
          </li>
        </Link>
      </ul>
    </div>
  );
}

export default MegaMenuSection