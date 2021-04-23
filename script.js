// First Load & Single Meal Click
const getMeals = async (singleMeal = null) => {
  const meal = singleMeal;

  if(singleMeal != null){
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`);
    const data = await response.json();
    renderSingleMeal(data['meals'][0]);
  }else{
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=beef`);
    const data = await response.json();
    renderMeals(data['meals'])
  }
}
getMeals();

// Search Meal By Search Input
const getSearchResult = async (search) =>{
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
  const data = await response.json();
  renderMeals(data['meals']);
}

// Render Meals
const renderMeals = (meals) =>{
  const foodList = document.querySelector('.food-list');

  // No Meal Found
  if(!meals){
    foodList.innerHTML = `<h1>No Meal Found !!!</h1>`;
  }

  // Getting Meal List
  meals.map((meal)=> {
    const foodContainer =  `
    <div class="food">
    <img src="${meal.strMealThumb}" alt="food" />
    <p>${meal.strMeal}</p>
    </div>
    `;
    foodList.insertAdjacentHTML('afterbegin', foodContainer);
    SingleMealList();
  });
}

// Getting Single Meal List
const SingleMealList = () => {
  const singleFoodList = document.querySelector('.food-list .food');
  const foodDetails = document.querySelector('.food-details');
  singleFoodList.addEventListener('click', function(e){
    getMeals(e.currentTarget.innerText);
    foodDetails.innerHTML = '';
  })
}

// Render Single Meal
const renderSingleMeal = (singleMeal) => {
  // Get all the ingrediens
  let ingrediens = "";
  if(singleMeal){
    for(let i = 1; i < 20; i++){
      let ingredien = 'singleMeal.strIngredient' + i;
      if(eval(ingredien) != null){
        ingrediens += '<p>' + eval(ingredien) + '</p>';
      }
    }
  }

  // Display in Dom
  const foodDetails = document.querySelector('.food-details');
  const singleMealContainer = `
    <img src="${singleMeal.strMealThumb}" alt="food" />
    <h2>${singleMeal.strMeal}</h2>
    <h4>Ingredients</h4>
    ${ingrediens}
  `;
  foodDetails.insertAdjacentHTML('afterbegin', singleMealContainer);
}

const searchBtn = document.querySelector('#search-btn');

// Search Input
searchBtn.addEventListener('click', (e)=>{
  const foodList = document.querySelector('.food-list');
  const foodDetails = document.querySelector('.food-details');
  const searchInput = document.querySelector('#meal-name');
  if(searchInput.value != ''){
    getSearchResult(searchInput.value);
    foodList.innerHTML = '';
    foodDetails.innerHTML = '';
    searchInput.value = '';
  }
})