﻿using System.ComponentModel;

namespace EW.Commons.Enums;

public enum EApplicationStatus
{
    [Description("CV tiếp nhận - sinh viên gửi cv")]
    ReceptionCV,
    [Description("Đã đánh dấu")]
    Marked,
    [Description("Hẹn phỏng vấn")]
    Interview,
    [Description("Xong")]
    Done,
    [Description("Từ chối")]
    Rejected,
}
