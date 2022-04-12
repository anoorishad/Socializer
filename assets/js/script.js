let apiKey = "1ee7d026a8b341b5a9487d1138f04f25";
let numberofRecipes = 2;

let presentRecipe = [];
let theme = "BBQ"
let requestfoodRecipeURL;
let foodtype = ["sliders", "hamburger", "BBQ", "salad", "pizza", "cake", "sandwhich", "casserole", "pasta", "steak", "roast", "pancakes", "eggs", "frittata", "tacos", "thanksgiving", "dessert"]

let birthdayParty = [];
let engagementParty = [];
let BBQ = [];
let dateNight = [];
let babyShower = [];
let brunch = [];
let dinnerParty = [];
let thanksgiving = [];
let holiday = [];
let generalParty = [];

var submitBtn = $('#submitBtn');
var themeSelection = $('#eventFilter');
var alchSelection = $('#alchFilter');
var eventNameSelection = $('#eventNameInput');


submitBtn.on('click', function(){
   themeSelection = $('#eventFilter').val();
   alchSelection = $('#alchFilter').val();
   eventNameSelection = $('#eventNameInput').val();
   console.log(themeSelection + " " + alchSelection + " " + eventNameSelection);

})

// getRecipeData();

// dropdown initializer
$(document).ready(function () {
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
                // wait untill the array to fetch all the data
                if (idArray.length === foodtype.length) {
                    console.log(idArray)
                    // TODO: submit button
                    setRecipeforTheme(idArray, theme)


                }

            });
    }


}

function fetchURLfromID(myId) {
    requestfoodRecipeURL = "https://api.spoonacular.com/recipes/" + myId + "/information?apiKey=" + apiKey
    return fetch(requestfoodRecipeURL)
        .then(function (response) {
            console.log("response" + response)

            return response.json();
        })
        .then(function (data) {
            return data;
        });

}
// get the id's from the idArray for specefic meal
function getThemeRecipes(themeSelected, myidArray) {
    let selectedIds = [];
    for (let i = 0; i < myidArray.length; i++) {

        if (myidArray[i].name === themeSelected)
            selectedIds = myidArray[i];
    }
    return selectedIds;
}
// add the meal Recipe to the Theme 
// function setRecipeforTheme(myidArray, myTheme) {
//     // BBQ
//     if (myTheme === "BBQ") {
//         BBQ.push(getThemeRecipes("steak", myidArray))
//         BBQ.push(getThemeRecipes("hamburger", myidArray))
//         for (let i = 0; i < numberofRecipes; i++) {
//             presentRecipe = pickRecipe(BBQ);
//         }
//         getURL(presentRecipe);
//         console.log(presentRecipe)

//     }
// }
function getURL(myPresentRecipe) {
    let myData = "";
    // let recipesURL="urlishere"
    // for(let i=0;i<myPresentRecipe.length; i++){
    // console.log(myPresentRecipe[i].id)
    // myData=fetchURLfromID(myPresentRecipe[i].id)
    // while(!myData){

    // }

    ////////
    console.log(myPresentRecipe.length)
    myPresentRecipe.forEach(async function (currentItem) {
        myData = await fetchURLfromID(currentItem.id)
        console.log("hiiii"+myPresentRecipe.length)
        console.log(myData)
        // myPresentRecipe[i].URL = myData.sourceUrl;
    })

    ///////
    // console.log(myData)
    //  myPresentRecipe[i].URL=myData.sourceUrl;

    // console.log(myPresentRecipe[i])
}

// }
function pickRecipe(myRecepieArray) {
    let randomIndex;
    var numbers = [];

    for (let i = 0; i < myRecepieArray.length; i++) {
        do {

            randomIndex = Math.floor(Math.random() * myRecepieArray[i].idRecipe.length);
        } while (numbers.includes(randomIndex));
        numbers.push(randomIndex);
        presentRecipe.push(myRecepieArray[i].idRecipe[randomIndex])

    }
    return presentRecipe;
    // ///////
    // var numbers = [];
    // var randomnumber;
    // do {
    //     randomnumber = Math.floor(Math.random() * 999999) + 100000;
    // } while (numbers.includes(randomnumber));
    // numbers.push(randomnumber);

    //////////
}
// TODO: creat all the Theme and food for it 

function setRecipeforTheme(myidArray, myTheme) {

    if (myTheme === "BBQ") {
        BBQ.push(getThemeRecipes("sliders", myidArray))
        BBQ.push(getThemeRecipes("hamburger", myidArray))
        BBQ.push(getThemeRecipes("BBQ", myidArray))
        BBQ.push(getThemeRecipes("salad", myidArray))
        for (let i = 0; i < numberofRecipes; i++) {
            presentRecipe = pickRecipe(BBQ);
        }
        getURL(presentRecipe);
        console.log(BBQ);
    }
    if (myTheme === "birthdayParty") {
        birthdayParty.push(getThemeRecipes("sliders", myidArray))
        birthdayParty.push(getThemeRecipes("pizza", myidArray))
        birthdayParty.push(getThemeRecipes("cake", myidArray))
        birthdayParty.push(getThemeRecipes("salad", myidArray))
        for (let i = 0; i < numberofRecipes; i++) {
            presentRecipe = pickRecipe(birthdayParty);
        }
        getURL(presentRecipe);
        console.log(birthdayParty);
    }
    if (myTheme === "engagementParty") {
        engagementParty.push(getThemeRecipes("sandwich", myidArray))
        engagementParty.push(getThemeRecipes("salad", myidArray))
        engagementParty.push(getThemeRecipes("cake", myidArray))
        engagementParty.push(getThemeRecipes("casserole", myidArray))
        for (let i = 0; i < numberofRecipes; i++) {
            presentRecipe = pickRecipe(engagementParty);
        }
        getURL(presentRecipe);
        console.log(engagementParty);
    }
    if (myTheme === "dateNight") {
        dateNight.push(getThemeRecipes("pasta", myidArray))
        dateNight.push(getThemeRecipes("salad", myidArray))
        dateNight.push(getThemeRecipes("steak", myidArray))
        dateNight.push(getThemeRecipes("roast", myidArray))
        for (let i = 0; i < numberofRecipes; i++) {
            presentRecipe = pickRecipe(dateNight);
        }
        getURL(presentRecipe);
        console.log(dateNight);
    }
    if (myTheme === "babyShower") {
        babyShower.push(getThemeRecipes("sandwhich", myidArray))
        babyShower.push(getThemeRecipes("salad", myidArray))
        babyShower.push(getThemeRecipes("steak", myidArray))
        babyShower.push(getThemeRecipes("roast", myidArray))
        for (let i = 0; i < numberofRecipes; i++) {
            presentRecipe = pickRecipe(babyShower);
        }
        getURL(presentRecipe);
        console.log(babyShower);
    }
    if (myTheme === "brunch") {
        brunch.push(getThemeRecipes("pancakes", myidArray))
        brunch.push(getThemeRecipes("eggs", myidArray))
        brunch.push(getThemeRecipes("frittata", myidArray))
        brunch.push(getThemeRecipes("salad", myidArray))
        for (let i = 0; i < numberofRecipes; i++) {
            presentRecipe = pickRecipe(brunch);
        }
        getURL(presentRecipe);
        console.log(brunch);
    }
    if (myTheme === "dinnerParty") {
        dinnerParty.push(getThemeRecipes("steak", myidArray))
        dinnerParty.push(getThemeRecipes("salad", myidArray))
        dinnerParty.push(getThemeRecipes("pasta", myidArray))
        dinnerParty.push(getThemeRecipes("tacos", myidArray))
        for (let i = 0; i < numberofRecipes; i++) {
            presentRecipe = pickRecipe(dinnerParty);
        }
        getURL(presentRecipe);
        console.log(dinnerParty);
    }
    if (myTheme === "thanksgiving") {
        thanksgiving.push(getThemeRecipes("casserole", myidArray))
        thanksgiving.push(getThemeRecipes("thanksgiving", myidArray))
        thanksgiving.push(getThemeRecipes("roast", myidArray))
        thanksgiving.push(getThemeRecipes("dessert", myidArray))
        for (let i = 0; i < numberofRecipes; i++) {
            presentRecipe = pickRecipe(thanksgiving);
        }
        getURL(presentRecipe);
        console.log(thanksgiving);
    }
    if (myTheme === "holiday") {
        holiday.push(getThemeRecipes("casserole", myidArray))
        holiday.push(getThemeRecipes("salad", myidArray))
        holiday.push(getThemeRecipes("roast", myidArray))
        holiday.push(getThemeRecipes("dessert", myidArray))
        for (let i = 0; i < numberofRecipes; i++) {
            presentRecipe = pickRecipe(holiday);
        }
        getURL(presentRecipe);
        console.log(holiday);
    }
    if (myTheme === "generalParty") {
        generalParty.push(getThemeRecipes("pasta", myidArray))
        generalParty.push(getThemeRecipes("pizza", myidArray))
        generalParty.push(getThemeRecipes("tacos", myidArray))
        generalParty.push(getThemeRecipes("roast", myidArray))
        for (let i = 0; i < numberofRecipes; i++) {
            presentRecipe = pickRecipe(generalParty);
        }
        getURL(presentRecipe);
        console.log(generalParty);
    }

}

