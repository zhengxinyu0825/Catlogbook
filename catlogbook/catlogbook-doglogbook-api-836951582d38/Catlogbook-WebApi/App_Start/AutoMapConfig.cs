using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;

namespace Doglogbook_WebApi
{
    public static class AutoMapConfig
    {
        public static void CreateMaps()
        {
            //call any static mapping methods on classes
            Assembly.GetCallingAssembly()
                .GetTypes()
                .SelectMany(t => t.GetMethods(BindingFlags.Public | BindingFlags.Static)
                .Where(m => m.Name.Equals("AutoMapper_CreateMaps") && m.MemberType == MemberTypes.Method))
                .ToList()
                .ForEach(m => m.Invoke(null, null));
        }
    }
}