const bgPlane = document.querySelector('.background-aviao');
const bgNuvens = document.querySelector('.background-nuvens');

let latestScrollY = 0;
let planeOffset = 0;
let nuvensOffset = 0;
const nuvensSpeed = 0.3

function animateBackgrounds() {
  const targetPlane = latestScrollY * 2.5;  // Avião mais rápido
  const targetNuvens = latestScrollY * 0.8; // Nuvens mais lentas

  planeOffset += (targetPlane - planeOffset) * 0.04;

  // Avião com left via style (ou use background-position se preferir)
  bgPlane.style.left = `${planeOffset}px`;

  // Nuvens movem via background-position
  nuvensOffset += nuvensSpeed;
  bgNuvens.style.backgroundPosition = `${nuvensOffset}px center`;

  requestAnimationFrame(animateBackgrounds);
}

window.addEventListener('scroll', () => {
  latestScrollY = window.scrollY;
});

animateBackgrounds();
