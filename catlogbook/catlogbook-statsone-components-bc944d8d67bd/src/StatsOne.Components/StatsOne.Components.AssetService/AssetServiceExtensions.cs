using System;
using System.Linq;
using HashidsNet;

namespace StatsOne.Components.AssetService
{
    public static class AssetServiceExtensions
    {
        public static string UserProfileImageUrl(this IAssetService service, int userId, int height = 200, int width = 200, bool secure = true)
        {
            return service.ImageUrl(service.UserProfileId(userId), height, width, secure);
        }

        private static Hashids _hashids;
        public static string UserProfileId(this IAssetService service, int userId)
        {
            _hashids = _hashids ?? new Hashids(service.Salt);
            return $"user/profile/{service.EncodeUserHash(userId)}";
        }

        public static string OrganizationId(this IAssetService service, int organizationId)
        {
            _hashids = _hashids ?? new Hashids(service.Salt);
            var enc = service.EncodeString($"org:{organizationId}");
            return $"organization/{enc}";
        }

        public static string EncodeString(this IAssetService service, string str)
        {
            _hashids = _hashids ?? new Hashids(service.Salt);
            return _hashids.Encode(str.ToCharArray().Select(c => (int)c));
        }

        public static string EncodeUserHash(this IAssetService service, int userId)
        {
            _hashids = _hashids ?? new Hashids(service.Salt);
            return _hashids.Encode(userId);
        }

        public static int DecodeUserHash(this IAssetService service, string id)
        {
            _hashids = _hashids ?? new Hashids(service.Salt);
            return _hashids.Decode(id).Single();
        }

        public static string FetchImageUrl(this IAssetService service, string source, int height, int width)
        {
            return service.FetchImageUrl(source, new FetchOptions() {Width = width, Height = height});
        }
    }
}
