$(document).ready(function(){
  $('#multi').formSelect();
  $('#multi2').formSelect();
  let searchTerm = $("#searchTerm");
  let dietLabels = $("#dietLabels");
  let calories = $("#calories");
  let search = $("#search");
  // let queryURL;
  // let recipes =[];
  // if(dietLabels === "" & calories === "") {
  // queryURL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchTerm}&api-key=ghljWx2gGciRuW6nlEb5LqY50x1cDunD`;
  
  // }
  // else {
  
  // queryURL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchTerm}&Diet=${dietLabels}&calories=${calories}&api-key=ghljWx2gGciRuW6nlEb5LqY50x1cDunD`;
  // }
  // function createRow() {
  //   // Create a new table row element
  //   let tRow = $("<tr>");
  
  //   // Methods run on jQuery selectors return the selector they we run on
  //   // This is why we can create and save a reference to a td in the same statement we update its text
  
  //   let imageTd = $("<td>").text(response.hits[i].recipe.image);
  //   let qtyTd = $("<td>").text(response.hits[i].recipe.yield);
  //   let unitTd = $("<td>").text("servings");
  //   let titleTd = $("<td>").text(response.hits[i].recipe.label);
  //   let energyTd = $("<td>").text(response.hits[i].recipe.calories);
  //   let proteinLi = $("<li>").text(response.hits[i].recipe.totalNutrients.PROCNT.Math.floor(quantity));
  //   let carbsLi= $("<li>").text(response.hits[i].recipe.totalNutrients.CHOCDF.Math.floor(quantity));
  //   let fatLi= $("<li>").text(response.hits[i].recipe.totalNutrients.FAT.Math.floor(quantity));
  
  //   // Append the newly created table data to the table row
  //   tRow.append(imageTd, qtyTd, unitTd, titleTd, energyTd, proteinLi, carbsLi);
  //   // Append the table row to the table body
  //   $("tbody").append(tRow);
  // };
  // function searchRecipe() {
  //   debugger;
  //   search.on("click", function (event) {
  //     event.preventDefault();
  //     let searchKey = searchTerm.val().trim();
  //     console.log(searchKey);
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
  

});