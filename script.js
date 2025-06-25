document.addEventListener('DOMContentLoaded', function() {
    // Sample data for the system
    let patients = [
        { id: 1, name: 'John Doe', gender: 'Male', age: 35, phone: '555-1234', email: 'john@example.com', address: '123 Main St', medicalHistory: 'None', status: 'active' },
        { id: 2, name: 'Jane Smith', gender: 'Female', age: 28, phone: '555-5678', email: 'jane@example.com', address: '456 Oak Ave', medicalHistory: 'Allergy to penicillin', status: 'active' },
        { id: 3, name: 'Robert Johnson', gender: 'Male', age: 45, phone: '555-9012', email: 'robert@example.com', address: '789 Pine Rd', medicalHistory: 'High blood pressure', status: 'inactive' }
    ];

    let doctors = [
        { id: 1, name: 'Dr. Sarah Williams', specialization: 'Lungs Cancer', department: 'Cardiology', phone: '555-1111', email: 'sarah@example.com', address: '123 Clinic St', fee: 150, experience: 10, qualification: 'MD, Cardiology', days: ['Monday', 'Wednesday', 'Friday'], startTime: '09:00', endTime: '17:00' },
        { id: 2, name: 'Dr. Michael Brown', specialization: 'Skin Cancer', department: 'Neurology', phone: '555-2222', email: 'michael@example.com', address: '456 Hospital Ave', fee: 200, experience: 15, qualification: 'MD, Neurology', days: ['Tuesday', 'Thursday'], startTime: '10:00', endTime: '16:00' },
        { id: 3, name: 'Dr. Emily Davis', specialization: 'Blood Cancer', department: 'Pediatrics', phone: '555-3333', email: 'emily@example.com', address: '789 Medical Rd', fee: 120, experience: 8, qualification: 'MD, Pediatrics', days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], startTime: '08:00', endTime: '18:00' }
    ];

    let appointments = [
        { id: 1, patientId: 1, doctorId: 1, department: 'Skin Cancer', date: '2023-06-15', time: '10:00', reason: 'Heart checkup', status: 'completed' },
        { id: 2, patientId: 2, doctorId: 3, department: 'Blood Cancer', date: '2023-06-16', time: '14:30', reason: 'Child vaccination', status: 'scheduled' },
        { id: 3, patientId: 3, doctorId: 2, department: 'Skin Cancer', date: '2023-06-17', time: '11:15', reason: 'Headache consultation', status: 'canceled' }
    ];

    let departments = [
        { id: 1, name: 'Lungs', description: 'Heart and cardiovascular system care', head: 1, phone: '555-4444', email: 'cardio@example.com', location: 'Floor 1, Room 101' },
        { id: 2, name: 'Skins', description: 'Brain and nervous system care', head: 2, phone: '555-5555', email: 'neuro@example.com', location: 'Floor 2, Room 201' },
        { id: 3, name: 'Blood', description: 'Child healthcare', head: 3, phone: '555-6666', email: 'peds@example.com', location: 'Floor 1, Room 105' },
        { id: 4, name: 'Others', description: 'Bone and joint care', head: null, phone: '555-7777', email: 'ortho@example.com', location: 'Floor 2, Room 210' }
    ];

    // Navigation between sections
    const navLinks = document.querySelectorAll('nav a');
    const contentSections = document.querySelectorAll('.content-section');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and sections
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            contentSections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked link and corresponding section
            this.classList.add('active');
            const sectionId = this.getAttribute('data-section');
            document.getElementById(sectionId).classList.add('active');
            
            // Load data for the section
            switch(sectionId) {
                case 'dashboard':
                    loadDashboard();
                    break;
                case 'patients':
                    loadPatients();
                    break;
                case 'doctors':
                    loadDoctors();
                    break;
                case 'appointments':
                    loadAppointments();
                    break;
                case 'departments':
                    loadDepartments();
                    break;
                case 'reports':
                    loadReports();
                    break;
            }
        });
    });

    // Initialize dashboard on page load
    loadDashboard();

    // Modal functionality
    const modals = {
        patient: {
            btn: document.getElementById('add-patient-btn'),
            modal: document.getElementById('patient-modal'),
            form: document.getElementById('patient-form'),
            close: document.querySelector('#patient-modal .close')
        },
        doctor: {
            btn: document.getElementById('add-doctor-btn'),
            modal: document.getElementById('doctor-modal'),
            form: document.getElementById('doctor-form'),
            close: document.querySelector('#doctor-modal .close')
        },
        appointment: {
            btn: document.getElementById('add-appointment-btn'),
            modal: document.getElementById('appointment-modal'),
            form: document.getElementById('appointment-form'),
            close: document.querySelector('#appointment-modal .close')
        },
        department: {
            btn: document.getElementById('add-department-btn'),
            modal: document.getElementById('department-modal'),
            form: document.getElementById('department-form'),
            close: document.querySelector('#department-modal .close')
        }
    };

    // Set up modal open/close events
    Object.keys(modals).forEach(key => {
        const m = modals[key];
        
        // Open modal
        if (m.btn) {
            m.btn.addEventListener('click', () => {
                m.modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
                
                // Special setup for appointment modal
                if (key === 'appointment') {
                    populatePatientDropdown();
                    populateDoctorDropdown();
                }
                
                // Special setup for department modal
                if (key === 'department') {
                    populateDepartmentHeadDropdown();
                }
            });
        }
        
        // Close modal
        if (m.close) {
            m.close.addEventListener('click', () => {
                m.modal.style.display = 'none';
                document.body.style.overflow = 'auto';
                m.form.reset();
            });
        }
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        Object.keys(modals).forEach(key => {
            const m = modals[key];
            if (e.target === m.modal) {
                m.modal.style.display = 'none';
                document.body.style.overflow = 'auto';
                m.form.reset();
            }
        });
    });

    // Form submissions
    modals.patient.form.addEventListener('submit', function(e) {
        e.preventDefault();
        addPatient();
    });

    modals.doctor.form.addEventListener('submit', function(e) {
        e.preventDefault();
        addDoctor();
    });

    modals.appointment.form.addEventListener('submit', function(e) {
        e.preventDefault();
        addAppointment();
    });

    modals.department.form.addEventListener('submit', function(e) {
        e.preventDefault();
        addDepartment();
    });

    // Report filters
    const reportPeriod = document.getElementById('report-period');
    const customDateRange = document.querySelector('.custom-date-range');

    reportPeriod.addEventListener('change', function() {
        if (this.value === 'custom') {
            customDateRange.style.display = 'flex';
        } else {
            customDateRange.style.display = 'none';
        }
    });

    document.getElementById('generate-report-btn').addEventListener('click', generateReport);
    document.getElementById('export-report-btn').addEventListener('click', exportReport);

    // Search functionality
    document.getElementById('patient-search').addEventListener('input', filterPatients);
    document.getElementById('doctor-search').addEventListener('input', filterDoctors);
    document.getElementById('appointment-search').addEventListener('input', filterAppointments);
    document.getElementById('department-search').addEventListener('input', filterDepartments);

    // Filter functionality
    document.getElementById('patient-filter').addEventListener('change', filterPatients);
    document.getElementById('doctor-filter').addEventListener('change', filterDoctors);
    document.getElementById('appointment-filter-status').addEventListener('change', filterAppointments);
    document.getElementById('appointment-filter-date').addEventListener('change', filterAppointments);

    // Functions to load each section
    function loadDashboard() {
        // Update stats
        document.getElementById('total-patients').textContent = patients.length;
        document.getElementById('total-doctors').textContent = doctors.length;
        document.getElementById('today-appointments').textContent = appointments.filter(a => a.date === new Date().toISOString().split('T')[0]).length;
        document.getElementById('total-departments').textContent = departments.length;

        // Load recent appointments
        const recentAppointments = [...appointments].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
        const tbody = document.querySelector('#recent-appointments tbody');
        tbody.innerHTML = '';

        recentAppointments.forEach(appt => {
            const patient = patients.find(p => p.id === appt.patientId);
            const doctor = doctors.find(d => d.id === appt.doctorId);
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${patient ? patient.name : 'Unknown'}</td>
                <td>${doctor ? doctor.name : 'Unknown'}</td>
                <td>${appt.department}</td>
                <td>${formatDate(appt.date)}</td>
                <td>${appt.time}</td>
                <td><span class="status-badge ${appt.status}">${capitalizeFirstLetter(appt.status)}</span></td>
            `;
            tbody.appendChild(row);
        });

        // Initialize charts
        initDashboardCharts();
    }

    function loadPatients() {
        const tbody = document.querySelector('#patients-table tbody');
        tbody.innerHTML = '';

        patients.forEach(patient => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${patient.id}</td>
                <td>${patient.name}</td>
                <td>${patient.gender}</td>
                <td>${patient.age}</td>
                <td>${patient.phone}</td>
                <td>${patient.address}</td>
                <td><span class="status-badge ${patient.status}">${capitalizeFirstLetter(patient.status)}</span></td>
                <td>
                    <button class="btn btn-sm btn-primary"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    function loadDoctors() {
        const tbody = document.querySelector('#doctors-table tbody');
        tbody.innerHTML = '';

        doctors.forEach(doctor => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${doctor.id}</td>
                <td>${doctor.name}</td>
                <td>${doctor.specialization}</td>
                <td>${doctor.phone}</td>
                <td>${doctor.email}</td>
                <td>${doctor.days.join(', ')} ${doctor.startTime}-${doctor.endTime}</td>
                <td>
                    <button class="btn btn-sm btn-primary"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    function loadAppointments() {
        const tbody = document.querySelector('#appointments-table tbody');
        tbody.innerHTML = '';

        appointments.forEach(appt => {
            const patient = patients.find(p => p.id === appt.patientId);
            const doctor = doctors.find(d => d.id === appt.doctorId);
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${appt.id}</td>
                <td>${patient ? patient.name : 'Unknown'}</td>
                <td>${doctor ? doctor.name : 'Unknown'}</td>
                <td>${appt.department}</td>
                <td>${formatDate(appt.date)}</td>
                <td>${appt.time}</td>
                <td><span class="status-badge ${appt.status}">${capitalizeFirstLetter(appt.status)}</span></td>
                <td>
                    <button class="btn btn-sm btn-primary"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    function loadDepartments() {
        const grid = document.querySelector('.departments-grid');
        grid.innerHTML = '';

        departments.forEach(dept => {
            const headDoctor = dept.head ? doctors.find(d => d.id === dept.head) : null;
            
            const card = document.createElement('div');
            card.className = 'department-card';
            card.innerHTML = `
                <h3>${dept.name}</h3>
                <p>${dept.description}</p>
                <div class="department-meta">
                    <span><i class="fas fa-user-md"></i> ${headDoctor ? headDoctor.name : 'Not assigned'}</span>
                    <span><i class="fas fa-phone"></i> ${dept.phone}</span>
                </div>
                <div class="department-meta">
                    <span><i class="fas fa-envelope"></i> ${dept.email}</span>
                    <span><i class="fas fa-map-marker-alt"></i> ${dept.location}</span>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    function loadReports() {
        // This will be populated when generating reports
        document.querySelectorAll('.report-section').forEach(section => {
            section.style.display = 'none';
        });
    }

    // Form handling functions
    function addPatient() {
        const newPatient = {
            id: patients.length > 0 ? Math.max(...patients.map(p => p.id)) + 1 : 1,
            name: document.getElementById('patient-name').value,
            gender: document.getElementById('patient-gender').value,
            age: parseInt(document.getElementById('patient-age').value),
            phone: document.getElementById('patient-phone').value,
            email: document.getElementById('patient-email').value,
            address: document.getElementById('patient-address').value,
            medicalHistory: document.getElementById('patient-medical-history').value,
            status: 'active'
        };

        patients.push(newPatient);
        modals.patient.modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        modals.patient.form.reset();
        
        // Update UI
        if (document.getElementById('patients').classList.contains('active')) {
            loadPatients();
        } else {
            loadDashboard();
        }
    }

    function addDoctor() {
        const selectedDays = Array.from(document.querySelectorAll('input[name="doctor-days"]:checked')).map(cb => cb.value);
        
        const newDoctor = {
            id: doctors.length > 0 ? Math.max(...doctors.map(d => d.id)) + 1 : 1,
            name: document.getElementById('doctor-name').value,
            specialization: document.getElementById('doctor-specialization').value,
            department: document.getElementById('doctor-department').value,
            phone: document.getElementById('doctor-phone').value,
            email: document.getElementById('doctor-email').value,
            address: document.getElementById('doctor-address').value,
            fee: parseInt(document.getElementById('doctor-consultation-fee').value),
            experience: parseInt(document.getElementById('doctor-experience').value),
            qualification: document.getElementById('doctor-qualification').value,
            days: selectedDays,
            startTime: document.getElementById('doctor-start-time').value,
            endTime: document.getElementById('doctor-end-time').value
        };

        doctors.push(newDoctor);
        modals.doctor.modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        modals.doctor.form.reset();
        
        // Update UI
        if (document.getElementById('doctors').classList.contains('active')) {
            loadDoctors();
        } else {
            loadDashboard();
        }
    }

    function addAppointment() {
        const newAppointment = {
            id: appointments.length > 0 ? Math.max(...appointments.map(a => a.id)) + 1 : 1,
            patientId: parseInt(document.getElementById('appointment-patient').value),
            doctorId: parseInt(document.getElementById('appointment-doctor').value),
            department: doctors.find(d => d.id === parseInt(document.getElementById('appointment-doctor').value))?.department || 'Unknown',
            date: document.getElementById('appointment-date').value,
            time: document.getElementById('appointment-time').value,
            reason: document.getElementById('appointment-reason').value,
            status: document.getElementById('appointment-status').value
        };

        appointments.push(newAppointment);
        modals.appointment.modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        modals.appointment.form.reset();
        
        // Update UI
        if (document.getElementById('appointments').classList.contains('active')) {
            loadAppointments();
        } else {
            loadDashboard();
        }
    }

    function addDepartment() {
        const newDepartment = {
            id: departments.length > 0 ? Math.max(...departments.map(d => d.id)) + 1 : 1,
            name: document.getElementById('department-name').value,
            description: document.getElementById('department-description').value,
            head: document.getElementById('department-head').value ? parseInt(document.getElementById('department-head').value) : null,
            phone: document.getElementById('department-phone').value,
            email: document.getElementById('department-email').value,
            location: document.getElementById('department-location').value
        };

        departments.push(newDepartment);
        modals.department.modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        modals.department.form.reset();
        
        // Update UI
        if (document.getElementById('departments').classList.contains('active')) {
            loadDepartments();
        } else {
            loadDashboard();
        }
    }

    // Dropdown population functions
    function populatePatientDropdown() {
        const select = document.getElementById('appointment-patient');
        select.innerHTML = '<option value="">Select Patient</option>';
        
        patients.forEach(patient => {
            const option = document.createElement('option');
            option.value = patient.id;
            option.textContent = patient.name;
            select.appendChild(option);
        });
    }

    function populateDoctorDropdown() {
        const select = document.getElementById('appointment-doctor');
        select.innerHTML = '<option value="">Select Doctor</option>';
        
        doctors.forEach(doctor => {
            const option = document.createElement('option');
            option.value = doctor.id;
            option.textContent = doctor.name;
            select.appendChild(option);
        });
    }

    function populateDepartmentHeadDropdown() {
        const select = document.getElementById('department-head');
        select.innerHTML = '<option value="">Select Department Head</option>';
        
        doctors.forEach(doctor => {
            const option = document.createElement('option');
            option.value = doctor.id;
            option.textContent = doctor.name;
            select.appendChild(option);
        });
    }

    // Filter functions
    function filterPatients() {
        const searchTerm = document.getElementById('patient-search').value.toLowerCase();
        const filterValue = document.getElementById('patient-filter').value;
        
        const filtered = patients.filter(patient => {
            const matchesSearch = patient.name.toLowerCase().includes(searchTerm) || 
                               patient.phone.includes(searchTerm) || 
                               patient.email.toLowerCase().includes(searchTerm);
            
            const matchesFilter = filterValue === 'all' || patient.status === filterValue;
            
            return matchesSearch && matchesFilter;
        });
        
        const tbody = document.querySelector('#patients-table tbody');
        tbody.innerHTML = '';
        
        filtered.forEach(patient => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${patient.id}</td>
                <td>${patient.name}</td>
                <td>${patient.gender}</td>
                <td>${patient.age}</td>
                <td>${patient.phone}</td>
                <td>${patient.address}</td>
                <td><span class="status-badge ${patient.status}">${capitalizeFirstLetter(patient.status)}</span></td>
                <td>
                    <button class="btn btn-sm btn-primary"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    function filterDoctors() {
        const searchTerm = document.getElementById('doctor-search').value.toLowerCase();
        const filterValue = document.getElementById('doctor-filter').value;
        
        const filtered = doctors.filter(doctor => {
            const matchesSearch = doctor.name.toLowerCase().includes(searchTerm) || 
                                 doctor.specialization.toLowerCase().includes(searchTerm) || 
                                 doctor.phone.includes(searchTerm) || 
                                 doctor.email.toLowerCase().includes(searchTerm);
            
            const matchesFilter = filterValue === 'all' || doctor.department.toLowerCase() === filterValue;
            
            return matchesSearch && matchesFilter;
        });
        
        const tbody = document.querySelector('#doctors-table tbody');
        tbody.innerHTML = '';
        
        filtered.forEach(doctor => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${doctor.id}</td>
                <td>${doctor.name}</td>
                <td>${doctor.specialization}</td>
                <td>${doctor.phone}</td>
                <td>${doctor.email}</td>
                <td>${doctor.days.join(', ')} ${doctor.startTime}-${doctor.endTime}</td>
                <td>
                    <button class="btn btn-sm btn-primary"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    function filterAppointments() {
        const searchTerm = document.getElementById('appointment-search').value.toLowerCase();
        const statusFilter = document.getElementById('appointment-filter-status').value;
        const dateFilter = document.getElementById('appointment-filter-date').value;
        
        const filtered = appointments.filter(appt => {
            const patient = patients.find(p => p.id === appt.patientId);
            const doctor = doctors.find(d => d.id === appt.doctorId);
            
            const matchesSearch = (patient && patient.name.toLowerCase().includes(searchTerm)) || 
                                (doctor && doctor.name.toLowerCase().includes(searchTerm)) || 
                                appt.department.toLowerCase().includes(searchTerm);
            
            const matchesStatus = statusFilter === 'all' || appt.status === statusFilter;
            const matchesDate = !dateFilter || appt.date === dateFilter;
            
            return matchesSearch && matchesStatus && matchesDate;
        });
        
        const tbody = document.querySelector('#appointments-table tbody');
        tbody.innerHTML = '';
        
        filtered.forEach(appt => {
            const patient = patients.find(p => p.id === appt.patientId);
            const doctor = doctors.find(d => d.id === appt.doctorId);
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${appt.id}</td>
                <td>${patient ? patient.name : 'Unknown'}</td>
                <td>${doctor ? doctor.name : 'Unknown'}</td>
                <td>${appt.department}</td>
                <td>${formatDate(appt.date)}</td>
                <td>${appt.time}</td>
                <td><span class="status-badge ${appt.status}">${capitalizeFirstLetter(appt.status)}</span></td>
                <td>
                    <button class="btn btn-sm btn-primary"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    function filterDepartments() {
        const searchTerm = document.getElementById('department-search').value.toLowerCase();
        
        const filtered = departments.filter(dept => {
            return dept.name.toLowerCase().includes(searchTerm) || 
                   dept.description.toLowerCase().includes(searchTerm) || 
                   dept.location.toLowerCase().includes(searchTerm);
        });
        
        const grid = document.querySelector('.departments-grid');
        grid.innerHTML = '';
        
        filtered.forEach(dept => {
            const headDoctor = dept.head ? doctors.find(d => d.id === dept.head) : null;
            
            const card = document.createElement('div');
            card.className = 'department-card';
            card.innerHTML = `
                <h3>${dept.name}</h3>
                <p>${dept.description}</p>
                <div class="department-meta">
                    <span><i class="fas fa-user-md"></i> ${headDoctor ? headDoctor.name : 'Not assigned'}</span>
                    <span><i class="fas fa-phone"></i> ${dept.phone}</span>
                </div>
                <div class="department-meta">
                    <span><i class="fas fa-envelope"></i> ${dept.email}</span>
                    <span><i class="fas fa-map-marker-alt"></i> ${dept.location}</span>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    // Report functions
    function generateReport() {
        const reportType = document.getElementById('report-type').value;
        const period = document.getElementById('report-period').value;
        
        // Hide all report sections first
        document.querySelectorAll('.report-section').forEach(section => {
            section.style.display = 'none';
        });
        
        // Show the selected report section
        document.getElementById(`${reportType}-report`).style.display = 'block';
        
        // Generate report data based on type
        switch(reportType) {
            case 'patient':
                generatePatientReport();
                break;
            case 'appointment':
                generateAppointmentReport();
                break;
            case 'financial':
                generateFinancialReport();
                break;
            case 'department':
                generateDepartmentReport();
                break;
        }
    }

    function generatePatientReport() {
        // Simple stats - in a real app, you would filter by date range
        document.getElementById('report-total-patients').textContent = patients.length;
        
        const newPatients = patients.filter(p => {
            // This would be based on actual registration date in a real app
            return true; // Placeholder
        }).length;
        document.getElementById('report-new-patients').textContent = newPatients;
        
        const maleCount = patients.filter(p => p.gender === 'Male').length;
        const femaleCount = patients.filter(p => p.gender === 'Female').length;
        document.getElementById('report-gender-ratio').textContent = `${maleCount}:${femaleCount}`;
        
        const totalAge = patients.reduce((sum, p) => sum + p.age, 0);
        const avgAge = patients.length > 0 ? Math.round(totalAge / patients.length) : 0;
        document.getElementById('report-avg-age').textContent = avgAge;
        
        // Chart
        const ctx = document.getElementById('patient-report-chart').getContext('2d');
        
        if (window.patientChart) {
            window.patientChart.destroy();
        }
        
        window.patientChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'New Patients',
                    data: [12, 19, 15, 21, 18, 25, 22, 30, 28, 32, 27, 35],
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    function generateAppointmentReport() {
        document.getElementById('report-total-appointments').textContent = appointments.length;
        document.getElementById('report-scheduled-appointments').textContent = appointments.filter(a => a.status === 'scheduled').length;
        document.getElementById('report-completed-appointments').textContent = appointments.filter(a => a.status === 'completed').length;
        document.getElementById('report-canceled-appointments').textContent = appointments.filter(a => a.status === 'canceled').length;
        
        // Chart
        const ctx = document.getElementById('appointment-report-chart').getContext('2d');
        
        if (window.appointmentChart) {
            window.appointmentChart.destroy();
        }
        
        window.appointmentChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Scheduled', 'Completed', 'Canceled'],
                datasets: [{
                    data: [
                        appointments.filter(a => a.status === 'scheduled').length,
                        appointments.filter(a => a.status === 'completed').length,
                        appointments.filter(a => a.status === 'canceled').length
                    ],
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(75, 192, 192, 0.5)',
                        'rgba(255, 99, 132, 0.5)'
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(255, 99, 132, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true
            }
        });
    }

    function generateFinancialReport() {
        // In a real app, these would come from actual financial data
        const totalRevenue = 125000;
        const consultationFees = 75000;
        const procedureFees = 40000;
        const otherIncome = 10000;
        
        document.getElementById('report-total-revenue').textContent = `$${totalRevenue.toLocaleString()}`;
        document.getElementById('report-consultation-fees').textContent = `$${consultationFees.toLocaleString()}`;
        document.getElementById('report-procedure-fees').textContent = `$${procedureFees.toLocaleString()}`;
        document.getElementById('report-other-income').textContent = `$${otherIncome.toLocaleString()}`;
        
        // Chart
        const ctx = document.getElementById('financial-report-chart').getContext('2d');
        
        if (window.financialChart) {
            window.financialChart.destroy();
        }
        
        window.financialChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Monthly Revenue',
                    data: [8500, 9200, 10500, 11200, 12500, 13200, 14800, 11500, 12200, 13500, 14200, 15000],
                    fill: false,
                    backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: false
                    }
                }
            }
        });
    }

    function generateDepartmentReport() {
        document.getElementById('report-total-departments').textContent = departments.length;
        
        // Find busiest department (in a real app, this would be based on actual appointment data)
        document.getElementById('report-busiest-department').textContent = 'Cardiology';
        
        document.getElementById('report-total-doctors').textContent = doctors.length;
        
        // In a real app, this would include nurses and other staff
        document.getElementById('report-total-staff').textContent = doctors.length + 15;
        
        // Chart
        const ctx = document.getElementById('department-report-chart').getContext('2d');
        
        if (window.departmentChart) {
            window.departmentChart.destroy();
        }
        
        window.departmentChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: departments.map(d => d.name),
                datasets: [{
                    label: 'Doctors per Department',
                    data: departments.map(d => doctors.filter(doc => doc.department === d.name).length),
                    backgroundColor: 'rgba(153, 102, 255, 0.5)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    function exportReport() {
        alert('In a real application, this would export the current report as PDF or Excel.');
    }

    // Chart initialization for dashboard
    function initDashboardCharts() {
        // Monthly Patients Chart
        const patientsCtx = document.getElementById('patients-chart').getContext('2d');
        
        if (window.patientsChart) {
            window.patientsChart.destroy();
        }
        
        window.patientsChart = new Chart(patientsCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'New Patients',
                    data: [12, 19, 15, 21, 18, 25, 22, 30, 28, 32, 27, 35],
                    fill: false,
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        // Department Chart
        const departmentCtx = document.getElementById('department-chart').getContext('2d');
        
        if (window.departmentChart) {
            window.departmentChart.destroy();
        }
        
        window.departmentChart = new Chart(departmentCtx, {
            type: 'doughnut',
            data: {
                labels: ['Lungs Cancer', 'Skin Cancer', 'Blood Cancer', 'Others'],
                datasets: [{
                    data: [120, 85, 75, 60],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.5)',
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(255, 206, 86, 0.5)',
                        'rgba(75, 192, 192, 0.5)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true
            }
        });
    }

    // Utility functions
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
});