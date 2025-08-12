import { api } from '@/api/api';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { FileInput, Trash, Upload } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from 'sonner';
import { Endpoint } from '@/constants/endpoints';

const DesignView = () => {

  
  const reduxUser = useSelector((state) => state?.assetslice?.user ?? {});
  const loginUser = useMemo(()=>{
      const storedUser = JSON.parse(localStorage.getItem('designerhut_user'));
  return reduxUser?.id ? reduxUser : storedUser?.user ?? {};
  },[reduxUser])
  
  console.log("loginUser",loginUser);
  
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const getUploaded = async () => {
    try {
      const res = await api.get(Endpoint.DESIGN_VIEW(loginUser.id));
      const uploads = res.data.upload_Data ?? [];
      setData(uploads);
      setFiltered(uploads);
    } catch (error) {
      console.error("Failed to fetch uploaded designs:", error);
    }
  };

  useEffect(() => {
    if (loginUser?.id) {
      getUploaded();
    }
  }, []);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);

    if (category === '') {
      setFiltered(data);
    } else {
      const filteredData = data.filter(design =>
        design.category?.toLowerCase() === category.toLowerCase()
      );
      setFiltered(filteredData);
    }
  };

  const handleDelete = async (designId) => {

    console.log("designId",designId);
    
    try {
      const toastId = toast.loading("Deleting...");
      await api.delete(Endpoint.DESIGN_VIEW(designId));
      toast.success("Deleted successfully", { id: toastId });
      getUploaded(); 
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete");
    }
  };

  const upload_count = data.length;
  const uniqueCategories = [...new Set(data.map((design) => design.category).filter(Boolean))];

  return (
    <section className="min-h-screen bg-gray-50 px-4 py-14 mt-30">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Uploads</h1>
            <p className="text-gray-600 mt-1">Manage and organize your uploaded designs</p>
          </div>

          <div className="relative group flex flex-col items-center bg-white border border-gray-200 px-6 py-4 rounded-full shadow-sm hover:shadow-md transition-all">
            <div className="text-sm text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity absolute -top-6">
              Total Files
            </div>
            <div className="flex items-center gap-4">
              <FileInput />
              <div className="bg-gray-800 py-1 px-4 rounded-2xl text-white font-bold text-sm">
                {upload_count}
              </div>
            </div>
          </div>

          <div className="w-full md:w-auto">
            <Label htmlFor="category" className="block mb-1 text-sm text-gray-700">
              Filter by Category
            </Label>
            <select
              id="category"
              name="category"
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="w-full md:w-60 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Categories</option>
              {uniqueCategories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <Link to="/UploadDesign">
            <Button className="flex items-center gap-2">
              <Upload size={18} />
              Upload New
            </Button>
          </Link>
        </div>

        <div>
          {filtered.length === 0 ? (
            <p className="text-gray-600 text-lg text-center">
              No designs found in this category.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {filtered.map((design) => (
                <div
                  key={design._id}
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all border border-gray-200"
                >
                  <Link to={`/DesignDetails/${design._id}`}>
                    <img
                      src={design.images}
                      alt={design.title}
                      className="w-full h-56 object-cover"
                    />
                  </Link>
                  <div className="p-5 flex flex-col justify-between ">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800 mb-1">
                        {design.title}
                      </h2>
                      <p className="text-sm text-gray-500">{design.category}</p>
                      <p className="text-xs text-gray-400 mt-1">Uploaded by you</p>
                    </div>
                  </div>
                  <div className="ml-5 mb-3">
                    <AlertDialog >
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          className=  " hover:text-red-600"
                          title="Delete"
                          onClick={() => setDeleteTarget(design._id)}
                        >
                            <Trash size={18} />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-black text-white border-black p-20">
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently delete the design. This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="border-none">Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(deleteTarget)}
                            className="bg-red-400 hover:bg-red-700 text-white "
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DesignView;
