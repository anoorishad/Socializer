let apiKey = "b0a8a5b9834041e99d8d37ab32a81871";
let foodtype = ["pizza", "hamburger", "pasta", "steak", "hotdog", "salad", "egg", "holiday", "wedding"]
let numberofRecipes = 2;
let BBQ = [];
let presentRecipe = [];
let theme = "BBQ"
let requestfoodRecipeURL;
let requestUrlfoodRecipeIds;
getRecipeData();


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

function fetchURLfromID(myId){
    requestfoodRecipeURL = "https://api.spoonacular.com/recipes/"+myId+"/information?apiKey=" + apiKey
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
function setRecipeforTheme(myidArray, myTheme) {
    // BBQ
    if (myTheme === "BBQ") {
        BBQ.push(getThemeRecipes("steak", myidArray))
        BBQ.push(getThemeRecipes("hamburger", myidArray))
        for (let i = 0; i < numberofRecipes; i++) {
            presentRecipe = pickRecipe(BBQ);
        }
        getURL(presentRecipe);
        console.log(presentRecipe)

    }
    function getURL(myPresentRecipe){
        let myData="";
        // let recipesURL="urlishere"
        // for(let i=0;i<myPresentRecipe.length; i++){
            // console.log(myPresentRecipe[i].id)
            // myData=fetchURLfromID(myPresentRecipe[i].id)
            // while(!myData){
                
            // }

            ////////
            console.log(myPresentRecipe.length)
            myPresentRecipe.forEach(async function(currentItem) {
                 myData = await fetchURLfromID(currentItem.id)
                console.log(myData)
                myPresentRecipe[i].URL=myData.sourceUrl;
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
}
    // Birthday Party
        // add food
    // Engagement Party
        // add food
    // Date Night
        // add food
    // Baby Shower
        // add food
    // Brunch
        // add food
    // Dinner Party
        // add food
    // Thanksgiving
         // add food
    // Holiday
         // add food

