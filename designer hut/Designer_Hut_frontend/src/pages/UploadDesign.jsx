import React, { useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { CircleX, Upload } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { api } from '@/api/api';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { designData } from '@/redux/designerAssetsSlice';

const UploadDesign = () => {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState('No file selected');
  const [previewUrl, setPreviewUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileError, setFileError] = useState(false);
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

    if (!allowedTypes.includes(file.type)) {
      setFileError(true);
      setFileName('Invalid file format');
      setPreviewUrl(null);
      setSelectedFile(null);
      toast.error('Only JPG, JPEG, PNG, and WEBP files are allowed');
      return;
    }

    setSelectedFile(file);
    setFileName(file.name);
    setPreviewUrl(URL.createObjectURL(file));
    setFileError(false);
  } else {
    setSelectedFile(null);
    setFileName('No file selected');
    setPreviewUrl(null);
    setFileError(true);
  }
};


  const clearFile = () => {
    setSelectedFile(null);
    setFileName('No file selected');
    setPreviewUrl(null);
    setFileError(true);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const loginUser_id = useSelector((state)=> state?.assetslice?.user ?? {})

  console.log("loginUser_id",loginUser_id.id);
  

  const onsubmit = async (data) => {
    if (!selectedFile) {
      setFileError(true);
      return;
    }

    console.log("selectedFile", selectedFile);
    console.log("data.title", data.title);




    const formData = new FormData();
    formData.append('images', selectedFile);
    formData.append('title', data.title);
    formData.append('about', data.about);
    formData.append('category', data.category);

    for (let pair of formData.entries()) {
  console.log(pair[0], pair[1]);
}

    
    try 
    {

      const loadingupat = toast.loading('uploading....')
     
      const response = await api.post(`/upload/${loginUser_id.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response?.data?.success) {
       
        toast.success(response.data.message || "uploaded",{
          id : loadingupat,
          duration : 3000
        })
         reset();
         clearFile()
         
      }
      else{
        toast.error(response?.data?.message || 'uploading failed',{
          id : loadingupat,
          duration : 3000
        })
      }
    } catch(error) {
      toast.error("loging error",error)
     toast.error("error?.response?.data?.message")
    }

     useEffect(()=>{

    const fetchdata =async()=>{
     const data =  await api.get('/view/upload')
     dispatch(designData(data.data.uploadView))
    }
    fetchdata()

  },[dispatch])
    

  };

  return (
    <div className="mt-40 mb-40 mx-1">
      <div>

      </div>
      <form className='overflow-y-auto ' onSubmit={handleSubmit(onsubmit)}>

        <div className="max-w-4xl mx-auto grid grid-cols-1 gap-6 p-8 border rounded-3xl bg-white shadow-xl transition-all ">


          <div className="p-4 md:p-10 md:flex md:gap-3 items-center justify-center rounded-2xl bg-teal-50">

            <Label htmlFor="fileUpload" className="mb-2 block text-sm font-medium mt-3 text-gray-700">
              Upload Image
            </Label>
            <input
              type="file"
              id="fileUpload"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              ref={fileInputRef}
            />
            <Button
              type="button"
              onClick={handleFileClick}
              className="bg-teal-700 hover:bg-teal-800 text-white px-6 py-2 rounded-lg"
            >
              <Upload className="mr-2" />
              Select File
            </Button> 

            <span className="text-sm text-gray-500 truncate max-w-[200px]">{fileName}</span>

            {fileError && <p className="text-red-500 mt-1 ml-2">Image file is required</p>}
          </div>

          {previewUrl && (
            <div>
              <Button
                type="button"
                onClick={clearFile}
                className="bg-transparent hover:bg-transparent flex justify-end shadow-none mt-2"
              >
                <CircleX className="text-black" />
              </Button>
              <div className="mt-2">
                <img
                  src={previewUrl}
                  width={270}
                  alt="Preview"
                  className="max-w-xs rounded-xl border border-gray-300 shadow"
                />
              </div>
            </div>
          )}


          <div>
            <Label htmlFor="title" className="block mb-1">
              Title
            </Label>
            <Input
              id="title"
              placeholder="Enter title"
              className="focus-visible:border-indigo-600 focus-visible:ring-1 focus-visible:ring-indigo-600 mt-2 p-10"
              {...register('title', { required: true })}
            />
            {errors.title && <p className="text-red-500 mt-3">Title is required</p>}
          </div>


          <div>
            <Label htmlFor="about" className="block text-sm font-medium text-gray-700 mb-1">
              About
            </Label>
            <textarea
              id="about"
              rows="8"
              placeholder="Write a short description"
              className="w-full rounded-lg border-2 border-gray-100 focus:border-none focus-visible:ring-0 p-3"
              {...register('about', { required: true })}
            />
            {errors.about && <p className="text-red-500">Description is required</p>}
          </div>


          <div>
            <Label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </Label>
            <select
              id="category"
              className="w-full rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 p-7 mt-3"
              defaultValue=""
              {...register('category', { required: true })}
            >
              <option value="" disabled>
                Select category
              </option>
              <option value="web-design">Web Design</option>
              <option value="branding">Branding</option>
              <option value="illustration">Illustration</option>
              <option value="ui-ux">UI/UX</option>
              <option value="product-design">Product Design</option>
              <option value={"Logo Design"}>Logo Design</option>
            </select>
            {errors.category && <p className="text-red-500">Category is required</p>}
          </div>
          <Button type="submit" className='bg-teal-200 hover:bg-teal-300' >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UploadDesign;
