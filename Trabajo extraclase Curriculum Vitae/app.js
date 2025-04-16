(function () {
    const controls = [...document.querySelectorAll(".control")];
    const themeBtn = document.querySelector(".theme-btn");

    if (controls.length > 0) {
        controls.forEach(button => {
            button.addEventListener("click", function () {
                const activeBtn = document.querySelector(".active-btn");
                const activeSection = document.querySelector(".active");
                const targetSection = document.getElementById(button.dataset.id);

                if (activeBtn) activeBtn.classList.remove("active-btn");
                this.classList.add("active-btn");

                if (activeSection) activeSection.classList.remove("active");
                if (targetSection) targetSection.classList.add("active");
            });
        });
    }

    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            document.body.classList.toggle("light-mode");
        });
    }
})();
