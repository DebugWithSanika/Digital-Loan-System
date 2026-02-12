window.onload = () => {
  loadLoans();
};

async function loadLoans(status = "") {
  try {
    const response = await fetch(
      `http://localhost:5000/api/admin/loans${status ? `?status=${status}` : ""}`
    );

    const loans = await response.json();
    const table = document.getElementById("loanTable");

    table.innerHTML = "";

    if (!loans || loans.length === 0) {
      table.innerHTML = `<tr><td colspan="5">No applications found</td></tr>`;
      return;
    }

    loans.forEach((loan) => {
      table.innerHTML += `
        <tr>
          <td>${loan.fullName || "-"}</td>
          <td>${loan.loanType || "-"}</td>
          <td>${loan.loanAmount || "-"}</td>
          <td>
            <span class="status ${loan.status.toLowerCase()}">
              ${loan.status}
            </span>
          </td>
          <td>
            <button class="btn-approve" onclick="updateStatus('${loan._id}', 'Approved')">
              Approve
            </button>
            <button class="btn-reject" onclick="updateStatus('${loan._id}', 'Rejected')">
              Reject
            </button>
          </td>
        </tr>
      `;
    });
  } catch (error) {
    console.error("Error loading loans:", error);
  }
}

async function updateStatus(id, status) {
  try {
    await fetch(`http://localhost:5000/api/admin/loan/${id}`, {   // ✅ fixed URL
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ status })
    });

    loadLoans(); // refresh table
  } catch (error) {
    console.error("Error updating status:", error);
  }
}
