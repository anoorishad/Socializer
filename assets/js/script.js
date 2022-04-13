let apiKey = "56cebe6bd237404a8ea46d129f5bd93c";
let numberofRecipes = 2;

let presentRecipe = [];
let theme = "BBQ"
let requestfoodRecipeURL;
let foodtype = ["sliders", "hamburger", "BBQ", "salad", "pizza", "cake", "sandwhich",
    "casserole", "pasta", "steak", "roast", "pancakes", "eggs",
    "frittata", "tacos", "thanksgiving", "dessert"]
let idArray = [];
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
if (JSON.parse(localStorage.getItem("allRecipe")) === null) {
    localStorage.setItem("allRecipe", JSON.stringify(idArray));
}
// get the informationfrom local array
idArray = JSON.parse(localStorage.getItem("allRecipe"))

if (idArray.length === 0) {
    getRecipeData();
}
submitBtn.on('click', async function () {
    themeSelection = $('#eventFilter').val();
    alchSelection = $('#alchFilter').val();
    eventNameSelection = $('#eventNameInput').val();
    console.log(themeSelection + " " + alchSelection + " " + eventNameSelection);

    let cardData = await setRecipeforTheme(idArray, themeSelection)
    console.log("the card is:")
    console.log(cardData)
    for (let i = 0; i < 8; i++) {

        creatCard(cardData,i)
    }




    resultPageLayout();
})




function resultPageLayout() {
    var main = $("main");
    main.attr("class", "row");
    var initContainer = $("#initialContainer");
    initContainer.addClass("col s3")
}
// getRecipeData();

// dropdown initializer
$(document).ready(function () {
    $('select').formSelect();
});


// fetching data from https://spoonacular.com/food-api/ 
function creatCard(myCardData,index) {
    let foodContainerDiv = $("#food-container")
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
    iEl.addClass("material-icons");
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

// function getURL(myPresentRecipe) {
    // let myData = [];

    // console.log(myPresentRecipe.length)
    // myPresentRecipe.forEach(async function (currentItem) {
    //     myData.push(fetchURLfromID(currentItem.id))
    //     console.log("myData : " + myPresentRecipe.length)
    //     console.log(myData)
        // return;

    // }

    // )
// return

// }

async function getURL(myPresentRecipe) {
    let promises = [];

    myPresentRecipe.forEach(function (currentItem) {
        promises.push(fetchURLfromID(currentItem.id));
    })

    const values = await Promise.all(promises)
    console.log("All the promise values:")
    console.log(values)
    return values
}


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

}
// TODO: creat all the Theme and food for it 

async function setRecipeforTheme(myidArray, myTheme) {
    let getUrlInfo = []
    if (myTheme === "BBQ") {
        BBQ.push(getThemeRecipes("sliders", myidArray))
        BBQ.push(getThemeRecipes("hamburger", myidArray))
        BBQ.push(getThemeRecipes("BBQ", myidArray))
        BBQ.push(getThemeRecipes("salad", myidArray))
        for (let i = 0; i < numberofRecipes; i++) {
            presentRecipe = pickRecipe(BBQ);
        }

        console.log(BBQ);
        getUrlInfo = await getURL(presentRecipe)
        return (getUrlInfo);
    }
    if (myTheme === "birthdayParty") {
        birthdayParty.push(getThemeRecipes("sliders", myidArray))
        birthdayParty.push(getThemeRecipes("pizza", myidArray))
        birthdayParty.push(getThemeRecipes("cake", myidArray))
        birthdayParty.push(getThemeRecipes("salad", myidArray))
        for (let i = 0; i < numberofRecipes; i++) {
            presentRecipe = pickRecipe(birthdayParty);
        }

        console.log(birthdayParty);
        getUrlInfo = await getURL(presentRecipe)
        return (getUrlInfo);
    }
    if (myTheme === "engagementParty") {
        engagementParty.push(getThemeRecipes("sandwich", myidArray))
        engagementParty.push(getThemeRecipes("salad", myidArray))
        engagementParty.push(getThemeRecipes("cake", myidArray))
        engagementParty.push(getThemeRecipes("casserole", myidArray))
        for (let i = 0; i < numberofRecipes; i++) {
            presentRecipe = pickRecipe(engagementParty);
        }

        console.log(engagementParty);
        getUrlInfo = await getURL(presentRecipe)
        return (getUrlInfo);
    }
    if (myTheme === "dateNight") {
        dateNight.push(getThemeRecipes("pasta", myidArray))
        dateNight.push(getThemeRecipes("salad", myidArray))
        dateNight.push(getThemeRecipes("steak", myidArray))
        dateNight.push(getThemeRecipes("roast", myidArray))
        for (let i = 0; i < numberofRecipes; i++) {
            presentRecipe = pickRecipe(dateNight);
        }

        console.log(dateNight);
        getUrlInfo = await getURL(presentRecipe)
        return (getUrlInfo);
    }
    if (myTheme === "babyShower") {
        babyShower.push(getThemeRecipes("sandwhich", myidArray))
        babyShower.push(getThemeRecipes("salad", myidArray))
        babyShower.push(getThemeRecipes("steak", myidArray))
        babyShower.push(getThemeRecipes("roast", myidArray))
        for (let i = 0; i < numberofRecipes; i++) {
            presentRecipe = pickRecipe(babyShower);
        }

        console.log(babyShower);
        getUrlInfo = await getURL(presentRecipe)
        return (getUrlInfo);
    }
    if (myTheme === "brunch") {
        brunch.push(getThemeRecipes("pancakes", myidArray))
        brunch.push(getThemeRecipes("eggs", myidArray))
        brunch.push(getThemeRecipes("frittata", myidArray))
        brunch.push(getThemeRecipes("salad", myidArray))
        for (let i = 0; i < numberofRecipes; i++) {
            presentRecipe = pickRecipe(brunch);
        }

        console.log(brunch);
        getUrlInfo = await getURL(presentRecipe)
        return (getUrlInfo);
    }
    if (myTheme === "dinnerParty") {
        dinnerParty.push(getThemeRecipes("steak", myidArray))
        dinnerParty.push(getThemeRecipes("salad", myidArray))
        dinnerParty.push(getThemeRecipes("pasta", myidArray))
        dinnerParty.push(getThemeRecipes("tacos", myidArray))
        for (let i = 0; i < numberofRecipes; i++) {
            presentRecipe = pickRecipe(dinnerParty);
        }

        console.log(dinnerParty);
        getUrlInfo = await getURL(presentRecipe)
        return (getUrlInfo);
    }
    if (myTheme === "thanksgiving") {
        thanksgiving.push(getThemeRecipes("casserole", myidArray))
        thanksgiving.push(getThemeRecipes("thanksgiving", myidArray))
        thanksgiving.push(getThemeRecipes("roast", myidArray))
        thanksgiving.push(getThemeRecipes("dessert", myidArray))
        for (let i = 0; i < numberofRecipes; i++) {
            presentRecipe = pickRecipe(thanksgiving);
        }

        console.log(thanksgiving);
        getUrlInfo = await getURL(presentRecipe)
        return (getUrlInfo);
    }
    if (myTheme === "holiday") {
        holiday.push(getThemeRecipes("casserole", myidArray))
        holiday.push(getThemeRecipes("salad", myidArray))
        holiday.push(getThemeRecipes("roast", myidArray))
        holiday.push(getThemeRecipes("dessert", myidArray))
        for (let i = 0; i < numberofRecipes; i++) {
            presentRecipe = pickRecipe(holiday);
        }

        console.log(holiday);
        getUrlInfo = await getURL(presentRecipe)
        return (getUrlInfo);
    }
    if (myTheme === "generalParty") {
        generalParty.push(getThemeRecipes("pasta", myidArray))
        generalParty.push(getThemeRecipes("pizza", myidArray))
        generalParty.push(getThemeRecipes("tacos", myidArray))
        generalParty.push(getThemeRecipes("roast", myidArray))
        for (let i = 0; i < numberofRecipes; i++) {
            presentRecipe = pickRecipe(generalParty);
        }

        console.log(generalParty);
        getUrlInfo = await getURL(presentRecipe)
        return (getUrlInfo);
    }

}

