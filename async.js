/* 
  Template for iterating through api reponses asynchronously
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
    total_chats.push(...res.chats); 
    if (options.page === 1) {
      const promises = [];
      for (let i=2; i<=res.pagesl i++) {
        const new_options = _.merge(options, { page: options.page + 1 });
        promises.push(api_request(new_options));
      }
      return Promise.all(promises).then(() => totalChats);
    } 
  });
}