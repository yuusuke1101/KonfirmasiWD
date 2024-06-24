// Simulasi penyimpanan saldo mitra
let saldoMitra = 0;

// Fungsi untuk mengupdate tampilan saldo mitra
function updateSaldo() {
    document.getElementById('saldo').textContent = saldoMitra;
}

// Mengirim permintaan Top Up
document.getElementById('topUpForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const amount = parseFloat(document.getElementById('topUpAmount').value);
    if (amount > 0) {
        // Kirim permintaan ke Admin
        alert('Permintaan Top Up sebesar ' + amount + ' telah dikirim ke Admin.');
        // Simulasi: tambahkan permintaan ke daftar top up di admin
        const requestHtml = `<div class="alert alert-primary" role="alert">
            Permintaan Top Up: ${amount} 
            <button class="btn btn-success btn-sm" onclick="approveTopUp(${amount})">Terima</button>
            <button class="btn btn-danger btn-sm" onclick="rejectTopUp()">Tolak</button>
        </div>`;
        document.getElementById('topUpRequests').innerHTML += requestHtml;
    }
});

// Mengirim permintaan Withdraw
document.getElementById('withdrawForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const amount = parseFloat(document.getElementById('withdrawAmount').value);
    if (amount > 0 && amount <= saldoMitra) {
        // Kirim permintaan ke Admin
        alert('Permintaan Withdraw sebesar ' + amount + ' telah dikirim ke Admin.');
        // Simulasi: tambahkan permintaan ke daftar withdraw di admin
        const requestHtml = `<div class="alert alert-warning" role="alert">
            Permintaan Withdraw: ${amount} 
            <button class="btn btn-success btn-sm" onclick="approveWithdraw(${amount})">Terima</button>
            <button class="btn btn-danger btn-sm" onclick="rejectWithdraw()">Tolak</button>
        </div>`;
        document.getElementById('withdrawRequests').innerHTML += requestHtml;
    }
});

// Fungsi untuk menerima Top Up
function approveTopUp(amount) {
    saldoMitra += amount;
    updateSaldo();
    alert('Top Up sebesar ' + amount + ' telah diterima.');
    // Hapus permintaan dari daftar
    event.target.parentElement.remove();
}

// Fungsi untuk menolak Top Up
function rejectTopUp() {
    alert('Permintaan Top Up ditolak.');
    // Hapus permintaan dari daftar
    event.target.parentElement.remove();
}

// Fungsi untuk menerima Withdraw
function approveWithdraw(amount) {
    saldoMitra -= amount;
    updateSaldo();
    alert('Withdraw sebesar ' + amount + ' telah diterima.');
    // Hapus permintaan dari daftar
    event.target.parentElement.remove();
}

// Fungsi untuk menolak Withdraw
function rejectWithdraw() {
    alert('Permintaan Withdraw ditolak.');
    // Hapus permintaan dari daftar
    event.target.parentElement.remove();
}

// Inisialisasi tampilan awal saldo
updateSaldo();