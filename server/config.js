//example query
//https://trackapi.nutritionix.com/v2/search/instant?query=pork
//result...
//select obj.common[0] (common foods key, [0] is closest match)

module.exports = {
    APP_KEY: 'fc3d94f9d64467a2684d165b0bfdcd31',
    APP_ID: '9ae9d692',
    API_URL: 'https://trackapi.nutritionix.com/v2/search/instant?query='
}