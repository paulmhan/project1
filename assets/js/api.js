$(document).ready(function () {
  $('#multi').formSelect();
  $('#multi2').formSelect();
  let searchTerm = $("#searchTerm");
  let dietLabels = $("#dietLabels");
  let calories = $("#calories");
  let search = $("#search");

  queryURL = `https://api.edamam.com/search?q=chicken&app_id=84612d9d&app_key=a9ac302b044be5faf802625e3e3dbf9a`;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    console.log(response.hits.length);
    for (let i = 0; i < response.hits.length; i++) {
      console.log(response.hits[i].recipe.label);
      console.log(response.hits[i].recipe.shareAs);
      // createRow(response);
    }
  });
  search.on("click", function (event) {
    event.preventDefault();
    let searchKey = searchTerm.val().trim();
    console.log(searchKey);
    // searchRecipe(searchKey);

  })


  let searchTerm = $("#searchTerm");
  let dietLabels = $("#dietLabels");
  let calories = $("#calories");
  let search = $("#search");

  function createRow(response, i) {
    // Create a new table row element
    let tRow = $("<tr>");

    // Methods run on jQuery selectors return the selector they we run on
    // This is why we can create and save a reference to a td in the same statement we update its text

    let imageUrl = response.hits[i].recipe.image;
    // Creating and storing an image tag
    let recipeImage = $("<img>");
    // Setting the catImage src attribute to imageUrl
    // recipeImage.attr("src", imageUrl);
    // recipeImage.attr("alt", "recipe image");
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

  search.on("click", function (event) {
    event.preventDefault();
    let searchKey = searchTerm.val().trim();
    console.log(searchKey);
    queryURL = `https://api.edamam.com/search?q=${searchKey}&app_id=84612d9d&app_key=a9ac302b044be5faf802625e3e3dbf9a`;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      console.log(response);
      for (let i = 0; i < response.hits.length; i++) {
        createRow(response, i);
      }
    });

  });

});
