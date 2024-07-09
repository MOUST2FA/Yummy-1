/// <reference types="../@types/jquery" />

// &------------------------------Dom-----------------------& //

let cols = document.getElementById('cols');
let searchMeals = document.getElementById('searchMeals');
let submitBtn;

// &------------------------------SideNav-----------------------& //

function openSide() {
    $('#boxContainer').animate({
        left: 0
    }, 500)
    $('.open-close-icon').removeClass("fa-align-justify")
    $('.open-close-icon').addClass("fa-x")
    for (let i = 0; i < 5; i++) {

        $('.navLink li').eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    }
}

function closeSide() {
    let navLinkHid = $('#boxLink').outerWidth();
    $('#boxContainer').animate({
        left: -navLinkHid
    }, 500)
    $('.open-close-icon').addClass("fa-align-justify")
    $('.open-close-icon').removeClass("fa-x")
    $('.navLink li').animate({
        top: 300
    }, 1000)
}

closeSide()

$('#hid').on("click", function () {
    if ($('#boxContainer').css("left") == "0px") {
        closeSide()
    } else {
        openSide()
    }
})

$('.navLink ul li').on('click', function () {
    closeSide()
})

// &------------------------------Meals-&-Search-----------------------& //

async function searchByName(term) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    response = await response.json()
    response.meals ? displayMeals(response.meals) : displayMeals([])
}
searchByName("")

function displayMeals(arr) {
    let carton = ""
    for (let i = 0; i < arr.length; i++) {
        carton += `
                    <div onclick="gitMealsId('${arr[i].idMeal}')" class="col-md-3">
                    <div class=" imgHover rounded-2">
                    <img class="" src="${arr[i].strMealThumb}" alt="">
                    <div class="lear">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
            </div>
        `
    }
    cols.innerHTML = carton
}

async function searchByFirstName(term) {
    term == "" ? term = "a" : ""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    response = await response.json()
    response.meals ? displayMeals(response.meals) : displayMeals([])
}

function bySearchName() {
    searchMeals.innerHTML = `
                <div class="row my-5">
                <div class="col-md-6">
                    <input onkeyup="searchByName(this.value)" type="text" placeholder="Search By Name" class="form-control text-white bg-transparent">
                </div>
                <div class="col-md-6">
                    <input onkeyup="searchByFirstName(this.value)" type="text" maxLength="1"  placeholder="Search By First Name" length="1"  class="form-control text-white bg-transparent ">
                </div>
            </div>
    `
    cols.innerHTML = ""
}

async function gitMealsId(mealsId) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealsId}`)
    response = await response.json()
    console.log(response.meals);
    displayMealsId(response.meals[0])
    searchMeals.innerHTML = ''
}

function displayMealsId(meal) {
    let carton = `
    <div class="details">
        <div class="container">
            <div class="row pt-4 text-white">
                <div class="col-md-4">
                    <img class="w-100 mt-3" src="${meal.strMealThumb}" alt="">
                    <h4 class="mt-3">${meal.strCategory}</h4>
                </div>
                <div class="col-md-7 offset-1">
                    <h2>Lorem ipsum dolor sit amet.</h2>
                    <p>${meal.strInstructions}</p>
                    <h5>Area : <span class="fs-6">${meal.strArea}</span></h5>
                    <h5>Category : <span class="fs-6">${meal.strCategory}</span></h5>
                    <div class="mt-4">
                    <a href="${meal.strSource}" class="btn btn-success me-3">Source</a>
                    <a href="${meal.strYoutube}" class="btn btn-danger">Youtube</a></div>
                </div>
            </div>
        </div>
    </div>
 `
    cols.innerHTML = carton
}

// &------------------------------Categories-----------------------& //

async function getCategory() {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await response.json()
    displayCategories(response.categories)
}

function displayCategories(arr) {
    let carton = ""
    for (let i = 0; i < arr.length; i++) {
        carton += `
            <div onclick="getCategoryMeals('${arr[i].strCategory}')" class="col-md-3">
                <div class=" imgHover rounded-2">
                    <img class="cursor-pointer" src="${arr[i].strCategoryThumb}" alt="">
                    <div class="lear cursor-pointer d-flex flex-column text-center">
                        <h3>${arr[i].strCategory}</h3>
                        <p>${arr[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
            </div>
        `
    }
    cols.innerHTML = carton
    searchMeals.innerHTML = ''
}

async function getCategoryMeals(category) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()
    console.log(response);
    displayMeals(response.meals)
}

// &------------------------------Area-----------------------& //

async function getArea() {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    response = await response.json()
    displayArea(response.meals)
}

function displayArea(arr) {
    let carton = ""
    for (let i = 0; i < arr.length; i++) {
        carton += `
            <div onclick="getAreaMeals('${arr[i].strArea}')" class="col-md-3 text-white ">
            <div class="text-center">
                <i class="fa-solid fa-house-laptop fa-4x cursor-pointer"></i>
                <h3 class="cursor-pointer" >${arr[i].strArea}</h3>
            </div>
            </div>
        `
    }
    cols.innerHTML = carton
}

async function getAreaMeals(area) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()
    displayMeals(response.meals)
}

// &------------------------------Ingredients-----------------------& //

async function getIngredients() {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    response = await response.json()
    displayIngredients(response.meals.slice(0, 30))
}

function displayIngredients(arr) {
    let carton = ""
    for (let i = 0; i < arr.length; i++) {
        carton += `
            <div onclick="getIngredientMeals('${arr[i].strIngredient}')" class="col-md-3 text-center text-white">
                <i class="fa-solid fa-drumstick-bite fa-4x cursor-pointer"></i>
                <h3 class="cursor-pointer">${arr[i].strIngredient}</h3>
                <p class="cursor-pointer">${arr[i].strDescription?.split(" ").slice(0,15).join(" ")}</p>
            </div>
        `
    }
    cols.innerHTML = carton
}

async function getIngredientMeals(ingredient) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
    response = await response.json()
    displayMeals(response.meals)
}

// &------------------------------ContactUs-----------------------& //

function contactInput() {
    cols.innerHTML = `
    <div class="container">
        <div class="vh-100  d-flex justify-content-center flex-column">
            <div class="row">
                <div class="col-md-6">
                    <div class=" my-4">
                        <input id="nameInput" type="text" onkeyup="validationInputs()" placeholder="Enter Your name" class="form-control">
                        <div id="alertName" class="alert alert-danger text-center w-100 d-none">
                            Special characters and numbers not allowed
                        </div>
                    </div>
                    <div class="my-4">
                        <input id="phoneInput" type="tel" onkeyup="validationInputs()" placeholder="Enter Your Phone" class="form-control">
                        <div id="alertPhone" class="alert alert-danger text-center w-100 d-none">
                            Enter valid Phone Number
                        </div>
                    </div>
                    <div class=" my-4">
                        <input id="passwordInput" type="password" onkeyup="validationInputs()" placeholder="Enter Your Password" class="form-control">
                        <div id="alertPassword" class="alert alert-danger text-center w-100 d-none">
                            Enter valid password *Minimum eight characters, at least one
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class=" my-4">
                        <input id="emailInput" type="email" onkeyup="validationInputs()" placeholder="Enter Your Email" class="form-control">
                        <div id="alertEmail" class="alert alert-danger text-center w-100 d-none">
                            Email not valid *exemple@yyy.zzz
                        </div>
                    </div>
                    <div class=" my-4">
                        <input id="ageInput" type="text" onkeyup="validationInputs()" placeholder="Enter Your Age" class="form-control">
                        <div id="alertAge" class="alert alert-danger text-center w-100 d-none">
                            Enter valid age
                        </div>
                    </div>
                    <div class=" my-4">
                        <input id="rePasswordInput" type="text" onkeyup="validationInputs()" placeholder="rePassword" class="form-control">
                        <div id="alertRePassword" class="alert alert-danger text-center w-100 d-none">
                            Enter valid repassword
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-center">
                    <button id="submit" disabled class="btn btn-outline-danger">Submit</button>
                </div>
            </div>
        </div>
    </div>
    `
    submitBtn = document.getElementById('submit');

    document.getElementById("nameInput").addEventListener('focus', () => {
        nameInputTouched = true
    })
    
    document.getElementById("phoneInput").addEventListener('focus', () => {
        phoneInputTouched = true
    })
    
    document.getElementById("passwordInput").addEventListener('focus', () => {
        passwordInputTouched = true
    })
    
    document.getElementById("emailInput").addEventListener('focus', () => {
        emailInputTouched = true
    })
    
    document.getElementById("ageInput").addEventListener('focus', () => {
        ageInputTouched = true
    })
    
    document.getElementById("rePasswordInput").addEventListener('focus', () => {
        rePasswordInputTouched = true
    })
    
}

let nameInputTouched = false
let phoneInputTouched = false
let passwordInputTouched = false
let emailInputTouched = false
let ageInputTouched = false
let rePasswordInputTouched = false


function validationInputs() {
    if (nameInputTouched) {
        if (validationName()) {
            document.getElementById("alertName").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("alertName").classList.replace("d-none", "d-block")
        }
    }
    if (phoneInputTouched) {
        if (validationPhone()) {
            document.getElementById("alertPhone").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("alertPhone").classList.replace("d-none", "d-block")
        }
    }
    if (passwordInputTouched) {
        if (validationPassword()) {
            document.getElementById("alertPassword").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("alertPassword").classList.replace("d-none", "d-block")
        }
    }
    if (emailInputTouched) {
        if (validationEmail()) {
            document.getElementById("alertEmail").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("alertEmail").classList.replace("d-none", "d-block")
        }
    }
    if (ageInputTouched) {
        if (validationAge()) {
            document.getElementById("alertAge").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("alertAge").classList.replace("d-none", "d-block")
        }
    }
    if (rePasswordInputTouched) {
        if (validationRePassword()) {
            document.getElementById("alertRePassword").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("alertRePassword").classList.replace("d-none", "d-block")
        }
    }

    if (validationName() && validationPhone() && validationPassword() && validationEmail() && validationAge() && validationRePassword()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}

function validationName() {
    return (/^[a-zA-Z]{2,8}$/.test(document.getElementById("nameInput").value))
}

function validationPhone() {
    return (/^01[0125][0-9]{8}$/.test(document.getElementById("phoneInput").value))
}

function validationPassword() {
    return (/^[a-zA-Z0-9]{7,}$/.test(document.getElementById("passwordInput").value))
}

function validationEmail() {
    return (/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(document.getElementById("emailInput").value))
}

function validationAge() {
    return (/^[1-9][0-9]{1,2}$/.test(document.getElementById("ageInput").value))
}

function validationRePassword() {
    return document.getElementById("rePasswordInput").value == document.getElementById("passwordInput").value
}