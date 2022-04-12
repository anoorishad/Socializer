let apiKey = "fa268d1621ac4a24bea0212fb0c93108";
let foodtype = ["pizza", "hamburger", "pasta", "steak", "hotdog", "salad", "egg", "holiday"]

let BBQ = [];
let theam = "BBQ"
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
// add the meal Recipe to the theam 
function setRecipeforTheam(myidArray) {
    // BBQ
    if (theam === "BBQ") {
        BBQ.push(getTheamRecipes("steak", myidArray))
        BBQ.push(getTheamRecipes("hamburger", myidArray))
        console.log(BBQ)
    }
    
 // TODO: creat all the theam and food for it 
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

   