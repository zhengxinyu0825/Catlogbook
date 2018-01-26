using System.Web.Security;
using Microsoft.Owin.Security.DataProtection;

namespace Doglogbook_WebApi.Security
{
    public class MachineKeyProtectionProvider : IDataProtectionProvider
    {
        public IDataProtector Create(params string[] purposes)
        {
            return new MachineKeyDataProtector(purposes);
        }
    }

    public class MachineKeyDataProtector : IDataProtector
    {
        private readonly string[] purposes;
        public MachineKeyDataProtector(string[] purposes)
        {
            this.purposes = purposes;
        }

        public byte[] Protect(byte[] userData)
        {
            return MachineKey.Protect(userData, purposes);
        }

        public byte[] Unprotect(byte[] protectedData)
        {
            return MachineKey.Unprotect(protectedData, purposes);
        }
    }
}