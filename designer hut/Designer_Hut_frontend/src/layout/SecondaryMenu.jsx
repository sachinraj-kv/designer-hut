import React from 'react'
import { Link } from 'react-router-dom';

const SecondaryMenu =()=> {
  return (
    <div className="w-56 bg-white rounded-xl shadow-lg p-4 border border-gray-200">
      <ul className="text-gray-700 font-medium space-y-2">
        <Link to={"/UploadDesign"}>
          {" "}
          <li className="px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            Upload Design
          </li>
        </Link>
        <Link to={"/designview"}>
          {" "}
          <li className="px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            View Design
          </li>
        </Link>
      </ul>
    </div>
  );
}

export default SecondaryMenu