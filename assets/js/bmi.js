$("#currentDay").text(moment().format('MMMM Do' + ',' + ' YYYY'));
renderFoodItems();
let bmi;
let recCal;
let calRemaining;
let type;
let inputFood;
let inputCalories;
let inputeExercise;
let midnight = "0:00:00"

// reset function
setInterval(function () {
    let now = moment().format("H:mm:ss");
    if (now === midnight) {
        localStorage.clear();
        renderFoodItems();
    }
}, 1000);

//function that calculates BMI based off weight and height
$(".calculateBMI").on("click", function () {
    let weight = $("#weight").val();
    let weight2 = weight * 703;
    let feet = $("#feet").val() * 12;
    let inch = $("#inches").val() * 1;
    if (isNaN(weight) || isNaN(feet)|| isNaN(inch)) {
        //hits if statement if they put 0 for inches, need to fix
        $(".yourBMI").text("Please Input a Number")
    }
    else {
        let height = feet + inch;
        bmi = weight2 / Math.pow(height, 2);
        bmi = Math.round(10 * bmi) / 10;
        // localStorage.setItem("bmi",bmi);
        $("#yourBMItext").text(bmi);
        $(".infoBMI").css("display", "block");
        //if statement that will display recommended calories on top of food diary section, based off user's bmi                 
        if (bmi < 18.5) {
            recCal = 2750;
        }
        if (bmi > 18.5 && bmi < 24.9) {
            recCal = 2500;
        }
        if (bmi > 24.9 && bmi < 29.9) {
            recCal = 2000;
        }
        if (bmi > 29.9) {
            recCal = 1500;
        }
        $("#recommended").text(`Your Recommended Calories per Day: ${recCal}`);
        calRemaining = recCal;
        $("#caloriesLeft").text(`Calories Remaining for Today: ${calRemaining}`);
    }
})

//displays message based off inputs
function displayMessage(message) {
    $(`#${type}Msg`).text(message);
}

//function that saves food input, appends to specific mealrow, and then subtracts calories to daily remaining
$(".save").on("click", function () {
    //get value of inputs
    type = $(this).attr('data-type');
    inputFood = $(`#${type}`).val();
    inputCalories = $(`#${type}B`).val();
    //change input box back into blanks
    $(`#${type}`).val("");
    $(`#${type}B`).val("");
    $('#exercise').val("");
    $('#exerciseC').val("");    
    //makes sure inputs are not blank
    if(bmi === undefined){
        displayMessage("Please input you BMI first.");
        setTimeout(function () {
            $(`#${type}Msg`).text("");
        }, 1500);
        return null
    }
    if (inputFood === "") {
        displayMessage("Input cannot be blank");
        setTimeout(function () {
            $(`#${type}Msg`).text("");
        }, 1500);
    } else if (inputCalories === "") {
        displayMessage("Calories cannot be blank");
        setTimeout(function () {
            $(`#${type}Msg`).text("");
        }, 1500);
    } else if (isNaN(inputCalories)) {
        displayMessage("Calories must be a number");
        setTimeout(function () {
            $(`#${type}Msg`).text("");
        }, 1500);
    } else {
        displayMessage("Saved successfully");
        setTimeout(function () {
            $(`#${type}Msg`).text("");
        }, 1500);
        // gets value and put into local storage
        let currentMeal = JSON.parse(localStorage.getItem(type));
        if(!currentMeal) {
            let meals = [];
            let foodToSave = {};
            foodToSave.cal = inputCalories;
            foodToSave.food = inputFood;
            meals.push(foodToSave);
            localStorage.setItem(type, JSON.stringify(meals));
        } else {
            let foodToSave = {};
            foodToSave.cal = inputCalories;
            foodToSave.food = inputFood;
            currentMeal.push(foodToSave);
            localStorage.setItem(type, JSON.stringify(currentMeal));
        }
        calRemaining = calRemaining - inputCalories;
        //updates calories remaining
        $("#caloriesLeft").text(`Calories Remaining for Today: ${calRemaining}`);
        ///get items in local storage
        renderFoodItems();
    }
})

//function that saves exercise input, appends to exercise row, and adds calories to daily remaining
$(".exerciseSave").on("click", function () {
    //get value of inputs
    type = "exercise"
    inputExercise = $(`#exercise`).val();
    inputCalories = $(`#exerciseC`).val();
    //change input box back into blanks
    $('#exercise').val("");
    $('#exerciseC').val("");
    //makes sure inputs are not blank
    if (inputExercise === "") {
        displayMessage("Input cannot be blank");
        setTimeout(function () {
            $(`#exerciseMsg`).text("");
        }, 1500);
    } else if (inputCalories === "") {
        displayMessage("Calories cannot be blank");
        setTimeout(function () {
            $(`#exerciseMsg`).text("");
        }, 1500);
    } else if (isNaN(inputCalories)) {
        displayMessage("Calories must be a number");
        setTimeout(function () {
            $(`#exerciseMsg`).text("");
        }, 1500);
    } else {
        displayMessage("Saved successfully");
        setTimeout(function () {
            $(`#exerciseMsg`).text("");
        }, 1500);
        // gets value and put into local storage
        let currentMeal = JSON.parse(localStorage.getItem(type));
        if(!currentMeal) {
            let meals = [];
            let foodToSave = {};
            foodToSave.cal = inputCalories;
            foodToSave.food = inputExercise;
            meals.push(foodToSave);
            localStorage.setItem(type, JSON.stringify(meals));
        } else {
            let foodToSave = {};
            foodToSave.cal = inputCalories;
            foodToSave.food = inputExercise;
            currentMeal.push(foodToSave);
            localStorage.setItem(type, JSON.stringify(currentMeal));
        }
        calRemaining = calRemaining + parseInt(inputCalories);
        //updates calories remaining
        $("#caloriesLeft").text(`Calories Remaining for Today: ${calRemaining}`);
        ///get items in local storage
        renderFoodItems();
    }
})

function renderFoodItems() {
    for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            const foods = JSON.parse(localStorage.getItem(key));
            $(`#${key}Names`).empty();
            foods.forEach(food => {
                let li = $("<li>").text(`${food.food}: ${food.cal} calories `);
                $(`#${key}Names`).append(li);
            })
        }
    }
}

$(".clear").on("click", clearMeal);
function clearMeal(){
    type = $(this).attr('data-type');
    localStorage.removeItem(type);
    $(`#${type}Names`).html("");
    renderFoodItems();
};
