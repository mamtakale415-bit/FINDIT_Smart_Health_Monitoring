FINDIT - SMART HEALTH MONITORING SYSTEM
========================================

PROJECT FILES
- index.html : Website structure
- style.css  : Website design and responsive layout
- app.js     : JavaScript + Firebase Cloud Firestore connection

REQUIREMENTS
- VS Code
- Google Chrome or Microsoft Edge
- Internet connection
- Google account for Firebase

STEP 1: CREATE FIREBASE PROJECT
1. Open https://console.firebase.google.com/
2. Sign in and click "Create a project".
3. Name it FINDIT and complete project creation.
4. In Project Overview, click the Web icon (</>) to register a web app.
5. Give it a nickname such as FINDIT-Web.
6. Register the app and copy the firebaseConfig object shown.

STEP 2: CREATE CLOUD FIRESTORE
1. In Firebase Console, open Build > Firestore Database.
2. Click Create database.
3. Choose a nearby region (for example asia-south1 if offered and appropriate).
4. For a classroom prototype, you may start in test mode briefly.
5. Click Create.
6. Open the Rules tab and publish the temporary classroom rules below.

TEMPORARY CLASSROOM DEMO RULES ONLY
These rules allow anyone who can access your project to read/write records.
Use only with dummy data for a short classroom demonstration. Do not use for
real patient information or a public deployment.

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /healthRecords/{recordId} {
      allow read, write: if true;
    }
  }
}

IMPORTANT: Do not leave the database publicly readable/writable. Before any
real use, implement Firebase Authentication and rules that restrict each
signed-in user to their own records. Never store real patient information
in this classroom demo.

STEP 3: ADD FIREBASE CONFIG TO THE WEBSITE
1. Open this folder in VS Code.
2. Open app.js.
3. Find the firebaseConfig object near the top.
4. Replace every PASTE_YOUR_... placeholder with the exact values from
   your Firebase web app configuration. Keep quotation marks.
5. Save app.js.

STEP 4: RUN THE WEBSITE
Recommended simple method:
1. In VS Code, open Extensions.
2. Search for "Live Server" by Ritwick Dey and install it.
3. Right-click index.html.
4. Choose "Open with Live Server".
5. The website should open in your browser.
6. The top-right status should say "Cloud connected".

STEP 5: TEST CLOUD CONNECTION
1. Enter a dummy patient name and sample readings.
2. Click "Save health record".
3. Wait for the success message.
4. Confirm the record appears in Recent health records.
5. Open Firebase Console > Firestore Database > Data.
6. You should see a collection named healthRecords and documents inside it.
7. Refresh the page; records should still appear because they are stored in cloud.

COMMON ERRORS
- "Setup required": firebaseConfig values are missing or copied incorrectly.
- "Could not load records": check internet, Firestore creation and Rules tab.
- "Save failed": check the browser Console (F12) and Firestore rules.
- If orderBy createdAt complains, confirm saved records have createdAt timestamps.

HOW TO EXPLAIN THE CLOUD PART
The FINDIT frontend is developed using HTML, CSS and JavaScript in VS Code.
Firebase Cloud Firestore acts as the cloud database/backend. When the user
submits a health form, JavaScript sends the data to Firestore using the Firebase
Web SDK. The data is stored in a cloud collection named healthRecords. The app
retrieves the latest records from the cloud and displays them on the dashboard.
This demonstrates cloud-based data storage and retrieval.

PROJECT LIMITATION / SAFETY
This is an educational prototype. Values are manually entered, not measured
by medical sensors. The example range checks are not a diagnosis or a substitute
for medical advice. Do not use real patient data in this demo.
