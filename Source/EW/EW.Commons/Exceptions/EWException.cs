using System.Runtime.Serialization;

namespace EW.Commons.Exceptions
{
    public class EWException : Exception, ISerializable
    {
        public EWException(string message) : base(message) { }

        protected EWException(SerializationInfo serializations, StreamingContext context) : base(serializations, context) { }
    }
}
