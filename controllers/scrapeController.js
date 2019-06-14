let debug=false;
var express = require("express");

var router = express.Router();
var key = require("../server.js");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
// var cheerio = require("cheerio");

// Require all models
// var db = require("../models");

// Routes

router.get("/", function(req, res) {
    console.log("inside render get /");
    res.render("index");
});

// A GET route for scraping the echoJS website
router.get("/scrape/:query", function(req, res) {

    console.log("Inside scrape")
    console.log(key.API_KEY);
    console.log("Params: " + req.params.query);

    //Currently ONLY looking in the F&B Category (110)
    // TODO, update to let you search by other categories too in app, then send to controller
    let queryUrl = `https://www.eventbriteapi.com/v3/events/search/?token=${key.API_KEY}&categories=110&price=paid${req.params.query}`;

    console.log("URL " + queryUrl);

    let results;


    //Make the API Call

    if(!debug){
        axios.get(queryUrl).then(function(response){


            //Print to console in nice format 
            // console.log(JSON.stringify(response.data.events));
    
            results = response.data.events;
    
            console.log(results.length);
    
            //Send results back to the client to display on page
            res.send(results);
    
        })

    }
    else{
        
        res.send("Complete In Debug Mode")
    }




    

    //   axios.get("https://techcrunch.com/").then(function(response) {
    //   // Then, we load that into cheerio and save it to $ for a shorthand selector
    //   var $ = cheerio.load(response.data);

    // //   console.log(response.data)
  
    //   // Now, we grab every h2 within an article tag, and do the following:
    //   $("h2.post-block__title").each(function(i, result) {
    //     // Save an empty result object
    //     var result = {};
  
    //     // Add the text and href of every link, and save them as properties of the result object
    //     result.title = $(this)
    //       .children("a")
    //       .text();
    //     result.link = $(this)
    //       .children("a")
    //       .attr("href");

    //       console.log("RESULT");
  
    //     // Create a new Article using the `result` object built from scraping
    //     db.Article.create(result)
    //       .then(function(dbArticle) {
    //         // View the added result in the console
    //         console.log(dbArticle);
    //       })
    //       .catch(function(err) {
    //         // If an error occurred, send it to the client
    //         return res.json(err);
    //       });
    //   });
  
    //   // If we were able to successfully scrape and save an Article, send a message to the client
    //   res.send("Scrape Complete");
    // });

  });

  module.exports = router;