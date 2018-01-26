param(
  [switch]$Hotfix
)

if ($Hotfix) {
  $version = $(./Get-Version -Simple -Next -Hotfix)
  git flow hotfix start $version
}
else {
  $version = $(./Get-Version -Simple -Next)
  git flow release start $version
}

./Update-Version -Version $version -Commit
