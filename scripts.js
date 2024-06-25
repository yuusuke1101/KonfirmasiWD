document.addEventListener('DOMContentLoaded', (event) => {
    loadTableData();
});

function sendMessage(username, nama, noWhatsApp) {
    if (noWhatsApp.startsWith('0')) {
        noWhatsApp = '+62' + noWhatsApp.slice(1);
    }

    var message = "Assalamualaikum saya dari bemat, memberitahukan kepada " + nama + " sebagai pemilik akun " + username + " untuk segera melengkapi data bank karena akun tersebut melakukan Withdraw/Penarikan, supaya proses tidak terjadi pending, harap lengkapi data bank dengan mengisi form dibawah\n\nNama bank :\nNomor Rekening :\nAtas Nama :";

    var url = "https://wa.me/" + noWhatsApp + "?text=" + encodeURIComponent(message);
    window.open(url, '_blank');
}

function addRow(username, nama, noWhatsApp) {
    var table = document.getElementById('data-table').getElementsByTagName('tbody')[0];
    var newRow = table.insertRow();

    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    var cell4 = newRow.insertCell(3);

    cell1.innerHTML = username;
    cell2.innerHTML = nama;
    cell3.innerHTML = noWhatsApp;
    cell4.innerHTML = `
        <div class="action-buttons">
            <button class="send-button" onclick="sendMessage('${username}', '${nama}', '${noWhatsApp}')">Kirim Ulang</button>
            <button class="edit-button" onclick="editRow(this)">Edit</button>
            <button class="delete-button" onclick="deleteRow(this)">Hapus</button>
        </div>
    `;

    saveTableData(); // Save the table data after adding a new row
}

function editRow(button) {
    var row = button.parentNode.parentNode.parentNode;
    var username = row.cells[0].innerHTML;
    var nama = row.cells[1].innerHTML;
    var noWhatsApp = row.cells[2].innerHTML;

    document.getElementById('username').value = username;
    document.getElementById('nama').value = nama;
    document.getElementById('noWhatsApp').value = noWhatsApp;

    row.parentNode.removeChild(row);
    saveTableData(); // Save the table data after editing
}

function deleteRow(button) {
    var row = button.parentNode.parentNode.parentNode;
    row.parentNode.removeChild(row);
    saveTableData(); // Save the table data after deleting a row
}

function handleSubmit(event) {
    event.preventDefault();
    var username = document.getElementById('username').value;
    var nama = document.getElementById('nama').value;
    var noWhatsApp = document.getElementById('noWhatsApp').value;

    sendMessage(username, nama, noWhatsApp);
    addRow(username, nama, noWhatsApp);

    document.getElementById('form').reset();
}

function saveTableData() {
    var tableData = [];
    var table = document.getElementById('data-table').getElementsByTagName('tbody')[0];
    for (var i = 0, row; row = table.rows[i]; i++) {
        var rowData = {
            username: row.cells[0].innerHTML,
            nama: row.cells[1].innerHTML,
            noWhatsApp: row.cells[2].innerHTML
        };
        tableData.push(rowData);
    }
    localStorage.setItem('tableData', JSON.stringify(tableData));
}

function loadTableData() {
    var tableData = JSON.parse(localStorage.getItem('tableData')) || [];
    tableData.forEach(data => {
        addRow(data.username, data.nama, data.noWhatsApp);
    });
}
