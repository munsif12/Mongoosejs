window.onload = () => {
    document.querySelector(".Pass").addEventListener("click", () => {
        const seePass = document.getElementById("pwd");
        if (seePass.type == "password") {
            seePass.type = "text";
        }
        else
            seePass.type = "password";
    });
    document.querySelector(".cPass").addEventListener("click", () => {
        const cPass = document.getElementById("cpwd");
        if (cPass.type == "password") {
            cPass.type = "text";
        }
        else
            cPass.type = "password";
    });
};
