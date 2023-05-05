const axios = require('axios')
const Data = require('../models/data')

exports.getApi = async (req, res, next) => {
    var payload = {
        url : 'https://api.wazirx.com/api/v2/tickers',
        method: 'GET'        
    }
    var response = await axios(payload)
    response = response.data
    const keys = Object.keys(response);
    const firstTenKeys = keys.slice(0, 10);
    var mylist = []
    const result = {};
    firstTenKeys.forEach(key => {
    result[key] = response[key];
    mylist.push(response[key])
    });

    // console.log(mylist)

    mylist.forEach(element => {
        let name = element.name
        let last = element.last
        let buy = element.buy
        let sell = element.sell
        let volume = element.volume
        let base_unit = element.base_unit
        const data = new Data(name, last, buy, sell, volume, base_unit)
        data.save().then(result => {
            // console.log('DUMMY DATA')
        })
        .catch(err => console.log(err))
    })

    return res.send(result)
}


exports.fetchApi = (req, res, next) => {
  Data.fetchAll().then(result => {
    console.log(result)
    return res.status(200).json({status: 'success', res: result[0]})
  }).then(err => {
    console.log(err)
  })

}