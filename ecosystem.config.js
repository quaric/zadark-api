module.exports = {
  apps: [
    {
      name: 'zadark-api',
      script: 'yarn start',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ]
}
