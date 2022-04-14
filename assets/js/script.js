let apiKey = "21365b6c3a364bcfaf6a0a422fdff0cf";
let numberofRecipes = 8;
let foodContainerDiv = $(".food-container");
let bevContainerDiv = $("#bev-container");
let presentRecipe = [];
let theme = "BBQ"
let requestfoodRecipeURL;
let requestBevURL;
var bevSelectedIds = [];
let foodtype = ["sliders", "hamburger", "BBQ", "salad", "pizza", "cake", "sandwhich",
    "casserole", "pasta", "steak", "roast", "pancakes", "eggs",
    "frittata", "tacos", "thanksgiving", "dessert"]


let bevBirthdayParty = [
    ['15086', '11002', '17255', '178368'],
    ['12786', '12864', '13036', '12654']
];
let bevEngagementParty = [
    ['11227', '17255', '15024', '17210'],
    ['12786', '13036', '12730', '12670']
];
let bevBBQ = [
    ['15675', '17253', '17207', '11006'],
    ['13036', '12786', '12670', '12862']
];
let bevDateNight = [
    ['11227', '13020', '12754', '11938'],
    ['12768', '12786', '12730', '13036']
];
let bevBabyShower = [
    ['14456', '17205', '11118', '11242'],
    ['12670', '13036', '12710', '12862']
];
let bevBrunch = [
    ['13621', '17205', '12162', '11113'],
    ['12864', '13036', '12710', '12730']
];
let bevDinnerPary = [
    ['11728', '11001', '14510', '11003'],
    ['12738', '13036', '13032', '12670']
];
let bevThanksgiving = [
    ['12188', '11728', '11001', '14510'],
    ['12864', '12730', '12738', '13036']
];
let bevHoliday = [
    ['12087', '12988', '11147', '13971'],
    ['12738', '12864', '12730', '13032']
];
let bevGeneralParty = [
    ['178353', '17204', '11424', '16275'],
    ['12786', '12704', '12670', '13032']
];

let idArray = [];
let cardData = [];
let bevCardData = [];
let birthdayPartyInfo = [];
let engagementPartyInfo = [];
let BBQInfo = [];
let dateNightInfo = [];
let babyShowerInfo = [];
let brunchInfo = [];
let dinnerPartyInfo = [];
let thanksgivingInfo = [];
let holidayInfo = [];
let generalPartyInfo = [];

var submitBtn = $('#submitBtn');
var themeSelection = $('#eventFilter');
var alchSelection = $('#alchFilter');
var eventNameSelection = $('#eventNameInput');
setlocalStorage();
function setlocalStorage() {
    if (JSON.parse(localStorage.getItem("bbq")) === null) {
        localStorage.setItem("bbq", JSON.stringify(BBQInfo));
    }
    if (JSON.parse(localStorage.getItem("birthdayParty")) === null) {
        localStorage.setItem("birthdayParty", JSON.stringify(birthdayPartyInfo));
    }
    if (JSON.parse(localStorage.getItem("engagementParty")) === null) {
        localStorage.setItem("engagementParty", JSON.stringify(engagementPartyInfo));
    }
    if (JSON.parse(localStorage.getItem("dateNight")) === null) {
        localStorage.setItem("dateNight", JSON.stringify(dateNightInfo));
    }
    if (JSON.parse(localStorage.getItem("babyShower")) === null) {
        localStorage.setItem("babyShower", JSON.stringify(babyShowerInfo));
    }
    if (JSON.parse(localStorage.getItem("brunch")) === null) {
        localStorage.setItem("brunch", JSON.stringify(brunchInfo));
    }
    if (JSON.parse(localStorage.getItem("dinnerParty")) === null) {
        localStorage.setItem("dinnerParty", JSON.stringify(dinnerPartyInfo));
    }
    if (JSON.parse(localStorage.getItem("thanksgiving")) === null) {
        localStorage.setItem("thanksgiving", JSON.stringify(thanksgivingInfo));
    }
    if (JSON.parse(localStorage.getItem("holiday")) === null) {
        localStorage.setItem("holiday", JSON.stringify(holidayInfo));
    }
    if (JSON.parse(localStorage.getItem("generalParty")) === null) {
        localStorage.setItem("generalParty", JSON.stringify(generalPartyInfo));
    }

    if (JSON.parse(localStorage.getItem("allRecipe")) === null) {
        localStorage.setItem("allRecipe", JSON.stringify(idArray));
    }
}


// get the informationfrom local array
idArray = JSON.parse(localStorage.getItem("allRecipe"))


// submit button
submitBtn.on('click', async function () {
    // saghar fix here
if (idArray.length === 0) {
    getRecipeData();
}
reset();
    themeSelection = $('#eventFilter').val();
    alchSelection = $('#alchFilter').val();

    eventNameSelection = $('#eventNameInput').val();
    console.log(themeSelection + " " + alchSelection + " " + eventNameSelection);
    getBevResults(alchSelection, themeSelection)


    // cardData = await setRecipeforTheme(idArray, themeSelection)
    console.log("the card is:")
    console.log(cardData)
    if (cardData) {
        for (let i = 0; i < cardData.length; i++) {
            creatCard(cardData, i)
        }
    }
    
    resultPageLayout();
})

// dropdown initializer
$(document).ready(function () {
    $('select').formSelect();
});
function reset() {

    foodContainerDiv.empty();
    bevContainerDiv.empty();
    cardData = [];
    presentRecipe=[];

}

function resultPageLayout() {
    var main = $("main");
    main.attr("class", "row");
    var initContainer = $("#initialContainer");
    // this needs to be a  class that will dynamically change on different screen sizes, right now it will always take up 1/3 the screen
    initContainer.addClass("col s3")
    initContainer.css("width", "500px")
    initContainer.css("border-right", "1px solid black")
    // initContainer.css("min-height", "100vh")
    var hidables = $(".hidable")
    hidables.css("display", "none")
}
// getRecipeData();


$(document).ready(function () {
    $('select').formSelect();
});
// modal

// food target
foodContainerDiv.on("click", ".dataInfo", function (event) {
    event.preventDefault();
    console.log(event.target)
    let moreInfobtnID = ($(event.target).attr("data-info"))
    console.log(cardData)
    $('.modal').modal();
    // $("#text").text(cardData[0].title)
    for (let i = 0; i < cardData.length; i++) {
        if (cardData[i].id == moreInfobtnID) {
            $("#image").attr("src", cardData[i].image)
            $("#title").text(cardData[i].title)

            $("#readyTime").text("Ready Time: " + cardData[i].readyInMinutes + " Minutes")
            // $("#readyTime").text("Ready Time:" )
            for (let j = 0; j < cardData[i].dishTypes.length; j++) {
                let liEl = $("<li>")
                liEl.text(cardData[i].dishTypes[j])

                $("#dishType").append(liEl)
                // $(".modal").append($("#dishType"))

            }
            $("#urlLink").attr("href", cardData[i].sourceUrl)
            $("#urlLink").text("URL is: " + cardData[i].sourceUrl)

            for (let k = 0; k < cardData[i].extendedIngredients.length; k++) {
                let liIngEl = $("<li>")
                liIngEl.text(cardData[i].extendedIngredients[k].name)

                $("#ingredients").append(liIngEl)
                // $(".modal").append($("#ingredients"))

            }


        }
    }
})
// if(cardData.length !=0){


$(document).ready(function () {
    // $('.modal').modal();
    // $("#text").text(cardData[0].title)
    //     
    // }
});
// }

// fetching data from https://spoonacular.com/food-api/ 
function creatCard(myCardData, index) {

    let divEl = $("<div>")

    divEl.addClass("showDard col s2 m-6")
    let cardDiv = $("<div>")
    cardDiv.addClass("card")
    let cardImgDiv = $("<div>")
    cardImgDiv.addClass("card-image")
    let imageEl = $("<img>")
    imageEl.attr("src", myCardData[index].image)

    let aEl = $("<a>")
    aEl.addClass("btn-floating halfway-fab waves-effect waves-light red")
    let iEl = $("<i>")
    iEl.addClass("dataInfo material-icons btn modal-trigger");
    iEl.attr("data-info", myCardData[index].id)
    iEl.attr("data-target", "modal1")
    iEl.text("...")


    let cardContentDiv = $("<div>")
    cardContentDiv.addClass("card-content")

    let pEl = $("<p>");
    pEl.text(myCardData[index].title)

    aEl.append(iEl)

    cardImgDiv.append(imageEl)
    cardImgDiv.append(aEl)

    cardContentDiv.append(pEl)
    cardDiv.append(cardImgDiv)
    cardDiv.append(cardContentDiv)
    divEl.append(cardDiv)
    foodContainerDiv.append(divEl)

}
function getRecipeData() {

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
                    // setRecipeforTheme(idArray, themeSelection)
                    localStorage.setItem("allRecipe", JSON.stringify(idArray));


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


// saghar poblo fix the for loop to go through 40 items

async function getURL(myPresentRecipe) {
    let promises = [];

    myPresentRecipe.forEach(function (currentItem) {
        if(currentItem != null){
            for (let i = 0; i < currentItem.length; i++) {
                console.log(currentItem[i].id)
                promises.push(fetchURLfromID(currentItem[i].id));
            }
        }
        
    })

    const values = await Promise.all(promises)
    console.log("All the promise values:")
    console.log(values)
    return values
}


function pickRecipe(myRecepieArray) {
    let randomIndex;
    var numbers = [];

    for (let i = 0; i < numberofRecipes; i++) {
        do {
            console.log(myRecepieArray);
            randomIndex = Math.floor(Math.random() * myRecepieArray.length);
        } while (numbers.includes(randomIndex));
        numbers.push(randomIndex);
        presentRecipe.push(myRecepieArray[i])

    }
    return presentRecipe;

}
// TODO: creat all the Theme and food for it 

async function setRecipeforTheme(myidArray, myTheme) {
    let presentRecipe = []
    let BBQ = [];
    let birthdayParty = [];
    let engagementParty = [];
    let dateNight = [];
    let babyShower = [];
    let brunch = [];
    let dinnerParty = [];
    let thanksgiving = [];
    let holiday = [];
    let generalParty = [];

    if (myTheme === "BBQ") {
        BBQInfo = JSON.parse(localStorage.getItem("bbq"))
        if (BBQInfo.length == 0) {
            presentRecipe = []
            BBQ.push(getThemeRecipes("sliders", myidArray).idRecipe)
            BBQ.push(getThemeRecipes("hamburger", myidArray).idRecipe)
            BBQ.push(getThemeRecipes("BBQ", myidArray).idRecipe)
            BBQ.push(getThemeRecipes("salad", myidArray).idRecipe)
            console.log("bbq here:");
            console.log(BBQ);
            BBQInfo = await getURL(BBQ)
            localStorage.setItem("bbq", JSON.stringify(BBQInfo));
        }

        presentRecipe = pickRecipe(BBQInfo);

        return (presentRecipe);

    }
    if (myTheme === "birthdayParty") {
        birthdayPartyInfo = JSON.parse(localStorage.getItem("birthdayParty"))
        if (birthdayPartyInfo.length == 0) {
            presentRecipe = []
            birthdayParty.push(getThemeRecipes("sliders", myidArray).idRecipe)
            birthdayParty.push(getThemeRecipes("pizza", myidArray).idRecipe)
            birthdayParty.push(getThemeRecipes("cake", myidArray).idRecipe)
            birthdayParty.push(getThemeRecipes("salad", myidArray).idRecipe)
            birthdayPartyInfo = await getURL(birthdayParty)
            localStorage.setItem("birthdayParty", JSON.stringify(birthdayPartyInfo));
        }

        presentRecipe = pickRecipe(birthdayPartyInfo);

        return (presentRecipe);
    }
    if (myTheme === "engagementParty") {
        engagementPartyInfo = JSON.parse(localStorage.getItem("engagementParty"))
        if (engagementPartyInfo.length == 0) {
            presentRecipe = []
            engagementParty.push(getThemeRecipes("sandwich", myidArray).idRecipe)
            engagementParty.push(getThemeRecipes("salad", myidArray).idRecipe)
            engagementParty.push(getThemeRecipes("cake", myidArray).idRecipe)
            engagementParty.push(getThemeRecipes("casserole", myidArray).idRecipe)
            engagementPartyInfo = await getURL(engagementParty)
            localStorage.setItem("engagementParty", JSON.stringify(engagementPartyInfo));
        }
        presentRecipe = pickRecipe(engagementPartyInfo);
        return (presentRecipe);
    }
    if (myTheme === "dateNight") {
        dateNightInfo = JSON.parse(localStorage.getItem("dateNight"))
        if (dateNightInfo.length == 0) {
            presentRecipe = []
            dateNight.push(getThemeRecipes("pasta", myidArray).idRecipe)
            dateNight.push(getThemeRecipes("salad", myidArray).idRecipe)
            dateNight.push(getThemeRecipes("steak", myidArray).idRecipe)
            dateNight.push(getThemeRecipes("roast", myidArray).idRecipe)
            dateNightInfo = await getURL(dateNight)
            localStorage.setItem("dateNight", JSON.stringify(dateNightInfo));
        }

        presentRecipe = pickRecipe(dateNightInfo);

        return (presentRecipe);
    }
    if (myTheme === "babyShower") {
        babyShowerInfo = JSON.parse(localStorage.getItem("babyShower"))
        if (babyShowerInfo.length == 0) {
            presentRecipe = []
            babyShower.push(getThemeRecipes("sandwhich", myidArray).idRecipe)
            babyShower.push(getThemeRecipes("salad", myidArray).idRecipe)
            babyShower.push(getThemeRecipes("steak", myidArray).idRecipe)
            babyShower.push(getThemeRecipes("roast", myidArray).idRecipe)
            babyShowerInfo = await getURL(babyShower)
            localStorage.setItem("babyShower", JSON.stringify(babyShowerInfo))
        }
        presentRecipe = pickRecipe(babyShowerInfo);

        return (presentRecipe);
    }
    if (myTheme === "brunch") {
        brunchInfo = JSON.parse(localStorage.getItem("brunch"))
        if (brunchInfo.length == 0) {

            presentRecipe = []
            brunch.push(getThemeRecipes("pancakes", myidArray).idRecipe)
            brunch.push(getThemeRecipes("eggs", myidArray).idRecipe)
            brunch.push(getThemeRecipes("frittata", myidArray).idRecipe)
            brunch.push(getThemeRecipes("salad", myidArray).idRecipe)
            brunchInfo = await getURL(brunch)
            localStorage.setItem("brunch", JSON.stringify(brunchInfo))
        }

        presentRecipe = pickRecipe(brunchInfo);



        return (presentRecipe);
    }
    if (myTheme === "dinnerParty") {
        dinnerPartyInfo = JSON.parse(localStorage.getItem("dinnerParty"))
        if (dinnerPartyInfo.length == 0) {
            presentRecipe = []
            dinnerParty.push(getThemeRecipes("steak", myidArray).idRecipe)
            dinnerParty.push(getThemeRecipes("salad", myidArray).idRecipe)
            dinnerParty.push(getThemeRecipes("pasta", myidArray).idRecipe)
            dinnerParty.push(getThemeRecipes("tacos", myidArray).idRecipe)

            dinnerPartyInfo = await getURL(dinnerParty)
            localStorage.setItem("dinnerParty", JSON.stringify(dinnerPartyInfo))
        }
        presentRecipe = pickRecipe(dinnerPartyInfo);
        return (presentRecipe);
    }
    if (myTheme === "thanksgiving") {
        thanksgivingInfo = JSON.parse(localStorage.getItem("thanksgiving"))
        if (thanksgivingInfo.length == 0) {
            presentRecipe = []
            thanksgiving.push(getThemeRecipes("casserole", myidArray).idRecipe)
            thanksgiving.push(getThemeRecipes("thanksgiving", myidArray).idRecipe)
            thanksgiving.push(getThemeRecipes("roast", myidArray).idRecipe)
            thanksgiving.push(getThemeRecipes("dessert", myidArray).idRecipe)

            thanksgivingInfo = await getURL(thanksgiving)
            localStorage.setItem("thanksgiving", JSON.stringify(thanksgivingInfo))
        }

        presentRecipe = pickRecipe(thanksgivingInfo);

        return (presentRecipe);
    }
    if (myTheme === "holiday") {
        holidayInfo = JSON.parse(localStorage.getItem("holiday"))
        if (holidayInfo.length == 0) {
            presentRecipe = []
            holiday.push(getThemeRecipes("casserole", myidArray).idRecipe)
            holiday.push(getThemeRecipes("salad", myidArray).idRecipe)
            holiday.push(getThemeRecipes("roast", myidArray).idRecipe)
            holiday.push(getThemeRecipes("dessert", myidArray).idRecipe)
            holidayInfo = await getURL(holiday)
            localStorage.setItem("holiday", JSON.stringify(holidayInfo))
        }

        presentRecipe = pickRecipe(holidayInfo);

        return (presentRecipe);
    }
    if (myTheme === "generalParty") {
        generalPartyInfo = JSON.parse(localStorage.getItem("generalParty"))
        if (generalPartyInfo.length == 0) {
            presentRecipe = []
            generalParty.push(getThemeRecipes("pasta", myidArray).idRecipe)
            generalParty.push(getThemeRecipes("pizza", myidArray).idRecipe)
            generalParty.push(getThemeRecipes("tacos", myidArray).idRecipe)
            generalParty.push(getThemeRecipes("roast", myidArray).idRecipe)
            generalPartyInfo = await getURL(generalParty)
            localStorage.setItem("generalParty", JSON.stringify(generalPartyInfo))
        }

        presentRecipe = pickRecipe(generalPartyInfo);
        return (presentRecipe)

    }

}


function getBevResults(alcChoice,theme){
   var alcoholic = 0;
   var nonAlc = 1;
   var drinkTheme;
   var alcTemp = [];
   var nonAlcTemp = [];

   switch (theme) {
       case 'birthdayParty':
           drinkTheme=bevBirthdayParty;
           break;
       case 'engagementParty':
           drinkTheme=bevEngagementParty;
           break;
       case 'BBQ':
           drinkTheme=bevBBQ;
           
           break;
       case 'dateNight':
           drinkTheme=bevDateNight;
           break;

        case 'babyShower':
            drinkTheme = bevBabyShower;
            break;
        case 'brunch':
            drinkTheme = bevBrunch;
            break;
        case 'dinnerParty':
            drinkTheme = bevDinnerPary;

            break;
        case 'thanksgiving':
            drinkTheme = bevThanksgiving;
            break;
        case 'holiday':
            drinkTheme = bevHoliday;
            break;
        case 'generalParty':
            drinkTheme = bevGeneralParty;
            break;

        default:
            break;
    }



    if (alcChoice === "Inc_Alcohol") {
        for (let i = 0; i < drinkTheme[alcoholic].length; i++) {
            fetchBevURLfromID(drinkTheme[alcoholic][i]);
            bevSelectedIds.push(drinkTheme[alcoholic][i]);

        }
    }
    if (alcChoice === "Dont_Inc") {
        for (let i = 0; i < drinkTheme[nonAlc].length; i++) {
            fetchBevURLfromID(drinkTheme[nonAlc][i])
            bevSelectedIds.push(drinkTheme[nonAlc][i]);
        }

    }
    if (alcChoice === "Show_Both") {
        for (let i = 0; i < drinkTheme[alcoholic].length; i++) {
            fetchBevURLfromID(drinkTheme[alcoholic][i]);
            alcTemp.push(drinkTheme[alcoholic][i]);

        }
        for (let i = 0; i < drinkTheme[nonAlc].length; i++) {
            fetchBevURLfromID(drinkTheme[nonAlc][i]);
            nonAlcTemp.push(drinkTheme[nonAlc][i]);
        }
        bevSelectedIds = alcTemp.concat(nonAlcTemp);

    }

}


function fetchBevURLfromID(idDrink) {

        requestBevURL = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + idDrink
       fetch(requestBevURL)
            .then(function (response) {
               return response.json();
            })
            .then(function (data) {
                
                console.log(data.drinks[0].strDrinkThumb)
                creatBevCard(data.drinks,0);
            });
        
    };


    function creatBevCard(myCardData,index) {
        console.log(myCardData);
    
        let divEl = $("<div>")
        
        divEl.addClass("col s2 m-6")
        let cardDiv = $("<div>")
        cardDiv.addClass("card")
        let cardImgDiv = $("<div>")
        cardImgDiv.addClass("card-image")
        let imageEl = $("<img>")
        imageEl.attr("src",myCardData[index].strDrinkThumb)

    
        let aEl = $("<a>")
        aEl.addClass("btn-floating halfway-fab waves-effect waves-light red")
        let iEl = $("<i>")
        iEl.addClass("dataInfo material-icons btn modal-trigger");
        iEl.attr("data-info", myCardData[index].idDrink)
        iEl.attr("data-target","bevModal")
        iEl.text("...")
    
    
        let cardContentDiv = $("<div>")
        cardContentDiv.addClass("card-content")
    
        let pEl = $("<p>");
        pEl.text(myCardData[index].strDrink)
    
        aEl.append(iEl)
    
        cardImgDiv.append(imageEl)
        cardImgDiv.append(aEl)
    
        cardContentDiv.append(pEl)
        cardDiv.append(cardImgDiv)
        cardDiv.append(cardContentDiv)
        divEl.append(cardDiv)
        bevContainerDiv.append(divEl)
    
    }
// drink modal
bevContainerDiv.on("click",".dataInfo",function(event){
        event.preventDefault();

        console.log(event.target)

        let moreInfobtnID =($(event.target).attr("data-info"))
        $('#bevIngredients').text("");

        requestBevURL = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + moreInfobtnID

        fetch(requestBevURL)
             .then(function (response) {
                return response.json();
             })
             .then(function (data) {
                 console.log(data);
                 $("#bevTitle").text(data.drinks[0].strDrink);
                 $("#bevImage").attr("src",data.drinks[0].strDrinkThumb);
                 $('#bevInstructions').text(data.drinks[0].strInstructions);

                 if (data.drinks[0].strIngredient1 != null ) {
                     var ingredient = document.createElement("li")
                     ingredient.textContent = data.drinks[0].strIngredient1;
                     $("#bevIngredients").append(ingredient)
                 }
                 if (data.drinks[0].strIngredient2 != null ) {
                     var ingredient = document.createElement("li")
                     ingredient.textContent = data.drinks[0].strIngredient2;
                     $("#bevIngredients").append(ingredient)
                 }
                 if (data.drinks[0].strIngredient3 != null ) {
                     var ingredient = document.createElement("li")
                     ingredient.textContent = data.drinks[0].strIngredient3;
                     $("#bevIngredients").append(ingredient)
                 }
                 if (data.drinks[0].strIngredient4 != null ) {
                     var ingredient = document.createElement("li")
                     ingredient.textContent = data.drinks[0].strIngredient4;
                     $("#bevIngredients").append(ingredient)
                 }
                 if (data.drinks[0].strIngredient5 != null ) {
                     var ingredient = document.createElement("li")
                     ingredient.textContent = data.drinks[0].strIngredient5;
                     $("#bevIngredients").append(ingredient)
                 }
                 if (data.drinks[0].strIngredient6 != null ) {
                     var ingredient = document.createElement("li")
                     ingredient.textContent = data.drinks[0].strIngredient6;
                     $("#bevIngredients").append(ingredient)
                 }
                 if (data.drinks[0].strIngredient7 != null ) {
                     var ingredient = document.createElement("li")
                     ingredient.textContent = data.drinks[0].strIngredient7;
                     $("#bevIngredients").append(ingredient)
                 }
                 if (data.drinks[0].strIngredient8 != null ) {
                     var ingredient = document.createElement("li")
                     ingredient.textContent = data.drinks[0].strIngredient8;
                     $("#bevIngredients").append(ingredient)
                 }
                 if (data.drinks[0].strIngredient9 != null ) {
                     var ingredient = document.createElement("li")
                     ingredient.textContent = data.drinks[0].strIngredient9;
                     $("#bevIngredients").append(ingredient)
                 }
                 if (data.drinks[0].strIngredient10 != null ) {
                     var ingredient = document.createElement("li")
                     ingredient.textContent = data.drinks[0].strIngredient10;
                     $("#bevIngredients").append(ingredient)
                 }
                 if (data.drinks[0].strIngredient11 != null ) {
                     var ingredient = document.createElement("li")
                     ingredient.textContent = data.drinks[0].strIngredient11;
                     $("#bevIngredients").append(ingredient)
                 }
                 if (data.drinks[0].strIngredient12 != null ) {
                     var ingredient = document.createElement("li")
                     ingredient.textContent = data.drinks[0].strIngredient12;
                     $("#bevIngredients").append(ingredient)
                 }
                 if (data.drinks[0].strIngredient13 != null ) {
                     var ingredient = document.createElement("li")
                     ingredient.textContent = data.drinks[0].strIngredient13;
                     $("#bevIngredients").append(ingredient)
                 }
                 if (data.drinks[0].strIngredient14 != null ) {
                     var ingredient = document.createElement("li")
                     ingredient.textContent = data.drinks[0].strIngredient14;
                     $("#bevIngredients").append(ingredient)
                 }
                 if (data.drinks[0].strIngredient15 != null ) {
                     var ingredient = document.createElement("li")
                     ingredient.textContent = data.drinks[0].strIngredient15;
                     $("#bevIngredients").append(ingredient)
                 }



        })
        $('#bevModal').modal();

             });


bevContainerDiv.on("click",".card",function(event) {
    console.log("card clicked")

});




