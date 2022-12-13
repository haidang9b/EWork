export const Status = {
    idle: "idle",
    loading: "loading",
    succeeded: "succeeded",
    failed: "failed",
};

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

export const Role = {
    Faculty: "Faculty",
    Business: "Business",
    Student: "Student",
};

export const SalaryType = [
    { value: 1, label: "Thương Lượng" },
    { value: 2, label: "Từ - đến" },
    { value: 3, label: "Lên tới" },
    { value: 4, label: "Tối thiểu" },
];
