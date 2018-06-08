var Twit = require('twit');
console.log("Bot is starting...");
var config=require('./secret');
var search = require('youtube-search');
var prompt = require('prompt');
//import {twitConfig} from './secret';
var T = new Twit(config.twitConfig);
// T.get('search/tweets', { q: 'banana since:2011-07-11', count: 100 }, function(err, data, response) {
//   console.log(data);
// });
prompt.start();
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


var postInt=async function(callback){

  //console.log(x);
  await sleep(10000);
  callback();
};
//T.post('statuses/update', { status: 'hello you!' }, function(err, data, response) {});
//postInt();



var channelTmp="";


var searchName=function(name,callback) {
  var opts = {
    maxResults: 10,
    key: config.youConfig,
    type: "channel"
  };
  search(name, opts, function(err, results) {
    if(err) {console.log("Sorry, that channel could not be found,try running again.");return;}
    return isThisIt(results[0].channelTitle,results[0].channelId,callback);
    //console.log("Does the title \""+ results[0].channelTitle+"\" sound right?");
  });
};
var isThisIt=function(name,id,callback){

  prompt.message="";
  prompt.colors = false;
  prompt.delimiter="";
  prompt.get({properties: {
        yn: {
          description: "Does \""+name+"\" sound like the right channel name? (yes/no)"
        }
      }
    }, function (err, result) {
    if (err) { return onErr(err); }
      //console.log(result.yn=="yes");
      if (result.yn=="yes"){
        post(name,id);
      }
      else{
        return addChannel();
      }
  });
};

// prompt.message="Enter the name of the channel you'd like to add to your collection:\n";
//prompt.delimiter=:;
var addChannel=function(callback){
  prompt.message="";
  prompt.colors = false;
  prompt.delimiter="";
  prompt.get({properties: {
        channelName: {
          description: "Enter the name of the channel you'd like to add to your collection:"
        }
      }
    }, function (err, result) {
    if (err) { return onErr(err); }
    return searchName(result.channelName,callback);
  });
};
// prompt.get({properties: {
//       channelName: {
//         description: "Enter the name of the channel you'd like to add to your collection:"
//       }
//     }
//   }, function (err, result) {
//   if (err) { return onErr(err); }
//
//     search(result.channelName, opts, function(err, results) {
//       if(err) return console.log(err);
//
//       console.log("Does the title \""+ results[0].channelTitle+"\" sound right?");
//     });
// });

function onErr(err) {
  console.log(err);
  return 1;
}
//var bool;
var id="";
var post=function(name,id){
  var opts = {
    maxResults: 10,
    key: config.youConfig,
    channelId:id,
    type: "video",
    order: "date"
  };
  search("", opts, function(err, results) {
    if(err) return console.log(err);
    T.post('statuses/update', { status: "Here's the latest video from "+name+"!: "+results[0].link }, function(err, data, response) {});
    //console.log("Does the title \""+ results[0].channelTitle+"\" sound right?");
  });

};
addChannel();
// addChannel(function(x){
//   console.log(x);
// });
// if (addChannel()){
//   console.log("Success!");
// }
// var bool=addChannel();
// console.log(bool);
// else{
//   console.log("Failure");
// }
