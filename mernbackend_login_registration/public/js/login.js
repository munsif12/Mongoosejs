window.onload = () => {
    document.querySelector(".Pass").addEventListener("click", () => {
        const seePass = document.getElementById("pwd");
        if (seePass.type == "password") {
            seePass.type = "text";
        }
        else
            seePass.type = "password";
    });
};