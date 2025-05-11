document.addEventListener("DOMContentLoaded", () => {
    fetch("assets/images.json")
      .then(response => response.json())
      .then(images => {
        const grid = document.getElementById("gallery-grid");
        images.forEach(image => {
          const imgDiv = document.createElement("div");
          imgDiv.classList.add("gallery-item");
  
          imgDiv.innerHTML = `
            <a href="${image.src}" target="_blank">
              <img src="${image.src}" alt="${image.description}">
              <p>${image.description}</p>
            </a>
          `;
          grid.appendChild(imgDiv);
        });
      })
      .catch(error => console.error("Failed to load gallery:", error));
  });

let currentIndex = 0;
let carouselData = [];

function updateCarousel() {
  const slide = document.getElementById("carousel-slide");
  slide.innerHTML = `
    <img src="${carouselData[currentIndex].src}" alt="${carouselData[currentIndex].description}">
    <p>${carouselData[currentIndex].description}</p>
  `;
}

document.getElementById("prevBtn").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + carouselData.length) % carouselData.length;
  updateCarousel();
});

document.getElementById("nextBtn").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % carouselData.length;
  updateCarousel();
});

fetch("assets/images.json")
  .then(response => response.json())
  .then(data => {
    carouselData = data;
    updateCarousel();
  })
  .catch(error => console.error("Carousel error:", error));
