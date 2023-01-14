import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as FaIcons from "react-icons/fa";
import * as CgIcons from "react-icons/cg";
import * as MdIcons from "react-icons/md";

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
        title: "Công việc đã ứng tuyển",
        path: "/jobs-applied",
        icon: <IoIcons.IoMdSend />,
    },
];

const sidebarRecruiterData = [
    {
        title: "Trang chủ",
        path: "/",
        icon: <AiIcons.AiFillHome />,
    },
    {
        title: "Thông tin công ty",
        path: "/company-information",
        icon: <AiIcons.AiOutlineIdcard />,
    },
    {
        title: "Nhà tuyển dụng",
        path: "/hr-management",
        icon: <IoIcons.IoMdPeople />,
    },
    {
        title: "Bài tuyển dụng",
        path: "/recruitment-posts",
        icon: <MdIcons.MdReceipt />,
    },
    {
        title: "Quản lý ứng tuyển",
        path: "/applies-management",
        icon: <MdIcons.MdOutlinePostAdd />,
    },
    {
        title: "Tìm kiếm sinh viên",
        path: "/search-candidate",
        icon: <MdIcons.MdOutlineFindReplace />,
    },
];

const sidebarFacultyData = [
    {
        title: "Trang chủ",
        path: "/",
        icon: <AiIcons.AiFillHome />,
    },
    {
        title: "Dashboard",
        path: "/dashboard",
        icon: <IoIcons.IoIosPaper />,
    },
    {
        title: "Quản lý tài khoản",
        path: "/account-management",
        icon: <MdIcons.MdManageAccounts />,
    },
    {
        title: "Quản lý công ty",
        path: "/company-management",
        icon: <MdIcons.MdBusiness />,
    },
    {
        title: "Quản lý bài tuyển dụng",
        path: "/recruitment-posts",
        icon: <MdIcons.MdOutlinePostAdd />,
    },

    {
        title: "Quản lý blogs",
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
