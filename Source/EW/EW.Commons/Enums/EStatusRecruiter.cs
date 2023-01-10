using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EW.Commons.Enums
{
    public enum EStatusRecruiter
    {
        [Description("Đang chờ xác minh")]
        Pending,
        [Description("Hoạt động")]
        Active,
        [Description("Vô hiệu hóa")]
        Disabled,
    }
}
