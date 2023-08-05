using System.ComponentModel;

namespace EW.Commons.Enums;

public enum EStatusRecruiter
{
    [Description("Đang chờ xác minh")]
    Pending,
    [Description("Hoạt động")]
    Active,
    [Description("Vô hiệu hóa")]
    Disabled,
}
