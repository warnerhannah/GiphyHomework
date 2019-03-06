var emotions = ["happy", "sad", "angry", "crying", "yelling", "confused", "cheering", "dancing"];

// ADDING AND CREATING THE BUTTONS
addButton();

function addButton() {
    $("#buttonsDiv").empty();

    for (var i = 0; i < emotions.length; i++) {
        var btn = $("<button>");
        btn.addClass("emo");
        btn.text(emotions[i]);
        $("#buttonsDiv").append(btn);
    }
}

$("#add-topic").on("click", function (event) {
    event.preventDefault();
    var emotion = $("#topic").val().trim();


    if (!emotion) {
        alert("Please enter a value!")
    }
    else {
        emotions.push(emotion);
        addButton();
        console.log(emotions);
        var emotion = $("#topic-input").val(" ");
    };
});


// ADDRESSING GIFS WHEN BUTTONS ARE CLICKED
$(document.body).on("click", ".emo", function() {
    var newEmotion = $(this).html();
    console.log(newEmotion);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + newEmotion + "&api_key=FYiEZ4X5RrEu8Xb5N8IgGtKXmKyBYzwQ&limit=15"
    $("#gifsDiv").empty();

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        for (i = 0; i < 15; i++) {
            var newNewDiv = $("<div id='newnewdiv'>");

            var ratingP = $("<p>");
            ratingP.text("Rating: " + response.data[i].rating);
            newNewDiv.append(ratingP);

            var actualGif = $("<img data-state='static' class='gif'>");
            var staticURL = response.data[i].images.fixed_height_still.url;
            actualGif.attr("data-static", staticURL);
            var animateURL = response.data[i].images.original.url;
            actualGif.attr("data-animate", animateURL);
            actualGif.attr("src", staticURL);
            newNewDiv.append(actualGif);

            $("#gifsDiv").append(newNewDiv);
        }
    });
});

// AJAX AND API
function displayGifs() {
    // var newEmotion = $(this).html();
    // console.log(newEmotion);
    // var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + newEmotion + "&api_key=FYiEZ4X5RrEu8Xb5N8IgGtKXmKyBYzwQ&limit=15"

    // $.ajax({
    //     url: queryURL,
    //     method: "GET"
    // }).then(function (response) {
    //     console.log(response);

    //     for (i = 0; i < 15; i++) {
    //         var newNewDiv = $("<div id='newnewdiv'>");

    //         var ratingP = $("<p>");
    //         ratingP.text("Rating: " + response.data[i].rating);
    //         newNewDiv.append(ratingP);

    //         var actualGif = $("<img data-state='static' class='gif'>");
    //         var staticURL = response.data[i].images.fixed_height_still.url;
    //         actualGif.attr("data-static", staticURL);
    //         var animateURL = response.data[i].images.original.url;
    //         actualGif.attr("data-animate", animateURL);
    //         actualGif.attr("src", staticURL);
    //         newNewDiv.append(actualGif);

    //         $("#gifsDiv").append(newNewDiv);
    //     }
    // });
};

// WHEN CLICK ON IMAGE
$(document.body).on("click", ".gif", function() {
    var state = $(this).attr("data-state");
    console.log(state);
    var animateUrl = $(this).attr("data-animate");
    console.log(animateUrl);
    var staticURL = $(this).attr("data-static");
    if (state === "static") {
        $(this).attr("data-state", "animate");
        var animateUrl = $(this).attr("data-animate");
        $(this).attr("src", animateUrl);
    }
    //CHANGE FROM ANIMATED TO STATIC
    else {
        $(this).attr("data-state", "static");
        $(this).attr("src", staticURL);
    };
});


//my key: FYiEZ4X5RrEu8Xb5N8IgGtKXmKyBYzwQ
//&limit=15
// STILL IMAGE = response.data[i].fixed_height.url
// ANIMATED IMAGE = response.data[i].url