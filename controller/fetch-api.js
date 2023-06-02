const axios = require("axios");
const Data = require("../models/data");
const db = require("../util/database");

exports.getApi = async (req, res, next) => {
  var payload = {
    url: "https://api.wazirx.com/api/v2/tickers",
    method: "GET",
  };
  var response = await axios(payload);
  response = response.data;
  const keys = Object.keys(response);
  const firstTenKeys = keys.slice(0, 10);
  var mylist = [];
  const result = {};
  firstTenKeys.forEach((key) => {
    result[key] = response[key];
    mylist.push(response[key]);
  });

  mylist.forEach((element) => {
    let name = element.name;
    let last = element.last;
    let buy = element.buy;
    let sell = element.sell;
    let volume = element.volume;
    let base_unit = element.base_unit;
    const data = new Data(name, last, buy, sell, volume, base_unit);
    console.log(name, last, buy, sell, volume, base_unit);
    data
      .save()
      .then((result) => {
        console.log("DUMMY DATA");
      })
      .catch((err) => console.log(err));
  });

  return res.redirect("fetch-api");
};

exports.fetchApi = (req, res, next) => {
  Data.fetchAll()
    .then(async (result) => {
      var data = await db.execute("SELECT * FROM api_data limit 10");

      var mydata = data[0].map((element) => {
        return {
          last: element.last.toFixed(2),
          buy: element.buy.toFixed(2),
          sell: element.sell.toFixed(2),
          diff: (
            ((parseFloat(element.sell) - parseFloat(element.buy)) * 100) /
            parseFloat(element.sell)
          ).toFixed(2),
          savings: (parseFloat(element.sell) - parseFloat(element.buy)).toFixed(
            2
          ),
        };
      });

      console.log(data[0]);
      res.render("index", {
        data: mydata,
        path: "/fetch-api",
      });
    })
    .then((err) => {
      console.log(err);
    });
};

exports.getTelegram = (req, res, next) => {
  res.render("telegram-page", {
    path: "/telegram-page",
  });
};
