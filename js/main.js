let rowData = document.getElementById ('rowData');
let searchContainer = document.getElementById ('searchContainer');
let submitBtn;

const $sideNavMenu = $ ('.side-nav-menu');
const $openCloseIcon = $ ('.open-close-icon');
const $navTab = $ ('.side-nav-menu .nav-tab');

let boxWidth = $navTab.width () + 50;

function openSideNav () {
  const linksLength = $ ('.links li').length;

  $sideNavMenu.animate ({left: 0}, 500);
  $openCloseIcon.removeClass ('fa-align-justify').addClass ('fa-x');
  for (let i = 0; i < linksLength; i++) {
    $ ('.links li').eq (i).animate ({top: 0}, (i + linksLength) * 100);
  }
}

function closeSideNav () {
  $sideNavMenu.animate ({left: -boxWidth}, 500);
  $openCloseIcon.removeClass ('fa-x').addClass ('fa-align-justify');
  $ ('.links li').animate ({top: 300}, 500);
}

closeSideNav ();

$openCloseIcon.click (function () {
  if ($openCloseIcon.hasClass ('fa-x')) {
    closeSideNav ();
  } else {
    openSideNav ();
  }
});

//declare Api

async function getCategories () {
  rowData.innerHTML = '';
  $ ('.inner-loading-screen').fadeIn (200);
  searchContainer.innerHTML = '';

  let response = await fetch (
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  response = await response.json ();

  displayCategories (response.categories);
  $ ('.inner-loading-screen').fadeOut (200);
}

// -----------------------------------------------------^

function displayCategories (arr) {
  let cartoona = '';

  for (let i = 0; i < arr.length; i++) {
    cartoona += `
        <div class="col-md-3">
                <div onclick="getCategoryMeals('${arr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strCategoryThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3>${arr[i].strCategory}</h3> 

                        <p>${arr[i].strCategoryDescription.split (' ').slice (0, 20).join (' ')}</p>
                    </div>
                </div>
        </div>
        `;
  }

  rowData.innerHTML = cartoona;
}

// -----------------------------------------------------^

async function getCategoryMeals (category) {
  rowData.innerHTML = '';
  $ ('.inner-loading-screen').fadeIn (200);

  let response = await fetch (
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  response = await response.json ();

  displayMeals (response.meals.slice (0, 20));
  $ ('.inner-loading-screen').fadeOut (200);
}

// -----------------------------------------------------^

async function getArea () {
  rowData.innerHTML = '';
  $ ('.inner-loading-screen').fadeIn (200);

  searchContainer.innerHTML = '';

  let respone = await fetch (
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  respone = await respone.json ();
  // console.log (respone.meals);

  displayArea (respone.meals);
  $ ('.inner-loading-screen').fadeOut (200);
}

// -----------------------------------------------------^

function displayArea (arr) {
  let cartoona = '';

  for (let i = 0; i < arr.length; i++) {
    cartoona += `
        <div class="col-md-3">
                <div id="iconArea" onclick="getAreaMeals('${arr[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${arr[i].strArea}</h3>
                </div>
        </div>
        `;
  }

  rowData.innerHTML = cartoona;
}

// -----------------------------------------------------^

async function getAreaMeals (area) {
  rowData.innerHTML = '';
  $ ('.inner-loading-screen').fadeIn (200);

  let response = await fetch (
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  response = await response.json ();

  displayMeals (response.meals.slice (0, 20));
  $ ('.inner-loading-screen').fadeOut (200);
}

// -----------------------------------------------------^

async function getIngredients () {
  rowData.innerHTML = '';
  $ ('.inner-loading-screen').fadeIn (200);

  searchContainer.innerHTML = '';

  let respone = await fetch (
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  respone = await respone.json ();
  // console.log (respone.meals);

  displayIngredients (respone.meals.slice (0, 20));
  $ ('.inner-loading-screen').fadeOut (200);
}

// -----------------------------------------------------^

function displayIngredients (arr) {
  let cartoona = '';

  for (let i = 0; i < arr.length; i++) {
    cartoona += `
        <div class="col-md-3">
                <div  onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="getIngredientsMeals rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${arr[i].strIngredient}</h3>
                        <p>${arr[i].strDescription
                             .split (' ')
                             .slice (0, 20)
                             .join (' ')}</p>
                </div>
        </div>
        `;
  }

  rowData.innerHTML = cartoona;
}

// -----------------------------------------------------^

async function getIngredientsMeals (ingredients) {
  rowData.innerHTML = '';
  $ ('.inner-loading-screen').fadeIn (200);

  let response = await fetch (
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`
  );
  response = await response.json ();

  displayMeals (response.meals.slice (0, 20));
  $ ('.inner-loading-screen').fadeOut (200);
}

// -----------------------------------------------------^

function displayMeals (arr) {
  let cartoona = '';

  for (let i = 0; i < arr.length; i++) {
    cartoona += `
        <div class="col-md-3">
                <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `;
  }

  rowData.innerHTML = cartoona;
}

// -----------------------------------------------------^

async function getMealDetails (mealID) {
  closeSideNav ();
  rowData.innerHTML = '';
  $ ('.inner-loading-screen').fadeIn (200);

  searchContainer.innerHTML = '';
  let respone = await fetch (
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
  );
  respone = await respone.json ();

  displayMealDetails (respone.meals[0]);

  $ ('.inner-loading-screen').fadeOut (200);
}

// -----------------------------------------------------^

function displayMealDetails (meal) {
  searchContainer.innerHTML = '';

  let ingredients = ``;

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`;
    }
  }

  let tags;
  if (meal.strTags) {
    tags = meal.strTags.split (',');
  } else {
    tags = [];
  }

  let tagsStr = '';
  for (let i = 0; i < tags.length; i++) {
    tagsStr += `
          <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`;
  }

  let cartoona = `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`;

  rowData.innerHTML = cartoona;
}

// -----------------------------------------------------^
// -----------------------------------------------------^
$ (document).ready (async function () {
  await searchByName ('');
  $ ('.loading-screen').fadeOut (100);
  $ ('body').css ('overflow', 'visible');
});
// -----------------------------------------------------^

function showSearchInputs () {
  searchContainer.innerHTML = `
    <div class="row py-5 my-5">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>`;

  rowData.innerHTML = '';
}

async function searchByName (term) {
  closeSideNav ();
  rowData.innerHTML = '';
  $ ('.inner-loading-screen').fadeIn (200);

  let response = await fetch (
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
  );
  response = await response.json ();

  if (response.meals) {
    displayMeals (response.meals);
  } else {
    displayMeals ([]);
  }
  $ ('.inner-loading-screen').fadeOut (200);
}

async function searchByFLetter (term) {
  closeSideNav ();
  rowData.innerHTML = '';
  $ ('.inner-loading-screen').fadeIn (200);

  term == '' ? (term = 'a') : '';
  let response = await fetch (
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`
  );
  response = await response.json ();

  if (response.meals) {
    displayMeals (response.meals);
  } else {
    displayMeals ([]);
  }

  $ ('.inner-loading-screen').fadeOut (300);
}
// -----------------------------------------------------^

function showContacts () {
  rowData.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                include at least 3 letters starting with capital,second name is optional
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                name@example.com
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter   Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                less than 14 your
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                Enter valid password: <br> At least 8 characters password<br>
                At least one uppercase character<br>
                At least one lowercase character<br>
                At least one digit<br>
                At least one special character.
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `;
  submitBtn = document.getElementById ('submitBtn');

  const nameInput = document.getElementById ('nameInput');
  const emailInput = document.getElementById ('emailInput');
  const phoneInput = document.getElementById ('phoneInput');
  const ageInput = document.getElementById ('ageInput');
  const passwordInput = document.getElementById ('passwordInput');
  const repasswordInput = document.getElementById ('repasswordInput');

  nameInput.addEventListener ('focus', function () {
    nameInputTouched = true;
  });

  emailInput.addEventListener ('focus', function () {
    emailInputTouched = true;
  });

  phoneInput.addEventListener ('focus', function () {
    phoneInputTouched = true;
  });

  ageInput.addEventListener ('focus', function () {
    ageInputTouched = true;
  });

  passwordInput.addEventListener ('focus', function () {
    passwordInputTouched = true;
  });

  repasswordInput.addEventListener ('focus', function () {
    repasswordInputTouched = true;
  });
}

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;

function inputsValidation () {
  if (nameInputTouched) {
    const isValid = nameValidation ();

    const nameAlert = document.getElementById ('nameAlert');
    if (isValid) {
      nameAlert.classList.replace ('d-block', 'd-none');
    } else {
      nameAlert.classList.replace ('d-none', 'd-block');
    }
  }

  if (emailInputTouched) {
    const isValid = emailValidation ();
    const emailAlert = document.getElementById ('emailAlert');

    emailAlert.classList.toggle ('d-block', !isValid);
    emailAlert.classList.toggle ('d-none', isValid);
  }

  if (phoneInputTouched) {
    if (phoneValidation ()) {
      document
        .getElementById ('phoneAlert')
        .classList.replace ('d-block', 'd-none');
    } else {
      document
        .getElementById ('phoneAlert')
        .classList.replace ('d-none', 'd-block');
    }
  }

  if (ageInputTouched) {
    if (ageValidation ()) {
      document
        .getElementById ('ageAlert')
        .classList.replace ('d-block', 'd-none');
    } else {
      document
        .getElementById ('ageAlert')
        .classList.replace ('d-none', 'd-block');
    }
  }

  if (passwordInputTouched) {
    if (passwordValidation ()) {
      document
        .getElementById ('passwordAlert')
        .classList.replace ('d-block', 'd-none');
    } else {
      document
        .getElementById ('passwordAlert')
        .classList.replace ('d-none', 'd-block');
    }
  }
  if (repasswordInputTouched) {
    if (repasswordValidation ()) {
      document
        .getElementById ('repasswordAlert')
        .classList.replace ('d-block', 'd-none');
    } else {
      document
        .getElementById ('repasswordAlert')
        .classList.replace ('d-none', 'd-block');
    }
  }

  if (
    nameValidation () &&
    emailValidation () &&
    phoneValidation () &&
    ageValidation () &&
    passwordValidation () &&
    repasswordValidation ()
  ) {
    submitBtn.removeAttribute ('disabled');
  } else {
    submitBtn.setAttribute ('disabled', true);
  }
}

function nameValidation () {
  return /^[A-Za-z]{3,10}(\s[A-Za-z]{3,10})?\s?$/.test (
    document.getElementById ('nameInput').value
  );
}

function emailValidation () {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test (
    document.getElementById ('emailInput').value
  );
}

function phoneValidation () {
  return /^[\d\- ]+$/.test (document.getElementById ('phoneInput').value);
}

function ageValidation () {
  return /^(1[4-9]|[2-9]\d+)$/.test (
    document.getElementById ('ageInput').value
  );
}

function passwordValidation () {
  return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test (
    document.getElementById ('passwordInput').value
  );
}

function repasswordValidation () {
  return (
    document.getElementById ('repasswordInput').value ==
    document.getElementById ('passwordInput').value
  );
}
