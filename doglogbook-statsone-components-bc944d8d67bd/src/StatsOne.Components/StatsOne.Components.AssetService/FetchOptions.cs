using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StatsOne.Components.AssetService
{
    public class FetchOptions
    {
        public int? Width { get; set; }
        public int? Height { get; set; }
        public bool? Secure { get; set; }
        public string Crop { get; set; } = "fill";
        public string FetchFormat { get; set; } = "jpg";

        public static FetchOptions Default => new FetchOptions {Secure = true, Height = 200, Width = 200};
    }
}
