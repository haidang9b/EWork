using System.ComponentModel;
using System.Reflection;

namespace EW.Commons.Helpers;

public static class EnumHelper
{
    public static string? Description(this Enum enumValue)
    {
        return enumValue.GetType()?
            .GetMember(enumValue.ToString())?
            .FirstOrDefault()?
            .GetCustomAttribute<DescriptionAttribute>()?.Description;
    }

    public static T GetValueFromDescription<T>(string description) where T : Enum
    {
        foreach (var field in typeof(T).GetFields())
        {
            if (Attribute.GetCustomAttribute(field,
            typeof(DescriptionAttribute)) is DescriptionAttribute attribute)
            {
                if (attribute.Description == description)
#pragma warning disable CS8603 // Possible null reference return.
#pragma warning disable CS8600 // Converting null literal or possible null value to non-nullable type.
                    return (T)field.GetValue(null);
#pragma warning restore CS8600 // Converting null literal or possible null value to non-nullable type.
#pragma warning restore CS8603 // Possible null reference return.
            }
            else
            {
                if (field.Name == description)
#pragma warning disable CS8603 // Possible null reference return.
#pragma warning disable CS8600 // Converting null literal or possible null value to non-nullable type.
                    return (T)field.GetValue(null);
#pragma warning restore CS8600 // Converting null literal or possible null value to non-nullable type.
#pragma warning restore CS8603 // Possible null reference return.
            }
        }

        throw new ArgumentException("Not found.", nameof(description));
    }
}
