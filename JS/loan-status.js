document.addEventListener("DOMContentLoaded", () => {

  const accountNumber = localStorage.getItem("accountNumber");

  if (!accountNumber) {
    console.error("Account number not found in localStorage");
    return;
  }

  fetch(`http://localhost:5000/api/loans/user/${accountNumber}`)
    .then(res => res.json())
    .then(loans => {
      const tbody = document.getElementById("loanTableBody");
      tbody.innerHTML = "";

      if (loans.length === 0) {
        tbody.innerHTML = `
          <tr>
            <td colspan="3" style="text-align:center;">
              No loan records found
            </td>
          </tr>
        `;
        return;
      }

      loans.forEach(loan => {
        const statusClass = loan.status.toLowerCase();

        tbody.innerHTML += `
          <tr>
            <td>${loan.loanType}</td>
            <td>₹ ${loan.loanAmount.toLocaleString()}</td>
            <td>
              <span class="status ${statusClass}">
                ${loan.status}
              </span>
            </td>
          </tr>
        `;
      });
    })
    .catch(err => console.error("Error loading loan status:", err));

});
