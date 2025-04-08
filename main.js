const editModal = new bootstrap.Modal(document.getElementById('editModal'));

function is_empty(string) {
  return string.trim().length === 0;
}

function getIndex(tbody) {
  return tbody.children.length || 0;
}

function addCurrentInventory() {
  const name = document.getElementById("current_order_product_name").value;
  const brand = document.getElementById("current_order_product_brand").value;
  const quantity = document.getElementById("current_order_product_quantity").value;
  const price = document.getElementById("current_order_product_price").value;

  if (is_empty(name) || is_empty(brand) || is_empty(quantity) || is_empty(price)) {
    alert("Please fill in all fields before adding.");
    return;
  }

  const tbody = document.getElementById("current_inventory_list");
  const index = getIndex(tbody);

  const tr = document.createElement("tr");
  tr.innerHTML = `
    <th scope='row'>${index + 1}</th>
    <td>${name}</td>
    <td>${brand}</td>
    <td>${quantity}</td>
    <td>$${price}</td>
    <td>
      <button class="btn btn-secondary btn-sm" onclick="cancelOrder(this)">Cancel</button>
      <button class="btn btn-warning btn-sm" onclick="openEditModal(this)">Edit</button>
    </td>
  `;
  tbody.appendChild(tr);
}

function cancelOrder(button) {
  const row = button.closest("tr");
  row.remove();
  reindexRows();
}

function openEditModal(button) {
  const row = button.closest("tr");
  const cells = row.querySelectorAll("td");

  document.getElementById("edit_product_name").value = cells[0].textContent;
  document.getElementById("edit_product_brand").value = cells[1].textContent;
  document.getElementById("edit_product_quantity").value = cells[2].textContent;
  document.getElementById("edit_product_price").value = cells[3].textContent.replace('$', '');

  document.getElementById("editing_row_index").value = row.rowIndex - 1;
  editModal.show();
}

function saveEdit() {
  const index = document.getElementById("editing_row_index").value;
  const name = document.getElementById("edit_product_name").value;
  const brand = document.getElementById("edit_product_brand").value;
  const quantity = document.getElementById("edit_product_quantity").value;
  const price = document.getElementById("edit_product_price").value;

  if (is_empty(name) || is_empty(brand) || is_empty(quantity) || is_empty(price)) {
    alert("Please fill in all fields before saving.");
    return;
  }

  const row = document.getElementById("current_inventory_list").rows[index];
  row.cells[1].textContent = name;
  row.cells[2].textContent = brand;
  row.cells[3].textContent = quantity;
  row.cells[4].textContent = `$${price}`;

  editModal.hide();
}

function reindexRows() {
  const rows = document.getElementById("current_inventory_list").rows;
  for (let i = 0; i < rows.length; i++) {
    rows[i].cells[0].textContent = i + 1;
  }
}
