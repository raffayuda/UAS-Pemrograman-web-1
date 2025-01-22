// Data Management
class PatientManager {
    constructor() {
        this.patients = JSON.parse(localStorage.getItem('dentalPatients')) || [
            {
                id: 1,
                name: 'Vincent',
                phone: '08121234567',
                email: 'vincent@klinik.com',
                perawatan: 'Konsultasi',
                status: 'Selesai',
                alamat: 'Jl. babengket No. 123, Bogor',
                createdAt: new Date().toISOString()
            },
            {
                id: 2,
                name: 'Siregar',
                phone: '08889623663',
                email: 'siregar@klinik.com',
                perawatan: 'Cabut Gigi',
                status: 'Selesai',
                alamat: 'Jl. margonda No. 123, Depok',
                createdAt: new Date().toISOString()
            },
        ];
    }

    saveToLocalStorage() {
        localStorage.setItem('dentalPatients', JSON.stringify(this.patients));
    }

    addPatient(patient) {
        const newId = this.patients.length > 0 ? Math.max(...this.patients.map(p => p.id)) + 1 : 1;
        const newPatient = { 
            id: newId, 
            ...patient,
            createdAt: new Date().toISOString()
        };
        this.patients.push(newPatient);
        this.saveToLocalStorage();
        return newPatient;
    }

    updatePatient(id, updatedData) {
        const index = this.patients.findIndex(p => p.id === parseInt(id));
        if (index !== -1) {
            this.patients[index] = { 
                ...this.patients[index], 
                ...updatedData,
                updatedAt: new Date().toISOString()
            };
            this.saveToLocalStorage();
            return this.patients[index];
        }
        return null;
    }

    deletePatient(id) {
        this.patients = this.patients.filter(p => p.id !== id);
        this.saveToLocalStorage();
    }

    getPatient(id) {
        return this.patients.find(p => p.id === id);
    }

    getAllPatients() {
        return this.patients;
    }

    searchPatients(query, status = '') {
        return this.patients.filter(patient => {
            const matchesQuery = query.toLowerCase().split(' ').every(term =>
                patient.name.toLowerCase().includes(term) ||
                patient.email.toLowerCase().includes(term) ||
                patient.perawatan.toLowerCase().includes(term)
            );
            
            const matchesStatus = !status || 
                patient.status === status;

            return matchesQuery && matchesStatus;
        });
    }
}

// Initialize Patient Manager
const patientManager = new PatientManager();

// DOM Elements
const form = document.getElementById('form');
const patientTableBody = document.getElementById('visitorTableBody');
const searchInput = document.getElementById('searchPatient');
const filterStatus = document.getElementById('filterStatus');

// Form Validation
const validateForm = (formData) => {
    const errors = [];
    
    if (!formData.name.match(/^[a-zA-Z\s.]{3,50}$/)) {
        errors.push('Nama harus berupa huruf dan minimal 3 karakter');
    }
    
    if (!formData.phone.match(/^([0-9]{10,13})$/)) {
        errors.push('Nomor telepon harus valid (10-13 digit)');
    }
    
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        errors.push('Email tidak valid');
    }

    if (!formData.perawatan) {
        errors.push('Perawatan harus dipilih');
    }

    if (!formData.status) {
        errors.push('Status harus dipilih');
    }

    return errors;
};

// Render Functions
const renderTable = (patients = patientManager.getAllPatients()) => {
    patientTableBody.innerHTML = patients.map((patient, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${patient.name}</td>
            <td>${patient.phone}</td>
            <td>${patient.email}</td>
            <td>${patient.perawatan}</td>
            <td>
                <span class="badge ${patient.status === 'Selesai' ? 'bg-success' : 'bg-warning'}">
                    ${patient.status}
                </span>
            </td>
            <td class="text-center">
                <button class="btn btn-sm btn-outline-info me-1" onclick="viewPatient(${patient.id})">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-sm btn-outline-primary me-1" onclick="editPatient(${patient.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger" onclick="deletePatient(${patient.id})">
                    <i class="fas fa-trash"></i>
                </button>
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

// Handle Form Submission
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        perawatan: document.getElementById('perawatan').value,
        status: document.getElementById('status').value,
        alamat: document.getElementById('alamat').value
    };

    const errors = validateForm(formData);
    if (errors.length > 0) {
        alert(errors.join('\n'));
        return;
    }

    const editId = document.getElementById('editId').value;
    if (editId) {
        // Update existing patient
        const updatedPatient = patientManager.updatePatient(editId, formData);
        if (updatedPatient) {
            alert('Data pasien berhasil diperbarui!');
            renderTable();
            hideForm();
        }
    } else {
        // Add new patient
        const newPatient = patientManager.addPatient(formData);
        if (newPatient) {
            alert('Data pasien berhasil ditambahkan!');
            renderTable();
            hideForm();
        }
    }
});

// Edit Patient
const editPatient = (id) => {
    const patient = patientManager.getPatient(id);
    if (patient) {
        document.getElementById('editId').value = patient.id;
        document.getElementById('name').value = patient.name;
        document.getElementById('phone').value = patient.phone;
        document.getElementById('email').value = patient.email;
        document.getElementById('perawatan').value = patient.perawatan;
        document.getElementById('status').value = patient.status;
        document.getElementById('alamat').value = patient.alamat;
        showForm();
    }
};

// Delete Patient
const deletePatient = (id) => {
    if (confirm('Apakah Anda yakin ingin menghapus data pasien ini?')) {
        patientManager.deletePatient(id);
        renderTable();
        alert('Data pasien berhasil dihapus!');
    }
};

// View Patient Details
const viewPatient = (id) => {
    const patient = patientManager.getPatient(id);
    if (patient) {
        const modalBody = document.getElementById('viewModalBody');
        modalBody.innerHTML = `
            <div class="row">
                <div class="col-md-6">
                    <p><strong>Nama:</strong></p>
                    <p><strong>No. Telepon:</strong></p>
                    <p><strong>Email:</strong></p>
                    <p><strong>Perawatan:</strong></p>
                    <p><strong>Status:</strong></p>
                    <p><strong>Alamat:</strong></p>
                </div>
                <div class="col-md-6">
                    <p>${patient.name}</p>
                    <p>${patient.phone}</p>
                    <p>${patient.email}</p>
                    <p>${patient.perawatan}</p>
                    <p><span class="badge ${patient.status === 'Selesai' ? 'bg-success' : 'bg-warning'}">
                        ${patient.status}
                    </span></p>
                    <p>${patient.alamat}</p>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-md-12">
                    <p><strong>Dibuat Pada:</strong> ${new Date(patient.createdAt).toLocaleString()}</p>
                    ${patient.updatedAt ? `<p><strong>Diperbarui Pada:</strong> ${new Date(patient.updatedAt).toLocaleString()}</p>` : ''}
                </div>
            </div>
        `;

        // Tampilkan modal
        const viewModal = new bootstrap.Modal(document.getElementById('viewModal'));
        viewModal.show();
    }
};

// Search and Filter
searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim();
    const status = filterStatus.value;
    const filteredPatients = patientManager.searchPatients(query, status);
    renderTable(filteredPatients);
});

filterStatus.addEventListener('change', () => {
    const query = searchInput.value.trim();
    const status = filterStatus.value;
    const filteredPatients = patientManager.searchPatients(query, status);
    renderTable(filteredPatients);
});

// Initial Render
renderTable();