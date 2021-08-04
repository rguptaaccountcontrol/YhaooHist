//This is the one we should use for quoteResponse
var request = require("request");

//var stock_url = "http://finance.yahoo.com/webservice/v1/symbols/FB/quote?format=json&view=%E2%80%8C%E2%80%8Bdetail";

var stock_url = "https://query2.finance.yahoo.com/v7/finance/quote?symbols=aapl&format=json";

request(stock_url, function (error, response, body) { 
    if (!error && response.statusCode == 200) {  
        var stock_data = body;
        //console.log("Yahoo Finance API: ", stock_data);

        const obj = JSON.parse(stock_data);
        var q = obj.quoteResponse.result[0];
        var clo = q.regularMarketPrice;
        var Hi = q.regularMarketDayHigh;
        var Lo = q.regularMarketDayLow;
        var vol = q.regularMarketVolume;
        var open = q.regularMarketOpen;
        var name = q.displayName;
        var bid = q.bid;
        var ask = q.ask;
        //console.log("stock_price: ", q); 
        console.log("clo: ", Hi,Lo,clo,vol,open, name, bid,ask, "limit: ", (bid+ask)/2);      
    };
});