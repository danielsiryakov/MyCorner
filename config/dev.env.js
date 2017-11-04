var
  merge = require('webpack-merge')
  prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_SCHEMA: '"https"',
  API_BASE_URL: '"dev-mycorner.store"'
})
