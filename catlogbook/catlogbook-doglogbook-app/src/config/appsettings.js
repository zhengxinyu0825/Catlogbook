var AppSettings = {
  // @if ENV == 'DEVELOPMENT'
  env: 'dev',
  apiUrl: 'http://doglogbookapi.local/api',
  analytics: false
  // @endif  
  // @if ENV == 'DEMO'
  env: 'demo',
  apiUrl: 'http://doglogbook-api-demo.azurewebsites.net/api',
  analytics: false
  // @endif
    // @if ENV == 'STAGE'
  env: 'demo',
  apiUrl: 'http://doglogbook-api-staging.azurewebsites.net/api',
  analytics: false
  // @endif
  // @if ENV == 'PRODUCTION'
  env: 'prod',
  apiUrl: 'https://api.doglogbook.com/api',
  analytics: true
  // @endif
}

