
$(document).ready(function () {
  $('#multi').formSelect();
  $('#multi2').formSelect();
  // Create all the elements
  let searchTerm = $("#searchTerm");
  let inputFields = $(".input-fields");
  let calories = $("#calories");
  let search = $("#search");
  let msg = $("#msg");
  let searchResults = $("#searcResults");
  let clearButton = $(".clearButton");
  let healthOptions = $(".healthOptions");
  let dietOptions = $(".dietOptions");
  // on window load, remove the search results div
  $(window).on('load', function () {
    // $('#searchResults').remove();
  });
  // function to create rows for the recipe search results based on the response
  function createRow(response, i) {
    let tRow = $("<tr>");
    let imageUrl = response.hits[i].recipe.image;
    let recipeImage = $("<img>");
    let recipeImageLink = $("<a>");
    recipeImageLink.attr({"href": response.hits[i].recipe.shareAs, "target":"_blank"});
    recipeImage.attr({ "src": imageUrl, "alt": "recipe image", "width": 100, "height": 100 });
    let imageTd = $("<td>").append(recipeImageLink.append(recipeImage));
    let qtyTd = $("<td>").text(`${response.hits[i].recipe.yield} servings`);
    let titleTd = $("<td>").text(response.hits[i].recipe.label);
    let energyTd = $("<td>").text(Math.floor(response.hits[i].recipe.calories));
    let proteinLi = $("<li>").text(`Protein: ${Math.floor(response.hits[i].recipe.totalNutrients.PROCNT.quantity)}g`);
    let carbsLi = $("<li>").text(`Carbs: ${Math.floor(response.hits[i].recipe.totalNutrients.CHOCDF.quantity)}g`);
    let fatLi = $("<li>").text(`Fat: ${Math.floor(response.hits[i].recipe.totalNutrients.FAT.quantity)}g`);
    let sugarsLi = $("<li>").text(`Sugars: ${Math.floor(response.hits[i].recipe.totalNutrients.SUGAR.quantity)}g`);
    let fiberLi = $("<li>").text(`Fiber: ${Math.floor(response.hits[i].recipe.totalNutrients.FIBTG.quantity)}g`);

    // Append the newly created table data to the table row
    tRow.append(imageTd, qtyTd, titleTd, energyTd, proteinLi, carbsLi, fatLi, sugarsLi, fiberLi);
    // Append the table row to the table body
    $("tbody").append(tRow);
  };
  // on clicking the clear search results button, empty the search results, empty the message div and remove, clear all the input fields


  clearButton.on("click", function (event) {
    $('#input-fields').show();
    $('#searchResults').empty();
    $('#searchResults').remove();
    $('#searchTerm').val("");
    $('#msg').empty();
    $('#msg').remove();
    $('.select-dropdown').val('');
  });

  // function to execute on clicking the search button
  search.on("click", function (event) {
    event.preventDefault();
    $('#searchResults').show();
    // get the value of the search keyword entered
    let searchKey = searchTerm.val().trim();
    // get the value of the diet options selected
    dietOptionsArray = [];
    $.each($(".dietOptions").children("option").filter(":selected"), function () {
      selectedDietOptions = this.value;
      dietOptionsArray.push(selectedDietOptions);
    });
    let dietKey = "";
    for (let i = 0; i < dietOptionsArray.length; i++) {
      dietKey += dietOptionsArray[i] + "&"
    }
    // get the value of the health options selected
    healthOptionsArray = [];
    $.each($(".healthOptions").children("option").filter(":selected"), function () {
      selectedHealthOptions = this.value;
      healthOptionsArray.push(selectedHealthOptions);
    });
    let healthKey = "";
    for (let i = 0; i < healthOptionsArray.length; i++) {
      healthKey += healthOptionsArray[i] + "&"
    }
    let corsUrl = "https://cors-anywhere.herokuapp.com/";
    let queryURL;
    if (searchKey === "") {
      msg.text("You did not enter any search word!! Type the ingredient name to search for the recipes you are looking for.")
    }
    if (dietKey === '' && healthKey === '') {
      queryURL = corsUrl + `https://api.edamam.com/search?q=${searchKey}&app_id=84612d9d&app_key=a9ac302b044be5faf802625e3e3dbf9a`;
    } else if (dietKey === '' && !!healthKey) {
      queryURL = corsUrl + `https://api.edamam.com/search?q=${searchKey}&health=${healthKey}app_id=84612d9d&app_key=a9ac302b044be5faf802625e3e3dbf9a`;
    } else if (!!dietKey && healthKey === '') {
      queryURL = corsUrl + `https://api.edamam.com/search?q=${searchKey}&diet=${dietKey}app_id=84612d9d&app_key=a9ac302b044be5faf802625e3e3dbf9a`;
    } else {
      queryURL = corsUrl + `https://api.edamam.com/search?q=${searchKey}&diet=${dietKey}health=${healthKey}app_id=84612d9d&app_key=a9ac302b044be5faf802625e3e3dbf9a`;
    }

    console.log(queryURL);

    $.ajax({
      method: "GET",
      url: queryURL
    }).then(function (response) {
      console.log(response);
      if (response.hits.length === 0) {
        msg.text("Sorry! No recipes found. Try specific ingredient names such as tomato, garlic, chicken etc");
      }
      for (let i = 0; i < response.hits.length; i++) {
        createRow(response, i);
      }
    });

  });
});

