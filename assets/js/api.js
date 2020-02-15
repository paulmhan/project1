
$(document).ready(function () {
  $('#multi').formSelect();
  $('#multi2').formSelect();

  let searchTerm = $("#searchTerm");
  let calories = $("#calories");
  let search = $("#search");
  let msg = $("#msg");
  let searchResults = $("#searcResults");
  let clearButton = $(".clearButton");
  let healthOptions = $(".healthOptions");
  let dietOptions = $(".dietOptions");

  $(window).on('load', function () {
    
});

  function createRow(response, i) {

    let tRow = $("<tr>");

    let imageUrl = response.hits[i].recipe.image;

    let recipeImage = $("<img>");

    let recipeImageLink = $("<a>");
    recipeImageLink.attr("href", response.hits[i].recipe.shareAs)
    recipeImage.attr({ "src": imageUrl, "alt": "recipe image", "width": 100, "height": 100 });

    let imageTd = $("<td>").append(recipeImageLink.append(recipeImage));
    let qtyTd = $("<td>").text(`${response.hits[i].recipe.yield} servings`);
    let titleTd = $("<td>").text(response.hits[i].recipe.label);
    let energyTd = $("<td>").text(Math.floor(response.hits[i].recipe.calories));
    let proteinLi = $("<li>").text(`Protein: ${Math.floor(response.hits[i].recipe.totalNutrients.PROCNT.quantity)}g`);
    let carbsLi = $("<li>").text(`Carbs: ${Math.floor(response.hits[i].recipe.totalNutrients.CHOCDF.quantity)}g`);
    let fatLi = $("<li>").text(`Fat: ${Math.floor(response.hits[i].recipe.totalNutrients.FAT.quantity)}g`);

    // Append the newly created table data to the table row
    tRow.append(imageTd, qtyTd, titleTd, energyTd, proteinLi, carbsLi, fatLi);
    // Append the table row to the table body
    $("tbody").append(tRow);
  };

  clearButton.on("click", function (event) {
    searchTerm.val("");
    healthOptions.val("");
    dietOptions.val("");
    msg.text("");
    msg.hide();
  });

  search.on("click", function (event) {
    event.preventDefault();
    let searchKey = searchTerm.val().trim();
    dietOptionsArray = [];
    $.each($(".dietOptions").children("option").filter(":selected"), function () {
      selectedDietOptions = this.value;
      dietOptionsArray.push(selectedDietOptions);
    });
    let dietKey = "";
    for (let i = 0; i < dietOptionsArray.length; i++) {
      dietKey += dietOptionsArray[i] + "&"
    }
    healthOptionsArray = [];
    $.each($(".healthOptions").children("option").filter(":selected"), function () {
      selectedHealthOptions = this.value;
      healthOptionsArray.push(selectedHealthOptions);
    });
    let healthKey = "";
    for (let i = 0; i < healthOptionsArray.length; i++) {
      healthKey += healthOptionsArray[i] + "&"
    }
    searchResults.css("display", "block");
    let corsUrl = "https://cors-anywhere.herokuapp.com/";
    let queryURL;
    if (searchKey === "") {
      msg.text("Search field cannot be empty!! Type the ingredient name to search for the recipes you are looking for.")
    }
    else if (dietKey === "" & healthKey === "") {

      queryURL = corsUrl + `https://api.edamam.com/search?q=${searchKey}&app_id=84612d9d&app_key=a9ac302b044be5faf802625e3e3dbf9a`;

    }
    else if (dietKey === "") {
      let queryURL = corsUrl + `https://api.edamam.com/search?q=${searchKey}&health=${healthKey}app_id=84612d9d&app_key=a9ac302b044be5faf802625e3e3dbf9a`;
    }
    else if (healthKey === "") {
      let queryURL = corsUrl + `https://api.edamam.com/search?q=${searchKey}&diet=${dietKey}app_id=84612d9d&app_key=a9ac302b044be5faf802625e3e3dbf9a`;
    }
    else {
      queryURL = corsUrl + `https://api.edamam.com/search?q=${searchKey}&diet=${dietKey}health=${healthKey}app_id=84612d9d&app_key=a9ac302b044be5faf802625e3e3dbf9a`;
    }
    console.log(queryURL);

    $.ajax({
      method: "GET",
      url: queryURL
      // Access-Control-Allow-Origin: "https://api.edamam.com"
    }).then(function (response) {
      console.log(response);
      for (let i = 0; i < response.hits.length; i++) {
        createRow(response, i);
      }
    }).catch(function (e) {
      console.log(e);
    })

  });
});

