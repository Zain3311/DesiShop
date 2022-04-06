using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace DesiShop.ManagementClasses
{
    public class EncryptionDecryption
    {
        public static string key = "XQA3YzCnPEOLk4yr";
        public static string Encrypt(string plainText)
        {
            byte[] inputArray = UTF8Encoding.UTF8.GetBytes(plainText);
            TripleDESCryptoServiceProvider tripleDES = new TripleDESCryptoServiceProvider();
            tripleDES.Key = UTF8Encoding.UTF8.GetBytes(key);
            tripleDES.Mode = CipherMode.ECB;
            tripleDES.Padding = PaddingMode.PKCS7;
            ICryptoTransform cTransform = tripleDES.CreateEncryptor();
            byte[] resultArray = cTransform.TransformFinalBlock(inputArray, 0, inputArray.Length);
            tripleDES.Clear();
            return Convert.ToBase64String(resultArray, 0, resultArray.Length);
        }
        public static string Decrypt(string base64EncodedData)
        {
            byte[] inputArray = Convert.FromBase64String(base64EncodedData);
            TripleDESCryptoServiceProvider tripleDES = new TripleDESCryptoServiceProvider();
            tripleDES.Key = UTF8Encoding.UTF8.GetBytes(key);
            tripleDES.Mode = CipherMode.ECB;
            tripleDES.Padding = PaddingMode.PKCS7;
            ICryptoTransform cTransform = tripleDES.CreateDecryptor();
            byte[] resultArray = cTransform.TransformFinalBlock(inputArray, 0, inputArray.Length);
            tripleDES.Clear();
            return UTF8Encoding.UTF8.GetString(resultArray);
        }
    }
}
