let lastResult = "";

// Load history from storage on start
window.onload = function () {
  loadHistory();
};

// Tax breakdown
function calcEarnings(amount) {
  let fee = Math.floor(amount * 0.3);
  let earned = amount - fee;
  return { fee, earned };
}

// Add history + Save permanently
function addHistory(text) {
  let history = JSON.parse(localStorage.getItem("donohistory")) || [];
  history.unshift(text);

  localStorage.setItem("donohistory", JSON.stringify(history));
  loadHistory();
}

// Load history
function loadHistory() {
  let historyList = document.getElementById("history");
  historyList.innerHTML = "";

  let history = JSON.parse(localStorage.getItem("donohistory")) || [];

  history.forEach((item) => {
    let li = document.createElement("li");
    li.textContent = item;
    historyList.appendChild(li);
  });
}

// Clear history
function clearHistory() {
  localStorage.removeItem("donohistory");
  loadHistory();
}

// One-time donation
function calculateOne() {
  let dono = parseInt(document.getElementById("oneDono").value);

  if (isNaN(dono) || dono <= 0) {
    document.getElementById("oneOutput").textContent =
      "❌ Enter a valid amount.";
    return;
  }

  let { fee, earned } = calcEarnings(dono);

  lastResult = `Donation: ${dono} | Fee: ${fee} | Earn: ${earned}`;

  document.getElementById("oneOutput").innerHTML = `
    ✅ Donation: ${dono} Robux <br>
    💸 Fee (30%): ${fee} Robux <br>
    🎉 You Earn: ${earned} Robux
  `;

  addHistory("One-Time → " + lastResult);
}

// Add donation input
function addBox() {
  let container = document.getElementById("splitContainer");
  let count = container.children.length + 1;

  let input = document.createElement("input");
  input.type = "number";
  input.className = "split";
  input.placeholder = "Donation " + count;

  container.appendChild(input);
}

// Split donations
function calculateSplit() {
  let inputs = document.querySelectorAll(".split");
  let total = 0;

  inputs.forEach((box) => {
    let val = parseInt(box.value);
    if (!isNaN(val) && val > 0) total += val;
  });

  if (total === 0) {
    document.getElementById("splitOutput").textContent =
      "❌ Enter at least one donation.";
    return;
  }

  let { fee, earned } = calcEarnings(total);

  lastResult = `Total: ${total} | Fee: ${fee} | Earn: ${earned}`;

  document.getElementById("splitOutput").innerHTML = `
    ✅ Total Donations: ${total} Robux <br>
    💸 Fee (30%): ${fee} Robux <br>
    🎉 You Earn: ${earned} Robux
  `;

  addHistory("Split → " + lastResult);
}

// Copy last result
function copyLast() {
  if (lastResult === "") {
    alert("Nothing to copy yet!");
    return;
  }

  navigator.clipboard.writeText(lastResult);
  alert("Copied!");
}

// Dark Mode toggle
function toggleDark() {
  document.body.classList.toggle("dark");
}
