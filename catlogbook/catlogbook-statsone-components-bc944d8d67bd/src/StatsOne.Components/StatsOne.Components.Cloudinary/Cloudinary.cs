using System;
using System.Drawing.Imaging;
using System.IO;
using System.Security;
using System.Security.Cryptography;
using System.Text;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;

namespace StatsOne.Components.Cloudinary
{
    public static class Cloudinary
    {
        /// <summary>
        /// Generate a new Cloudinary instance
        /// </summary>
        /// <param name="credentials">Cloudinary credentials</param>
        /// <returns>A new cloudinary instance</returns>
        public static CloudinaryDotNet.Cloudinary Create(CloudinaryAccountCredentials credentials)
        {
            var account = new Account(credentials.CloudName, credentials.ApiKey, credentials.ApiSecret);
            return new CloudinaryDotNet.Cloudinary(account);
        }

        /// <summary>
        /// Returns the Cloudinary PublicId for the given user
        /// </summary>
        /// <param name="userId">The users primary key identifier</param>
        /// <param name="salt">A that can be used to prevent overriding users images in another environment</param>
        /// <returns>The user's Cloudinary PublicId</returns>
        public static string GetPublicId(int userId, string salt)
        {
            var publicId = $"{salt}_{userId}";
            var sha1 = new SHA1CryptoServiceProvider();
            var digest = sha1.ComputeHash(Encoding.UTF8.GetBytes(publicId));
            return Convert.ToBase64String(digest, 0, digest.Length);
        }

        /// <summary>
        /// Generates an image url for a users profile image
        /// </summary>
        /// <param name="cn">A Cloudinary instance</param>
        /// <param name="publicId">The user's PublicId</param>
        /// <param name="width">The width of the image</param>
        /// <param name="height">The height of the image</param>
        /// <param name="secure">Generate a secure url?</param>
        /// <returns>An image url</returns>
        public static string PhotoLink(this CloudinaryDotNet.Cloudinary cn, string publicId, int width = 200, int height = 200, bool secure = true)
        {
            return cn.Api.UrlImgUp.Transform(new Transformation().Height(height).Width(width).Crop("fill"))
                .Secure(secure)
                .BuildUrl(publicId);
        }

        public static ImageUploadResult Upload(this CloudinaryDotNet.Cloudinary cn, string publicId, byte[] imageBytes, ImageFormat format)
        {
            string strFormat =
                format.Equals(ImageFormat.Png) ? "png" : 
                format.Equals(ImageFormat.Bmp) ? "bmp" : 
                format.Equals(ImageFormat.Gif) ? "gif" : "jpg";

            using (var stream = new MemoryStream(imageBytes))
            {
                var imageUploadParams = new ImageUploadParams
                {
                    File = new FileDescription("avatar", stream),
                    PublicId = publicId,
                    Overwrite = true,
                    Format = strFormat,
                    Invalidate = true
                };

                return cn.Upload(imageUploadParams);
            }
        }
    }
}
