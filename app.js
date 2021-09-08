const galleryItems = [
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg",
    description: "Hokkaido Flower",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg",
    description: "Container Haulage Freight",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg",
    description: "Aerial Beach View",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg",
    description: "Flower Blooms",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg",
    description: "Alpine Mountains",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg",
    description: "Mountain Lake Sailing",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg",
    description: "Alpine Spring Meadows",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg",
    description: "Nature Landscape",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg",
    description: "Lighthouse Coast Sea",
  },
];

const refs = {
  galleryCardsRef: document.querySelector(".js-gallery"),
  lightboxRef: document.querySelector(".js-lightbox"),
  lightboxImgRef: document.querySelector(".lightbox__image"),
  lightboxCloseBtn: document.querySelector(
    'button[data-action="close-lightbox"]'
  ),
  lightboxOverlay: document.querySelector(".lightbox__overlay"),
};

const {
  galleryCardsRef,
  lightboxRef,
  lightboxImgRef,
  lightboxCloseBtn,
  lightboxOverlay,
} = refs;

const createGalleryCardsMarkup = (galleryItems) => {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
    <li class="gallery__item">
      <a
        class="gallery__link"
        href="${original}"
      >
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </li>
    `;
    })
    .join("");
};

galleryCardsRef.insertAdjacentHTML(
  "beforeend",
  createGalleryCardsMarkup(galleryItems)
);

const onEscKeyDown = (event) => {
  if (event.code === "Escape") {
    onLightboxClose();
  }
};

const onArrowKeyDown = (event) => {
  let currentIndex = galleryItems.findIndex(
    (item) =>
      item.description === lightboxImgRef.alt ||
      item.original === lightboxImgRef.src
  );

  if (event.code === "ArrowLeft") {
    currentIndex !== 0 ? (currentIndex -= 1) : (currentIndex = 0);
  }

  if (event.code === "ArrowRight") {
    currentIndex !== galleryItems.length - 1
      ? (currentIndex += 1)
      : (currentIndex = galleryItems.length - 1);
  }

  lightboxImgRef.alt = galleryItems[currentIndex].description;
  lightboxImgRef.src = galleryItems[currentIndex].original;
};

const onLightboxOpen = (event) => {
  if (!event.target.classList.contains("gallery__image")) {
    return;
  }

  event.preventDefault();

  window.addEventListener("keydown", onEscKeyDown);
  window.addEventListener("keydown", onArrowKeyDown);

  lightboxRef.classList.toggle("is-open");
  lightboxImgRef.src = event.target.dataset.source;
  lightboxImgRef.alt = event.target.alt;
};

galleryCardsRef.addEventListener("click", onLightboxOpen);

const onLightboxClose = () => {
  window.removeEventListener("keydown", onEscKeyDown);
  window.removeEventListener("keydown", onArrowKeyDown);

  lightboxRef.classList.toggle("is-open");
  lightboxImgRef.src = "";
  lightboxImgRef.alt = "";
};

lightboxCloseBtn.addEventListener("click", onLightboxClose);

const onLightboxClick = (event) => {
  if (event.currentTarget === event.target) {
    onLightboxClose();
  }
};

lightboxOverlay.addEventListener("click", onLightboxClick);
