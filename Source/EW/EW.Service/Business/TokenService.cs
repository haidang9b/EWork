﻿using EW.Commons.Constaints;
using EW.Domain.Entities;
using EW.Services.Constracts;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace EW.Services.Business
{
    public class TokenService : ITokenService
    {
        private SymmetricSecurityKey _keyAccessToken;
        private SymmetricSecurityKey _keyRefreshToken;
        public TokenService()
        {
            _keyAccessToken = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Constaints.ACCES_TOKEN_KEY));
            _keyRefreshToken = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Constaints.REFRESH_TOKEN_KEY));

        }
        public string CreateRefreshToken(User user)
        {
            var signingCredentials =
                new SigningCredentials(_keyRefreshToken, SecurityAlgorithms.HmacSha256Signature);
            var header = new JwtHeader(signingCredentials);
            var payload = new JwtPayload(user.Email, null, null, null, DateTime.Now.AddSeconds(45)); // The expired time of payload is 5 days
            var securityToken = new JwtSecurityToken(header, payload);
            return new JwtSecurityTokenHandler().WriteToken(securityToken);
        }

        public string CreateToken(User user)
        {
            var claims = new List<Claim>()
            {
                new Claim(JwtRegisteredClaimNames.NameId, user.Email),
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, user.Role.Name),
                new Claim(ClaimTypes.GivenName, user.FullName)
            };
            var creds = new SigningCredentials(_keyAccessToken, SecurityAlgorithms.HmacSha512Signature);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddSeconds(30),
                SigningCredentials = creds
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public JwtSecurityToken GetPayloadRefreshToken(string refreshToken)
        {
            var handler = new JwtSecurityTokenHandler();

            handler.ValidateToken(refreshToken, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = _keyRefreshToken,
                ValidateIssuer = false,
                ValidateAudience = false
            }, out SecurityToken validatedToken);

            return validatedToken as JwtSecurityToken;
        }
    }
}