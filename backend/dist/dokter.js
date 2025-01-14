// Initial data
let visitors = [
    {
        id: 1,
        name: 'Agus Boday',
        phone: '08889623663',
        email: 'raffa@gmail.com',
        jadwal: '10:00 - 12:00',
        jk: 'Laki - Laki',
        spesialis: 'Cabut Gigi',
    }
];

// DOM Elements
const form = document.getElementById('form');
const visitorTableBody = document.getElementById('visitorTableBody');
const viewModal = new bootstrap.Modal(document.getElementById('viewModal'));

// Render table
function renderTable() {
    visitorTableBody.innerHTML = visitors.map((visitor, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${visitor.name}</td>
            <td>${visitor.phone}</td>
            <td>${visitor.email}</td>
            <td>${visitor.spesialis}</td>
            <td>
                <button onclick="viewVisitor(${visitor.id})" class="btn btn-info btn-sm">
                    <i class="fa-solid fa-eye"></i>
                </button>
                <button onclick="editVisitor(${visitor.id})" class="btn btn-warning btn-sm">
                    <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button onclick="deleteVisitor(${visitor.id})" class="btn btn-danger btn-sm">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// Format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Show/Hide form
function showForm() {
    document.getElementById('visitorForm').style.display = 'block';
}

function hideForm() {
    document.getElementById('visitorForm').style.display = 'none';
    form.reset();
    document.getElementById('editId').value = '';
}

// CRUD Operations
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        jadwal: document.getElementById('jadwal').value,
        spesialis: document.getElementById('spesialis').value,
        jk: document.getElementById('jk').value
    };

    const editId = document.getElementById('editId').value;
    
    if (editId) {
        // Update
        const index = visitors.findIndex(v => v.id === parseInt(editId));
        visitors[index] = { ...visitors[index], ...formData };
    } else {
        // Create
        const newId = visitors.length > 0 ? Math.max(...visitors.map(v => v.id)) + 1 : 1;
        visitors.push({ id: newId, ...formData });
    }

    renderTable();
    hideForm();
});

function viewVisitor(id) {
    const visitor = visitors.find(v => v.id === id);
    document.getElementById('viewModalBody').innerHTML = `
        <dl class="row">
            <dt class="col-sm-4">Nama</dt>
            <dd class="col-sm-8">${visitor.name}</dd>
            
            <dt class="col-sm-4">No Telpon</dt>
            <dd class="col-sm-8">${visitor.phone}</dd>
            
            <dt class="col-sm-4">Email</dt>
            <dd class="col-sm-8">${visitor.email}</dd>
            
            <dt class="col-sm-4">Jadwal</dt>
            <dd class="col-sm-8">${visitor.jadwal}</dd>

            <dt class="col-sm-4">Jenis Kelamin</dt>
            <dd class="col-sm-8">${visitor.jk}</dd>

            <dt class="col-sm-4">Spesialis</dt>
            <dd class="col-sm-8">${visitor.spesialis}</dd>
        </dl>
    `;
    viewModal.show();
}

function editVisitor(id) {
    const visitor = visitors.find(v => v.id === id);
    document.getElementById('editId').value = visitor.id;
    document.getElementById('name').value = visitor.name;
    document.getElementById('phone').value = visitor.phone;
    document.getElementById('email').value = visitor.email;
    document.getElementById('jk').value = visitor.jk;
    document.getElementById('jadwal').value = visitor.jadwal; // Add this line
    document.getElementById('spesialis').value = visitor.spesialis; // Add this line
    showForm();
}

function deleteVisitor(id) {
    if (confirm('Are you sure you want to delete this visitor?')) {
        visitors = visitors.filter(v => v.id !== id);
        renderTable();
    }
}

// Initial render
renderTable();