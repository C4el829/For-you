const canvas = document.getElementById("background-canvas");
const ctx = canvas.getContext("2d");

let width, height;
let particles = [];
const particleCount = 100;

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * width;
    this.y = height + Math.random() * 100;
    this.size = 5 + Math.random() * 5;
    this.speedY = 1 + Math.random() * 2;
    this.opacity = 0.1 + Math.random() * 0.3;
    this.color = `rgba(255, 111, 145, ${this.opacity})`;
  }

  update() {
    this.y -= this.speedY;
    if (this.y < -this.size) {
      this.reset();
    }
  }

  draw() {
    ctx.beginPath();
    const x = this.x;
    const y = this.y;
    const size = this.size;

    ctx.fillStyle = this.color;
    ctx.shadowColor = "rgba(255, 111, 145, 0.5)";
    ctx.shadowBlur = 10;

    ctx.moveTo(x, y);
    ctx.bezierCurveTo(x, y - size / 2, x - size, y - size / 2, x - size, y + size / 4);
    ctx.bezierCurveTo(x - size, y + size / 2, x, y + size, x, y + size * 1.5);
    ctx.bezierCurveTo(x, y + size, x + size, y + size / 2, x + size, y + size / 4);
    ctx.bezierCurveTo(x + size, y - size / 2, x, y - size / 2, x, y);
    ctx.fill();
  }
}

function initParticles() {
  particles = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
}

function animate() {
  ctx.clearRect(0, 0, width, height);
  particles.forEach((p) => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animate);
}

initParticles();
animate();

// Toggle envelope
const envelope = document.querySelector('.envelope-wrapper');
const animationRight = envelope.querySelector('.animation');
const animationLeft = envelope.querySelector('.animation-left');

envelope.addEventListener('click', () => {
  envelope.classList.toggle('flap');
  document.body.classList.toggle('flap-bg');

  if (envelope.classList.contains('flap')) {
    animationRight.classList.remove('hidden');
    animationLeft.classList.remove('hidden');
  } else {
    animationRight.classList.add('hidden');
    animationLeft.classList.add('hidden');
  }
});
const forgiveBox =
  document.getElementById("forgiveBox");


// Дугтуй нээгдсэний дараа асуулт гарна
envelope.addEventListener("click", () => {

  if (envelope.classList.contains("flap")) {

    setTimeout(() => {
      forgiveBox.classList.add("show");
    }, 1500);

  } else {

    forgiveBox.classList.remove("show");

  }

});


async function sendAnswer(answer) {

  const message =
    document.getElementById("answer-message");

  message.innerText =
    "Хариуг илгээж байна... ❤️";


  try {

    const response = await fetch(
      "https://formspree.io/f/xeajbgll",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },

        body: JSON.stringify({
          answer: answer
        })
      }
    );


    if (response.ok) {

      message.innerText =
        "❤️ Хариу илгээгдлээ.";

    } else {

      message.innerText =
        "Хариу илгээгдэхэд алдаа гарлаа.";

    }

  } catch (error) {

    message.innerText =
      "Алдаа гарлаа.";

    console.error(error);

  }

}
async function sendCustomAnswer() {

  const message =
    document.getElementById("customMessage").value.trim();

  const result =
    document.getElementById("custom-result");

  if (!message) {
    result.innerText =
      "Хариугаа бичээрэй ❤️";
    return;
  }

  result.innerText =
    "Илгээж байна...";


  try {

    const response = await fetch(
      "https://formspree.io/f/xeajbgll",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },

        body: JSON.stringify({
          answer: message
        })
      }
    );


    if (response.ok) {

      result.innerText =
        "❤️ Хариу чинь надад хүрлээ.";

      document.getElementById(
        "customMessage"
      ).value = "";

    } else {

      result.innerText =
        "Илгээхэд алдаа гарлаа.";

    }

  } catch (error) {

    console.error(error);

    result.innerText =
      "Интернетээ шалгаарай.";

  }
}
