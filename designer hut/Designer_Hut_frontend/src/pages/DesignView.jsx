import { api } from '@/api/api';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { FileInput, Trash2, Upload } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const DesignView = () => {
  const reduxUser = useSelector((state) => state?.assetslice?.user ?? {});
  const storedUser = JSON.parse(localStorage.getItem('designerhut_user'));
  const loginUser = reduxUser?.id ? reduxUser : storedUser?.user ?? {};

  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  
useEffect(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, []);


  useEffect(() => {
    const getUploaded = async () => {
      try {
        const res = await api.get(`/view/userupload/${loginUser.id}`);
        const uploads = res.data.upload_Data ?? [];
        setData(uploads);
        setFiltered(uploads);
      } catch (error) {
        console.error("Failed to fetch uploaded designs:", error);
      }
    };

    if (loginUser?.id) {
      getUploaded();
    }
  }, [loginUser]);

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
                <Link key={design._id} to={`/DesignDetails/${design._id}`}>
                  <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all border border-gray-200">
                    <img
                      src={design.images}
                      alt={design.title}
                      className="w-full h-56 object-cover"
                    />
                    <div className="p-5 flex flex-col justify-between h-full">
                      <div>
                        <h2 className="text-lg font-semibold text-gray-800 mb-1">
                          {design.title}
                        </h2>
                        <p className="text-sm text-gray-500">{design.category}</p>
                        <p className="text-xs text-gray-400 mt-1">Uploaded by you</p>
                      </div>
                    </div>
                    <div className="ml-5 mb-3">
                      <button className="hover:text-red-600" title="Delete">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DesignView;
