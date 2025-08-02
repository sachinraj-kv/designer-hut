import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const DesignDetails = () => {
  const { id } = useParams()

  const upload_Details = useSelector((state) => state?.assetslice?.designData ?? [])

  const filter_upload = upload_Details.find((ele) => ele._id === id)

   useEffect(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

  const user = {
    name: "Jubnu",
    role: "UI/UX Designer",
    avatar: "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png"
  }

  if (!filter_upload) {
    return (
      <div className="text-center mt-20 text-gray-600 text-lg">
        No design found for this ID.
      </div>
    )
  }

  return (
    <div className="bg-gray-50">
      <div className="p-6 max-w-7xl mx-auto mt-30">
        <div className="grid md:grid-cols-3 gap-8 ">

          <div className="md:col-span-2 overflow-y-auto max-h-[calc(100vh-150px)] pr-2 ">
            <img
              src={filter_upload.images} 
              alt="Design preview"
              className="w-full h-auto rounded-2xl max-w-3xl shadow-lg md:mt-10"
            />
            <div className="mt-6 space-y-4">
              <h1 className="text-4xl font-extrabold text-gray-900 w-3xl ">{filter_upload.title}</h1>
              <span className="inline-block px-3 py-1 text-xs font-medium text-white bg-indigo-600 rounded-full">
                {filter_upload.category}
              </span>
              <p className="text-gray-700 text-lg leading-relaxed border-t pt-4 md:mb-20">
                {filter_upload.about}
              </p>
            </div>
          </div>

      
          <div className="bg-white shadow-xl rounded-2xl p-8 sticky top-24 h-fit border">
            <div className="flex flex-col items-center">
              <img
                src={user.avatar}
                alt="User avatar"
                className="w-24 h-24 rounded-full object-cover shadow-md mb-4"
              />
              <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
              <p className="text-sm text-gray-500">{user.role}</p>
              <button className="mt-4 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition">
                Contact
              </button>
            </div>
          </div>
        </div>
      </div>

      <hr className="my-16 border-gray-300 max-w-5xl mx-auto" />

      <div className="max-w-7xl mx-auto px-6 mb-32 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">More...</h2>
      </div>
    </div>
  )
}

export default DesignDetails
