/* ================= IMAGE UPLOAD ================= */

const imageInput = document.getElementById("imageInput");

const preview = document.getElementById("preview");

const uploadText = document.getElementById("uploadText");

const analyzeButton = document.getElementById("analyzeButton");

const result = document.getElementById("result");

let selectedImage = null;

imageInput.addEventListener("change", function () {
  const file = this.files[0];

  if (!file) return;

  selectedImage = file;

  const reader = new FileReader();

  reader.onload = function (e) {
    preview.src = e.target.result;

    preview.classList.remove("hidden");

    uploadText.classList.add("hidden");

    analyzeButton.disabled = false;
  };

  reader.readAsDataURL(file);
});

/* ================= SCROLL ================= */

function scrollToStudio() {
  document.getElementById("studio").scrollIntoView({
    behavior: "smooth",
  });
}

/* ================= AI ANALYSIS ================= */

analyzeButton.addEventListener("click", function () {
  if (!selectedImage) return;

  analyzeButton.innerHTML = "✦ AI is analyzing...";

  analyzeButton.disabled = true;

  result.innerHTML = `

<div class="empty-result">

<div class="empty-circle">
✦
</div>

<h3>
Scanning your clothing...
</h3>

<p>
AI is identifying the material,
condition and redesign possibilities.
</p>

</div>

`;

  setTimeout(function () {
    generateAIResult();
  }, 1800);
});

/* ================= AI RESULT ================= */

function generateAIResult() {
  result.innerHTML = `

<div class="item-info">

<div class="section-label">
AI ITEM SCAN
</div>

<h3>
Old Cotton Shirt
</h3>

<p>
AI detected a reusable cotton shirt
with enough fabric for redesign.
</p>

<div class="tag-container">

<span class="tag">
Cotton
</span>

<span class="tag">
White
</span>

<span class="tag">
Condition: 7/10
</span>

<span class="tag">
Reusable
</span>

</div>

<p style="margin-top:10px">

AI confidence:
<strong>91%</strong>

</p>

</div>

<div class="section-label">
RECOMMENDED REDESIGNS
</div>

${createRecommendation(
  "Cropped Overshirt",
  "Easy",
  "30–60 min",
  "Turn the old shirt into a modern cropped overshirt.",
  [
    "Place the shirt flat on a clean surface.",
    "Mark the new length with fabric chalk.",
    "Cut along the marked line.",
    "Fold the raw edge inward 1–2 cm.",
    "Sew the edge to create a clean finish.",
    "Try the shirt on and adjust the length.",
  ],
)}

${createRecommendation(
  "Patchwork Tote Bag",
  "Medium",
  "60–90 min",
  "Reuse the shirt fabric to create a tote bag.",
  [
    "Remove buttons and other reusable details.",
    "Cut two large rectangular fabric pieces.",
    "Place the pieces together.",
    "Sew both sides and the bottom.",
    "Create the bottom corners.",
    "Attach two handles.",
  ],
)}

${createRecommendation(
  "Statement Shirt",
  "Very Easy",
  "20–45 min",
  "Keep the shirt shape but completely change its appearance.",
  [
    "Choose an area on the chest or sleeve.",
    "Draw a simple design with fabric chalk.",
    "Add embroidery or a fabric patch.",
    "Secure all threads.",
    "Wash gently to test durability.",
  ],
)}

<div style="
margin-top:15px;
background:#171914;
color:white;
padding:18px;
border-radius:20px;
display:flex;
justify-content:space-between;
align-items:center;
gap:15px;
">

<div>

<strong>
♻ Keep the loop going
</strong>

<br>

<span style="
font-size:11px;
color:#aaa;
">

Wear it again or send it
to a RE:FIT Center.

</span>

</div>

<button
onclick="openModal()"
style="
border:0;
background:#d6ff77;
padding:10px 15px;
border-radius:20px;
font-weight:bold;
cursor:pointer;
">

Resale →

</button>

</div>

`;

  analyzeButton.innerHTML = "✦ Analyze & redesign";

  analyzeButton.disabled = false;
}

/* ================= RECOMMENDATION ================= */

function createRecommendation(title, difficulty, time, description, steps) {
  return `

<div class="recommendation">

<div class="recommendation-header">

<div>

<h3>
${title}
</h3>

<p>
${description}
</p>

</div>

<span class="difficulty">
${difficulty}
</span>

</div>

<div class="meta">

<span>
⏱ ${time}
</span>

<span>
✂ Basic tools
</span>

</div>

<details>

<summary>
Show step-by-step process
</summary>

<ol class="steps">

${steps.map((step) => `<li>${step}</li>`).join("")}

</ol>

</details>

</div>

`;
}

/* ================= MODAL ================= */

function openModal() {
  document.getElementById("modal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}

function submitItem() {
  const name = document.getElementById("name").value;

  const email = document.getElementById("email").value;

  if (!name || !email) {
    alert("Please enter your name and email.");

    return;
  }

  closeModal();

  alert(`Your item has been submitted!`);
}

/* ================= DRAG & DROP ================= */

const uploadBox = document.getElementById("uploadBox");

uploadBox.addEventListener("dragover", function (e) {
  e.preventDefault();

  uploadBox.style.borderColor = "#638e35";
});

uploadBox.addEventListener("dragleave", function () {
  uploadBox.style.borderColor = "#aaa99e";
});

uploadBox.addEventListener("drop", function (e) {
  e.preventDefault();

  const file = e.dataTransfer.files[0];

  if (!file) return;

  selectedImage = file;

  const reader = new FileReader();

  reader.onload = function (event) {
    preview.src = event.target.result;

    preview.classList.remove("hidden");

    uploadText.classList.add("hidden");

    analyzeButton.disabled = false;
  };

  reader.readAsDataURL(file);
});
