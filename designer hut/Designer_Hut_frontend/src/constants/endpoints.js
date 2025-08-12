
export const Endpoint = {
    REGISTER : "/user/register",
    LOGIN : "/user/login",
    POST_JOB : "/job/view/postjob",
    Upload : "/upload/uploads",
    UPLOAD_VIEW : "/upload/view/upload",
    DESIGN_VIEW :(id = ":id")=> `/upload/view/userupload/${id}`,
    USER_PROFILE : "/user/profile",
    User : "/user/users",
    LOGOUT : "/user/Logout",
    USER_JOB_VIEW : "/job/view/job",
    JOB_VIEW : "/job/view/postjob",
    SEARCH : "/upload/search"
}