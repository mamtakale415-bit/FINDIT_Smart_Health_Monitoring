import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
  getFirestore, collection, addDoc, getDocs, query, orderBy, limit, serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwLbvzM3_jAIUJGM-XBgWUW3x3Z9UBWj4",
  authDomain: "findit-b0175.firebaseapp.com",
  projectId: "findit-b0175",
  storageBucket: "findit-b0175.firebasestorage.app",
  messagingSenderId: "622326430283",
  appId: "1:622326430283:web:b993742c85103e685aebce",
  measurementId: "G-D0M0RXEWD9"
};

const statusEl = document.getElementById("cloudStatus");
const form = document.getElementById("healthForm");
const message = document.getElementById("formMessage");
const saveBtn = document.getElementById("saveBtn");
const recordsBody = document.getElementById("recordsBody");

let db;
let cloudReady = false;

document.getElementById("todayDate").textContent =
  new Date().toLocaleDateString(undefined, { weekday:"short", day:"numeric", month:"short", year:"numeric" });

try {
  if (firebaseConfig.apiKey.startsWith("PASTE_") || firebaseConfig.projectId.startsWith("PASTE_")) {
    throw new Error("Add your Firebase configuration in app.js.");
  }
  const app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  cloudReady = true;
  statusEl.textContent = "● Cloud connected";
  statusEl.classList.add("connected");
  loadRecords();
} catch (error) {
  statusEl.textContent = "● Setup required";
  statusEl.title = error.message;
}

function readingStatus(data) {
  // Simple illustrative thresholds only; not medical advice or diagnosis.
  const checks = [
    data.heartRate < 60 || data.heartRate > 100,
    data.temperature < 36.1 || data.temperature > 37.5,
    data.systolic >= 130 || data.diastolic >= 80 || data.systolic < 90 || data.diastolic < 60,
    data.spo2 < 95
  ];
  return checks.some(Boolean) ? "Review reading" : "Within demo range";
}

function showInsights(data) {
  const status = readingStatus(data);
  const alerts = document.getElementById("alerts");
  alerts.innerHTML = "";
  const item = document.createElement("div");
  item.className = "alert " + (status === "Within demo range" ? "good" : "warn");
  item.textContent = status === "Within demo range"
    ? "✓ These values are within the example ranges used by this demo."
    : "⚠ One or more values are outside this demo's example ranges. Consider checking the measurement and seeking advice from a qualified healthcare professional.";
  alerts.appendChild(item);
}

function updateLatest(data) {
  document.getElementById("latestHeart").innerHTML = `${data.heartRate} <small>bpm</small>`;
  document.getElementById("latestBP").innerHTML = `${data.systolic}/${data.diastolic} <small>mmHg</small>`;
  document.getElementById("latestTemp").innerHTML = `${Number(data.temperature).toFixed(1)} <small>°C</small>`;
  document.getElementById("latestSpo2").innerHTML = `${data.spo2} <small>%</small>`;
  showInsights(data);
}

function addCell(row, value) {
  const cell = document.createElement("td");
  cell.textContent = value;
  row.appendChild(cell);
}

async function loadRecords() {
  if (!cloudReady) return;
  recordsBody.innerHTML = '<tr><td colspan="7" class="empty">Loading cloud records…</td></tr>';
  try {
    const q = query(collection(db, "healthRecords"), orderBy("createdAt", "desc"), limit(20));
    const snapshot = await getDocs(q);
    recordsBody.innerHTML = "";
    if (snapshot.empty) {
      recordsBody.innerHTML = '<tr><td colspan="7" class="empty">No records yet. Add your first health record above.</td></tr>';
      return;
    }
    const docs = snapshot.docs;
    updateLatest(docs[0].data());
    docs.forEach(docSnap => {
      const d = docSnap.data();
      const row = document.createElement("tr");
      const date = d.createdAt?.toDate ? d.createdAt.toDate().toLocaleString() : "Just now";
      addCell(row, d.patientName);
      addCell(row, date);
      addCell(row, `${d.heartRate} bpm`);
      addCell(row, `${d.systolic}/${d.diastolic}`);
      addCell(row, `${Number(d.temperature).toFixed(1)} °C`);
      addCell(row, `${d.spo2}%`);
      const statusCell = document.createElement("td");
      const badge = document.createElement("span");
      const status = readingStatus(d);
      badge.className = "status " + (status === "Within demo range" ? "normal" : "review");
      badge.textContent = status;
      statusCell.appendChild(badge);
      row.appendChild(statusCell);
      recordsBody.appendChild(row);
    });
  } catch (error) {
    console.error(error);
    recordsBody.innerHTML = '<tr><td colspan="7" class="empty">Could not load records. Check your Firestore rules and internet connection.</td></tr>';
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!cloudReady) {
    message.textContent = "Connect Firebase first: replace the configuration in app.js.";
    message.className = "message error";
    return;
  }

  const data = {
    patientName: document.getElementById("patientName").value.trim(),
    heartRate: Number(document.getElementById("heartRate").value),
    temperature: Number(document.getElementById("temperature").value),
    systolic: Number(document.getElementById("systolic").value),
    diastolic: Number(document.getElementById("diastolic").value),
    spo2: Number(document.getElementById("spo2").value),
    createdAt: serverTimestamp()
  };

  if (!data.patientName || !Number.isFinite(data.heartRate) || !Number.isFinite(data.temperature) ||
      !Number.isFinite(data.systolic) || !Number.isFinite(data.diastolic) || !Number.isFinite(data.spo2)) {
    message.textContent = "Please enter valid values in every field.";
    message.className = "message error";
    return;
  }

  saveBtn.disabled = true;
  saveBtn.textContent = "Saving to cloud…";
  try {
    await addDoc(collection(db, "healthRecords"), data);
    message.textContent = "Health record saved successfully to Firebase Cloud Firestore.";
    message.className = "message success";
    form.reset();
    await loadRecords();
  } catch (error) {
    console.error(error);
    message.textContent = "Save failed. Check Firestore database rules and your Firebase configuration.";
    message.className = "message error";
  } finally {
    saveBtn.disabled = false;
    saveBtn.innerHTML = 'Save health record <span>→</span>';
  }
});

document.getElementById("refreshBtn").addEventListener("click", loadRecords);
