$(document).ready(function () {
    $('select').formSelect();
    renderFoodItems();
    let bmi;
    let recCal;
    let calRemaining;
    let type;
    
    $("#currentDay").text(moment().format('MMMM Do' + ',' + ' YYYY'));



    //function that calculates BMI based off weight and height
    $(".calculateBMI").on("click", function () {
        let weight = $("#weight").val();
        let weight2 = weight * 703;
        let feet = $("#feet").val() * 12;
        let inch = $("#inches").val() * 1;
        if (weight == "" || feet == "" || inch == "") {
            //hits if statement if they put 0 for inches, need to fix
            $(".yourBMI").text("Please Input a Number")
        }
        else {
            let height = feet + inch;
            bmi = weight2 / Math.pow(height, 2);
            bmi = Math.round(10 * bmi) / 10;
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


    //function that saves both inputs and appends it into a list, once the day is over, the day is saved into a tab
    $(".save").on("click", function () {
        //get value of inputs
        type = $(this).attr('data-type');
        // if(type="exercise"){
        //     const exercise = $("#exercise").val();
        //     const exerciseCalories = parseInt($('#exerciseC').val());
        //     if (exercise === "") {
        //         displayMessage("Input cannot be blank");
        //         setTimeout(function () {
        //             $(`#${type}Msg`).text("");
        //         }, 1500);
        //     } else if (exerciseCalories === "") {
        //         displayMessage("Calories cannot be blank");
        //         setTimeout(function () {
        //             $(`#${type}Msg`).text("");
        //         }, 1500);

        //     } else if (isNaN(exerciseCalories)) {
        //         console.log("2")
        //         displayMessage("Calories must be a number");
        //         setTimeout(function () {
        //             $(`#${type}Msg`).text("");
        //         }, 1500);
        //     } else {
        //         displayMessage("Saved successfully");
        //         setTimeout(function () {
        //             $(`#${type}Msg`).text("");
        //         }, 1500);
        //     }
        //     calRemaining = calRemaining + exerciseCalories;
        // }

        const inputFood = $(`#${type}`).val();
        const inputCalories = parseInt($(`#${type}B`).val());
        
        //change input box back into blanks
        $(`#${type}`).val("");
        $(`#${type}B`).val("");
        // $('#exercise').val("");
        // $('#exerciseC').val("");
        //makes sure inputs are not blank
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
            console.log("1")
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
            const currentMeal = JSON.parse(localStorage.getItem(type));
            if(!currentMeal) {
                const meals = [];
                const foodToSave = {};
                foodToSave.cal = inputCalories;
                foodToSave.food = inputFood;
                meals.push(foodToSave);
                localStorage.setItem(type, JSON.stringify(meals));
            } else {
                const foodToSave = {};
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

    
    $(".clear").on("click", function(){
        type = $(this).attr('data-type');
        localStorage.removeItem(type);
        $(`#${type}Names`).html("");
    
    
    })
});




//TODO
//exercise function that adds calories
//save date to localstorage
//upon clearing, reset the calories remaining
//create function that on new day, clears everything 