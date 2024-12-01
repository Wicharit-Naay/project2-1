// Get DOM elements
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const captureButton = document.getElementById('capture');
const filterButtons = document.querySelectorAll('.filter-btn');
const ctx = canvas.getContext('2d');

// Access the camera
navigator.mediaDevices.getUserMedia({ video: true })
  .then((stream) => {
    video.srcObject = stream;
  })
  .catch((err) => {
    console.error("Error accessing the camera: ", err);
  });

// Capture the photo
captureButton.addEventListener('click', () => {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
});

// Apply filters
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.getAttribute('data-filter');
    canvas.style.filter = filter;
  });
});

// DOM Elements
const addHeartButton = document.getElementById('add-heart');
const addAnimalFilterButton = document.getElementById('add-animal-filter');
const stickerContainer = document.getElementById('sticker-container');

// ฟังก์ชันสำหรับเพิ่มสติ๊กเกอร์
function addSticker(type) {
  const sticker = document.createElement('div');
  sticker.classList.add(type);

  // ตั้งตำแหน่งเริ่มต้น
  sticker.style.left = '50%';
  sticker.style.top = '50%';
  sticker.style.transform = 'translate(-50%, -50%)';

  // ใส่สติ๊กเกอร์ใน container
  stickerContainer.appendChild(sticker);

  // ทำให้สติ๊กเกอร์ลากได้
  makeDraggable(sticker);
}

// ฟังก์ชันลากและวาง
function makeDraggable(sticker) {
  sticker.style.pointerEvents = 'auto';

  sticker.addEventListener('mousedown', (e) => {
    let offsetX = e.clientX - sticker.offsetLeft;
    let offsetY = e.clientY - sticker.offsetTop;

    const moveSticker = (event) => {
      sticker.style.left = `${event.clientX - offsetX}px`;
      sticker.style.top = `${event.clientY - offsetY}px`;
    };

    const dropSticker = () => {
      window.removeEventListener('mousemove', moveSticker);
      window.removeEventListener('mouseup', dropSticker);
    };

    window.addEventListener('mousemove', moveSticker);
    window.addEventListener('mouseup', dropSticker);
  });
}

// กดเพิ่มหัวใจ
addHeartButton.addEventListener('click', () => {
  addSticker('heart');
});

// กดเพิ่มฟิลเตอร์สัตว์
addAnimalFilterButton.addEventListener('click', () => {
  addSticker('animal');
});

const saveButton = document.createElement('button');
saveButton.innerText = 'Save Image';
document.body.appendChild(saveButton);

saveButton.addEventListener('click', () => {
  const stickers = document.querySelectorAll('.heart, .animal');
  stickers.forEach(sticker => {
    const x = parseInt(sticker.style.left) - canvas.offsetLeft;
    const y = parseInt(sticker.style.top) - canvas.offsetTop;
    const width = sticker.offsetWidth;
    const height = sticker.offsetHeight;

    const img = new Image();
    img.src = sticker.style.backgroundImage.slice(5, -2); // ดึง URL รูปภาพ
    img.onload = () => {
      ctx.drawImage(img, x, y, width, height);
    };
  });

  const link = document.createElement('a');
  link.download = 'edited-image.png';
  link.href = canvas.toDataURL();
  link.click();
});