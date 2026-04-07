const API = "https://script.google.com/macros/s/AKfycbyK4_kpFwvc_vCtCndojcvpRDdaJz7Z4wxY3PZmXWNM78RKkQUDeXyMiiUxfS58YrvN/exec";

let allData = [];

function submitForm() {
  let data = {
    name: nam.value,
    father: father.value,
    village: village.value,
    dob: dob.value,
    passyear: passyear.value,
    tshirt: tshirt.value,
    profession: profession.value,
    method: method.value,
    phone: phone.value,
    transaction: transaction.value,
    email: email.value
  };

  fetch(API, {
    method: "POST",
    body: JSON.stringify(data)
  }).then(() => {
    alert("Submitted!");
    loadAll();
  });
}

function loadAll() {
  fetch(API)
    .then(res => res.json())
    .then(data => {
      allData = data.slice(1);
      render(allData);
    });
}

function render(data) {
  let html = "";

  data.forEach(r => {
    html += `
      <div class="card ${r[12].toLowerCase()}">
        <h3>নাম: ${r[1]}</h3>
        <p style="font-weight: bold; font-size: 16px;">📞 নাম্বার: ${r[9]}</p>
        <p style="font-weight: bold; font-size: 16px;">🎓 সেশন: ${r[5]}</p>
        <p style="font-weight: bold; font-size: 16px;">👕টি-শার্ট: ${r[6]}</p>
        <p style="font-weight: bold; font-size: 16px;">👨‍🏫 পেশা: ${r[7]}</p>
        <p style="font-weight: bold; font-size: 16px;">🏠 গ্রাম: ${r[3]}</p>
        <p style="font-weight: bold; font-size: 16px;">Status: ${r[12]}</p>
      </div>
    `;
  });

  document.getElementById("cards").innerHTML = html;
}

loadAll();