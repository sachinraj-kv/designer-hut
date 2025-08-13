
const DesignerJobApplication = require("../model/designerJobApplication.model");
const Designerjob = require("../model/designerJob.model");

exports.applyed_Job = async (req, res, next) => {
  const { data } = req.body;

  console.log("data", data);

  const id = req.id;

  const role = req.role

  console.log("role",role);
  

  console.log("id", id);

  try {
    const job = await Designerjob.findById(data);

    console.log("job", job);

    if (!job || job.length === 0) {
      return res.status(404).json({
        success: false,
        message: "job not found",
      });
    }
    if(role === 'user'){
      return res.status(400).json({
        success : false ,
        message : "unauthorized access"
      })
    }
    const designerJobApplication = await DesignerJobApplication.create({
      UserId: id,
      job: job.job_title,
      company_name: job.company_name,
      jobtype: job.job_type,
      logo: job.logo,
      recruiter_Id: job.UserId,
      job_id : job._id
    });

    const populateuser = await DesignerJobApplication.findById(designerJobApplication._id).populate("UserId", "name email");

    res.status(200).json({
      success: true,
      message: "applay successfully",
      populateuser,
    });
  } catch (error) {
    next(error);
  }
};









exports.recruiter_view = async (req, res, next) => {
  const id = req.id;

  const role = req.role;    

  console.log("id");

  console.log("role", role);

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "not found",
    });
  }

  try {
    if (role === "user") {
      const application = await DesignerJobApplication.find({
        recruiter_Id: id,
      }).populate("UserId" , "name email")


      if (!application || application.length === 0) {
        return res.status(404).json({
          success: false,
          message: "not found application",
        });
      }

      return res.status(200).json({
        success: true,
        message: "fetched successfully",
        application,
      });
    } else {
      const application = await DesignerJobApplication.find({
        UserId: id,
      }).populate("UserId", "name email role");

      if (!application|| application === 0) {
        return res.status(404).json({
          success: false,
          message: "not found apply",
        });
      }
      return res.status(200).json({
        success: true,
        message: "fetched successfully",
        application,
      });
    }
  } catch (error) {
    next(error);
  }
};

