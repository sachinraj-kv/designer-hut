

export const RoutesURL = {
    HOME : "/",
    LOGIN : "/login",
    REGISTER : "/register",
    JOBPOST : "/jobpost",
    FINDJOB : "/findjobs",
    UPLOADS : "/UploadDesign",
    UPLOAD_VIEW : "/designview",
    UPLOAD_DETAILS :(id = ":id") => `/DesignDetails/${id}`,
    JOB_DETAILS : (id = ":id")=>`/JobDetail/${id}`,
    SEARCH_RESULT : "/search_result",
    JOB_VIEW : "/jobview",
    PROFILE_VIEW :(id = ":id")=> `profile/view/${id}`,
    MYAPPLICATION :"/MyApplication"
} 

