using EW.Domain.Entities;
using System.IdentityModel.Tokens.Jwt;

namespace EW.Services.Constracts;

public interface ITokenService
{
    string CreateToken(User user);

    string CreateRefreshToken(User user);

    JwtSecurityToken? GetPayloadRefreshToken(string refreshToken);
}
