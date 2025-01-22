// Data Management
class VisitorManager {
    constructor() {
        this.visitors = JSON.parse(localStorage.getItem('dentalVisitors')) || [
            {
                id: 1,
                name: 'Agus Boday',
                phone: '08889623663',
                email: 'raffa@gmail.com',
                visitDate: '2025-05-15',
                waktu: '09:00 - 10:30',
                perawatan: 'Cabut Gigi',
                notes: 'Pasien dengan riwayat diabetes',
                status: 'Terjadwal'
            }
        ];
    }

    saveToLocalStorage() {
        localStorage.setItem('dentalVisitors', JSON.stringify(this.visitors));
    }

    addVisitor(visitor) {
        const newId = this.visitors.length > 0 ? Math.max(...this.visitors.map(v => v.id)) + 1 : 1;
        const newVisitor = { 
            id: newId, 
            ...visitor,
            status: 'Terjadwal',
            createdAt: new Date().toISOString()
        };
        this.visitors.push(newVisitor);
        this.saveToLocalStorage();
        return newVisitor;
    }

    updateVisitor(id, updatedData) {
        const index = this.visitors.findIndex(v => v.id === parseInt(id));
        if (index !== -1) {
            this.visitors[index] = { 
                ...this.visitors[index], 
                ...updatedData,
                updatedAt: new Date().toISOString()
            };
            this.saveToLocalStorage();
            return this.visitors[index];
        }
        return null;
    }

    deleteVisitor(id) {
        this.visitors = this.visitors.filter(v => v.id !== id);
        this.saveToLocalStorage();
    }

    getVisitor(id) {
        return this.visitors.find(v => v.id === id);
    }

    getAllVisitors() {
        return this.visitors;
    }

    searchVisitors(query) {
        query = query.toLowerCase();
        return this.visitors.filter(visitor => 
            visitor.name.toLowerCase().includes(query) ||
            visitor.email.toLowerCase().includes(query) ||
            visitor.phone.includes(query)
        );
    }
}

// Initialize Visitor Manager
const visitorManager = new VisitorManager();

// DOM Elements
const form = document.getElementById('form');
const visitorTableBody = document.getElementById('visitorTableBody');
const searchInput = document.getElementById('searchVisitor');

// Utility Functions
const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
};

const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('id-ID', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
};

const getStatusBadge = (status) => {
    const badges = {
        'Terjadwal': 'bg-primary',
        'Selesai': 'bg-success',
        'Dibatalkan': 'bg-danger',
        'Dalam Proses': 'bg-warning'
    };
    return `<span class="badge ${badges[status] || 'bg-secondary'}">${status}</span>`;
};

// Form Validation
const validateForm = (formData) => {
    const errors = [];
    
    if (!formData.name.match(/^[a-zA-Z\s]{3,50}$/)) {
        errors.push('Nama harus berupa huruf dan minimal 3 karakter');
    }
    
    if (!formData.phone.match(/^([0-9]{10,13})$/)) {
        errors.push('Nomor telepon harus valid (10-13 digit)');
    }
    
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        errors.push('Email tidak valid');
    }
    
    const selectedDate = new Date(formData.visitDate);
    const today = new Date();
    if (selectedDate < today) {
        errors.push('Tanggal kunjungan tidak boleh kurang dari hari ini');
    }

    return errors;
};

// Render Functions
const renderTable = (visitors = visitorManager.getAllVisitors()) => {
    visitorTableBody.innerHTML = visitors.map((visitor, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>
                <div class="d-flex align-items-center">
                    <div class="avatar avatar-sm me-2">
                        <div class="avatar-title rounded-circle bg-primary">
                            ${visitor.name.charAt(0)}
                        </div>
                    </div>
                    <div>
                        <div class="fw-bold">${visitor.name}</div>
                        <small class="text-muted">${visitor.phone}</small>
                    </div>
                </div>
            </td>
            <td>
                <div>${formatDate(visitor.visitDate)}</div>
                <small class="text-muted">${visitor.waktu}</small>
            </td>
            <td>
                <div class="fw-bold">${visitor.perawatan}</div>
                <small class="text-muted">Dokter ${visitor.doctor || 'Belum ditentukan'}</small>
            </td>
            <td>${getStatusBadge(visitor.status)}</td>
            <td>
                <div class="btn-group">
                    <button onclick="viewVisitor(${visitor.id})" class="btn btn-info btn-sm" title="Lihat Detail">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button onclick="editVisitor(${visitor.id})" class="btn btn-warning btn-sm" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="deleteVisitor(${visitor.id})" class="btn btn-danger btn-sm" title="Hapus">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
};

// Show/Hide Form
const showForm = () => {
    document.getElementById('visitorForm').style.display = 'block'; // Tampilkan form
};

const hideForm = () => {
    document.getElementById('visitorForm').style.display = 'none'; // Sembunyikan form
    form.reset(); // Reset form
    document.getElementById('editId').value = ''; // Hapus ID edit
};

// Event Handlers
const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        email: document.getElementById('email').value.trim(),
        visitDate: document.getElementById('visitDate').value,
        waktu: document.getElementById('waktu').value,
        perawatan: document.getElementById('perawatan').value,
        notes: document.getElementById('notes').value.trim()
    };

    const errors = validateForm(formData);
    
    if (errors.length > 0) {
        const errorList = errors.map(error => `<li>${error}</li>`).join('');
        showAlert(`<ul class="mb-0">${errorList}</ul>`, 'danger');
        return;
    }

    const editId = document.getElementById('editId').value;
    
    try {
        if (editId) {
            visitorManager.updateVisitor(parseInt(editId), formData);
            showAlert('Data kunjungan berhasil diperbarui!', 'success');
        } else {
            visitorManager.addVisitor(formData);
            showAlert('Jadwal kunjungan berhasil ditambahkan!', 'success');
        }
        
        renderTable(); // Perbarui tabel
        hideForm(); // Sembunyikan form
    } catch (error) {
        showAlert('Terjadi kesalahan saat menyimpan data.', 'danger');
        console.error(error);
    }
};

const viewVisitor = (id) => {
    const visitor = visitorManager.getVisitor(id);
    if (!visitor) return;

    document.getElementById('modalPatientName').textContent = visitor.name;
    document.getElementById('modalPatientId').textContent = `ID: P${visitor.id.toString().padStart(5, '0')}`;
    document.getElementById('modalVisitDate').textContent = formatDate(visitor.visitDate);
    document.getElementById('modalVisitTime').textContent = visitor.waktu;
    document.getElementById('modalTreatment').textContent = visitor.perawatan;
    document.getElementById('modalNotes').textContent = visitor.notes || '-';

    viewModal.show();
};

const editVisitor = (id) => {
    const visitor = visitorManager.getVisitor(id);
    if (!visitor) return;

    // Isi form dengan data visitor
    document.getElementById('name').value = visitor.name;
    document.getElementById('phone').value = visitor.phone;
    document.getElementById('email').value = visitor.email;
    document.getElementById('visitDate').value = visitor.visitDate;
    document.getElementById('waktu').value = visitor.waktu;
    document.getElementById('perawatan').value = visitor.perawatan;
    document.getElementById('notes').value = visitor.notes;

    // Set ID edit
    document.getElementById('editId').value = visitor.id;

    // Tampilkan form
    showForm();
};

const deleteVisitor = (id) => {
    Swal.fire({
        title: 'Hapus Jadwal?',
        text: "Data yang dihapus tidak dapat dikembalikan!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Ya, Hapus!',
        cancelButtonText: 'Batal'
    }).then((result) => {
        if (result.isConfirmed) {
            visitorManager.deleteVisitor(id);
            renderTable();
            showAlert('Data kunjungan berhasil dihapus!', 'success');
        }
    });
};

const showAlert = (message, type = 'info') => {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    const container = document.querySelector('.card-body');
    container.insertBefore(alertDiv, container.firstChild);
    
    setTimeout(() => alertDiv.remove(), 5000);
};

// Event Listeners
form.addEventListener('submit', handleSubmit);

if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const searchResults = visitorManager.searchVisitors(e.target.value);
        renderTable(searchResults);
    });
}

// Initialize
renderTable();