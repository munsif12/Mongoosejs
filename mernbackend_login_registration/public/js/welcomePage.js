window.onload = () => {
    const body = document.querySelector("body");
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const contectInfo = document.getElementById("contectInfo");
    const message = document.getElementById("message");
    const cancel = document.getElementById("cancel");
    const darkMode = document.getElementById("darkMode");
    const contectUs = document.getElementById("contect");
    darkMode.addEventListener("click", () => {
        console.log(darkMode.innerText);
        if (darkMode.innerText == "Dark Mode") {
            darkMode.innerText = "Light Mode";
            contectUs.classList.add("darkModeCont");
        }
        else {
            darkMode.innerText = "Dark Mode";
            contectUs.classList.remove("darkModeCont");
        }
        body.classList.toggle("darkMode");


    });
    // if (darkMode.checked) {
    //     alert("true");
    //     console.log(darkMode.value);
    // }
    // else alert("not");
    cancel.addEventListener("click", () => {
        name.value = "";
        email.value = "";
        contectInfo.value = "";
        message.value = "";
    });
    const covid = document.querySelector(".covid19");
    covid.addEventListener("click", () => {
        window.location.href = "/covid19";
    });
    const foodNutrition = document.querySelector(".foodNutrition");
    foodNutrition.addEventListener("click", () => {
        window.location.href = "/foodNutrition";
    });
    const currency = document.querySelector(".currencyConvertor");
    currency.addEventListener("click", () => {
        window.location.href = "/currencyConvertor";
    });
}