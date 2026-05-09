// ===== ALL IMAGES DATA =====
const images = [
  { src: "https://picsum.photos/id/10/600/400",  caption: "🌿 Forest Path",  category: "nature"  },
  { src: "https://picsum.photos/id/20/600/400",  caption: "🏙️ City Lights",  category: "city"    },
  { src: "https://picsum.photos/id/237/600/400", caption: "🐶 Cute Pup",     category: "animals" },
  { src: "https://picsum.photos/id/15/600/400",  caption: "🌊 Ocean View",   category: "nature"  },
  { src: "https://picsum.photos/id/42/600/400",  caption: "🌉 Night Bridge",  category: "city"    },
  { src: "https://picsum.photos/id/200/600/400", caption: "🐄 Wild Cow",     category: "animals" },
  { src: "https://picsum.photos/id/28/600/400",  caption: "🌳 Trees",      category: "nature"  },
  { src: "https://picsum.photos/id/60/600/400",  caption: "🚦 Street Life",  category: "city"    },
  { src: "https://picsum.photos/id/169/600/400", caption: "🐕 Dogs",    category: "animals" },
];

let currentIndex = 0;
let visibleIndices = images.map((_, i) => i); // all visible by default

// ===== ELEMENTS =====
const lightbox   = document.getElementById("lightbox");
const lbImg      = document.getElementById("lb-img");
const lbCaption  = document.getElementById("lb-caption");
const lbClose    = document.getElementById("lb-close");
const lbPrev     = document.getElementById("lb-prev");
const lbNext     = document.getElementById("lb-next");
const filterBtns = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll(".gallery-item");

// ===== OPEN LIGHTBOX =====
galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    const idx = parseInt(item.getAttribute("data-index"));
    currentIndex = visibleIndices.indexOf(idx);
    if (currentIndex === -1) return;
    showImage(visibleIndices[currentIndex]);
    lightbox.classList.add("active");
  });
});

function showImage(idx) {
  lbImg.src = images[idx].src;
  lbCaption.textContent = images[idx].caption;
}

// ===== CLOSE LIGHTBOX =====
lbClose.addEventListener("click", () => lightbox.classList.remove("active"));
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) lightbox.classList.remove("active");
});

// ===== PREV / NEXT =====
lbPrev.addEventListener("click", (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex - 1 + visibleIndices.length) % visibleIndices.length;
  showImage(visibleIndices[currentIndex]);
});

lbNext.addEventListener("click", (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex + 1) % visibleIndices.length;
  showImage(visibleIndices[currentIndex]);
});

// ===== KEYBOARD SUPPORT =====
document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("active")) return;
  if (e.key === "ArrowLeft")  lbPrev.click();
  if (e.key === "ArrowRight") lbNext.click();
  if (e.key === "Escape")     lightbox.classList.remove("active");
});

// ===== FILTER =====
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Active button styling
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");
    visibleIndices = [];

    galleryItems.forEach((item) => {
      const cat = item.getAttribute("data-category");
      const idx = parseInt(item.getAttribute("data-index"));

      if (filter === "all" || cat === filter) {
        item.classList.remove("hidden");
        visibleIndices.push(idx);
      } else {
        item.classList.add("hidden");
      }
    });
  });
});