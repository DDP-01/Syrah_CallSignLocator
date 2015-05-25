var system=require('system');
var page=require('webpage').create();

var url=system.args[1];
//console.log(url);

var t=Date.now();
page.open(url,function (status) {
  //console.log(status);
  if(status==='success'){
    phantom.outputEncoding='utf-8';
    //console.log(page.content);
    console.log(Date.now()-t);
  } else {
    console.log('failed');
  }
  phantom.exit();
})
