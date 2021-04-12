sqrtFunc = function(a, b, c) {
    let d = Math.pow(-b, 2) - 4*a*c;
    if (d < 0) {
        return null;
    }
    return [(-b + Math.sqrt(d)) / (2*a), (-b - Math.sqrt(d)) / (2*a)];
}

function addRow(a, b, c, res) {
    let tbody = document.getElementById("tbody");
    let newRow = document.createElement("tr");

    let statusBar = document.getElementById("statusBar");
    statusBar.style.display = "none";

    newRow.innerHTML = `<td>${a}</td><td>${b}</td><td>${c}</td><td>${res}</td>`;
    tbody.appendChild(newRow);
}

function clickResult() {
    let a = document.getElementById("firstCoef").value;
    let b = document.getElementById("secondCoef").value;
    let c = document.getElementById("thirdCoef").value;
    a = parseFloat(a);
    b = parseFloat(b);
    c = parseFloat(c);
    if (isNaN(a) || isNaN(b) || isNaN(c)) {
        console.log("Entered values are not numbers");
        let statusBar = document.getElementById("statusBar");
        statusBar.style.display = "block";
        statusBar.innerText = "Entered values are not numbers"
        return;
    }
    if (a == 0) {
        let statusBar = document.getElementById("statusBar");
        statusBar.style.display = "block";
        statusBar.innerText = "Coef 'A' must not be equal zero"
        return;
    }

    let res = sqrtFunc(a, b, c);

    if (res == null) {
        let statusBar = document.getElementById("statusBar");
        statusBar.style.display = "block";
        statusBar.innerText = "Discriminant less than zero"
        return;
    }

    if (res[0] == res[1]) {
        res = res[0];
        res = Math.floor(res * 100) / 100;
        addRow(a, b, c, `${res}`);
    } else {
        res[0] = Math.floor(res[0] * 100) / 100;
        res[1] = Math.floor(res[1] * 100) / 100;
        addRow(a, b, c, `[${res[0]}, ${res[1]}]`);
    }

    zebraMode();
}

function zebraMode() {
    let tableBody = document.getElementById("tableHistory").getElementsByTagName("tbody");
    let table = document.getElementById("tableHistory");
    for (let i = 0; i < tableBody.length; i++) {
        let rows = tableBody[i].getElementsByTagName("tr");
        for (let j = 0; j < rows.length; j++) {
            if (j % 2 == 0) {
                rows[j].className = "even-row"
            } else {
                rows[j].className = "odd-row"
            }
        }
    }
}

function clearFields() {
    let textCoefA = document.getElementById("firstCoef");
    let textCoefB = document.getElementById("secondCoef");
    let textCoefC = document.getElementById("thirdCoef");

    textCoefA.value = "";
    textCoefB.value = "";
    textCoefC.value = "";

    let statusBar = document.getElementById("statusBar");
    statusBar.style.display = "none";
}

function deleteRows() {
    let tbody = document.getElementById("tbody");
    while (tbody.firstChild) {
        tbody.removeChild(tbody.lastChild);
    }
}