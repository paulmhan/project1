let bmi;
let recCal;
let calRemaining;
$("#currentDay").text(moment().format('MMMM Do YYYY'));


//function that calculates BMI based off weight and height
$(".calculateBMI").on("click",function(){
    let weight = $("#weight").val();
    let weight2 = weight*703;
    let feet = $("#feet").val() * 12;
    let inch = $("#inches").val() * 1;
    if(weight == "" || feet == "" || inch == ""){
        //hits if statement if they put 0 for inches, need to fix
        $(".yourBMI").text("Please Input a Number")
    }
    else{
        let height = feet + inch;
        bmi = weight2/Math.pow(height,2);
        bmi = Math.round(10*bmi)/10;
        $(".yourBMI").text(bmi);
        $(".infoBMI").css("display", "block");
        //if statement that will display recommended calories on top of food diary section, based off user's bmi                 
        if(bmi<18.5){
            recCal = 2750;
        }
        if(bmi>18.5 && bmi<24.9){
            recCal = 2500;
        }
        if(bmi>24.9 && bmi < 29.9){
            recCal = 2000;
        }
        if(bmi>29.9){
            recCal=1500;
        }
        //need to fix previous recommended from appearing
        $("#recommended").text(`Your Recommended Calories per Day: ${recCal}`);
        calRemaining = recCal;
        console.log(calRemaining);
        $("#caloriesLeft").text(`Calories Remaining for Today: ${calRemaining}`);
        }
    })

    //function that saves both inputs and appends it into a list, once the day is over, the day is saved into a tab
    $(".save").on("click",function(){
        let calObject={};
        //get value of inputs
        let foodB = $("#breakfast").val().trim();
        let calB = $("#caloriesB").val().trim();
        //gets value and put into object with key foodB and value calB
        
        //append the object in list format

        //save to local storage so it doesnt go away


    })
    

