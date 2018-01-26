using StatsOne.Components.AssetService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Doglogbook_WebApi
{
    public static class Assets
    {
        public static IAssetService Service { get; internal set; }
    }
}