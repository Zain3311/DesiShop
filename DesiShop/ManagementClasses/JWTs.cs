using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace DesiShop.ManagementClasses
{
    public static class JWTs
    {
        public static string GenerateJSONWebToken(string UserId, IConfiguration config)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[] {
             new Claim("Identity", EncryptionDecryption.Encrypt(UserId)),
             new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };
            var token = new JwtSecurityToken(config["Jwt:Issuer"],
              config["Jwt:Issuer"],
              claims,
              expires: DateTime.Now.AddDays(7),
              signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public static string UserId(this HttpRequest request, IConfiguration config)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Key"]));
            var handler = new JwtSecurityTokenHandler();
            var validations = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = securityKey,
                ValidateIssuer = false,
                ValidateAudience = false
            };
            var claims = handler.ValidateToken(request.Headers["Authorization"].ToString().Replace("Bearer ", ""), validations, out var tokenSecure);
            return EncryptionDecryption.Decrypt(claims.Claims.FirstOrDefault(c => c.Type == "Identity").Value.ToString());
        }
    }
}
