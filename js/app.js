let allDataMeals = []
const loadData = async (inputText) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputText}`;
  const res = await fetch(url);
  const data = await res.json();
  allDataMeals=data.meals;
  console.log(data);
  if(data.meals === null){
    alert('no result found')
  }else{

      showData(data.meals.slice(0,6));
      console.log(data.meals.length);
      if(data.meals.length >6){
        document.getElementById('btn-show-all-data').classList.remove('d-none')
      }
  }
};
let mealDB =[]
const showData = (meals) => {
    
    const mealContainer = document.getElementById("food-container");
    mealContainer.innerHTML = '';
    meals.forEach(meal =>{
        mealDB = meal;
        // console.log(meal.strMealThumb);
        const {strMealThumb,strMeal,strInstructions} = meal
        const div = document.createElement("div");
        div.innerHTML = `
          <div class="card mb-3" style="max-width: 540px">
                  <div class="row g-0">
                    <div class="col-md-4">
                      <img src="${strMealThumb}" class="img-fluid rounded-start w-100" alt="..." />
                    </div>
                    <div class="col-md-8">
                      <div class="card-body">
                        <h5 class="card-title mb-3">${strMeal}</h5>
                        <p class="card-text">
                          ${strInstructions.slice(0,100)} ...
                        </p>
                        <button class="btn btn-link text-underline fw-semibold text-warning" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="displayModal()">View Details</button>
                      </div>
                    </div>
                  </div>
                </div>
          
          `;
          mealContainer.appendChild(div)
    })

};
const displayModal = ()=>{
    const {strMealThumb,strMeal,strInstructions,strCategory,strArea,strYoutube} = mealDB;
    console.log(mealDB);
    document.getElementById('display-modal').innerHTML=`
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div style="max-width:750px" class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">${strMeal}</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
        <img src="${strMealThumb}" class="img-fluid rounded-start w-100 p-3" alt="..." />
        <p class="mt-3"><span class="fw-semibold">Category:</span> ${strCategory}</p>
        <p><span class="fw-semibold">Area:</span> ${strArea}</p>
        <p><span class="fw-semibold">Instruction:</span> ${strInstructions.slice(0,300)}</p>
        <p><span class="fw-semibold">Youtube:</span> <a href="${strYoutube}" target="_blank" class="stretched-link link">${strYoutube}</a></p>
        </div>
        <div class="modal-footer text-end">
          <button type="button" class="btn btn-danger " data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
    
    `
}
const showAllData = async() =>{
    showData(allDataMeals)
    document.getElementById('btn-show-all-data').classList.add('d-none')
    
}

const searchFood  = () =>{
    document.getElementById('btn-search').addEventListener('click',function(){
        const inputText = document.getElementById('search-field').value ; 
        loadData(inputText);
    })
}
searchFood()
loadData('r')
