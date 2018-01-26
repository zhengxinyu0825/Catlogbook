using System;
using System.Collections.Generic;
using System.Drawing.Imaging;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using StatsOne.Components.AssetService;
using static LanguageExt.Prelude;

namespace StatsOne.Components.Cloudinary
{
    public class CloudinaryService : IAssetService
    {
        private readonly CloudinaryDotNet.Cloudinary _cn;
        public string Salt { get; set; }

        public CloudinaryService(CloudinaryDotNet.Cloudinary cloudinaryInstance)
        {
            _cn = cloudinaryInstance;
        }

        ServiceUploadResult IAssetService.UploadImage(string identifier, byte[] imageBytes, ImageFormat format)
        {
            var result = _cn.Upload(identifier, imageBytes, format);
            return new ServiceUploadResult
            {
                StatusCode = result.StatusCode,
                Url = result.Uri.ToString(),
                SecureUrl = result.SecureUri.ToString()
            };
        }

        string IAssetService.ImageUrl(string identifier, int height, int width, bool secure)
        {
            return _cn.PhotoLink(identifier, width, height, secure);
        }


        private const string FetchUrl = "https://res.cloudinary.com/{0}/image/fetch/";
        string IAssetService.FetchImageUrl(string source, FetchOptions options)
        {
            if (string.IsNullOrEmpty(source))
                return string.Empty;

            options = options ?? FetchOptions.Default;

            var sb = new StringBuilder(string.Format(FetchUrl, _cn.Api.Account.Cloud));
            var urlOptions = new List<string>();

            Optional(options.Crop).IfSome(c => urlOptions.Add($"c_{c}"));
            Optional(options.FetchFormat).IfSome(f => urlOptions.Add($"f_{f}"));
            Optional(options.Width).IfSome(w => urlOptions.Add($"w_{w}"));
            Optional(options.Height).IfSome(h => urlOptions.Add($"h_{h}"));

            return sb.Append(urlOptions.Aggregate((a, b) => $"{a},{b}"))
                .AppendFormat("/{0}", source)
                .ToString();
        }
    }
}
