using EW.Domain.Entities;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EW.Services.Constracts
{
    public interface ITokenService
    {
        public string CreateToken(User user);
        public string CreateRefreshToken(User user);
        public JwtSecurityToken GetPayloadRefreshToken(string refreshToken);
    }
}
