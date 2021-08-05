//This is the one we should use for quoteResponse
var axios = require("axios");



// Want to use async/await? Add the `async` keyword to your outer function/method.
async function getQuotes(ticker) {
    try {
        //var ticker = 'aapl';
        var stock_url = `https://query2.finance.yahoo.com/v7/finance/quote?symbols=${ticker}&format=json`;

        const response = await axios.get(stock_url);
        var stock_data = response;
        var status = response.status;
        var headers = response.headers;
        var config = response.config;

        var q = response.data.quoteResponse.result[0];

        //console.log(q);

        var clo = q.regularMarketPrice;
        var Hi = q.regularMarketDayHigh;
        var Lo = q.regularMarketDayLow;
        var vol = q.regularMarketVolume;
        var open = q.regularMarketOpen;
        var name = q.displayName;
        var bid = q.bid;
        var ask = q.ask;
        
        console.log("clo: ", Hi,Lo,clo,vol,open, name, bid,ask, "limit: ", (bid+ask)/2);  
        console.log(q.symbol);
        
        //console.log("status: " , status);
        //console.log("headers: " , headers);
        //console.log("config: " , config);
        //console.log(response);
    } catch (error) {
        console.error(error);
    }
  }

  getQuotes('msft');