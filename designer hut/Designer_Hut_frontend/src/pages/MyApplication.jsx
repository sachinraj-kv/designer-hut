import { api } from '@/api/api';
import { Endpoint } from '@/constants/endpoints';
import { Calendar, CheckCircle, Eye, FileText, Hash } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const MyApplication = () => {

    

    const [application , setapplication] = useState([])

    useEffect(()=>{
        const viewapplication = async()=>{
            const res = await api.get(Endpoint.VIEW_APPLICATION)
                try {
                    if(res.data.success){
                setapplication(res.data.application)
            }
                } catch (error) {
                    console.log(error);
                    
                }
            
        }
        viewapplication()
    },[])

    console.log("application",application);
    

  return (
    <div className='mt-35'>
   {application.map((ele)=>(
               <div className="bg-white rounded-xl shadow-md border p-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between hover:shadow-lg transition max-w-3xl mx-auto mb-10">
       

      <div className="flex items-start gap-4">
        
           
        <div className="w-14 h-14 flex items-center justify-center rounded-lg bg-green-100 text-green-700 font-bold text-xl mt-4 ">
            <img   src={ele.logo} alt='logo'/>
          
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900">{ele.job}</h2>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <span className="material-icons text-sm">business</span>
            {ele.company_name}
          </p>

         
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
              <CheckCircle size={14} /> Applied
            </span>
            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
              {ele.jobtype}
            </span>
            <span className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
              <Calendar size={14} /> Applied 2 days ago
            </span>
            <span className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
              <Hash size={14} /> ID: {ele._id.slice(-8)}
            </span>
          </div>
        </div>
      </div>

     
      <div className="flex flex-col sm:items-end gap-2">
        <div className="flex gap-2">
          <button className="flex items-center gap-1 px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
            <Link to={`/JobDetail/${ele.job_id}`}>
            <Eye size={14} /> View Details
            </Link>
            
          </button>
         
        </div>

        
      </div>
    </div>   
            ))}
   
    </div>
  )
}

export default MyApplication