// Data Management
class DoctorManager {
    constructor() {
        this.doctors = JSON.parse(localStorage.getItem('dentalDoctors')) || [
            {
                id: 1,
                name: 'drg. Raffa Yuda',
                phone: '08121234567',
                email: 'raffa@klinik.com',
                jadwal: '09:00 - 12:00',
                jk: 'Laki-laki',
                spesialis: 'Periodontis',
                certification: 'Sertifikasi Periodontis dari PDGI, pengalaman 10 tahun',
                status: 'Aktif',
                createdAt: new Date().toISOString()
            },
            {
                id: 2,
                name: 'drg. Alfiansyah',
                phone: '08121234567',
                email: 'alfi@klinik.com',
                jadwal: '09:00 - 12:00',
                jk: 'Laki-laki',
                spesialis: 'Ortodontist',
                certification: 'Sertifikasi Ortodontist dari PDGI, pengalaman 10 tahun',
                status: 'Aktif',
                createdAt: new Date().toISOString()
            },
            {
                id: 3,
                name: 'drg. Razan',
                phone: '08121234567',
                email: 'razan@klinik.com',
                jadwal: '09:00 - 12:00',
                jk: 'Laki-laki',
                spesialis: 'Endodontist',
                certification: 'Sertifikasi Endodontist dari PDGI, pengalaman 10 tahun',
                status: 'Aktif',
                createdAt: new Date().toISOString()
            },
            {
                id: 4,
                name: 'drg. Ayu',
                phone: '08121234567',
                email: 'raffa@klinik.com',
                jadwal: '09:00 - 12:00',
                jk: 'Perempuan',
                spesialis: 'Endodontist',
                certification: 'Sertifikasi Endodontist dari PDGI, pengalaman 10 tahun',
                status: 'Aktif',
                createdAt: new Date().toISOString()
            }
        ];
    }

    saveToLocalStorage() {
        localStorage.setItem('dentalDoctors', JSON.stringify(this.doctors));
    }

    addDoctor(doctor) {
        const newId = this.doctors.length > 0 ? Math.max(...this.doctors.map(d => d.id)) + 1 : 1;
        const newDoctor = { 
            id: newId, 
            ...doctor,
            status: 'Aktif',
            createdAt: new Date().toISOString()
        };
        this.doctors.push(newDoctor);
        this.saveToLocalStorage();
        return newDoctor;
    }

    updateDoctor(id, updatedData) {
        const index = this.doctors.findIndex(d => d.id === parseInt(id));
        if (index !== -1) {
            this.doctors[index] = { 
                ...this.doctors[index], 
                ...updatedData,
                updatedAt: new Date().toISOString()
            };
            this.saveToLocalStorage();
            return this.doctors[index];
        }
        return null;
    }

    deleteDoctor(id) {
        this.doctors = this.doctors.filter(d => d.id !== id);
        this.saveToLocalStorage();
    }

    getDoctor(id) {
        return this.doctors.find(d => d.id === id);
    }

    getAllDoctors() {
        return this.doctors;
    }

    searchDoctors(query, specialization = '') {
        return this.doctors.filter(doctor => {
            const matchesQuery = query.toLowerCase().split(' ').every(term =>
                doctor.name.toLowerCase().includes(term) ||
                doctor.email.toLowerCase().includes(term) ||
                doctor.spesialis.toLowerCase().includes(term)
            );
            
            const matchesSpecialization = !specialization || 
                doctor.spesialis === specialization;

            return matchesQuery && matchesSpecialization;
        });
    }
}

// Initialize Doctor Manager
const doctorManager = new DoctorManager();

// DOM Elements
const form = document.getElementById('form');
const doctorTableBody = document.getElementById('visitorTableBody');
const searchInput = document.getElementById('searchDoctor');
const filterSpecialist = document.getElementById('filterSpecialist');

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

    if (!formData.jadwal) {
        errors.push('Jadwal praktik harus dipilih');
    }

    if (!formData.spesialis) {
        errors.push('Spesialisasi harus dipilih');
    }

    return errors;
};

// Render Functions
const renderTable = (doctors = doctorManager.getAllDoctors()) => {
    doctorTableBody.innerHTML = doctors.map((doctor, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>
                <div class="d-flex align-items-center">
                    <div class="avatar me-2">
                        <i class="fas fa-user-md fa-lg text-primary"></i>
                    </div>
                    <div>
                        <h6 class="mb-0">${doctor.name}</h6>
                        <small class="text-muted">${doctor.spesialis}</small>
                    </div>
                </div>
            </td>
            <td>${doctor.phone}</td>
            <td>${doctor.email}</td>
            <td>${doctor.spesialis}</td>
            <td class="text-center">
                <button class="btn btn-sm btn-outline-info me-1" onclick="viewDoctor(${doctor.id})">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-sm btn-outline-primary me-1" onclick="editDoctor(${doctor.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger" onclick="deleteDoctor(${doctor.id})">
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
        jadwal: document.getElementById('jadwal').value,
        jk: document.getElementById('jk').value,
        spesialis: document.getElementById('spesialis').value,
        certification: document.getElementById('certification').value
    };

    const errors = validateForm(formData);
    if (errors.length > 0) {
        alert(errors.join('\n'));
        return;
    }

    const editId = document.getElementById('editId').value;
    if (editId) {
        // Update existing doctor
        const updatedDoctor = doctorManager.updateDoctor(editId, formData);
        if (updatedDoctor) {
            alert('Data dokter berhasil diperbarui!');
            renderTable();
            hideForm();
        }
    } else {
        // Add new doctor
        const newDoctor = doctorManager.addDoctor(formData);
        if (newDoctor) {
            alert('Data dokter berhasil ditambahkan!');
            renderTable();
            hideForm();
        }
    }
});

// Edit Doctor
const editDoctor = (id) => {
    const doctor = doctorManager.getDoctor(id);
    if (doctor) {
        document.getElementById('editId').value = doctor.id;
        document.getElementById('name').value = doctor.name;
        document.getElementById('phone').value = doctor.phone;
        document.getElementById('email').value = doctor.email;
        document.getElementById('jadwal').value = doctor.jadwal; // Set nilai jadwal
        document.getElementById('spesialis').value = doctor.spesialis; // Set nilai jadwal
        document.getElementById('jk').value = doctor.jk; // Set nilai jadwal
        document.getElementById('certification').value = doctor.certification;
        showForm();
    }
};

// Delete Doctor
const deleteDoctor = (id) => {
    if (confirm('Apakah Anda yakin ingin menghapus data dokter ini?')) {
        doctorManager.deleteDoctor(id);
        renderTable();
        alert('Data dokter berhasil dihapus!');
    }
};

// View Doctor Details
const viewDoctor = (id) => {
    const doctor = doctorManager.getDoctor(id);
    if (doctor) {
        const modalBody = document.getElementById('viewModalBody');
        modalBody.innerHTML = `
            <div class="row">
                <div class="col-md-6">
                    <p><strong>Nama:</strong></p>
                    <p><strong>No. Telepon:</strong></p>
                    <p><strong>Email:</strong></p>
                    <p><strong>Jadwal Praktik:</strong></p>
                    <p><strong>Jenis Kelamin:</strong></p>
                    <p><strong>Spesialisasi:</strong></p>
                    <p><strong>Sertifikasi & Pengalaman:</strong></p>
                </div>
                <div class="col-md-6">
                    <p>${doctor.name}</p>
                    <p>${doctor.phone}</p>
                    <p>${doctor.email}</p>
                    <p>${doctor.jadwal}</p>
                    <p>${doctor.jk}</p>
                    <p>${doctor.spesialis}</p>
                    <p>${doctor.certification}</p>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-md-12">
                    <p><strong>Dibuat Pada:</strong> ${new Date(doctor.createdAt).toLocaleString()}</p>
                    ${doctor.updatedAt ? `<p><strong>Diperbarui Pada:</strong> ${new Date(doctor.updatedAt).toLocaleString()}</p>` : ''}
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
    const specialization = filterSpecialist.value;
    const filteredDoctors = doctorManager.searchDoctors(query, specialization);
    renderTable(filteredDoctors);
});

filterSpecialist.addEventListener('change', () => {
    const query = searchInput.value.trim();
    const specialization = filterSpecialist.value;
    const filteredDoctors = doctorManager.searchDoctors(query, specialization);
    renderTable(filteredDoctors);
});

// Initial Render
renderTable();