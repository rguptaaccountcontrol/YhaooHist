var axios = require("axios");

var hh;

async function getHist(ticker,startDate,endDate,callback) {
    try {
        
        var stDt = new Date(startDate);  // get in date format
        var endDt = new Date(endDate); // get in date format

        endDt.setDate(endDt.getDate() + 1);  // need to increase the endDate by 1 for some reason for yahoo to give the correct result

        var period1 = Math.floor((stDt)/1000); // get date in seconds
        var period2 = Math.floor((endDt)/1000); // get date in seconds

        var stock_url = `https://query1.finance.yahoo.com/v7/finance/download/${ticker}?period1=${period1}&period2=${period2}&interval=1d&events=history&includeAdjustedClose=true`;


        const response = await axios.get(stock_url);
        var stock_data = response;
        var status = response.status;
        var headers = response.headers;
        var config = response.config;

        var h = response.data; // the data returned
        global.hh = h;

        // may be a heavy db call or http request?
        // do not return any data, use callback mechanism
        callback(h);
        
        //console.log(h);

        //console.log(response);
        
        //console.log("status: " , status);
        //console.log("headers: " , headers);
        //console.log("config: " , config);
        //console.log(response);
    } catch (error) {
        console.error(error);
    }
  }

  //getHist('msft','2021/7/2','2021/8/5');

    getHist('msft','2021/7/2','2021/8/5',function(a /* a is passed using callback */)
   {
    //console.log(a); // a is 5
    hh = a;
    
    }
    ).then (function () {console.log(hh)});
    
    
  //const data = await getHist('msft','2021/7/2','2021/8/5');
    //console.log(global.hh);

  

