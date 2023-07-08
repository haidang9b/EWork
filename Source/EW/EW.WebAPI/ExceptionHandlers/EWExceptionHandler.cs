using System.Web.Http.ExceptionHandling;

namespace EW.WebAPI.ExceptionHandlers
{
    public class EWExceptionHandler : IExceptionHandler
    {
        public Task HandleAsync(ExceptionHandlerContext context, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
