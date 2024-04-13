﻿using EW.Commons.Constaints;
using EW.Domain.Entities;
using EW.Services.Constracts;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace EW.Services.Business;

public class TokenService : ITokenService
{
    private readonly SymmetricSecurityKey _keyAccessToken;

    private readonly SymmetricSecurityKey _keyRefreshToken;

    public TokenService()
    {
        _keyAccessToken = new(Encoding.UTF8.GetBytes(Constaints.ACCES_TOKEN_KEY));
        _keyRefreshToken = new(Encoding.UTF8.GetBytes(Constaints.REFRESH_TOKEN_KEY));

    }
    public string CreateRefreshToken(User user)
    {
        var signingCredentials =
            new SigningCredentials(_keyRefreshToken, SecurityAlgorithms.HmacSha256Signature);
        var header = new JwtHeader(signingCredentials);
        var payload = new JwtPayload(user.Email, null, null, null, DateTime.Now.AddMonths(1)); // The expired time of payload is 1 month
        var securityToken = new JwtSecurityToken(header, payload);
        return new JwtSecurityTokenHandler().WriteToken(securityToken);
    }

    public string CreateToken(User user)
    {
        var claims = new List<Claim>()
        {
            new(JwtRegisteredClaimNames.NameId, user.Username),
            new(ClaimTypes.Name, user.Username),
            new(ClaimTypes.Role, user.Role.Name),
            new(ClaimTypes.Email, user.Email),
            new(ClaimTypes.GivenName, user.FullName),
            new(ClaimTypes.Thumbprint, user.ImageUrl),
        };
        var creds = new SigningCredentials(_keyAccessToken, SecurityAlgorithms.HmacSha512Signature);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.Now.AddDays(1),
            SigningCredentials = creds
        };
        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }

    public JwtSecurityToken? GetPayloadRefreshToken(string refreshToken)
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
