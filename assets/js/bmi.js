let bmi;
let recCalories;

$(".calculateBMI").on("click",function(){
    let weight = $("#weight").val();
    let weight2 = weight*703;
    let feet = $("#feet").val() * 12;
    let inch = $("#inches").val() * 1;
    if(weight == "" || feet == "" || inch == ""){
        $(".yourBMI").text("Please Input a Number")
    }
    else{
        let height = feet + inch;
        bmi = weight2/Math.pow(height,2);
        bmi = Math.round(10*bmi)/10;
        $(".yourBMI").text(bmi);
        $(".infoBMI").css("display", "block");
    }
})

function recomendedCalories(){
    if(bmi<18.5){
        recCalories = 
    }
}