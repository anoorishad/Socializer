let apiKey = "5f91f06f23374ae98dda0352ea280671";
let foodtype = ["pizza", "hamburger", "pasta", "steak", "hotdog", "salad", "egg"]

let BBQ = [];
let theam = "BBQ"
let requestUrlfoodRecepieIds;
getrecepieData();


// fetching data from https://spoonacular.com/food-api/ 
function getrecepieData() {
    let idArray = [];
    for (let i = 0; i < foodtype.length; i++) {        
        requestUrlfoodRecepieIds = "https://api.spoonacular.com/recipes/complexSearch?query=" + foodtype[i] + "&apiKey=" + apiKey
        fetch(requestUrlfoodRecepieIds)
            .then(function (response) {
                console.log("response" + response)

                return response.json();
            })
            .then(function (data) {
                let food = {
                    name: foodtype[i],
                    idRecepie: data.results
                }

              
                idArray.push(food);
                if (idArray.length === foodtype.length) {
                    console.log(idArray)
                    setRecepieforTheam(idArray)
                    
                }

            });
    }


}
// geth the id's from the idArray for specefic meal
function getTheamRecepies(theamSelected, myidArray) {
    let selectedIds = [];
    for (let i = 0; i < myidArray.length; i++) {

        if (myidArray[i].name === theamSelected)
            selectedIds = myidArray[i];
    }
    return selectedIds;
}
// add the meal recepie to the theam 
function setRecepieforTheam(myidArray) {
    // BBQ
    if (theam === "BBQ") {
        BBQ.push(getTheamRecepies("steak", myidArray))
        BBQ.push(getTheamRecepies("hamburger", myidArray))
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

   