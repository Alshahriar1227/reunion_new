const API = "https://script.google.com/macros/s/AKfycbyK4_kpFwvc_vCtCndojcvpRDdaJz7Z4wxY3PZmXWNM78RKkQUDeXyMiiUxfS58YrvN/exec";

let allData = [];

// submit
function submitForm() {
  let data = {
    name:nam.value,
    village: village.value,
    passyear: passyear.value,
    phone: phone.value,
    transaction: transaction.value,
    method: method.value
  };

  fetch(API, {
    method: "POST",
    body: JSON.stringify(data)
  }).then(() => {
    alert("Submitted!");
    loadAll();
  });
}


// load data
function loadAll() {
  fetch(API)
    .then(res => res.json())
    .then(data => {
      allData = data.slice(1);
      render(allData);

      let pendingCount = allData.filter(r => r[10] === "Pending").length;
      pendingBtn.innerText = "Pending (" + pendingCount + ")";
    });
}


// render
function render(data) {
  let html = "";

  data.forEach(row => {
    html += `
      <div class="card ${row[10].toLowerCase()}">
        <h3>নাম: ${row[1]}</h3>
        <p>📞নাম্বার: ${row[8]}</p>
        <p>🎓সেশন: ${row[5]}</p>
        <p>🏠গ্রাম:${row[3]}</p>
        <p>Status: ${row[10]}</p>
      </div>
    `;
  });

  cards.innerHTML = html;
}


// filter pending
function filterPending() {
  let data = allData.filter(r => r[10] === "Pending");
  render(data);
}


// admin login
function adminLogin() {
  let pass = prompt("Enter Admin Password");

  if (pass === "admin1234") {
    window.location.href = "admin.html";
  } else {
    alert("Wrong Password");
  }
}

loadAll();