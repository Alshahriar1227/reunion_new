const API =
  'https://script.google.com/macros/s/AKfycbyK4_kpFwvc_vCtCndojcvpRDdaJz7Z4wxY3PZmXWNM78RKkQUDeXyMiiUxfS58YrvN/exec';

function loadAdmin() {
  fetch(API)
    .then((res) => res.json())
    .then((data) => {
      let rows = data.slice(1);
      let html = '';

      rows.forEach((r) => {
        if (r[10] === 'Pending') {
          html += `
            <div class="card pending">
              <h3>Name:${r[1]}</h3>
              <p>Number:${r[8]}</p>
              <p>Transaction ID:${r[9]}</p>
              <p>Method:${r[7]}</p>

              <button onclick="approve(${r[0]})">Approve</button>
              <button onclick="reject(${r[0]})">Reject</button>
            </div>
          `;
        }
      });

      adminCards.innerHTML = html;
    });
}

// approve
function approve(id) {
  fetch(API + '?action=approve', {
    method: 'POST',
    body: JSON.stringify({id: id}),
  }).then(() => loadAdmin());
}

// reject
function reject(id) {
  fetch(API + '?action=delete', {
    method: 'POST',
    body: JSON.stringify({id: id}),
  }).then(() => loadAdmin());
}

loadAdmin();
