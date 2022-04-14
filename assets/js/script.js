let apiKey = "46190e98b59f49d2b3a2b3ba7fbe999e";
let numberofRecipes = 8;
let foodContainerDiv = $("#food-container")
let presentRecipe = [];
let theme = "BBQ"
let requestfoodRecipeURL;
let requestBevURL;
var bevSelectedIds = [];
let foodtype = ["sliders", "hamburger", "BBQ", "salad", "pizza", "cake", "sandwhich",
    "casserole", "pasta", "steak", "roast", "pancakes", "eggs",
    "frittata", "tacos", "thanksgiving", "dessert"]


let bevBirthdayParty = [
    ['15086', '11002', '11007', '178368'],
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
// include all recepies for specific theme
let cardData = [];
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
        localStorage.setItem("dateNight", JSON.stringify(BBQInfo));
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
// saghar fix here
if (idArray[0].idRecipe.length === 0) {
    getRecipeData();
}
submitBtn.on('click', async function () {
    themeSelection = $('#eventFilter').val();
    alchSelection = $('#alchFilter').val();

    eventNameSelection = $('#eventNameInput').val();
    console.log(themeSelection + " " + alchSelection + " " + eventNameSelection);
    getBevResults(alchSelection, themeSelection)


    cardData = await setRecipeforTheme(idArray, themeSelection)
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

    divEl.addClass("col s2 m-6")
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
        for(let i=0; i<currentItem.length; i++){
                console.log(currentItem[i].id)
        promises.push(fetchURLfromID(currentItem[i].id));
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
        if (birthdayPartyInfo.length == 0) {
            presentRecipe = []
            birthdayParty.push(getThemeRecipes("sliders", myidArray))
            birthdayParty.push(getThemeRecipes("pizza", myidArray))
            birthdayParty.push(getThemeRecipes("cake", myidArray))
            birthdayParty.push(getThemeRecipes("salad", myidArray))
            birthdayPartyInfo = await getURL(birthdayParty)
            localStorage.setItem("birthdayParty", JSON.stringify(birthdayPartyInfo));
        }
        for (let i = 0; i < numberofRecipes; i++) {
            presentRecipe = pickRecipe(birthdayPartyInfo);
        }

        // console.log(presentRecipe);

        return (presentRecipe);
    }
    if (myTheme === "engagementParty") {
        if (engagementPartyInfo.length == 0) {
            presentRecipe = []
            engagementParty.push(getThemeRecipes("sandwich", myidArray))
            engagementParty.push(getThemeRecipes("salad", myidArray))
            engagementParty.push(getThemeRecipes("cake", myidArray))
            engagementParty.push(getThemeRecipes("casserole", myidArray))
            engagementPartyInfo = await getURL(engagementParty)
            localStorage.setItem("engagementParty", JSON.stringify(engagementPartyInfo));
        }
        for (let i = 0; i < numberofRecipes; i++) {
            presentRecipe = pickRecipe(engagementPartyInfo);
        }

        return (presentRecipe);
    }
    if (myTheme === "dateNight") {
        if (dateNightInfo.length == 0) {
            presentRecipe = []
            dateNight.push(getThemeRecipes("pasta", myidArray))
            dateNight.push(getThemeRecipes("salad", myidArray))
            dateNight.push(getThemeRecipes("steak", myidArray))
            dateNight.push(getThemeRecipes("roast", myidArray))
            dateNightInfo = await getURL(dateNight)
            localStorage.setItem("dateNight", JSON.stringify(dateNightInfo));
        }
        for (let i = 0; i < numberofRecipes; i++) {
            presentRecipe = pickRecipe(dateNightInfo);
        }
        return (presentRecipe);
    }
    if (myTheme === "babyShower") {
        if (babyShowerInfo.length == 0) {
            presentRecipe = []
            babyShower.push(getThemeRecipes("sandwhich", myidArray))
            babyShower.push(getThemeRecipes("salad", myidArray))
            babyShower.push(getThemeRecipes("steak", myidArray))
            babyShower.push(getThemeRecipes("roast", myidArray))
            babyShowerInfo = await getURL(babyShower)
            localStorage.setItem("babyShower", JSON.stringify(babyShowerInfo))
        }
        for (let i = 0; i < numberofRecipes; i++) {
            presentRecipe = pickRecipe(babyShowerInfo);
        }
        return (presentRecipe);
    }
    if (myTheme === "brunch") {
        if (brunchInfo.length == 0) {

            presentRecipe = []
            brunch.push(getThemeRecipes("pancakes", myidArray))
            brunch.push(getThemeRecipes("eggs", myidArray))
            brunch.push(getThemeRecipes("frittata", myidArray))
            brunch.push(getThemeRecipes("salad", myidArray))
            brunchInfo = await getURL(brunchInfo)
            localStorage.setItem("brunch", JSON.stringify(brunchInfo))
        }
        for (let i = 0; i < numberofRecipes; i++) {
            presentRecipe = pickRecipe(brunchInfo);
        }


        return (presentRecipe);
    }
    if (myTheme === "dinnerParty") {
        if (dinnerPartyInfo.length == 0) {
            presentRecipe = []
            dinnerParty.push(getThemeRecipes("steak", myidArray))
            dinnerParty.push(getThemeRecipes("salad", myidArray))
            dinnerParty.push(getThemeRecipes("pasta", myidArray))
            dinnerParty.push(getThemeRecipes("tacos", myidArray))

            dinnerPartyInfo = await getURL(dinnerParty)
            localStorage.setItem("dinnerParty", JSON.stringify(dinnerPartyInfo))
        }
        for (let i = 0; i < numberofRecipes; i++) {
            presentRecipe = pickRecipe(dinnerPartyInfo);
        }


        return (presentRecipe);
    }
    if (myTheme === "thanksgiving") {
        if (thanksgivingInfo.length == 0) {
            presentRecipe = []
            thanksgiving.push(getThemeRecipes("casserole", myidArray))
            thanksgiving.push(getThemeRecipes("thanksgiving", myidArray))
            thanksgiving.push(getThemeRecipes("roast", myidArray))
            thanksgiving.push(getThemeRecipes("dessert", myidArray))

            thanksgivingInfo = await getURL(thanksgiving)
            localStorage.setItem("thanksgiving", JSON.stringify(thanksgivingInfo))
        }
        for (let i = 0; i < numberofRecipes; i++) {
            presentRecipe = pickRecipe(thanksgivingInfo);
        }
        return (presentRecipe);
    }
    if (myTheme === "holiday") {
        if (holidayInfo.concat.length == 0) {
            presentRecipe = []
            holiday.push(getThemeRecipes("casserole", myidArray))
            holiday.push(getThemeRecipes("salad", myidArray))
            holiday.push(getThemeRecipes("roast", myidArray))
            holiday.push(getThemeRecipes("dessert", myidArray))
            holidayInfo = await getURL(holiday)
            localStorage.setItem("holiday", JSON.stringify(holidayInfo))
        }
        for (let i = 0; i < numberofRecipes; i++) {
            presentRecipe = pickRecipe(holidayInfo);
        }
        return (presentRecipe);
    }
    if (myTheme === "generalParty") {
        if (generalPartyInfo.length == 0) {
            presentRecipe = []
            generalParty.push(getThemeRecipes("pasta", myidArray))
            generalParty.push(getThemeRecipes("pizza", myidArray))
            generalParty.push(getThemeRecipes("tacos", myidArray))
            generalParty.push(getThemeRecipes("roast", myidArray))
            generalPartyInfo = await getURL(generalParty)
            localStorage.setItem("generalParty", JSON.stringify(generalPartyInfo))
        }
        for (let i = 0; i < numberofRecipes; i++) {
            presentRecipe = pickRecipe(generalPartyInfo);
        }
        return (presentRecipe);
    }

}

function getBevResults(alcChoice, theme) {
    console.log(alcChoice);
    var alcoholic = 0;
    var nonAlc = 1;
    var drinkTheme;
    var alcTemp = [];
    var nonAlcTemp = [];

    switch (theme) {
        case 'birthdayParty':
            drinkTheme = bevBirthdayParty;
            break;
        case 'engagementParty':
            drinkTheme = bevEngagementParty;
            break;
        case 'BBQ':
            drinkTheme = bevBBQ;

            break;
        case 'dateNight':
            drinkTheme = bevDateNight;
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
    console.log(bevSelectedIds);

}


function fetchBevURLfromID(idDrink) {
    requestBevURL = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + idDrink
    console.log(idDrink);
    fetch(requestBevURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data.drinks[0].strDrink)
            console.log(data.drinks[0].strDrinkThumb)
        });

};
// fetchBevURLfromID()




// write a function that passes theme through as a parameter. pass through a bollean (true,false alc, no alc, both) if statement value = no alcohol call this function, pass theme through as a parameter

// themeSelection = $('#eventFilter').val();