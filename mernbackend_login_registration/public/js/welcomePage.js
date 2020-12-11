window.onload = () => {
    const covid = document.querySelector(".covid19");
    covid.addEventListener("click", () => {
        window.location.href = "/covid19";
    })
}