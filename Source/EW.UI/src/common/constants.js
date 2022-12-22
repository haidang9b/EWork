/**
 * States of the slice
 * @readonly
 * @enum {string}
 */
export const Status = {
    idle: "idle",
    loading: "loading",
    succeeded: "succeeded",
    failed: "failed",
};

/**
 * Status of company
 * @readonly
 * @returns {object} item
 * @returns {value} item.value
 * @returns {label} item.value
 */
export const CompanyStatus = [
    {
        value: 0,
        label: "Đang chờ xác nhận",
    },
    {
        value: 1,
        label: "Đang hoạt động",
    },
    {
        value: 2,
        label: "Vô hiệu hóa",
    },
];

/**
 * List currrency
 * @readonly
 * @returns {object} item
 * @returns {value} item.value
 * @returns {label} item.value
 * @returns {rate} item.rate
 */
export const Currency = [
    {
        value: 0,
        label: "VND",
        rate: 1,
    },
    {
        value: 1,
        label: "USD",
        rate: 24400,
    },
];

/**
 * Roles in system
 * @readonly
 * @enum {string}
 */
export const Role = {
    Faculty: "Faculty",
    Business: "Business",
    Student: "Student",
};

/**
 * List salary type
 * @readonly
 * @returns {object} item
 * @returns {value} item.value
 * @returns {label} item.value
 */
export const SalaryType = [
    { value: 1, label: "Thương Lượng" },
    { value: 2, label: "Từ - đến" },
    { value: 3, label: "Lên tới" },
    { value: 4, label: "Tối thiểu" },
];

/**
 * List working type
 * @readonly
 * @returns {object} item
 * @returns {value} item.value
 * @returns {label} item.value
 */
export const WorkingType = [
    { value: 1, label: "At office" },
    { value: 2, label: "Remote" },
    { value: 3, label: "Flexible" },
];

/**
 * List working type
 * @readonly
 * @returns {object} item
 * @returns {value} item.value
 * @returns {label} item.value
 */
export const CompanyType = [
    { value: 0, label: "Product" },
    { value: 1, label: "Outsourcing" },
];

/**
 * List Team size
 * @readonly
 * @returns {object} item
 * @returns {value} item.value
 * @returns {label} item.value
 */
export const TeamSizeType = [
    { value: 0, label: "1 - 50" },
    { value: 1, label: "50 - 100" },
    { value: 2, label: "100 - 200" },
    { value: 3, label: "200 - 300" },
    { value: 4, label: "300-500" },
    { value: 5, label: "500-1000" },
    { value: 6, label: "1000+" },
    { value: 7, label: "2000+" },
    { value: 8, label: "3000+" },
    { value: 9, label: "5000+" },
];

/**
 * List job skill
 * @readonly
 * @returns {string}
 */
export const JobSkill = [
    "Agile",
    "Android",
    "Angular",
    "AngularJS",
    "ASP.NET",
    "AWS",
    "Blockchain",
    "Bridge Engineer",
    "Business Analyst",
    "C#",
    "C++",
    "C language",
    "Cloud",
    "Cocos",
    "CSS",
    "Data Analyst",
    "Database",
    "Designer",
    "DevOps",
    "Django",
    "Embedded",
    "English",
    "ERP",
    "Flutter",
    "Games",
    "Golang",
    "HTML5",
    "iOS",
    "IT Support",
    "J2EE",
    "Japanese",
    "Java",
    "JavaScript",
    "JQuery",
    "JSON",
    "Kotlin",
    "Laravel",
    "Linux",
    "Magento",
    "Manager",
    "MVC",
    "MySQL",
    ".NET",
    "Networking",
    "NodeJS",
    "NoSQL",
    "Objective C",
    "OOP",
    "Oracle",
    "PHP",
    "PostgreSql",
    "Product Manager",
    "Project Manager",
    "Python",
    "QA QC",
    "ReactJS",
    "React Native",
    "Ruby",
    "Ruby on Rails",
    "SAP",
    "Scala",
    "Scrum",
    "Sharepoint",
    "Software Architect",
    "Spring",
    "SQL",
    "Swift",
    "System Admin",
    "System Engineer",
    "Team Leader",
    "Tester",
    "TypeScript",
    "UI-UX",
    "Unity",
    "VueJS",
    "Wordpress",
    "Xamarin",
];
