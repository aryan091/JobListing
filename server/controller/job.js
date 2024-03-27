const { decodeJwtToken } = require("../middlewares/verifyToken");
const Job = require("../models/job");
const { Types: { ObjectId } } = require("mongoose"); 

const createJobPost = async (req, res, next) => {
    try {
        const {
            companyName,
            logoUrl,
            title,
            description,
            salary,
            location,
            duration,
            locationType,
            information,
            jobType,
            skills,
            refUserId,
        } = req.body;

        if (
            !companyName ||
            !logoUrl ||
            !title ||
            !description ||
            !salary ||
            !location ||
            !duration ||
            !locationType ||
            !skills ||
            !information ||
            !jobType
        ) {
            return res.status(400).json({
                errorMessage: "Bad request",
            });
        }

        const userId = req.userId;

        const jobDetails = new Job({
            companyName,
            logoUrl,
            title,
            description,
            salary,
            location,
            duration,
            locationType,
            skills,
            information,
            jobType,
            refUserId: userId,
        });

        await jobDetails.save();
        res.json({ message: "Job created successfully" });
    } catch (error) {
        next(error);
    }
};

const getJobDetailsById = async (req, res, next) => {


    try {

        const jobId = req.params.jobId;
        const userId = decodeJwtToken(req.headers["authorization"]);

        console.log("User Id is ",userId)
        const jobDetails = await Job.findById(jobId);

        if (!jobDetails) 
        {
            return res.status(400).json({
                errorMessage: "Bad request",
            });
        
        }

        let isEditable = false


        if (userId &&  jobDetails.refUserId) {
            // As we know jobDetails also have a user id if it matches then we will say that he/she can edit
            const formattedUserId = new ObjectId(userId); // Use new keyword to create ObjectId instance
            if (jobDetails.refUserId.equals(formattedUserId)) {
                isEditable = true;
            }
        }

        

        res.json({ jobDetails , isEditable}); 

    } catch (error) {
        next(error);
    }
};

const updateJobDetailsById = async (req, res, next) => {
    try {
        const jobId = req.params.jobId;
        const userId = req.userId;

        if (!jobId) {
            return res.status(400).json({
                errorMessage: "Bad Request",
            });
        }

        const isJobExists =  await Job.findOne({ _id: jobId, refUserId: userId });
        

        if (!isJobExists) {
            return res.status(400).json({
                errorMessage: "Bad Request",
            });
        }

        const {
            companyName,
            logoUrl,
            title,
            description,
            salary,
            location,
            duration,
            locationType,
            information,
            jobType,
            skills,
        } = req.body;

        if (
            !companyName ||
            !logoUrl ||
            !title ||
            !description ||
            !salary ||
            !location ||
            !duration ||
            !locationType ||
            !information ||
            !jobType ||
            !skills
        ) {
            return res.status(400).json({
                errorMessage: "Bad request",
            });
        }

        await Job.updateOne(
            { _id: jobId, refUserId: userId },
            {
                $set: {
                    companyName,
                    logoUrl,
                    title,
                    description,
                    salary,
                    location,
                    duration,
                    locationType,
                    information,
                    jobType,
                    skills,
                },
            }
        );

        res.json({ message: "Job updated successfully" });
    } catch (error) {
        next(error);
    }
};

const getAllJobs = async (req, res, next) => {
    try {

        const title = req.query.title || "";
        const skills = req.query.skills;

        let filteredSkills;
        let filter = {};

        if (skills) {
            filteredSkills = skills.split(",");
            const caseInsensitiveFilteredSkills = filteredSkills.map(
                (element) => new RegExp(element, "i")
            );
            filter = { skills: { $in: caseInsensitiveFilteredSkills } };
        }

        const jobList = await Job.find(
            {
                title: { $regex: title, $options: "i" },
                ...filter,
            }
            //{ companyName: 1, title: 1 }
        );

        res.json({ data: jobList });
    } catch (error) {
        next(error);
    }
};


module.exports = {
    createJobPost,
    getJobDetailsById,
    updateJobDetailsById,
    getAllJobs,
};