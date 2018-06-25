$(document).ready(function () {


    var myStuff = ["puppies", "dogs", "mini horses", "kittens", "ferrets", "baby goats", "baby animals", "tolkien", "harry potter", "star wars", "star trek", "galaxies", "hawaii", "beaches", "mountains", "stained glass", "fused glass", "art glass"]

    function makeButton() {
        for (i = 0; i < myStuff.length; i++) {
            $("#buttons").append('<button type="button" class="btn btn-default showGif">' + myStuff[i]);
        }
    }

    function makeGifs() {

        searchName = $(this).text();

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchName + "&limit=10&api_key=dc6zaTOxFJmzC"

        $.ajax({ url: queryURL, method: 'GET' })

            .done(function (response) {

                $("img").remove()

                for (i = 0; i < response.data.length; i++) {

                    var pic = $('<img class="still" id="' + i + '">')

                    $(pic).attr('src', response.data[i].images.fixed_height_still.url);

                    $(pic).attr('data-still', response.data[i].images.fixed_height_still.url);
                    $(pic).attr('data-move', response.data[i].images.fixed_height.url);

                    $('#gifsHere').append(pic)
                }


                $(document).on("click", ".still", function () {

                    $(this).attr("src", $(this).data("move"));

                    $(this).attr("class", "move");
                });


                $(document).on("click", ".move", function () {

                    $(this).attr("src", $(this).data("still"));

                    $(this).attr("class", "still");
                });
            });
    }

    function addButton() {

        var newItem = $("#text").val().trim().toLowerCase();

        var notWS = /\S/g;
        var chkAns = newItem.match(notWS);

        var exists = myStuff.indexOf(newItem);
        if (chkAns != null && exists == -1) {

            myStuff.push(newItem);

            $(".showGif").remove()

            makeButton();

            document.getElementById("newEntry").reset();

            return false;
        } else {
            return false;
        }
    }


    makeButton();

    $("#add").on("click", addButton);

    $(document).on("click", ".showGif", makeGifs);



});
