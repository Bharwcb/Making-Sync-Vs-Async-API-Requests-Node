/* 
  Template for iterating through api reponses synchronously
  Taken from livechat api project, where I needed to collect a thousand pages of worth of data
*/

const request = require('request');
const _ = require('lodash');

let total_chats = []; // an array of chat objects
let options = {
  uri: "https://api.livechatinc.com/chats",
  qs: {
    date_from: "2017-01-01",
    date_to: "2018-01-01",
    timezone: "America/Los_Angeles"
  },
  headers: {
    "X-API-VERSION": "2"
  },
  json: true
}

function api_request(options) {
  // on first iteration, no 'page' options key yet.. so set to 1
  options.page = options.page || 1;
  request(options)
  .then((res) => {
    totalChats.push(...res.chats); 
    if(options.page < res.pages) {
      const newOptions = _.merge(options, { page: options.page + 1 });
      return api_request(newOptions);
    } else {
      return totalChats;
    }
  });
}