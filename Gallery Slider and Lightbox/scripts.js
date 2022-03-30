const lightboxContainer = document.getElementById("lightbox-container");
const lightboxContent = document.getElementById("lightbox-content");
const lightboxClose = document.getElementById("lightbox-close");
const lightboxGrid = document.getElementById("lightbox-grid");
const photoContent = document.getElementById("photo-content");
const photoWrap = document.getElementById("photo-wrap");
const photo = document.getElementById("photo");
const galleryContainer = document.getElementById("gallery-container");
const galleryFocus = document.getElementById("gallery-focus");
const gallerySlider = document.getElementById("gallery-slider");
const galleryOverlay = document.getElementById("gallery-overlay");

let spacerWidth = gallerySlider.clientWidth / 2 - 60;
let isGrid = false;
let currentPos = Math.round(gallerySlider.scrollLeft / 60);
let newPos;
let photoWidth;

let sliderImages = "";
let largeImages = "";

for (let i = 0; i < 15; i++) {
  sliderImages +=
    '<img class="photo" data-pos="' +
    i +
    '" src="assets/az_yavapai_00002_' +
    (1 + i) +
    '.jpeg">';
  largeImages +=
    '<img class="photo-large" data-pos="' +
    i +
    '" src="assets/az_yavapai_00002_' +
    (1 + i) +
    '.jpeg" onclick="selectGrid(event)">';
}
sliderImages +=
  '<div id="spacer" style="min-width:' +
  spacerWidth +
  '; margin-left: 40px;"></div>';

galleryFocus.innerHTML = sliderImages;
photoWrap.innerHTML = largeImages;

gallerySlider.style.cursor = "grab";

let pos = { top: 0, left: 0, x: 0, y: 0 };

const mouseDownHandler = function (e) {
  galleryOverlay.style.cursor = "grabbing";
  galleryOverlay.style.userSelect = "none";

  pos = {
    left: gallerySlider.scrollLeft,
    top: gallerySlider.scrollTop,
    // Get the current mouse position
    x: e.clientX,
    y: e.clientY,
  };
  shrinkCurrent();

  document.addEventListener("pointermove", mouseMoveHandler);
  document.addEventListener("pointerup", mouseUpHandler);
  document.addEventListener("pointercancel", mouseUpHandler);
};

const mouseMoveHandler = function (e) {
  // How far the mouse has been moved
  const dx = e.clientX - pos.x;
  newPos = Math.round(gallerySlider.scrollLeft / 60);
  if (newPos !== currentPos) {
    currentPos = newPos;
    photoWidth = photoContent.clientWidth;
    photoContent.scrollTo(newPos * photoWidth, 0);
    //photoWrap.innerHTML =
    //  '<img class="photo-large" src="assets/img' + newPos + '.jpg">';
  }
  // Scroll the element
  gallerySlider.scrollLeft = pos.left - dx;
};

const mouseUpHandler = function () {
  galleryOverlay.style.cursor = "grab";
  galleryOverlay.style.removeProperty("user-select");
  currentPos = Math.round(gallerySlider.scrollLeft / 60);
  gallerySlider.scrollTo(currentPos * 60, 0);
  growCurrent();
  document.removeEventListener("pointermove", mouseMoveHandler);
  document.removeEventListener("pointerup", mouseUpHandler);
};

const handleKeyPress = (event) => {
  switch (event.keyCode) {
    case 39:
      scrollToRight();
      break;
    case 37:
      scrollToLeft();
      break;
    default:
      break;
  }
};

// Attach the handler
galleryOverlay.addEventListener("pointerdown", mouseDownHandler);

const openLightbox = () => {
  lightboxContainer.classList.add("lightbox-open");
  lightboxClose.classList.remove("hidden");
  lightboxGrid.classList.remove("hidden");

  spacerWidth = gallerySlider.clientWidth / 2 - 60;
  document.getElementById("spacer").style.minWidth = spacerWidth;

  scrollToContent();

  document.addEventListener("keydown", handleKeyPress);
};
const closeLightbox = () => {
  lightboxContainer.classList.remove("lightbox-open");
  lightboxClose.classList.add("hidden");
  lightboxGrid.classList.add("hidden");
  spacerWidth = gallerySlider.clientWidth / 2 - 60;
  document.getElementById("spacer").style.minWidth = spacerWidth;
  scrollToContent();
  document.removeEventListener("keydown", handleKeyPress);
  if (isGrid) {
    toggleGrid();
  }
};
const toggleGrid = () => {
  photoWrap.classList.toggle("grid");
  if (isGrid) {
    photoWidth = photoContent.clientWidth;
    photoContent.scrollTo(currentPos * photoWidth, 0);
  } else {
    let imageHeight = document.querySelector(".photo-large").clientHeight;
    photoContent.scrollTo(0, Math.floor(currentPos / 3) * imageHeight);
  }
  isGrid = !isGrid;
  galleryContainer.classList.toggle("hidden");
};
const selectGrid = (event) => {
  shrinkCurrent();
  if (isGrid) {
    currentPos = event.target.getAttribute("data-pos");
    gallerySlider.scrollTo(currentPos * 60, 0);
    toggleGrid();
  }
  growCurrent();
};

const scrollToContent = () => {
  gallerySlider.scrollTo(currentPos * 60, 0);
  photoWidth = photoContent.clientWidth;
  photoContent.scrollTo(currentPos * photoWidth, 0);
};

const scrollToRight = () => {
  if (currentPos < 14) {
    shrinkCurrent();
    currentPos++;
    console.log(currentPos);
    scrollToContent();
    growCurrent();
  }
};
const scrollToLeft = () => {
  if (currentPos > 0) {
    shrinkCurrent();
    currentPos--;
    console.log(currentPos);
    scrollToContent();
    growCurrent();
  }
};

const growCurrent = () => {
  document.querySelectorAll('[data-pos="' + currentPos + '"]')[1].style.margin =
    "10px";
  galleryFocus.style.marginLeft = "calc(50% - 40px)";
};
const shrinkCurrent = () => {
  document.querySelectorAll('[data-pos="' + currentPos + '"]')[1].style.margin =
    "0px";
  galleryFocus.style.marginLeft = "calc(50% - 30px)";
};
growCurrent();
const testnum = (num) => {
  let result = Math.round(num);
  console.log(result);
};
testnum(115);
