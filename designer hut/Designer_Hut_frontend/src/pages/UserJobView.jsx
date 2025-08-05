import { Button } from '@/components/ui/button';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

const UserJobView = () => {

    const jobs = useSelector((state)=> state?.assetslice?.jobData?? [])
    
      const reduxUser = useSelector((state) => state?.assetslice?.user ?? {});

      const loginUser = useMemo(()=>{
          const storedUser = JSON.parse(localStorage.getItem('designerhut_user'));
      return reduxUser?.id ? reduxUser : storedUser?.user ?? {};
      },[reduxUser])

      console.log("loginUser",loginUser);

      const filterdata =  jobs?.filter((ele)=> ele?.UserId === loginUser?._id) 

      console.log("filterdata",filterdata);

  return(

    <div className="px-4 mt-30 mb-12">
    
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Job View</h1>
        <p className="text-gray-500 text-sm md:text-base">Hi, welcome to your uploaded jobs!</p>
        <div className="mt-6">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full">
            Upload More
          </Button>
        </div>
      </div>

      
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filterdata.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-6 text-center"
            >
              <div className="text-4xl font-bold text-indigo-600">{item.job_title}</div>
              <p className="text-sm text-gray-500 mt-2">{item.company_name}</p>
              <p className="text-sm text-gray-500 mt-2">car</p>
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserJobView;
