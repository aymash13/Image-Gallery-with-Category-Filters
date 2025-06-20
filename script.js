const imageInput = document.getElementById("imageInput");
const labelInput = document.getElementById("labelInput");
const uploadBtn = document.getElementById("uploadBtn");
const gallery = document.getElementById("gallery");
const filterButtonsContainer = document.getElementById("filterButtons");

const addedLabels = new Set();

uploadBtn.addEventListener("click", () => {
  const file = imageInput.files[0];
  const label = labelInput.value.trim().toLowerCase();

  if (!file || !label) {
    alert("Please choose an image and enter a label.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const imgSrc = e.target.result;

    const item = document.createElement("div");
    item.className = "gallery-item";
    item.setAttribute("data-category", label);
    item.innerHTML = `<img src="${imgSrc}" alt="">`;
    gallery.appendChild(item);

    if (!addedLabels.has(label)) {
      const newButton = document.createElement("button");
      newButton.className = "filter-btn";
      newButton.setAttribute("data-category", label);
      newButton.innerText = label.charAt(0).toUpperCase() + label.slice(1);
      filterButtonsContainer.appendChild(newButton);
      addedLabels.add(label);
    }

    attachFilterEvents();
  };

  reader.readAsDataURL(file);
  labelInput.value = "";
  imageInput.value = "";
});

function attachFilterEvents() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");

  filterButtons.forEach(button => {
    button.onclick = () => {
      const category = button.getAttribute("data-category");

      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute("data-category");

        if (category === "all" || itemCategory === category) {
          item.classList.remove("hide");
        } else {
          item.classList.add("hide");
        }
      });
    };
  });
}

attachFilterEvents();