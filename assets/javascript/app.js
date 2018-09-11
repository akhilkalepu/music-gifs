$(document).ready(function () {
// ------------------------Variables------------------------
var topics = ["dj", "guitar", "drums", "singer", "rapper", "synthesizer", "violin", "viola", "cello", "double bass", "trumpet", "saxaphone", "tuba", "french horn", "piano", "conductor"];

var searchTopic = "";

var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC";


// ------------------------Topic Buttons------------------------
topicBtns();

function topicBtns() {
    var i;
    for (i = 0; i < topics.length; i++) {
        $("#buttons-section").append('<button type="button" class="btn btn-dark topic-btn">' + topics[i] + '</button>')
    }
}

// ------------------------Add Button------------------------
$("#submitBtn").on("click", function() {
    var searchTopic = $("#searchbar").val();
    $("#buttons-section").empty();
    topics.push(searchTopic);
    topicBtns();
    alert(searchTopic);
});

function searchGiphy() {
    $.ajax({
        url: queryURL,
         method: "GET"
    }).then(function(response) {
        console.log(response);
    });
}

// ------------------------------------------------
});