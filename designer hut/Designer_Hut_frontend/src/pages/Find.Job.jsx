import React, { useState } from 'react'
import { useSelector } from 'react-redux'



const FindJob = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("")
  const [locationFilter, setLocationFilter] = useState("")
  const jobs = useSelector((state)=>state?.assetslice?.jobData?? [])


  

  const filteredJobs = jobs.filter((job) => {

    const matchTitleOrCompany = job.job_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                job.company_name.toLowerCase().includes(searchTerm.toLowerCase())

    const matchType = typeFilter ? job.job_type.toLowerCase() === typeFilter.toLowerCase() : true

    const matchLocation = locationFilter ? job.location.toLowerCase().includes(locationFilter.toLowerCase()) : true
    return matchTitleOrCompany && matchType && matchLocation
  })

  return (
    <div className="max-w-5xl mx-auto mt-30 px-6 mb-10 ">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Available Jobs</h2>

     
      <div className="mb-8 grid md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Search by job title or company"
          className="w-full p-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="w-full p-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="">All Job Types</option>
          <option value="Remote">remote</option>
          <option value="Onsite">onsite</option>
          <option value="Hybrid">hybrid</option>
        </select>

        <input
          type="text"
          placeholder="Filter by location"
          className="w-full p-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
        />
      </div>

      
      <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job, index) => (
            <div
              key={index}
              className="flex items-center justify-between  bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-4">
                <img
                  src={job.logo}
                  alt={`${job.company_name} logo`}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{job.job_title}</h3>
                  <p className="text-sm text-gray-500">{job.company_name}</p>
                </div>
              </div>

              <div className="hidden md:flex flex-col items-end text-right">
                <span className="text-sm text-gray-600">{job.location}</span>
                <span className="text-xs bg-indigo-100 text-indigo-600 font-medium px-3 py-1 rounded-full mt-1">
                  {job.job_type}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 mt-10">No matching jobs found.</p>
        )}
      </div>
    </div>
  )
}

export default FindJob
