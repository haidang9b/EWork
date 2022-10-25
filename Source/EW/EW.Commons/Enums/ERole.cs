using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EW.Commons.Enums
{
    public enum ERole
    {
        [Description("Faculty")]
        ID_Faculty = 1,
        [Description("Business")]
        ID_Business = 2,
        [Description("Student")]
        ID_Student = 3,
    }
}
