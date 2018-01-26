using System;
using System.Collections.Generic;
using System.Drawing.Imaging;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StatsOne.Components.AssetService
{
    public interface IAssetService
    {
        string Salt { get; }
        ServiceUploadResult UploadImage(string identifier, byte[] imageBytes, ImageFormat format);
        string ImageUrl(string identifier, int height, int width, bool secure);
        string FetchImageUrl(string source, FetchOptions options = null);
    }
}
