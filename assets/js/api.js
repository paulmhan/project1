
$(document).ready(function () {
  $('#multi').formSelect();
  $('#multi2').formSelect();

  let searchTerm = $("#searchTerm");
  let dietOptions = $(".dietOptions");
  let dietLabels = $("#dietLabels");
  let calories = $("#calories");
  let search = $("#search");
  let searchResults = $("#searcResults");

  window.addEventListener("load", function () {
    searchResults.hide();
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

  search.on("click", function (event) {
    event.preventDefault();
    let searchKey = searchTerm.val().trim();
      let dietOptions = [];
      let dietOptionsChecked =  $(".dietOptions").children("option").filter(":selected").val();
      dietOptions.push(dietOptionsChecked);
      console.log(dietOptions);
    })
   
  })
    //   time = Object.entries(localStorage)[x][0];
    //   eventInfo = Object.entries(localStorage)[x][1];
    //   let eventDetails = $(`#eventDetails-${JSON.parse(time)}`);
    //   if (eventInfo !== null) {
    //     eventDetails.val(JSON.parse(eventInfo));



  // search.on("click", function (event) {
  //   event.preventDefault();
  //   let searchKey = searchTerm.val().trim();
  //   let dietOptions =  $(".dietOptions").children("option").filter(":selected").text()
  //   console.log(searchKey);
  //   console.log(dietOptions);
  //   searchResults.show();
  //   queryURL = `https://api.edamam.com/search?q=${searchKey}&diet=balanced&app_id=84612d9d&app_key=a9ac302b044be5faf802625e3e3dbf9a`;
  //   $.ajax({
  //     url: queryURL,
  //     method: "GET"
  //   }).then(function (response) {
  //     console.log(response);
  //     for (let i = 0; i < response.hits.length; i++) {
  //       createRow(response, i);
  //     }
  //   });

  


