const API = "https://script.google.com/macros/s/AKfycbyK4_kpFwvc_vCtCndojcvpRDdaJz7Z4wxY3PZmXWNM78RKkQUDeXyMiiUxfS58YrvN/exec";

function loadAdmin() {
  fetch(API)
    .then(res => res.json())
    .then(data => {
      let rows = data.slice(1);
      let html = "";

      rows.forEach(r => {
        if (r[12] === "Pending") {
          html += `
            <div class="card">
              <h3>নাম: ${r[1]}</h3>
              <p>📞নাম্বার: ${r[9]}</p>
              <p>🎓ট্রান্জেক্শন : ${r[10]}</p>
              <p>পেমেন্ট মেথডঃ : ${r[8]}</p>

              <button onclick="approve(${r[0]})">Approve</button>
              <button onclick="reject(${r[0]})">Reject</button>
            </div>
          `;
        }
      });

      adminCards.innerHTML = html;
    });
}

function approve(id) {
  fetch(API + "?action=approve", {
    method: "POST",
    body: JSON.stringify({ id })
  }).then(loadAdmin);
}

function reject(id) {
  fetch(API + "?action=delete", {
    method: "POST",
    body: JSON.stringify({ id })
  }).then(loadAdmin);
}

loadAdmin();