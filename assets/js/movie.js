$(document).ready(function () {
    function movieSelected() {    
        window.location.href = 'movieResults.html';
        return false;
    };

    $(document).on("click", ".movieDetails", function (event) {
        let id = $(this).attr("data-id");
        sessionStorage.setItem('movieId', id);
        movieSelected();
    });

    $("#searchMovie").on("click", function (event) {
        event.preventDefault();
        $('#movies').show();
        let searchText = $("#searchText").val().trim();
        getMovies(searchText);
    });

    $(".clearButton").on("click", function (event) {
        $("#searchText").val("");
        $('#movies').empty();
        $('#msg').empty();
       
      });
    let moviesDiv = $("#movies");
    
    function getMovies(searchText) {
        let corsUrl = `https://cors-anywhere.herokuapp.com/`;
        let queryURL = corsUrl + `https://www.omdbapi.com/?s=${searchText}&apikey=trilogy`;
        // Creating an AJAX call when search button is being clicked
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            if (response.Response === "False") {
                $("#msg").text("Sorry! No movies found! Try searching for a specific movie");
            }
            let output = '';
            for (let i = 0; i < response.Search.length; i++) {
                let id = response.Search[i].imdbID
                output += `
            <div class = "col s3">
              <div class = "center">
                    <img src = "${response.Search[i].Poster}" width="100%"></img>
                    <p><strong>${response.Search[i].Title}<strong></p>
                    <a data-id= ${id} class ="btn btn-light movieDetails" href = '#'>Movie Details</a>
               </div>
             </div>
              `;
            }
            moviesDiv.html(output);
        });
    }
});