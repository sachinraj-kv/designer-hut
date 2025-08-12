import { api } from "@/api/api";
import { Button } from "@/components/ui/button";
import { Endpoint } from "@/constants/endpoints";
import { Trash } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

const UserJobView = () => {
  const [filterdata, setfilterdata] = useState([]);

  const postedjob = async () => {
    try {
      const res = await api.get(Endpoint.USER_JOB_VIEW);

      if (res.data.success) {
        console.log("fetched successfully");
        setfilterdata(res.data.designerJobs);
        console.log("res.data.designerJobs",res.data.designerJobs);
        
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    postedjob();
  }, []);
  
  const handledelete = async () => {
    
    try {
      const res = await api.delete(Endpoint.USER_JOB_VIEW, {
        data: { id },
      });

      if (res.data.success) {
        console.log("deleted succcess fully");
        postedjob();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="px-4 mt-30 mb-12">
      <div className="max-w-6xl mx-auto text-center mb-12 md:flex md:justify-between ">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 align-middle ">
          Your Job Upload
        </h1>
        <p className="text-gray-500 text-sm md:text-base align-middle">
          Hi, welcome to your uploaded jobs
        </p>
        <div className="mt-6">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full">
            Upload More
          </Button>
        </div>
      </div>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filterdata.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-6 text-center"
            >
              <div className="text-4xl font-bold text-indigo-600">
                {item.job_title}
              </div>
              <p className="text-sm text-gray-500 mt-2">{item.company_name}</p>
              <p className="text-sm text-gray-500 mt-2">car</p>
              <div>
                <Button onClick={() => handledelete(item._id)}>
                  <Trash />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserJobView;
