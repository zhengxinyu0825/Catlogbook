param(
  [switch]$Next,
  [switch]$Hotfix,
  [switch]$Simple
)

$xml = [xml](get-content ./doglogbook-web/Web.config)
$version = $xml["configuration"].appSettings.add |? {
  $_.key -eq "VersionNumber"
} | select -exp value

function increment($arr, $index) {
  $arr[$index] = ++([int]$arr[$index])
}

$version_components = $version.split(".")
if ($Next) {
  if ($Hotfix) {
    increment $version_components 2
  }
  else {
    increment $version_components 1
    $version_components[2] = 0
  }

  $new_version = $version_components -join "."
}

if ($Simple) {
  if ($new_version) {
    $new_version
  }
  else {
    $version
  }
}
else {
  "Current Version: $version"
  if ($new_version) {
    "New Version: $new_version"
  }
}
