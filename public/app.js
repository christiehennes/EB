let debug=false;

//VARIABLES
let citiesList = ["san diego", "new york", "los angeles", "chicago", "san francisco", "miami", "seattle", "nashville", "dallas", "austin", "boston", "portland","denver"];
let searchTermsList = ["fest", "festival", "wine"];
let localOffset = 0; //Create an offset to add more gifs on page 
let currentSearch = ''; //To update with current search term

//Start the App
displayButtons();


//**** FUNCTIONS ****//
function displayButtons(){

    //Clear out the buttons to start
    $('#locations-buttons-list').empty();
    $('#search-terms-buttons-list').empty();

    citiesList.forEach(function(item){
        //Create the button for each array item and add to the button list 
        let button = `<button data-name="${item}" data-type="location" class="button">${item}</button>`;
        $('#locations-buttons-list').append(button);
    })

    searchTermsList.forEach(function(item){
        //Create the button for each array item and add to the button list 
        let button = `<button data-name="${item}" data-type="search"class="button">${item}</button>`;
        $('#search-terms-buttons-list').append(button);
    })

};

function displayResults(search, type, offset){


    // Empty out the images div and replace after API call
    if(!offset){ $('#images-display').empty(); };
    $('#show-more').empty();

    //Update the offset to display more gifs
    let newOffset = offset * 10;


    // //EB
    // //Define variables for API call

    let appendURL = '';

    switch (type){
        case 'location': 
            appendURL = `&location.address=${search}`;
            break;
        case 'search':
            appendURL = `&q=${search}`;
            break;
    }

    //Make API call to display results of search query
    $.ajax({
        method: "GET",
        url: "/scrape/" + appendURL
      })
        // With that done, add the note information to the page
        .then(function(data) {
            // console.log("Back in app.js" + data);

            if(debug){
                data = [ 
                    {
                        "name": {
                            "text": "Testing123"
                        },
                        "start": {
                            "local": "DATE HERE"
                        },
                        "url": "https://www.google.com"
                    },
                    {
                        "name": {
                            "text": "Testing123"
                        },
                        "start": {
                            "local": "DATE HERE"
                        },
                        "url": "https://www.google.com"
                    },
                    {
                        "name": {
                            "text": "Testing123"
                        },
                        "start": {
                            "local": "DATE HERE"
                        },
                        "url": "https://www.google.com"
                    }

                ]
            }

            data.forEach(function(item){

                //Add placeholder logo if one doesn't exist
                let eventLogo= 'https://carepharmaceuticals.com.au/wp-content/uploads/sites/19/2018/02/placeholder-600x400.png';

                if(item.logo) {eventLogo= item.logo.original.url;}
                let eventName = item.name.text;
                let eventDate = new Date(item.start.local);
                eventDate = moment.utc(eventDate).format("LL")
                let eventURL = item.url;

                // console.log(eventURL);

                //Create the div to display event info on the screen
                let eventDiv = 
                `<div class="event-item">
                        <div class="img-container">
                            <img src="${eventLogo}" class="gif-image" id="gif-image">
                        </div>
                        <div class="event-info-container">
                            <p><a href="${eventURL}" class="event-name">${eventName}</a></p>
                            <p>${eventDate}</p>
                        </div>
                </div>`;
                



                //Append the div to the dom
                $("#events-display").append(eventDiv);

            })

        })

    //     //Create new html to hold the "Show More" functionality 
    //     let showMore = 
    //     `<i class="fas fa-plus-square" ></i>
    //     <div class="more">Show more GIFs</div>`;

    //     //Add it to the page
    //     $('#show-more').append(showMore);
    // });

}


//**** CLICK HANDLERS ****//
$(document).on("click", ".button", function(){
    let search = $(this).attr("data-name");
    let type = $(this).attr("data-type"); 

    //Assign to global variables to use in other functions
    currentSearch = search;
    localOffset = 0;

    // console.log(search + " was clicked");
    displayResults(search, type, localOffset);
});
