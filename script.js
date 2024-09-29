let selectedRow = null;
let chemicals = JSON.parse(localStorage.getItem("chemicals")) || [
  {
    id: 1,
    name: "Acetone",
    vendor: "ChemCorp",
    density: "0.791 g/cm³",
    viscosity: "0.32 mPa·s",
    packaging: "Plastic Drum",
    pack_size: 50,
    unit: "L",
    quantity: 200,
  },
  {
    id: 2,
    name: "Benzene",
    vendor: "GlobalChem",
    density: "0.876 g/cm³",
    viscosity: "0.65 mPa·s",
    packaging: "Steel Drum",
    pack_size: 200,
    unit: "L",
    quantity: 600,
  },
  {
    id: 3,
    name: "Chloroform",
    vendor: "LabSupply",
    density: "1.489 g/cm³",
    viscosity: "0.56 mPa·s",
    packaging: "Glass Bottle",
    pack_size: 5,
    unit: "L",
    quantity: 15,
  },
  {
    id: 4,
    name: "Ethanol",
    vendor: "ChemSolutions",
    density: "0.789 g/cm³",
    viscosity: "1.2 mPa·s",
    packaging: "Plastic Container",
    pack_size: 100,
    unit: "L",
    quantity: 500,
  },
  {
    id: 5,
    name: "Methanol",
    vendor: "BioChemicals",
    density: "0.792 g/cm³",
    viscosity: "0.55 mPa·s",
    packaging: "Plastic Drum",
    pack_size: 50,
    unit: "L",
    quantity: 200,
  },
  {
    id: 6,
    name: "Sulfuric Acid",
    vendor: "AcidSupply",
    density: "1.834 g/cm³",
    viscosity: "22 mPa·s",
    packaging: "Steel Drum",
    pack_size: 100,
    unit: "L",
    quantity: 400,
  },
  {
    id: 7,
    name: "Hydrochloric Acid",
    vendor: "GlobalChem",
    density: "1.19 g/cm³",
    viscosity: "1.9 mPa·s",
    packaging: "Plastic Container",
    pack_size: 20,
    unit: "L",
    quantity: 100,
  },
  {
    id: 8,
    name: "Toluene",
    vendor: "LabSupply",
    density: "0.867 g/cm³",
    viscosity: "0.59 mPa·s",
    packaging: "Glass Bottle",
    pack_size: 10,
    unit: "L",
    quantity: 30,
  },
  {
    id: 9,
    name: "Nitric Acid",
    vendor: "ChemCorp",
    density: "1.51 g/cm³",
    viscosity: "1.41 mPa·s",
    packaging: "Plastic Drum",
    pack_size: 50,
    unit: "L",
    quantity: 200,
  },
  {
    id: 10,
    name: "Ammonium Hydroxide",
    vendor: "BioChemicals",
    density: "0.91 g/cm³",
    viscosity: "1.1 mPa·s",
    packaging: "Plastic Container",
    pack_size: 25,
    unit: "L",
    quantity: 75,
  },
  {
    id: 11,
    name: "Sodium Hydroxide",
    vendor: "ChemSolutions",
    density: "2.13 g/cm³",
    viscosity: "0.67 mPa·s",
    packaging: "Steel Drum",
    pack_size: 50,
    unit: "Kg",
    quantity: 150,
  },
  {
    id: 12,
    name: "Phenol",
    vendor: "GlobalChem",
    density: "1.07 g/cm³",
    viscosity: "4.1 mPa·s",
    packaging: "Glass Bottle",
    pack_size: 10,
    unit: "L",
    quantity: 40,
  },
  {
    id: 13,
    name: "Sodium Bicarbonate",
    vendor: "LabSupply",
    density: "2.20 g/cm³",
    viscosity: "N/A",
    packaging: "Plastic Bag",
    pack_size: 25,
    unit: "Kg",
    quantity: 100,
  },
  {
    id: 14,
    name: "Calcium Chloride",
    vendor: "ChemCorp",
    density: "2.15 g/cm³",
    viscosity: "N/A",
    packaging: "Plastic Bag",
    pack_size: 25,
    unit: "Kg",
    quantity: 125,
  },
  {
    id: 15,
    name: "Potassium Chloride",
    vendor: "BioChemicals",
    density: "1.98 g/cm³",
    viscosity: "N/A",
    packaging: "Plastic Drum",
    pack_size: 50,
    unit: "Kg",
    quantity: 150,
  },
];

function populateTable(data) {
  const tableBody = document.getElementById("chemicalTableBody");
  tableBody.innerHTML = ""; // Clear the table body before populating
  data.forEach((chemical) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${chemical.id}</td>
      <td contenteditable="true">${chemical.name}</td>
      <td contenteditable="true">${chemical.vendor}</td>
      <td contenteditable="true">${chemical.density}</td>
      <td contenteditable="true">${chemical.viscosity}</td>
      <td contenteditable="true">${chemical.packaging}</td>
      <td contenteditable="true">${chemical.pack_size}</td>
      <td contenteditable="true">${chemical.unit}</td>
      <td contenteditable="true">${chemical.quantity}</td>
    `;
    row.addEventListener("click", () => selectRow(row));
    tableBody.appendChild(row);
  });
}

function selectRow(row) {
  if (selectedRow) {
    selectedRow.classList.remove("selected");
  }
  selectedRow = row;
  selectedRow.classList.add("selected");
}

function addEmptyRow() {
  const newChemical = {
    id: chemicals.length + 1,
    name: "",
    vendor: "",
    density: "",
    viscosity: "",
    packaging: "",
    pack_size: 0,
    unit: "",
    quantity: 0,
  };
  chemicals.push(newChemical);
  populateTable(chemicals);
}

function moveRow(direction) {
  if (!selectedRow) {
    alert("No row selected to move");
    return;
  }
  const index = Array.from(selectedRow.parentNode.children).indexOf(
    selectedRow
  );
  if (direction === -1 && index > 0) {
    const temp = chemicals[index];
    chemicals[index] = chemicals[index - 1];
    chemicals[index - 1] = temp;
  } else if (direction === 1 && index < chemicals.length - 1) {
    const temp = chemicals[index];
    chemicals[index] = chemicals[index + 1];
    chemicals[index + 1] = temp;
  }
  populateTable(chemicals);
}

function deleteRow() {
  if (!selectedRow) {
    alert("No row selected to delete");
    return;
  }
  const index = Array.from(selectedRow.parentNode.children).indexOf(
    selectedRow
  );
  chemicals.splice(index, 1);
  selectedRow.remove();
  selectedRow = null;
  alert("The selected row has been deleted.");

  saveData();
  refreshData();
}

function refreshData() {
  populateTable(chemicals);
  alert("Data restored from the last saved state.");
}

function saveData() {
  localStorage.setItem("chemicals", JSON.stringify(chemicals));
  alert("Data saved successfully!");
}

function openEditModal() {
  if (!selectedRow) {
    alert("No row selected for editing");
    return;
  }

  const cells = selectedRow.cells;
  document.getElementById("editName").value = cells[1].textContent;
  document.getElementById("editVendor").value = cells[2].textContent;
  document.getElementById("editDensity").value = cells[3].textContent;
  document.getElementById("editViscosity").value = cells[4].textContent;
  document.getElementById("editPackaging").value = cells[5].textContent;
  document.getElementById("editPackSize").value = cells[6].textContent;
  document.getElementById("editUnit").value = cells[7].textContent;
  document.getElementById("editQuantity").value = cells[8].textContent;

  const modal = new bootstrap.Modal(document.getElementById("editModal"));
  modal.show();
}

function saveEdit() {
  if (!selectedRow) {
    alert("No row selected for editing");
    return;
  }

  const id = selectedRow.cells[0].textContent;
  const index = chemicals.findIndex((chemical) => chemical.id == id);
  if (index !== -1) {
    chemicals[index].name = document.getElementById("editName").value;
    chemicals[index].vendor = document.getElementById("editVendor").value;
    chemicals[index].density = document.getElementById("editDensity").value;
    chemicals[index].viscosity = document.getElementById("editViscosity").value;
    chemicals[index].packaging = document.getElementById("editPackaging").value;
    chemicals[index].pack_size = document.getElementById("editPackSize").value;
    chemicals[index].unit = document.getElementById("editUnit").value;
    chemicals[index].quantity = document.getElementById("editQuantity").value;

    selectedRow.cells[1].textContent = chemicals[index].name;
    selectedRow.cells[2].textContent = chemicals[index].vendor;
    selectedRow.cells[3].textContent = chemicals[index].density;
    selectedRow.cells[4].textContent = chemicals[index].viscosity;
    selectedRow.cells[5].textContent = chemicals[index].packaging;
    selectedRow.cells[6].textContent = chemicals[index].pack_size;
    selectedRow.cells[7].textContent = chemicals[index].unit;
    selectedRow.cells[8].textContent = chemicals[index].quantity;

    const modal = bootstrap.Modal.getInstance(
      document.getElementById("editModal")
    );
    modal.hide();

    saveData();
    refreshData();
  } else {
    alert("Error: Chemical not found!");
  }
}

populateTable(chemicals);
