import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as FaIcons from "react-icons/fa";
import * as CgIcons from "react-icons/cg";

const sidebarNonLoginData = [
    { title: "Trang chủ", path: "/", icon: <AiIcons.AiFillHome /> },
    {
        title: "Việc làm",
        path: "jobs",
        icon: <AiIcons.AiOutlineTeam />,
    },
    {
        title: "Công ty",
        path: "companies",
        icon: <CgIcons.CgOrganisation />,
    },
    {
        title: "Blog",
        path: "blogs",
        icon: <FaIcons.FaNewspaper />,
    },
];
const sidebarStudentData = [
    {
        title: "Trang chủ",
        path: "/",
        icon: <AiIcons.AiFillHome />,
    },
    {
        title: "Thông tin cá nhân",
        path: "/profile",
        icon: <IoIcons.IoMdPerson />,
    },
    {
        title: "Quản lý CV",
        path: "/my-cv",
        icon: <IoIcons.IoMdDocument />,
    },
    {
        title: "Nhà tuyển dụng xem hồ sơ",
        path: "/recruitment-post",
        icon: <IoIcons.IoMdPaperPlane />,
    },
    {
        title: "My Jobs",
        path: "/recruitment-post",
        icon: <IoIcons.IoMdPaperPlane />,
    },
    {
        title: "My Companies",
        path: "/recruitment-post",
        icon: <IoIcons.IoMdPaperPlane />,
    },
];

const sidebarRecruiterData = [
    {
        title: "Trang chủ",
        path: "/",
        icon: <AiIcons.AiFillHome />,
    },
    {
        title: "Tìm kiếm sinh viên",
        path: "/search-student",
        icon: <IoIcons.IoMdPerson />,
    },
    {
        title: "Bài tuyển dụng",
        path: "/recruitment-posts",
        icon: <IoIcons.IoMdPaperPlane />,
    },
];

const sidebarFacultyData = [
    {
        title: "Trang chủ",
        path: "/",
        icon: <AiIcons.AiFillHome />,
    },
    {
        title: "Báo cáo",
        path: "/reports",
        icon: <IoIcons.IoIosPaper />,
    },
    {
        title: "Tài khoản",
        path: "/account-management",
        icon: <FaIcons.FaCartPlus />,
    },
    {
        title: "Công ty",
        path: "/company-management",
        icon: <IoIcons.IoMdPeople />,
    },
    {
        title: "Bài tuyển dụng",
        path: "/recruitment-posts",
        icon: <IoIcons.IoMdPaperPlane />,
    },
    {
        title: "Nhà tuyển dụng",
        path: "/recruiter-management",
        icon: <IoIcons.IoMdPeople />,
    },
    {
        title: "Blogs",
        path: "/blog-management",
        icon: <FaIcons.FaNewspaper />,
    },
    {
        title: "Hỗ trợ",
        path: "/supports",
        icon: <IoIcons.IoMdHelpCircle />,
    },
];
export {
    sidebarNonLoginData,
    sidebarFacultyData,
    sidebarStudentData,
    sidebarRecruiterData,
};
