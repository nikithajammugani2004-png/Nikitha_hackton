const conversionrate = 90;
const rupeeInput = document.getElementById("rupees");
const dollarInput = document.getElementById("dollars");

rupeeInput.addEventListener("input", () => {
    if (rupeeInput.value === "") {
        dollarInput.value = "";
    } else {
        let r = rupeeInput.value / conversionrate;
        dollarInput.value = r.toFixed(2); 
    }
});

dollarInput.addEventListener("input", () => {
    if (dollarInput.value === "") {
        rupeeInput.value = "";
    } else {
        let d = dollarInput.value * conversionrate;
        rupeeInput.value = d.toFixed(2);
    }
});
