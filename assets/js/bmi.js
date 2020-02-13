$(".calculateBMI").on("click",function(){
    let weight = $("#weight").val() * 703;
    let feet = $("#feet").val() * 12;
    let inch = $("#inches").val() * 1;
    let height = feet + inch;
    let bmi = weight/Math.pow(height,2);
    console.log(bmi);
    
    
})