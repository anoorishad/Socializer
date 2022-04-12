let apiKey = "fa268d1621ac4a24bea0212fb0c93108";
let foodtype = ["sliders", "hamburger", "BBQ", "salad", "pizza", "cake", "sandwhich", "casserole", "pasta", "steak", "roast", "pancakes", "eggs", "frittata", "tacos", "thanksgiving", "dessert"]

let birthdayParty = [];
let engagementParty = [];
let BBQ = [];
let dateNight = [];
let babyShower = [];
let brunch = [];
let dinnerParty =[];
let thanksgiving = [];
let holiday = [];
let generalParty = [];

let theam = "BBQ"
let requestUrlfoodRecipeIds;
getRecipeData();

// dropdown initializer
$(document).ready(function(){
    $('select').formSelect();
  });


// fetching data from https://spoonacular.com/food-api/ 
function getRecipeData() {
    let idArray = [];
    for (let i = 0; i < foodtype.length; i++) {        
        requestUrlfoodRecipeIds = "https://api.spoonacular.com/recipes/complexSearch?query=" + foodtype[i] + "&apiKey=" + apiKey
        fetch(requestUrlfoodRecipeIds)
            .then(function (response) {
                console.log("response" + response)

                return response.json();
            })
            .then(function (data) {
                let food = {
                    name: foodtype[i],
                    idRecipe: data.results
                }

              
                idArray.push(food);
                if (idArray.length === foodtype.length) {
                    console.log(idArray)
                    setRecipeforTheam(idArray)
                    
                }

            });
    }


}
// geth the id's from the idArray for specefic meal
function getTheamRecipes(theamSelected, myidArray) {
    let selectedIds = [];
    for (let i = 0; i < myidArray.length; i++) {

        if (myidArray[i].name === theamSelected)
            selectedIds = myidArray[i];
    }
    return selectedIds;
}

function setRecipeforTheam(myidArray) {

    if (theam === "BBQ") {
        BBQ.push(getTheamRecipes("sliders", myidArray))
        BBQ.push(getTheamRecipes("hamburger", myidArray))
        BBQ.push(getTheamRecipes("BBQ", myidArray))
        BBQ.push(getTheamRecipes("salad", myidArray))
        console.log(BBQ);
    }
    if (theam === "birthdayParty") {
        birthdayParty.push(getTheamRecipes("sliders", myidArray))
        birthdayParty.push(getTheamRecipes("pizza", myidArray))
        birthdayParty.push(getTheamRecipes("cake", myidArray))
        birthdayParty.push(getTheamRecipes("salad", myidArray))
        console.log(birthdayParty);
    }
    if (theam === "engagementParty") {
        engagementParty.push(getTheamRecipes("sandwich", myidArray))
        engagementParty.push(getTheamRecipes("salad", myidArray))
        engagementParty.push(getTheamRecipes("cake", myidArray))
        engagementParty.push(getTheamRecipes("casserole", myidArray))
        console.log(engagementParty);
    }
    if (theam === "dateNight") {
        dateNight.push(getTheamRecipes("pasta", myidArray))
        dateNight.push(getTheamRecipes("salad", myidArray))
        dateNight.push(getTheamRecipes("steak", myidArray))
        dateNight.push(getTheamRecipes("roast", myidArray))
        console.log(dateNight);
    }
    if (theam === "babyShower") {
        babyShower.push(getTheamRecipes("sandwhich", myidArray))
        babyShower.push(getTheamRecipes("salad", myidArray))
        babyShower.push(getTheamRecipes("steak", myidArray))
        babyShower.push(getTheamRecipes("roast", myidArray))
        console.log(babyShower);
    }
    if (theam === "brunch") {
        brunch.push(getTheamRecipes("pancakes", myidArray))
        brunch.push(getTheamRecipes("eggs", myidArray))
        brunch.push(getTheamRecipes("frittata", myidArray))
        brunch.push(getTheamRecipes("salad", myidArray))
        console.log(brunch);
    }
    if (theam === "dinnerParty") {
        dinnerParty.push(getTheamRecipes("steak", myidArray))
        dinnerParty.push(getTheamRecipes("salad", myidArray))
        dinnerParty.push(getTheamRecipes("pasta", myidArray))
        dinnerParty.push(getTheamRecipes("tacos", myidArray))
        console.log(dinnerParty);
    }
    if (theam === "thanksgiving") {
        thanksgiving.push(getTheamRecipes("casserole", myidArray))
        thanksgiving.push(getTheamRecipes("thanksgiving", myidArray))
        thanksgiving.push(getTheamRecipes("roast", myidArray))
        thanksgiving.push(getTheamRecipes("dessert", myidArray))
        console.log(thanksgiving);
    }
    if (theam === "holiday") {
        holiday.push(getTheamRecipes("casserole", myidArray))
        holiday.push(getTheamRecipes("salad", myidArray))
        holiday.push(getTheamRecipes("roast", myidArray))
        holiday.push(getTheamRecipes("dessert", myidArray))
        console.log(holiday);
    }
    if (theam === "generalParty") {
        generalParty.push(getTheamRecipes("pasta", myidArray))
        generalParty.push(getTheamRecipes("pizza", myidArray))
        generalParty.push(getTheamRecipes("tacos", myidArray))
        generalParty.push(getTheamRecipes("roast", myidArray))
            console.log(generalParty);
    }
    
}

