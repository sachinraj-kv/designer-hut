import { api } from '@/api/api';
import { Endpoint } from '@/constants/endpoints';
import { sampleSize } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

const DesignDetails = () => {
  const { id } = useParams();

  const upload_Details = useSelector((state) => state?.assetslice?.designData ?? []);
  const filter_upload = upload_Details.find((ele) => ele._id === id);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [filter_upload]);

  const filter_data = upload_Details.filter(
    (ele) => ele.category === filter_upload?.category && ele._id !== filter_upload?._id
  );
  const random_data = sampleSize(filter_data, 3);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const res = await api.get(Endpoint.User);
      if (res.data.success) {
        setUsers(res.data.existing_User);
      }
    };
    getUsers();
  }, [filter_upload]);

  const filter_user = users.find((ele) => ele._id === filter_upload?.UserId);

  const user = {
    name: filter_user?.name ?? 'Unknown',
    role: filter_user?.role ?? 'Designer',
    avatar:
      'https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png',
  };

  if (!filter_upload) {
    return (
      <div className="text-center mt-20 text-gray-600 text-lg">
        No design found for this ID.
      </div>
    );
  }

  return (
    <div className="bg-gray-50 px-4 mt-30 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto mt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         
          <div className="md:col-span-2 order-2 md:order-1">
            <img
              src={filter_upload.images}
              alt="Design preview"
              className="w-full h-auto rounded-4xl shadow-2xl"
            />
            <div className="mt-6 space-y-4">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 ">
                {filter_upload.title}
              </h1>
              <span className="inline-block px-3 py-1 text-xs font-medium text-white bg-indigo-600 rounded-full">
                {filter_upload.category}
              </span>
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed border-t pt-4">
                {filter_upload.about}
              </p>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="bg-white shadow-xl rounded-2xl p-6 md:p-8 sticky md:top-24 border">
              <div className="flex flex-col items-center text-center">
                <img
                  src={user.avatar}
                  alt="User avatar"
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover shadow-md mb-4"
                />
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">{user.name}</h2>
                <p className="text-sm text-gray-500">{user.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

     
      <hr className="my-16 border-gray-300 max-w-5xl mx-auto" />

      
      <div className="max-w-7xl mx-auto mb-32 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Related Designs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {random_data.map((data, index) => (
            <Link key={index} to={`/DesignDetails/${data._id}`}>
              <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all border">
                <img
                  src={data.images}
                  alt="Related design"
                  className="w-full h-56 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">
                    {data.title}
                  </h3>
                  <p className="text-sm text-gray-500">{data.category}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DesignDetails;
