window.onload = () => {
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