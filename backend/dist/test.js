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
const alertContainer = document.getElementById('alertContainer');

// Utility Functions
const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
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
    document.getElementById('visitorForm').style.display = 'block';
};

const hideForm = () => {
    document.getElementById('visitorForm').style.display = 'none';
    form.reset();
    document.getElementById('editId').value = '';
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

    const editId = document.getElementById('editId').value;
    
    try {
        if (editId) {
            // Update existing visitor
            visitorManager.updateVisitor(parseInt(editId), formData);
            showAlert('Data kunjungan berhasil diperbarui!', 'success');
        } else {
            // Add new visitor
            visitorManager.addVisitor(formData);
            showAlert('Jadwal kunjungan berhasil ditambahkan!', 'success');
        }
        
        renderTable();
        hideForm();
    } catch (error) {
        showAlert('Terjadi kesalahan saat menyimpan data.', 'danger');
        console.error(error);
    }
};

const editVisitor = (id) => {
    const visitor = visitorManager.getVisitor(id);
    if (!visitor) return;

    document.getElementById('name').value = visitor.name;
    document.getElementById('phone').value = visitor.phone;
    document.getElementById('email').value = visitor.email;
    document.getElementById('visitDate').value = visitor.visitDate;
    document.getElementById('waktu').value = visitor.waktu;
    document.getElementById('perawatan').value = visitor.perawatan;
    document.getElementById('notes').value = visitor.notes;
    document.getElementById('editId').value = visitor.id;

    showForm();
};

const deleteVisitor = (id) => {
    if (confirm('Apakah Anda yakin ingin menghapus data kunjungan ini?')) {
        visitorManager.deleteVisitor(id);
        renderTable();
        showAlert('Data kunjungan berhasil dihapus!', 'success');
    }
};

const showAlert = (message, type) => {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.role = 'alert';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    alertContainer.innerHTML = '';
    alertContainer.appendChild(alertDiv);

    setTimeout(() => {
        alertDiv.classList.remove('show');
        alertDiv.classList.add('fade');
    }, 5000);
};

const viewVisitor = (id) => {
    const visitor = visitorManager.getVisitor(id);
    if (!visitor) return;

    // Tampilkan detail visitor dalam modal
    const visitorDetail = `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">${visitor.name}</h5>
                <p class="card-text"><strong>Telepon:</strong> ${visitor.phone}</p>
                <p class="card-text"><strong>Email:</strong> ${visitor.email}</p>
                <p class="card-text"><strong>Tanggal Kunjungan:</strong> ${formatDate(visitor.visitDate)}</p>
                <p class="card-text"><strong>Waktu:</strong> ${visitor.waktu}</p>
                <p class="card-text"><strong>Perawatan:</strong> ${visitor.perawatan}</p>
                <p class="card-text"><strong>Catatan:</strong> ${visitor.notes}</p>
                <p class="card-text"><strong>Status:</strong> ${getStatusBadge(visitor.status)}</p>
            </div>
        </div>
    `;

    // Isi konten modal dengan detail visitor
    document.getElementById('visitorDetailContent').innerHTML = visitorDetail;

    // Tampilkan modal
    const visitorDetailModal = new bootstrap.Modal(document.getElementById('visitorDetailModal'));
    visitorDetailModal.show();
};

// Event Listeners
form.addEventListener('submit', handleSubmit);

// Initial Render
renderTable();