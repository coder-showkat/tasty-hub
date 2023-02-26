const loadMeal = async(keyword) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${keyword}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayMeal(data.meals);
    }

    catch (error) {
        console.log(error);
    }
    // fetch(url)
    // .then(res => res.json())
    // .then(data => displayMeal(data.meals))
    // .catch(error => console.log(error))
}

loadMeal('chi');


const food_container = document.querySelector('.food-container');
const showAll = document.querySelector('#show-all');
let card_count = 6;

const displayMeal = (meals) => {
    // console.log(meals)
    showAll.addEventListener('click', ()=>{
        card_count = meals.length;
        displayMeal(meals);
    })
    food_container.innerHTML = '';

    if (card_count > meals.length) {
        card_count = meals.length;
        showAll.classList.add('d-none');
    } else if (card_count == meals.length) showAll.classList.add('d-none');
    else showAll.classList.remove('d-none');
    
    for (let i = 0; i < card_count; i++) {
        // console.log(meals[i])
        const meal = meals[i];
        food_container.innerHTML += `
        <div class="col p-2">
                    <div class="my-card d-flex h-100">
                        <img src="${meal.strMealThumb}" alt="" class="d-block object-fit-cover">
                        <div class="description d-flex flex-column justify-content-center px-4">
                            <h3 class="fs-3 fw-bold">${meal.strMeal}</h3>
                            <p>${meal.strInstructions.substr(0, 140)}...</p>
                            <div>
                                <button onclick="loadDetail('${meal.idMeal}')" data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                                    class="p-0 border-0 bg-white text-decoration-underline text-warning fw-bold fs-6">View
                                    Deatils</button>
                            </div>
                        </div>
                    </div>
                </div>
        `
    }
    card_count = 6;
}

const search_form = document.querySelector('#search-form');
const search_input = document.querySelector('#search-field');
search_form.addEventListener('submit', (e)=>{
    e.preventDefault();
    loadMeal(search_input.value);
    search_input.value = '';
})


const loadDetail = async(mealId) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayDetail(data.meals[0]);
    }

    catch (error) {
        console.log(error);
    }

    // fetch(url)
    // .then(res => res.json())
    // .then(data => displayDetail(data.meals[0]))
}

const modal_title = document.querySelector('#staticBackdropLabel');
const modal_body = document.querySelector('.modal-body');
const displayDetail = meal => {
    // console.log(meal)
    modal_title.innerText = meal.strMeal;
    modal_body.innerHTML = `
    <img src="${meal.strMealThumb}" class="img-fluid rounded-2 mb-4">
    <h3 class="fs-5 fw-bold text-black mb-3">Category: <span class="fw-normal text-secondary">${meal.strCategory}</span></h3>
    <h3 class="fs-5 fw-bold text-black mb-3">Area: <span class="fw-normal text-secondary">${meal.strArea}</span></h3>
    <h3 class="fs-5 fw-bold text-black mb-3">Instructions: <span class="fw-normal text-secondary">${meal.strInstructions}</span></h3>
    <h3 class="fs-5 fw-bold text-black mb-3">Youtube: <a href="${meal.strYoutube}" class="fw-normal text-secondary">${meal.strYoutube}</a></h3>
    `
}
