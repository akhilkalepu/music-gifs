$(document).ready(function () {
// ------------------------Variables------------------------
    var topics = ["dj", "guitar", "bass guitar", "drums", "singer", "rapper", "synthesizer", "violin", "viola", "cello", "double bass", "trumpet", "saxaphone", "tuba", "french horn", "piano", "conductor"];

    var searchTopic;
    var queryURL;

// ------------------------Topic Buttons------------------------
    topicBtns();

    function topicBtns() {
        var i;
        for (i = 0; i < topics.length; i++) {
            $("#buttons-section").append("<button type='button' class='btn btn-dark topic-btn'>" + topics[i] + "</button>");
        };
    };

// ------------------------Add Button NEW BUTTONS DON'T WORK, IF I ADD A SINGLE BUTTON INSTEAD OF REPLACING ALL OF THEM FROM THE ARRAY, THE ONE BUTTON DOESN'T WORK------------------------
    

    $("#submitBtn").on("click", function(event) {
        event.preventDefault();
        if ($("#searchbar").val() === "") {
        } else {
            $("#buttons-section").empty();
            topics.push($("#searchbar").val());
            topicBtns();
            console.log(topics);
            $("#searchbar").val("");
        }
    });

    $(".topic-btn").on("click", function(event) {
        event.preventDefault();
        var searchTopic = $(this).text();

        console.log(searchTopic);
        $("#gifs-section").text("");

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTopic + "&api_key=4mGgh7cGdcUmQKJk0fJ5K3u5jM49kjTM&limit=10"
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function(response) {
                var results = response.data;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].rating !== "r") {
                        var gifDiv = $("<div>");

                        var rating = results[i].rating;
                        var p = $("<p>").text("Rating: " + rating);
                        var gifElement = $("<img>");
                        
                        gifElement.attr("data-state", "still");
                        gifElement.attr("src", results[i].images.fixed_height.url);
                        gifElement.attr("data-still", results[i].images.fixed_height.url);
                        gifElement.attr("data-animate", results[i].images.fixed_height.url);

                        gifElement.attr("alt", searchTopic);
                        gifElement.attr("class", "gif");

                        gifDiv.append(p);
                        gifDiv.append(gifElement);
                        $("#gifs-section").prepend(gifDiv);
                    };
                };
            });
    });

// ------------------------Gif Pause DOESN'T WORK, CAN'T FIGURE OUT WHY, DOESN'T LOAD ON PAUSE EITHER------------------------
    $(".gif").on("click", function (event) {
        event.preventDefault();
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

// ------------------------------------------------
});