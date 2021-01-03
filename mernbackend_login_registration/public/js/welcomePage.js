window.onload = () => {
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const contectInfo = document.getElementById("contectInfo");
    const message = document.getElementById("message");
    const cancel = document.getElementById("cancel");
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