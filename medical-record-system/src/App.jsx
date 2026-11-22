
import { useState } from 'react'
import './App.css'

function App() {
  const [page, setPage] = useState('home')

  // Patient state
  const [patients, setPatients] = useState([])

  const [form, setForm] = useState({
    name: '',
    age: '',
    gender: '',
    phone: '',
    email: '',
    address: ''
  })

  // Medical records state
  const [records, setRecords] = useState([])

  const [recordForm, setRecordForm] = useState({
    patientName: '',
    doctor: '',
    diagnosis: '',
    prescription: '',
    date: ''
  })

  // Appointment state
  const [appointments, setAppointments] = useState([])

  const [appointmentForm, setAppointmentForm] = useState({
    patientName: '',
    doctor: '',
    date: '',
    time: '',
    reason: ''
  })

  // Patient functions
  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  function registerPatient(e) {
    e.preventDefault()

    setPatients([
      ...patients,
      { ...form, id: Date.now() }
    ])

    setForm({
      name: '',
      age: '',
      gender: '',
      phone: '',
      email: '',
      address: ''
    })

    alert('Patient registered successfully!')
    setPage('patients')
  }

  // Medical records functions
  function handleRecordChange(e) {
    setRecordForm({
      ...recordForm,
      [e.target.name]: e.target.value
    })
  }

  function addMedicalRecord(e) {
    e.preventDefault()

    setRecords([
      ...records,
      {
        ...recordForm,
        id: Date.now()
      }
    ])

    setRecordForm({
      patientName: '',
      doctor: '',
      diagnosis: '',
      prescription: '',
      date: ''
    })

    alert('Medical record added successfully!')
    setPage('records')
  }

  // Appointment functions
  function handleAppointmentChange(e) {
    setAppointmentForm({
      ...appointmentForm,
      [e.target.name]: e.target.value
    })
  }

  function bookAppointment(e) {
    e.preventDefault()

    setAppointments([
      ...appointments,
      {
        ...appointmentForm,
        id: Date.now(),
        status: 'Booked'
      }
    ])

    setAppointmentForm({
      patientName: '',
      doctor: '',
      date: '',
      time: '',
      reason: ''
    })

    alert('Appointment booked successfully!')
  }

  return (
    <div className="app">

      {/* Header */}
      <header className="header">
        <h2>🏥 MediCare</h2>

        <nav>
          <a href="#" onClick={() => setPage('home')}>Home</a>
          <a href="#" onClick={() => setPage('patients')}>Patients</a>
          <a href="#" onClick={() => setPage('records')}>Medical Records</a>
          <a href="#" onClick={() => setPage('appointments')}>Appointments</a>
        </nav>
      </header>

      {/* Home */}
      {page === 'home' && (
        <main className="container">

          <h1>Medical Record Management System</h1>

          <p>
            Manage patient information and medical records
            in one simple platform.
          </p>

          <div className="cards">

            <div className="card">
              <h3>👨‍⚕️ Patient Registration</h3>
              <p>Register and manage patient information.</p>
              <button onClick={() => setPage('register')}>
                Register Patient
              </button>
            </div>

            <div className="card">
              <h3>📋 Medical Records</h3>
              <p>View patient medical information.</p>
              <button onClick={() => setPage('records')}>
                View Records
              </button>
            </div>

            <div className="card">
              <h3>📅 Appointments</h3>
              <p>Manage patient appointments.</p>
              <button onClick={() => setPage('appointments')}>
                Book Appointment
              </button>
            </div>

          </div>
        </main>
      )}

      {/* Patient Registration */}
      {page === 'register' && (
        <main className="form-container">

          <h1>Patient Registration</h1>

          <form onSubmit={registerPatient}>

            <label>Patient Name</label>
            <input name="name" value={form.name} onChange={handleChange} required />

            <label>Age</label>
            <input name="age" type="number" min="0" max="120" value={form.age} onChange={handleChange} required />

            <label>Gender</label>
            <select name="gender" value={form.gender} onChange={handleChange} required>
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>

            <label>Phone Number</label>
            <input name="phone" type="tel" value={form.phone} onChange={handleChange} required />

            <label>Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} required />

            <label>Address</label>
            <textarea name="address" value={form.address} onChange={handleChange} required />

            <button type="submit">Register Patient</button>

            <button type="button" onClick={() => setPage('home')}>
              Back to Home
            </button>

          </form>
        </main>
      )}

      {/* Patients List */}
      {page === 'patients' && (
        <main className="container">

          <h1>Registered Patients</h1>

          {patients.length === 0 ? (
            <p>No patients registered yet.</p>
          ) : (
            <div className="cards">
              {patients.map(patient => (
                <div className="card" key={patient.id}>
                  <h3>{patient.name}</h3>
                  <p>Age: {patient.age}</p>
                  <p>Gender: {patient.gender}</p>
                  <p>Phone: {patient.phone}</p>
                  <p>Email: {patient.email}</p>
                  <p>Address: {patient.address}</p>
                </div>
              ))}
            </div>
          )}

          <button onClick={() => setPage('register')}>Add Patient</button>
          <button onClick={() => setPage('home')}>Home</button>

        </main>
      )}

      {/* Medical Records */}
      {page === 'records' && (
        <main className="container">

          <h1>Medical Records Management</h1>

          <button onClick={() => setPage('addRecord')}>
            + Add New Medical Record
          </button>

          <h2>Registered Patients: {patients.length}</h2>

          {records.length === 0 ? (
            <p>No medical records available.</p>
          ) : (
            <div className="cards">
              {records.map(r => (
                <div className="card" key={r.id}>
                  <h3>{r.patientName}</h3>
                  <p><b>Doctor:</b> {r.doctor}</p>
                  <p><b>Diagnosis:</b> {r.diagnosis}</p>
                  <p><b>Prescription:</b> {r.prescription}</p>
                  <p><b>Visit Date:</b> {r.date}</p>
                </div>
              ))}
            </div>
          )}

          <button onClick={() => setPage('home')}>Back Home</button>

        </main>
      )}

      {/* Add Medical Record */}
      {page === 'addRecord' && (
        <main className="form-container">

          <h1>Add Medical Record</h1>

          {patients.length === 0 ? (
            <>
              <p>Please register a patient first.</p>
              <button onClick={() => setPage('register')}>
                Register Patient
              </button>
            </>
          ) : (
            <form onSubmit={addMedicalRecord}>

              <label>Select Patient</label>
              <select
                name="patientName"
                value={recordForm.patientName}
                onChange={handleRecordChange}
                required
              >
                <option value="">Select Patient</option>

                {patients.map(patient => (
                  <option key={patient.id} value={patient.name}>
                    {patient.name}
                  </option>
                ))}
              </select>

              <label>Doctor Name</label>
              <input name="doctor" value={recordForm.doctor} onChange={handleRecordChange} required />

              <label>Diagnosis</label>
              <textarea name="diagnosis" value={recordForm.diagnosis} onChange={handleRecordChange} required />

              <label>Prescription</label>
              <textarea name="prescription" value={recordForm.prescription} onChange={handleRecordChange} required />

              <label>Visit Date</label>
              <input type="date" name="date" value={recordForm.date} onChange={handleRecordChange} required />

              <button type="submit">Save Medical Record</button>

              <button type="button" onClick={() => setPage('records')}>
                Cancel
              </button>

            </form>
          )}

        </main>
      )}

      {/* Appointment Booking */}
      {page === 'appointments' && (
        <main className="form-container">

          <h1>📅 Appointment Booking</h1>

          <h2>Book New Appointment</h2>

          {patients.length === 0 ? (
            <>
              <p>Please register a patient before booking.</p>
              <button onClick={() => setPage('register')}>
                Register Patient
              </button>
            </>
          ) : (
            <form onSubmit={bookAppointment}>

              <label>Select Patient</label>

              <select
                name="patientName"
                value={appointmentForm.patientName}
                onChange={handleAppointmentChange}
                required
              >
                <option value="">Select Patient</option>

                {patients.map(patient => (
                  <option key={patient.id} value={patient.name}>
                    {patient.name}
                  </option>
                ))}
              </select>

              <label>Doctor Name</label>

              <input
                type="text"
                name="doctor"
                placeholder="Enter doctor name"
                value={appointmentForm.doctor}
                onChange={handleAppointmentChange}
                required
              />

              <label>Appointment Date</label>

              <input
                type="date"
                name="date"
                value={appointmentForm.date}
                onChange={handleAppointmentChange}
                min={new Date().toLocaleDateString('en-CA')}
                required
              />

              <label>Appointment Time</label>

              <input
                type="time"
                name="time"
                value={appointmentForm.time}
                onChange={handleAppointmentChange}
                required
              />

              <label>Reason for Appointment</label>

              <textarea
                name="reason"
                placeholder="Enter appointment reason"
                value={appointmentForm.reason}
                onChange={handleAppointmentChange}
                required
              />

              <button type="submit">
                Book Appointment
              </button>

            </form>
          )}

          <h2>Booked Appointments ({appointments.length})</h2>

          {appointments.length === 0 ? (
            <p>No appointments booked yet.</p>
          ) : (
            <div className="cards">

              {appointments.map(appointment => (
                <div className="card" key={appointment.id}>

                  <h3>{appointment.patientName}</h3>

                  <p><b>Doctor:</b> {appointment.doctor}</p>
                  <p><b>Date:</b> {appointment.date}</p>
                  <p><b>Time:</b> {appointment.time}</p>
                  <p><b>Reason:</b> {appointment.reason}</p>
                  <p><b>Status:</b> {appointment.status}</p>

                </div>
              ))}

            </div>
          )}

          <button onClick={() => setPage('home')}>
            Back Home
          </button>

        </main>
      )}

      <footer>
        © 2026 MediCare Medical Record System
      </footer>

    </div>
  )
}

export default App