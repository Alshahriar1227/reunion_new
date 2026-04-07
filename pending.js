const API = "https://script.google.com/macros/s/AKfycbyK4_kpFwvc_vCtCndojcvpRDdaJz7Z4wxY3PZmXWNM78RKkQUDeXyMiiUxfS58YrvN/exec";

fetch(API)
  .then(res => res.json())
  .then(data => {
    let rows = data.slice(1);
    let html = "";

    rows.forEach(r => {
      if (r[12] === "Pending") {
        html += `
          <div class="card pending">
            <h3>নাম: ${r[1]}</h3>
            <p>📞নাম্বার: ${r[9]}</p>
            <p>🎓সেশন: ${r[5]}</p>
            <p>👕টি-শার্ট: ${r[6]}</p>
          </div>
        `;
      }
    });

    pendingCards.innerHTML = html;
  });