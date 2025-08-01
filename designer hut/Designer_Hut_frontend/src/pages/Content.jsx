import { api } from '@/api/api'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Content = () => {



  const projects = useSelector((state) => state?.assetslice?.designData ?? [])


  const categories = ['All', ...new Set(projects.map((item) => item.category))]

  const [activeFilter, setActiveFilter] = useState('All')
  const dispatch = useDispatch()

  const filteredProjects =
    activeFilter === 'All' ? projects : projects.filter((p) => p.category?.toLowerCase() === activeFilter.toLowerCase())



  return (
    <div className="p-6 max-w-7xl mx-auto md:mt-10">

      <div className="mb-8">
        <ul className="flex flex-wrap justify-center gap-3 text-sm font-medium text-gray-600">
          {categories.map((category, idx) => (
            <li
              key={idx}
              className={`px-4 py-1.5 rounded-full cursor-pointer transition border ${activeFilter === category
                  ? 'bg-black text-white'
                  : 'hover:bg-gray-100 border-gray-300'
                }`}
              onClick={() => setActiveFilter(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProjects.map((item) => (
          <Link to ={`/DesignDetails/${item._id}`}>
          <div
            key={item._id}
            className="rounded-xl overflow-hidden shadow-sm bg-white hover:shadow-md transition"
          >
            <img
              src={item.images}
              alt={item.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-800 truncate">{item.title}</h3>
              <p className="text-xs text-gray-500 line-clamp-2">{item.about}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[10px] font-semibold bg-gray-100 text-gray-600 px-2 py-0.5 rounded border">
                  {item.category}
                </span>
              </div>
            </div>
          </div>
          </Link>
        ))}
      </div>


      {filteredProjects.length === 0 && (
        <div className="text-center mt-12 text-gray-500">
          No projects found in “{activeFilter}”
        </div>
      )}
    </div>
  )
}

export default Content
