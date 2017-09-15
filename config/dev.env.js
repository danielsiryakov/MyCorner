var
  merge = require('webpack-merge')
  prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_SCHEMA: '"http"',
  API_BASE_URL: '"0.0.0.0:8001"'
})
