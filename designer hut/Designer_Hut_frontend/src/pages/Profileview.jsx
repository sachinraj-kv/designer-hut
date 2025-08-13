import { api } from '@/api/api';
import { Endpoint } from '@/constants/endpoints';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Profileview = () => {

  useEffect(()=>{
    window.scrollTo({top : 0 , behavior : 'smooth'})
  },[])

  const {id} = useParams()

  console.log("id",id);
  
const [designs , setDesigns] = useState([])
useEffect(()=>{
 const getprofile = async()=>{
    try {
       const res = await api.get(Endpoint.UPLOAD_PROFILE(id))

       if(res.data.success){
        setDesigns(res.data.user_upload)
       }
    } catch (error) {
      console.log(error);
      
    }

   }
     getprofile()
},[id])
  

console.log("profile",designs);



  

  return (
    <section className="min-h-screen bg-gray-50 mt-20 px-4 py-14">
      <div className="max-w-7xl mx-auto space-y-12 ">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className= 'md:ml-10'>
            <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
            <p className="text-gray-600 mt-1">user all works</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 border-2 border-solid border-gray-200 p-5 rounded-2xl">
          {designs.map((design) => (
            <div key={design._id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all border border-gray-200">
              <img
                src={design.images}
                alt={design.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-5 flex flex-col justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-1">
                    {design.title}
                  </h2>
                  <p className="text-sm text-gray-500">{design.category}</p>
                  <p className="text-xs text-gray-400 mt-1">Uploaded by you</p>
                </div>
              </div>
             
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Profileview;
