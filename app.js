function markFace() {
  fetch("http://localhost:3000/api/attendance/face", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ studentId: 1 })
  })
    .then(res => res.json())
    .then(data => {
      document.getElementById("status").innerText = data.message;
    });
}

function markQR() {
  fetch("http://localhost:3000/api/attendance/qr", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ studentId: 1 })
  })
    .then(res => res.json())
    .then(data => {
      document.getElementById("status").innerText = data.message;
    });
}
