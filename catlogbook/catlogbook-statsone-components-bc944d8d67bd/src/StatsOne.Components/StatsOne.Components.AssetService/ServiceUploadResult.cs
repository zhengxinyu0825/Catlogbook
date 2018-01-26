using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace StatsOne.Components.AssetService
{
    public class ServiceUploadResult
    {
        public HttpStatusCode StatusCode { get; set; }
        public string Url { get; set; }
        public string SecureUrl { get; set; }
    }
}
