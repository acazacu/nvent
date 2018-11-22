process.env.VUE_APP_VERSION = require('./package.json').version;

console.log(process.env);

module.exports = {
    baseUrl: process.env.VUE_CONFIG_BASE_URL,
    productionSourceMap: process.env.VUE_CONFIG_PRODUCTION_SOURCE_MAP === 'true',
    css: {
        extract: process.env.VUE_CONFIG_CSS_EXTRACT === 'true',
        sourceMap: process.env.VUE_CONFIG_CSS_SOURCE_MAP === 'true'
    }
};
