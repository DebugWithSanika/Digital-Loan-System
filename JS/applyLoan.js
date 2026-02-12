document.addEventListener("DOMContentLoaded", () => {
  const loanForm = document.getElementById("loanForm");
  const successModal = document.getElementById("successModal");

  if (!loanForm) return;

  loanForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const formData = new FormData(loanForm);

      const response = await fetch("http://localhost:5000/api/loans/apply", {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        throw new Error("Loan submission failed");
      }

      // show modal only after DB save
      if (successModal) {
        successModal.style.display = "flex";
      }

      loanForm.reset();
    } catch (error) {
      alert("Something went wrong. Please try again.");
      console.error(error);
    }
  });
});

function closeModal() {
  document.getElementById("successModal").style.display = "none";
  window.location.reload(); // refresh only after OK click
}