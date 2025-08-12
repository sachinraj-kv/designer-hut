import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const SearchData = () => {

    useEffect(()=>{
        window.scrollTo({top : 0 , behavior : "smooth"})
    },[])
  const { state } = useLocation();
  const result = state?.result ?? [];

  return (
    <div className=" max-w-6xl mx-auto px-4 mt-30 mb-20 ">
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {result.length > 0 ? (
          result.map((item , index) => (
            <div  key={index}>
            <Link to={`/DesignDetails/${item._id}`}>
            <div
             
              className="rounded-xl overflow-hidden shadow-sm bg-white hover:shadow-md transition duration-300"
            >
              <img
                src={item.images || "https://via.placeholder.com/300"}
                alt={item.title || "Design Image"}
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-800 truncate">
                  {item.title ?? 'Untitled'}
                </h3>
                <p className="text-xs text-gray-500 line-clamp-1">
                  {item.about ?? 'No description provided.'}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[10px] font-semibold bg-gray-100 text-gray-600 px-2 py-0.5 rounded border">
                    {item.category ?? 'Uncategorized'}
                  </span>
                </div>
              </div>
            </div>
            </Link>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 text-sm">
            No search results found.
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchData;
