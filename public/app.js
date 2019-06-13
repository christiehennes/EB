
//VARIABLES
let citiesList = ["san diego", "new york", "los angeles", "chicago", "san francisco", "miami", "seattle", "nashville", "dallas", "austin", "boston", "portland","denver"];
let searchTermsList = ["fest", "festival", "wine"];
let localOffset = 0; //Create an offset to add more gifs on page 
let currentSearch = ''; //To update with current search term

//Start the App
console.log("Running123");
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

    // let queryUrl = `https://www.eventbriteapi.com/v3/events/search/?token=&categories=110&price=paid${appendURL}`;


    //Make API call to display results of search query
    $.ajax({
        method: "GET",
        url: "/scrape/" + appendURL
      })
        // With that done, add the note information to the page
        .then(function(data) {
          console.log(data);
        })


    

    // console.log(queryUrl);

    // //Make the ajax call to get the gifs with the specified url
    // $.ajax({
    //     url: queryUrl,
    //     method: "GET"
    // }).then(function(response){

    //     // console.log(response);

    //     let results = response.events;

    //     console.log(results.length);
    //     let num=0; 

    //     results.forEach(function(item){

    //         console.log(item);
    //         console.log(num++)

    //         //Create variables
    //         // let stillUrl = item.images.fixed_height_still.url;
    //         // let movingUrl = item.images.fixed_height.url;
    //         // let rating = item.rating;

    //             // let eventLogo= item.logo.original.url;

    //             if(item.logo) {let eventLogo= item.logo.original.url;}
    //             let eventName = item.name.text;
    //             let eventDate = item.start.local;
    //             let eventURL = item.url;

    //             console.log(eventURL);

    //             //Create a div to display the gif in 
    //             // let gifDiv = 
    //             // `<div class="gif">
    //             //     <img src="${stillUrl}" class="gif-image" id="gif-image" data-still="${stillUrl}" data-moving="${movingUrl}" data-motion="0">
    //             //     <p>Rating: ${rating}</p>
    //             // </div>`;


    //             //Create a div to display the gif in 
    //             let gifDiv = 
    //             `<div class="gif">
    //                 <p>${eventName}</p>
    //                 <p>${eventDate}</p>
    //                 <p><a href="${eventURL}">Link</a></p>
    //             </div>`;

    //             // let gifDiv = 
    //             // `<div class="gif">
    //             //     <img src="${eventLogo}" class="gif-image" id="gif-image" data-motion="0">
    //             //     <p>${eventName}</p>
    //             //     <p>${eventDate}</p>
    //             //     <p><a href="${eventURL}">Link</a></p>
    //             // </div>`;


    //             //Append the div to the dom
    //             $("#images-display").prepend(gifDiv);

    //     });

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

    console.log(search + " was clicked");
    displayResults(search, type, localOffset);
});
