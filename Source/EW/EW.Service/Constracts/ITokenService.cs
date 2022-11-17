using EW.Domain.Entities;
using System.IdentityModel.Tokens.Jwt;

namespace EW.Services.Constracts
{
    public interface ITokenService
    {
        public string CreateToken(User user);
        public string CreateRefreshToken(User user);
        public JwtSecurityToken GetPayloadRefreshToken(string refreshToken);
        public JwtSecurityToken GetPayloadAccessToken(string accessToken);
    }
}
