document.addEventListener("DOMContentLoaded", () => {
  loadCSV("data/dashboard.csv");
});

function loadCSV(csvPath) {
  fetch(csvPath)
    .then(response => {
      if (!response.ok) {
        throw new Error("CSV file not found: " + csvPath);
      }
      return response.text();
    })
    .then(csvText => {
      displayCSV(csvText);
    })
    .catch(error => {
      document.getElementById("csvTable").innerHTML =
        `<tr><td>Error loading CSV: ${error.message}</td></tr>`;
    });
}

function displayCSV(csvText) {
  const table = document.getElementById("csvTable");
  table.innerHTML = "";

  const rows = csvText.trim().split(/\r?\n/);

  rows.forEach((row, rowIndex) => {
    const tr = document.createElement("tr");
    const cells = row.split(",");

    cells.forEach(cell => {
      const cellElement = document.createElement(rowIndex === 0 ? "th" : "td");
      cellElement.textContent = cell.trim();
      tr.appendChild(cellElement);
    });

    table.appendChild(tr);
  });
}
