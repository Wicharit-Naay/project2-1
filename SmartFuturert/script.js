
const toggleLightButton = document.getElementById('toggle-light');
const lightBulb = document.getElementById('light-bulb');

toggleLightButton.addEventListener('click', () => {
  if (lightBulb.classList.contains('on')) {
    lightBulb.classList.remove('on');
    lightBulb.classList.add('off');
    toggleLightButton.textContent = 'เปิดไฟ';
  } else {
    lightBulb.classList.remove('off');
    lightBulb.classList.add('on');
    toggleLightButton.textContent = 'ปิดไฟ';
  }
});

