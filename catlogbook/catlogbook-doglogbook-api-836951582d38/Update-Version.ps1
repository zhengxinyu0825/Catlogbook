param(
  [string]$Version,
  [switch]$Commit
)

$fn = "$psscriptroot/doglogbook-webapi/Web.config"
$xml = [xml](get-content $fn)
$setting = $xml["configuration"].appSettings.add |? {
  $_.key -eq "VersionNumber"
}

$setting.value = $Version
$xml.Save($fn)

if ($Commit) {
  git add $fn
  git commit -m "Bump version"
}
