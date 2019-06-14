let debug=false;

//VARIABLES
let citiesList = ["san diego", "new york", "los angeles", "chicago", "san francisco", "miami", "seattle", "nashville", "dallas", "austin", "boston", "portland","denver"];
let searchTermsList = ["fest", "festival", "wine"];
let currentSearch = ''; //To update with current search term
let appendURL = '';

//Start the App
displayButtons();


//**** FUNCTIONS ****//
function displayButtons(){

    //Clear out the buttons to start
    $('#locations-buttons-list').empty();
    $('#search-terms-buttons-list').empty();

    citiesList.forEach(function(item){
        //Create the button for each array item and add to the button list 
        let button = `<button data-name="${item}" data-type="&location.address=" class="tag-button">${item}</button>`;
        $('#locations-buttons-list').append(button);
    })

    searchTermsList.forEach(function(item){
        //Create the button for each array item and add to the button list 
        let button = `<button data-name="${item}" data-type="&q="class="tag-button">${item}</button>`;
        $('#search-terms-buttons-list').append(button);
    })

};

function displayResults(appendURL, page){


    // Empty out the images div and replace after API call
    // if(!page){ $('#images-display').empty(); };
    $('#events-display').empty();
    $('#show-more').empty();

    //Add the page to the URL
    appendURL = appendURL + `&page=${page}`;
    console.log("APPEND URL W/ " + appendURL);

    //TODO: To add date after certain time, then use the following format: &start_date.range_start=2019-06-20T00:00:00
    // }

    //Make API call to display results of search query
    $.ajax({
        method: "GET",
        url: "/scrape/" + appendURL
      })
    .then(function(data) {

        //TODO: Add pagniation here, assume the first time they make a request, it will be page 1

        // Update pagination accorinding to what the user clicked
        updatePagination(page);


        //Flag if debug mode is on
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

        //Loop through resulting events and display them on the page
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

function updatePagination(page){

    //TODO: Dynamically figure out how many pages are left depending on the search results

    //Convert the page into an integer to dynamically update the different pages
    page = parseInt(page);

    //TODO get the left/right arrows working correctly

    let paginationDiv = 
    `<ul class="pagination">
        <li class="disabled"><a href="#!"><i class="material-icons">chevron_left</i></a></li>
        <li class="active" data-page=${page}><a href="#!">${page}</a></li>
        <li class="waves-effect pagination-button" data-page=${page+1}><a href="#!">${page+1}</a></li>
        <li class="waves-effect pagination-button" data-page=${page+2} ><a href="#!">${page+2}</a></li>
        <li class="waves-effect pagination-button" data-page=${page+3}><a href="#!">${page+3}</a></li>
        <li class="waves-effect pagination-button" data-page=${page+4}><a href="#!">${page+4}</a></li>
        <li class="waves-effect"><a href="#!"><i class="material-icons">chevron_right</i></a></li>
    </ul>`;

    $("#pagination-container").empty();
    $("#pagination-container").append(paginationDiv);

    
}


//**** CLICK HANDLERS ****//
$(document).on("click", ".tag-button", function(){

    //When a button is clicked, we want to add it to our list of search criterias
    console.log($(this).attr("data-name") + " was clicked");

    //Create a new button with same indentical info to list all the different tags
    let newButton = `<button data-name="${$(this).attr("data-name")}" data-type="${$(this).attr("data-type")} class="button">${$(this).attr("data-name")}</button>`;

    //Add it to the list of search terms to display
    $('#search-term-list').append(newButton);

    //Add it to the global search terms as a string, treat page separately 
    appendURL+= $(this).attr("data-type") + $(this).attr("data-name"); 
    // console.log("AppendURL: " + appendURL);

});

$(document).on("click", ".pagination-button", function(){
    console.log("Button clicked");
    console.log( $(this).attr("data-page"));

    displayResults(appendURL, $(this).attr("data-page"));
    
})

$(document).on("click", ".submit-button", function(){

    console.log("clicked submit");
    let page = 1;

    displayResults(appendURL, page);

} )
