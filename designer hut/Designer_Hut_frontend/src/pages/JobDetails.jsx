import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { api } from '@/api/api';
import { Endpoint } from '@/constants/endpoints';


const JobDetails = () => {

  useEffect(()=>{
   window.scrollTo({top: 0 , behavior : 'smooth'})
  },[])
  const navigate = useNavigate()
  const { id } = useParams();
  const alljob = useSelector((state) => state?.assetslice?.jobData ?? []);
  const detail_job = alljob.find((ele) => ele._id === id);

  const [applydata , setapplydata] = useState([])

  const  handleapply=async(data)=>{
    console.log("data",data);
    const res = await api.post( `${Endpoint.APPLY_JOB}`,{
      data : data
    })
    try {
       if(res.data.success)  {
      setapplydata(res.data.populateuser)
         navigate('/findjobs')
    }
    } catch (error) {
      nextTick(error)
    }
  
  }

  console.log("applydata",applydata);
  


  

  if (!detail_job){
    return (
      <div className="mt-32 text-center text-red-500 text-lg font-semibold">
        Job not found.
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="mt-32 px-4"
    >
      <div className="max-w-5xl mx-auto p-6 space-y-10 backdrop-blur-sm bg-white/60 border border-gray-200 rounded-3xl shadow-2xl mb-10">

       
        <div className="flex flex-col md:flex-row items-center gap-6 p-8 border border-gray-300 bg-white/70 rounded-2xl shadow-lg">
          <img
            src="https://shmector.com/_ph/13/188552034.png"
            alt="Company Logo"
            className="w-24 h-24 object-contain rounded-xl border p-2 bg-white shadow"
          />
          <div className="text-center md:text-left space-y-1">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              {detail_job?.company_name}
            </h1>
            <p className="text-lg text-gray-600">{detail_job?.role}</p>
          </div>
        </div>

      
        <div className="p-6 border border-gray-300 rounded-2xl bg-white/70 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">About the Job</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line text-base">
            {detail_job?.Description}
          </p>
        </div>

    
        <ScrollArea className="w-full overflow-hidden rounded-2xl border border-gray-300 bg-white/70 shadow-inner">
          <div className="flex w-max gap-5 p-6">
            <InfoCard title="Location" content={detail_job?.location} />
            <InfoCard title="Job Type" content={detail_job?.job_type} />
            <InfoCard title="salary"  content={detail_job?.salary}/>
            <InfoCard
              title="Contact"
              content={
                <>
                  <p>{detail_job?.contact_information?.email}</p>
                  <p>{detail_job?.contact_information?.phone}</p>
                </>
              }
            />
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

      
        <div className="p-6 border border-gray-300 rounded-2xl bg-white/70 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Requirements</h2>
          <div className="flex flex-wrap gap-3">
            {[
              "3+ years of experience in full stack development",
              "Proficiency in JavaScript/TypeScript",
              "Experience with React and Node.js",
              "Familiarity with MongoDB or other NoSQL databases"
            ].map((req, idx) => (
              <span
                key={idx}
                className="bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full text-sm font-medium shadow-sm"
              >
                {req}
              </span>
            ))}
          </div>
        </div>
        <div>
          <div>
            <div></div>
          </div>
        </div>

      
        <div className="text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={()=> handleapply(detail_job._id)}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-3 rounded-xl shadow-xl transition-all duration-300 font-semibold text-lg"
          >
            <div   >Apply Now</div>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};


const InfoCard = ({ title, content }) => (
  <div className="min-w-[260px] max-w-[300px] bg-white/90 border border-gray-200 p-6 rounded-xl shadow-md space-y-2 transition-all hover:scale-105 hover:shadow-xl">
    <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
    <div className="text-sm text-gray-600">{content}</div>
  </div>
);

export default JobDetails;
