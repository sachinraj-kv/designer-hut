import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { api } from "@/api/api";
import { toast } from "sonner";
import { Endpoint } from "@/constants/endpoints";

const PostJob = () => {


  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const fetchjob = async () => {
    try {
      const job = await api.get(Endpoint.POST_JOB);
      

      dispatch(jobData(job.data.jobview));
    } catch (error) {
      console.log(error.message);
    }
  };



  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("job_title", data.job_title);
    formData.append("company_name", data.company_name);
    formData.append("Description", data.description);
    formData.append("location", data.location);
    formData.append("salary", data.salary);
    formData.append("job_type", data.job_type);
    formData.append(
      "contact_information.email",
      data.contact_information.email
    );
    formData.append(
      "contact_information.phone",
      data.contact_information.phone
    );

    if (data.logo && data.logo[0]) {
      formData.append("logo", data.logo[0]);
    }

    formData.append("company_website", data.company_website);

    const postjobat = toast.loading("posting.....");
    try {
      const response = await api.post("/job/postjob", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response?.data?.success) {
        toast.success(response.data.message || "posted successfull!", {
          id: postjobat,
          duration: 3000,
        });
        reset();
        fetchjob();
      } else {
        toast.error(response?.data?.message || "post failed", {
          id: postjobat,
          duration: 3000,
        });
      }
    } catch (error) {
      toast.error("failed to post", error);
      toast.error(
        error?.response?.data?.message || error.message || "failed to post",
        {
          duration: 3000,
        }
      );
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 px-6 md:px-20 mt-30 mb-10 max-w-4xl mx-auto">
      <div
        className="hidden md:block md:w-1/2 md:p-8 rounded-2xl text-white shadow-lg 
        bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-700 
        bg-[length:200%_200%] bg-center animate-gradient-x relative"
      >
        <div className="absolute inset-0 rounded-2xl bg-[url('https://wallpapercave.com/wp/q4WmqwK.jpg')] bg-cover bg-center opacity-10 z-0"></div>
        <div className="relative">
          <h2 className="text-4xl font-bold mb-4">Post Your Job</h2>
          <p className="text-lg mb-6">
            Connect with top-tier designers, developers, and creative minds
            across the globe. Posting a job is fast and easy.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Reach thousands of skilled freelancers</li>
            <li>Get high-quality applications</li>
            <li>Manage your job posts with ease</li>
          </ul>
          <div className="mt-8">
            <p className="text-sm">
              Need help? Contact our support team at{" "}
              <span className="underline">support@designerhut.com</span>
            </p>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="md:w-1/2 max-h-[80vh] overflow-y-auto p-6 border border-gray-200 bg-white rounded-2xl shadow-xl"
      >
        <div className="text-center mb-6 md:hidden">
          <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-600 mb-2">
            Post Your Job
          </h1>
          <p className="text-gray-600 text-base md:text-lg max-w-md mx-auto">
            Fill out the details below to publish your job and reach thousands
            of top-tier creative professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="relative">
            <input
              type="text"
              id="job_title"
              placeholder=" "
              {...register("job_title", { required: true })}
              className="peer w-full p-5 rounded-xl bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
            <Label
              htmlFor="job_title"
              className="absolute left-5 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm"
            >
              Job Title
            </Label>
            {errors.job_title && (
              <p className="text-sm text-red-500 mt-1">Job title is required</p>
            )}
          </div>

          <div className="relative">
            <input
              type="text"
              id="company_name"
              placeholder=" "
              {...register("company_name", { required: true })}
              className="peer w-full p-5 rounded-xl bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
            <Label
              htmlFor="company_name"
              className="absolute left-5 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm"
            >
              Company Name
            </Label>
            {errors.company_name && (
              <p className="text-sm text-red-500 mt-1">Required</p>
            )}
          </div>

          <div className="relative">
            <textarea
              id="description"
              placeholder=" "
              {...register("description", { required: true })}
              className="peer w-full h-32 p-5 rounded-xl bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
            <Label
              htmlFor="description"
              className="absolute left-5 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-6 peer-focus:top-1 peer-focus:text-sm"
            >
              Description
            </Label>
            {errors.description && (
              <p className="text-sm text-red-500 mt-1">Required</p>
            )}
          </div>

          <div className="relative">
            <input
              type="text"
              id="location"
              placeholder=" "
              {...register("location", { required: true })}
              className="peer w-full p-5 rounded-xl bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
            <Label
              htmlFor="location"
              className="absolute left-5 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-5 peer-focus:top-1 peer-focus:text-sm"
            >
              Location
            </Label>
            {errors.location && (
              <p className="text-sm text-red-500 mt-1">Required</p>
            )}
          </div>

          <div className="relative">
            <input
              type="number"
              id="salary"
              placeholder=" "
              {...register("salary", { required: true })}
              className="peer w-full p-5 rounded-xl bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
            <Label
              htmlFor="salary"
              className="absolute left-5 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-5 peer-focus:top-1 peer-focus:text-sm"
            >
              Salary
            </Label>
            {errors.salary && (
              <p className="text-sm text-red-500 mt-1">Required</p>
            )}
          </div>

          <div>
            <Label htmlFor="job_type" className="ml-2 text-sm text-gray-500">
              Job Type
            </Label>
            <select
              id="job_type"
              {...register("job_type", { required: true })}
              className="peer w-full mt-2 p-5 rounded-xl bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              <option value="">Select Type</option>
              <option value="remote">Remote</option>
              <option value="onsite">Onsite</option>
              <option value="hybrid">Hybrid</option>
            </select>
            {errors.job_type && (
              <p className="text-sm text-red-500 mt-1">Required</p>
            )}
          </div>

          <div className="relative">
            <input
              type="email"
              id="contact_information.email"
              placeholder=" "
              {...register("contact_information.email", { required: true })}
              className="peer w-full p-5 rounded-xl bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
            <Label
              htmlFor="contact_information.email"
              className="absolute left-5 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-5 peer-focus:top-1 peer-focus:text-sm"
            >
              Contact Email
            </Label>
            {errors.contact_information?.email && (
              <p className="text-sm text-red-500 mt-1">Required</p>
            )}
          </div>

          <div className="relative">
            <input
              type="tel"
              id="contact_information.phone"
              placeholder=" "
              {...register("contact_information.phone", { required: true })}
              className="peer w-full p-5 rounded-xl bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
            <Label
              htmlFor="contact_information.phone"
              className="absolute left-5 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-5 peer-focus:top-1 peer-focus:text-sm"
            >
              Contact Phone
            </Label>
            {errors.contact_information?.phone && (
              <p className="text-sm text-red-500 mt-1">Required</p>
            )}
          </div>

          <div>
            <Label htmlFor="logo" className="ml-2 text-sm text-gray-500">
              Company Logo
            </Label>
            <input
              type="file"
              id="logo"
              {...register("logo", { required: true })}
              className="peer mt-2 w-full p-5 rounded-xl bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
            {errors.logo && (
              <p className="text-sm text-red-500 mt-1">Required</p>
            )}
          </div>

          <div className="relative">
            <input
              type="url"
              id="company_website"
              placeholder=" "
              {...register("company_website", { required: true })}
              className="peer w-full p-5 rounded-xl bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
            <Label
              htmlFor="company_website"
              className="absolute left-5 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-5 peer-focus:top-1 peer-focus:text-sm"
            >
              Company Website
            </Label>
            {errors.company_website && (
              <p className="text-sm text-red-500 mt-1">Required</p>
            )}
          </div>

          <div className="flex justify-center mt-6">
            <Button
              type="submit"
              className="px-10 py-3 rounded-xl bg-indigo-950 text-white font-semibold hover:bg-indigo-800 transition"
            >
              Submit Job
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default PostJob;
