using System.Runtime.Serialization;

namespace EW.Commons.Exceptions
{
    public class EWException : Exception
    {
        public EWException(string message) : base(message) { }

        protected EWException(SerializationInfo information, StreamingContext context) : base(information, context) { }
    }
}
