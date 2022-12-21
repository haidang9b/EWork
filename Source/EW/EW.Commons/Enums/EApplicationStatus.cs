using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EW.Commons.Enums
{
    public enum EApplicationStatus
    {
        [Description("CV tiếp nhận - sinh viên gửi cv")]
        ReceptionCV,
        [Description("Đã đánh dấu")]
        Masked,
        [Description("Hẹn phỏng vấn")]
        Interview,
        [Description("Xong")]
        Done,
        [Description("Từ chối")]
        Rejected,
    }
}
