/* ============================================================
   A HARSHIL VERSE EXPERIENCE 2.0 - SCRIPT
   PART 1: GLOBAL DECLARATIONS & SCREEN 1-2 CONTROLLER
============================================================ */


const input = document.getElementById("receiverName");
const button = document.getElementById("continueBtn");

const intro = document.querySelector(".intro");
const screen2 = document.querySelector(".screen2");

const line1 = document.querySelector(".line1");
const line2 = document.querySelector(".line2");

const displayName = document.getElementById("displayName");
const loading = document.querySelector(".loadingText");
const shine = document.querySelector(".name-shine");

const screen3 = document.querySelector(".screen3");

const s31 = document.querySelector(".s3-1");
const s32 = document.querySelector(".s3-2");
const s33 = document.querySelector(".s3-3");
const s34 = document.querySelector(".s3-4");
const s35 = document.querySelector(".s3-5");
const s36 = document.querySelector(".s3-6");

const ready = document.querySelector(".ready");
const screen4 = document.querySelector(".screen4");

const lineA = document.querySelector(".screen4Line1");
const lineB = document.querySelector(".screen4Line2");

const currentDate =
    document.getElementById("currentDate");


if (currentDate) {

    const today =
        new Date();

    currentDate.textContent =
        today.toLocaleDateString(
            "en-GB",
            {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
            }
        );
}
/* Screen 1 Input & Button Listener */
if (button) {
  button.addEventListener("click", () => {
    let name = input ? input.value.trim() : "";
    if (name === "") {
      name = "Someone Special";
    }

    localStorage.setItem("receiverName", name);

    if (intro) intro.classList.add("hidden");
    if (screen2) screen2.classList.remove("hidden");

    playScreen2(name);
  });
}

if (input) {
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && button) {
      button.click();
    }
  });
}

/* Background Particles Canvas (Screen 1) */
const canvas = document.getElementById("particles");
if (canvas) {
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const mouse = { x: undefined, y: undefined, radius: 120 };
  const bgParticles = [];

  class Particle {
    constructor(x, y, size) {
      this.x = x;
      this.y = y;
      this.baseX = x;
      this.baseY = y;
      this.size = size;
      this.vx = 0;
      this.vy = 0;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,.55)";
      ctx.fill();
    }

    update() {
      if (mouse.x !== undefined && mouse.y !== undefined) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
          const angle = Math.atan2(dy, dx);
          const force = (mouse.radius - distance) / mouse.radius;
          this.vx += Math.cos(angle) * force * 3;
          this.vy += Math.sin(angle) * force * 3;
        }
      }

      this.vx += (this.baseX - this.x) * 0.02;
      this.vy += (this.baseY - this.y) * 0.02;

      this.vx *= 0.92;
      this.vy *= 0.92;

      this.x += this.vx;
      this.y += this.vy;

      this.draw();
    }
  }

  for (let i = 0; i < 150; i++) {
    bgParticles.push(
      new Particle(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        Math.random() * 2 + 1
      )
    );
  }

  function animateBg() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bgParticles.forEach(p => p.update());
    requestAnimationFrame(animateBg);
  }

  animateBg();

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener("mouseleave", () => {
    mouse.x = undefined;
    mouse.y = undefined;
  });

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

/* Screen 2 Sequence */
function playScreen2(name) {
  if (!line1 || !line2 || !displayName || !loading) return;

  line1.style.opacity = "0";
  line2.style.opacity = "0";
  displayName.textContent = "";
  displayName.style.opacity = "1";
  loading.style.opacity = "0";

  if (shine) {
    shine.style.opacity = "0";
    shine.style.left = "-30%";
  }

  line1.style.animation = "fadeBlur .8s forwards";

  setTimeout(() => {
    line2.style.animation = "fadeBlur .8s forwards";
  }, 1800);

  setTimeout(() => {
    typeName(name);
  }, 3600);
}

function typeName(name) {
  let index = 0;
  displayName.textContent = "";

  const typing = setInterval(() => {
    displayName.textContent += name.charAt(index);
    index++;

    if (index >= name.length) {
      clearInterval(typing);

      if (shine) {
        shine.style.opacity = "1";
        shine.style.animation = "shimmer 1.3s forwards";
      }

      displayName.style.animation = "pulseGlow 2.5s ease-in-out infinite";
      setTimeout(showLoading, 1000);
    }
  }, 170);
}

function showLoading() {
  const messages = [
    "Preparing something unforgettable...",
    "Creating your experience...",
    "Here we go! let the magic begin..."
  ];

  let i = 0;
  loading.style.opacity = "1";

  function nextMessage() {
    if (i >= messages.length) {
      setTimeout(() => {
        if (screen2) screen2.classList.add("hidden");
        if (screen3) screen3.classList.remove("hidden");
        playScreen3();
      }, 1000);
      return;
    }

    loading.style.opacity = "0";

    setTimeout(() => {
      loading.textContent = messages[i];
      loading.style.opacity = "1";
      i++;
      setTimeout(nextMessage, 1700);
    }, 350);
  }

  nextMessage();
}

/* ============================================================
   PART 2: SCREEN 3-4 CONTROLLERS & DOM CONTENT INITIALIZATION
============================================================ */
const canvas2 = document.getElementById('roseCanvas');

if (canvas2) {
  const ctx = canvas2.getContext('2d');
  let particles = [];
  const numParticles = 180;

  function resizeCanvas() {
    canvas2.width = window.innerWidth;
    canvas2.height = window.innerHeight;
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  class StraightRosePetal {
    constructor(isInitial = false) {
      this.init(isInitial);
    }

    init(isInitial = false) {
      this.x = Math.random() * canvas2.width; // Fixed horizontal position
      this.y = isInitial ? Math.random() * canvas2.height : canvas2.height + 30;
      this.size = Math.random() * 2+ 4;
      this.speedY = Math.random() * 1.2 + 0.8; // Smooth vertical speed
      this.angle = Math.random() * 360;
      this.spin = (Math.random() - 0.5) * 0.3; // Very light rotation
      this.opacity = Math.random() * 0.4 + 0.6;
      
      const colors = ['#fef1fc', '#9074f7', '#de69f6', '#f975f9', '#f913e6'];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    reset() {
      this.init(false);
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.angle * Math.PI) / 180);
      ctx.globalAlpha = this.opacity;

      // Rose Petal Shape
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-this.size, -this.size * 0.5, -this.size * 0.8, -this.size * 1.6, 0, -this.size * 1.8);
      ctx.bezierCurveTo(this.size * 0.8, -this.size * 1.6, this.size, -this.size * 0.5, 0, 0);
      ctx.fill();

      // Petal Inner Shading Line
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(0,0,0,0.15)';
      ctx.lineWidth = 1;
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(0, -this.size, 0, -this.size * 1.4);
      ctx.stroke();

      ctx.restore();
    }

    update() {
      // Pure Vertical Upward Movement (No X wave or drift)
      this.y -= this.speedY;
      this.angle += this.spin;

      // Reset at bottom once reaching top border
      if (this.y < -30) {
        this.reset();
      }
    }
  }

  // Create Particles
  particles = [];
  for (let i = 0; i < numParticles; i++) {
    particles.push(new StraightRosePetal(true));
  }

  // Loop
  function animateRoseParticles() {
    ctx.clearRect(0, 0, canvas2.width, canvas2.height);

    particles.forEach((petal) => {
      petal.update();
      petal.draw();
    });

    requestAnimationFrame(animateRoseParticles);
  }

  animateRoseParticles();
}
function playScreen3() {
  const s3Lines = [s31, s32, s33, s34, s35, s36];
  s3Lines.forEach(el => {
    if (el) {
      el.style.animation = "none";
      el.style.opacity = "0";
      el.style.visibility = "visible";
      el.style.transform = "translateY(30px)";
      el.style.filter = "blur(11px)";
    }
  });

  if (ready) {
    ready.style.opacity = "0";
    ready.style.animation = "none";
    ready.classList.add("hidden");
  }

  if (s31) s31.style.animation = "cinematicFade .9s forwards";

  setTimeout(() => {
    if (s32) s32.style.animation = "cinematicFade .9s forwards";
  }, 900);

  setTimeout(() => {
    if (s31) s31.style.animation = "cinematicOut .7s forwards";
    if (s32) s32.style.animation = "cinematicOut .7s forwards";
  }, 3200);

  setTimeout(() => {
    if (s33) s33.style.animation = "cinematicFade .9s forwards";
  }, 4200);

  setTimeout(() => {
    if (s34) s34.style.animation = "cinematicFade .9s forwards";
  }, 4900);

  setTimeout(() => {
    if (s33) s33.style.animation = "cinematicOut .7s forwards";
    if (s34) s34.style.animation = "cinematicOut .7s forwards";
  }, 7600);

  setTimeout(() => {
    if (s35) s35.style.animation = "cinematicFade .9s forwards";
  }, 8900);

  setTimeout(() => {
    if (s36) s36.style.animation = "cinematicFade .9s forwards";
  }, 11000);

  setTimeout(() => {
    if (s35) s35.style.animation = "cinematicOut .7s forwards";
    if (s36) s36.style.animation = "cinematicOut .7s forwards";
  }, 15100);

  setTimeout(() => {
    if (ready) {
      ready.classList.remove("hidden");
      ready.style.animation = "readyReveal 1s forwards";
    }
  }, 18200);

  setTimeout(() => {
    if (ready) ready.style.animation = "cinematicOut .8s forwards";
  }, 21300);

  setTimeout(() => {
    if (screen3) screen3.classList.add("hidden");
    if (screen4) screen4.classList.remove("hidden");
    playScreen4();
  }, 24100);
}

function playScreen4() {
  const glow = document.querySelector(".birthdayGlow");
  const openLetter = document.getElementById("open-letter-btn");

  if (lineA) lineA.style.opacity = 0;
  if (lineB) lineB.style.opacity = 0;
  if (openLetter) openLetter.style.opacity = 0;

  if (glow) {
    glow.style.opacity = 1;
    glow.style.animation = "glowPulse 5s infinite";
  }

  setTimeout(() => { if (lineA) lineA.style.animation = "revealText .9s forwards"; }, 300);
  setTimeout(() => { if (lineB) lineB.style.animation = "revealText .9s forwards"; }, 1500);
  setTimeout(() => {
    if (openLetter) {
      openLetter.classList.remove("hidden");
      openLetter.style.animation = "revealText .8s forwards";
    }
  }, 3000);
}

/* Primary DOM Event Controller */
document.addEventListener('DOMContentLoaded', () => {
  const openBtn = document.getElementById('open-letter-btn');
  const particleCanvas = document.getElementById('magic-particle-canvas');
  const butterflyViewport = document.getElementById('butterfly-viewport');
  const envelopeWrapper = document.getElementById('cinematic-envelope-wrapper');
  const cinematicEnvelope = document.querySelector('.envelope');
  const beforeContinue = document.getElementById("beforeContinue");
  const screen4Line2 = document.querySelector('.screen4Line2');
  const templateSvg = document.getElementById('realistic-butterfly');

  const prevLetterBtn = document.getElementById('prevLetterBtn') || document.getElementById('prev-letter-btn');
  const nextLetterBtn = document.getElementById('nextLetterBtn') || document.getElementById('next-letter-btn');
  const letterCounter = document.getElementById('letterCounter') || document.getElementById('letter-counter');
  const letterNavControls = document.getElementById('letterNavControls') || document.getElementById('letter-nav-controls');
  const screen6TriggerBtn = document.getElementById('screen6-trigger-btn');

  if (!openBtn || !particleCanvas || !butterflyViewport) return;

  const magicCtx = particleCanvas.getContext('2d');
  let canvasWidth = particleCanvas.width = window.innerWidth;
  let canvasHeight = particleCanvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    canvasWidth = particleCanvas.width = window.innerWidth;
    canvasHeight = particleCanvas.height = window.innerHeight;
  });

  const magicParticles = [];
  const particleColors = ['#ff7bc8', '#ffaadf', '#ffd6ef', '#ffffff', '#ff4d94'];

  class MagicParticle {
    constructor(x, y, sparkle = false) {
      this.x = x + (Math.random() - 0.5) * 20;
      this.y = y + (Math.random() - 0.5) * 20;
      this.size = sparkle ? Math.random() * 3 + 1 : Math.random() * 2 + 0.5;
      this.color = particleColors[Math.floor(Math.random() * particleColors.length)];
      this.vx = (Math.random() - 0.5) * (sparkle ? 1.8 : 0.8);
      this.vy = (Math.random() - 0.5) * (sparkle ? 1.8 : 0.8) - 0.3;
      this.alpha = 1;
      this.decay = Math.random() * 0.015 + 0.008;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= this.decay;
    }

    draw() {
      magicCtx.save();
      magicCtx.globalAlpha = Math.max(0, this.alpha);
      magicCtx.fillStyle = this.color;
      magicCtx.shadowBlur = 8;
      magicCtx.shadowColor = this.color;
      magicCtx.beginPath();
      magicCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      magicCtx.fill();
      magicCtx.restore();
    }
  }

  function animateMagicParticles() {
    magicCtx.clearRect(0, 0, canvasWidth, canvasHeight);
    for (let i = magicParticles.length - 1; i >= 0; i--) {
      const particle = magicParticles[i];
      particle.update();
      particle.draw();
      if (particle.alpha <= 0) {
        magicParticles.splice(i, 1);
      }
    }
    requestAnimationFrame(animateMagicParticles);
  }
  animateMagicParticles();

  /* ============================================================
   PART 3: BUTTERFLY ENGINE & SCREEN 4 TO 5 TRANSITION
============================================================ */

  class Butterfly {
    constructor(x, y) {
      this.element = document.createElement("div");
      this.element.className = "butterfly-instance";

      if (templateSvg) {
        const svg = templateSvg.cloneNode(true);
        svg.removeAttribute("id");
        this.element.appendChild(svg);
      }
      butterflyViewport.appendChild(this.element);

      this.scale = Math.random() * 0.45 + 0.55;
      this.depth = Math.random() * 300 - 150;
      this.x = x;
      this.y = y;
      this.rotation = 0;

      const flapDuration = Math.random() * 0.18 + 0.22;
      this.element.style.setProperty("--flap-duration", `${flapDuration}s`);
      this.element.style.setProperty("--flap-angle-start", "0deg");
      this.element.style.setProperty("--flap-angle-end", `${Math.random() * 20 + 58}deg`);

      this.p0 = { x: x, y: y };
      this.p1 = { x: x, y: y };
      this.p2 = { x: x, y: y };
      this.p3 = { x: x, y: y };

      this.progress = 1;
      this.speed = 0;
    }

    setPath(p1, p2, p3, duration) {
      this.p0 = { x: this.x, y: this.y };
      this.p1 = p1;
      this.p2 = p2;
      this.p3 = p3;
      this.progress = 0;
      this.speed = 1 / (duration * 60);
    }

    update() {
      if (this.progress < 1) {
        this.progress += this.speed;
        const t = Math.min(this.progress, 1);
        const u = 1 - t;

        const newX = u * u * u * this.p0.x + 3 * u * u * t * this.p1.x + 3 * u * t * t * this.p2.x + t * t * t * this.p3.x;
        const newY = u * u * u * this.p0.y + 3 * u * u * t * this.p1.y + 3 * u * t * t * this.p2.y + t * t * t * this.p3.y;

        const dx = newX - this.x;
        const dy = newY - this.y;

        if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
          this.rotation = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
        }

        this.x = newX;
        this.y = newY;

        magicParticles.push(new MagicParticle(this.x, this.y, false));
      }

      this.element.style.transform =
        `translate3d(${this.x}px, ${this.y}px, ${this.depth}px) scale(${this.scale}) rotate(${this.rotation}deg)`;
    }
  }

  const butterflies = [];
  const butterflyCount = 14;

  /* Master Letter Trigger */
  openBtn.addEventListener("click", function () {
    openBtn.classList.add("pressed");

    if (beforeContinue) beforeContinue.style.display = "none";
    if (screen4Line2) screen4Line2.style.display = "none";
    openBtn.style.display = "none";

    const rect = openBtn.getBoundingClientRect();
    const startX = rect.left + rect.width / 2;
    const startY = rect.top + rect.height / 2;

    for (let i = 0; i < 50; i++) {
      magicParticles.push(new MagicParticle(startX, startY, true));
    }

    setTimeout(() => {
      for (let i = 0; i < butterflyCount; i++) {
        const butterfly = new Butterfly(startX, startY);
        butterflies.push(butterfly);

        const angle = (Math.PI * 2 / butterflyCount) * i + (Math.random() * 0.5 - 0.25);
        const distance = Math.random() * 180 + 120;

        const cp1 = {
          x: startX + Math.cos(angle) * distance * 0.45,
          y: startY + Math.sin(angle) * distance * 0.45 - 50
        };
        const cp2 = {
          x: startX + Math.cos(angle) * distance,
          y: startY + Math.sin(angle) * distance
        };
        const target = {
          x: startX + Math.cos(angle) * (distance + 40),
          y: startY + Math.sin(angle) * (distance + 40)
        };

        butterfly.setPath(cp1, cp2, target, 1.2);
      }
    }, 300);

    setTimeout(() => {
      butterflies.forEach(butterfly => {
        const p1 = { x: butterfly.x + (Math.random() * 300 - 150), y: butterfly.y - 150 };
        const p2 = { x: canvasWidth / 2 + (Math.random() * 400 - 200), y: canvasHeight * 0.4 };
        const p3 = { x: canvasWidth / 2 + (Math.random() * 300 - 150), y: canvasHeight * 0.35 };
        butterfly.setPath(p1, p2, p3, 1.2);
      });
    }, 1500);

    setTimeout(() => {
      const centerX = canvasWidth / 2;
      const centerY = canvasHeight / 2;

      butterflies.forEach((butterfly, index) => {
        const angle = (Math.PI * 2 / butterflyCount) * index;
        const radius = 180;
        const targetX = centerX + Math.cos(angle) * radius;
        const targetY = centerY + Math.sin(angle) * radius;

        const p1 = { x: butterfly.x + (Math.random() * 100 - 50), y: butterfly.y + (Math.random() * 100 - 50) };
        const p2 = { x: targetX + (Math.random() * 60 - 30), y: targetY + (Math.random() * 60 - 30) };

        butterfly.setPath(p1, p2, { x: targetX, y: targetY }, 1);
      });
    }, 2000);

    setTimeout(() => {
      if (envelopeWrapper) envelopeWrapper.classList.add("visible");
    }, 2500);

    setTimeout(() => {
      if (cinematicEnvelope) cinematicEnvelope.classList.add("open");

      setTimeout(() => {
        if (cinematicEnvelope) cinematicEnvelope.classList.add("slide-up");
      }, 600);

      setTimeout(() => {
        if (cinematicEnvelope) cinematicEnvelope.classList.add("letter-out");
        if (letterNavControls) letterNavControls.classList.remove('hidden');
      }, 1200);

      butterflies.forEach(butterfly => {
        const flyAgain = () => {
          const targetX = Math.random() * canvasWidth;
          const targetY = Math.random() * canvasHeight * 0.8;

          const p1 = { x: butterfly.x + (Math.random() * 200 - 100), y: butterfly.y + (Math.random() * 200 - 100) };
          const p2 = { x: targetX + (Math.random() * 200 - 100), y: targetY + (Math.random() * 200 - 100) };

          butterfly.setPath(p1, p2, { x: targetX, y: targetY }, Math.random() * 2 + 2.5);
        };
        flyAgain();
        setInterval(flyAgain, Math.random() * 2500 + 3500);
      });
    }, 3000);

    function animateButterflies() {
      butterflies.forEach(butterfly => butterfly.update());
      requestAnimationFrame(animateButterflies);
    }
    animateButterflies();
  }, { once: true });

  /* Navigation between 5 letters */
  let currentLetter = 1;
  const totalLetters = 5;
  let isAnimating = false;

  function updateLetter(newIndex) {
    if (isAnimating || newIndex < 1 || newIndex > totalLetters || newIndex === currentLetter) return;
    isAnimating = true;

    const currentPaper = document.getElementById(`letter-paper-${currentLetter}`);
    const nextPaper = document.getElementById(`letter-paper-${newIndex}`);

    if (currentPaper && nextPaper && cinematicEnvelope) {
      cinematicEnvelope.classList.remove('letter-out');
      cinematicEnvelope.classList.remove('slide-up');

      setTimeout(() => {
        currentPaper.classList.remove('active-letter');
        currentLetter = newIndex;
        nextPaper.classList.add('active-letter');

        setTimeout(() => {
          cinematicEnvelope.classList.add('slide-up');

          setTimeout(() => {
            cinematicEnvelope.classList.add('letter-out');

            if (letterCounter) letterCounter.textContent = `${currentLetter} / ${totalLetters}`;
            if (prevLetterBtn) prevLetterBtn.disabled = (currentLetter === 1);

            if (currentLetter === totalLetters) {
              if (nextLetterBtn) nextLetterBtn.classList.add('hidden');
              if (screen6TriggerBtn) screen6TriggerBtn.classList.remove('hidden');
            } else {
              if (nextLetterBtn) {
                nextLetterBtn.classList.remove('hidden');
                nextLetterBtn.disabled = false;
              }
              if (screen6TriggerBtn) screen6TriggerBtn.classList.add('hidden');
            }

            setTimeout(() => { isAnimating = false; }, 500);
          }, 500);
        }, 200);
      }, 200);
    } else {
      isAnimating = false;
    }
  }

  if (prevLetterBtn) {
    prevLetterBtn.addEventListener('click', (e) => {
      e.preventDefault();
      updateLetter(currentLetter - 1);
    });
  }

  if (nextLetterBtn) {
    nextLetterBtn.addEventListener('click', (e) => {
      e.preventDefault();
      updateLetter(currentLetter + 1);
    });
  }

  /* Screen 4 -> Screen 5 Hook */
  if (screen6TriggerBtn) {
    screen6TriggerBtn.addEventListener('click', (e) => {
      e.preventDefault();
      transitionToScreen5();
    });
  }

  /* ============================================================
   PART 4: SCREEN 5 CONFETTI SYSTEM & CINEMATIC SEQUENCE
============================================================ */
function createFeedbackRoseParticles() {

    const container = document.getElementById("feedbackRoseParticles");

    if (!container) return;

    // Prevent duplicate particles
    container.innerHTML = "";

    const particleCount = 95;

    for (let i = 0; i < particleCount; i++) {

        const particle = document.createElement("span");

        particle.className = "feedback-rose-particle";

       particle.style.left =
    Math.random() * 100 + "%";

particle.style.animationDuration =
    (6 + Math.random() * 4) + "s";

particle.style.animationDelay =
    Math.random() * 6 + "s";

        container.appendChild(particle);
    }
}
  /* Screen 5 Canvas Confetti */
  const confettiCanvas = document.getElementById('confettiCanvas');
  let confettiCtx = null;
  let confettiParticles = [];
  let isConfettiRunning = false;

  if (confettiCanvas) {
    confettiCtx = confettiCanvas.getContext('2d');
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      if (confettiCanvas) {
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;
      }
    });
  }

  class ConfettiParticle {
    constructor() {
      this.x = Math.random() * window.innerWidth;
      this.y = Math.random() * -window.innerHeight;
      this.size = Math.random() * 8 + 5;
      this.color = ['#fade2b', '#ff4d94', '#ff3db5', '#ffffff', '#ff7bc8', '#00e5ff'][Math.floor(Math.random() * 6)];
      this.vy = Math.random() * 2 + 1.5;
      this.vx = (Math.random() - 0.5) * 1.5;
      this.rotation = Math.random() * 360;
      this.rotationSpeed = (Math.random() - 0.5) * 4;
      this.opacity = Math.random() * 0.7 + 0.3;
    }

    update() {
      this.y += this.vy;
      this.x += Math.sin(this.y * 0.01) + this.vx;
      this.rotation += this.rotationSpeed;

      if (this.y > window.innerHeight + 20) {
        this.y = -20;
        this.x = Math.random() * window.innerWidth;
      }
    }

    draw() {
      if (!confettiCtx) return;
      confettiCtx.save();
      confettiCtx.translate(this.x, this.y);
      confettiCtx.rotate((this.rotation * Math.PI) / 180);
      confettiCtx.globalAlpha = this.opacity;
      confettiCtx.fillStyle = this.color;
      confettiCtx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size * 0.6);
      confettiCtx.restore();
    }
  }

  function initConfetti() {
    confettiParticles = [];
    for (let i = 0; i < 90; i++) {
      confettiParticles.push(new ConfettiParticle());
    }
    if (!isConfettiRunning) {
      isConfettiRunning = true;
      animateConfetti();
    }
  }

  function animateConfetti() {
    if (!isConfettiRunning || !confettiCtx) return;
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    confettiParticles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animateConfetti);
  }
createFeedbackRoseParticles();
  /* Transition Logic to Screen 5 */
  /* Transition Logic to Screen 5 */
function transitionToScreen5() {
  const s4 = document.querySelector('.screen4');
  const s5 = document.querySelector('.screen5') || document.getElementById('screen5');

  if (s4) s4.classList.add('hidden');
  if (s5) {
    s5.classList.remove('hidden');
    
    // Screen 5 par butterflies ko scatter aur continue animate karne ke liye:
    butterflies.forEach(butterfly => {
      const flyAcrossScreen5 = () => {
        const targetX = Math.random() * window.innerWidth;
        const targetY = Math.random() * window.innerHeight * 0.85;

        const p1 = { x: butterfly.x + (Math.random() * 200 - 100), y: butterfly.y + (Math.random() * 200 - 100) };
        const p2 = { x: targetX + (Math.random() * 200 - 100), y: targetY + (Math.random() * 200 - 100) };

        butterfly.setPath(p1, p2, { x: targetX, y: targetY }, Math.random() * 2 + 2.5);
      };
      flyAcrossScreen5();
    });

    startScreen5Sequence();
  }
}

  /* Screen 5 Timed Sequence */
  function startScreen5Sequence() {
    const line1 = document.getElementById('s5Line1');
    const title = document.getElementById('s5Title');
    const receiverNameEl = document.getElementById('s5ReceiverName');
    const line2 = document.getElementById('s5Line2');
    const orbHint = document.getElementById('orbHint');

    const storedName = localStorage.getItem('receiverName') || 'Someone Special';
    if (receiverNameEl) receiverNameEl.textContent = storedName;

    // Line 1 Reveal
    setTimeout(() => {
      if (line1) line1.classList.remove('hidden');
    }, 600);

    // Title Reveal + Confetti Start
    setTimeout(() => {
      if (title) title.classList.remove('hidden');
      initConfetti();
    }, 2200);

    // Receiver Name Reveal
    setTimeout(() => {
      if (receiverNameEl) receiverNameEl.classList.remove('hidden');
    }, 3600);

    // Line 2 Reveal
    setTimeout(() => {
      if (line2) line2.classList.remove('hidden');
    }, 4800);

    // Orb Hint Reveal
    setTimeout(() => {
      if (orbHint) orbHint.classList.remove('hidden');
    }, 6000);
  }
// Screen 5 text reveal hone ke baad button show karein

  /* ============================================================
   PART 5: INTERACTIVE ORB BURST, POETRY REVEAL & MODAL LOGIC
============================================================ */

  const orbWrapper = document.getElementById('orbWrapper');
  const orbHint = document.getElementById('orbHint');
  const poeticMessage = document.getElementById('s5PoeticMessage');
  const infoFeedbackBtn = document.getElementById('infoFeedbackBtn');

  let isOrbClicked = false;

  if (orbWrapper) {
    orbWrapper.addEventListener('click', () => {
      if (isOrbClicked) return;
      isOrbClicked = true;

      if (orbHint) orbHint.classList.add('hidden');

      // Create interactive light particle burst
      const rect = orbWrapper.getBoundingClientRect();
      const burstX = rect.left + rect.width / 2;
      const burstY = rect.top + rect.height / 2;

      for (let i = 0; i < 70; i++) {
        magicParticles.push(new MagicParticle(burstX, burstY, true));
      }

      // Show Poetic Message Section
      setTimeout(() => {
        if (poeticMessage) poeticMessage.classList.remove('hidden');
        playPoeticLines();
      }, 600);
    });
  }

  function playPoeticLines() {
    const p1 = document.getElementById('poem1');
    const p2 = document.getElementById('poem2');
    const p3 = document.getElementById('poem3');
    const p4 = document.getElementById('poem4');

    setTimeout(() => { if (p1) p1.classList.add('poem-reveal'); }, 300);
    setTimeout(() => { if (p2) p2.classList.add('poem-reveal'); }, 1500);
    setTimeout(() => { if (p3) p3.classList.add('poem-reveal'); }, 2700);
    setTimeout(() => { if (p4) p4.classList.add('poem-reveal'); }, 3900);

    setTimeout(() => {
      if (infoFeedbackBtn) infoFeedbackBtn.classList.remove('hidden');
    }, 5200);
  }

 /* =====================================================
   ABOUT / FEEDBACK POPUP
===================================================== */
function createFeedbackRoseParticles() {

    const container = document.getElementById("feedbackRoseParticles");

    if (!container) return;

    // Prevent duplicate particles
    container.innerHTML = "";

    const particleCount = 90;

    for (let i = 0; i < particleCount; i++) {

        const particle = document.createElement("span");

        particle.className = "feedback-rose-particle";

       particle.style.left =
    Math.random() * 100 + "%";

particle.style.animationDuration =
    (6 + Math.random() * 4) + "s";

particle.style.animationDelay =
    Math.random() * 6 + "s";

        container.appendChild(particle);
    }
}
window.addEventListener(

    "DOMContentLoaded",

    function () {


        const aboutBtn =
            document.getElementById(
                "aboutBtn"
            );


        const aboutOverlay =
            document.getElementById(
                "aboutOverlay"
            );


        const closeAbout =
            document.getElementById(
                "closeAbout"
            );


        if (

            aboutBtn
            &&
            aboutOverlay
            &&
            closeAbout

        ) {


            aboutBtn.addEventListener(

                "click",

                function () {

                    aboutOverlay.classList.add(
                        "show"
                    );

                }

            );


            closeAbout.addEventListener(

                "click",

                function () {

                    aboutOverlay.classList.remove(
                        "show"
                    );

                }

            );

        }

createFeedbackRoseParticles();
        /* ===========================
           PREMIUM STAR RATING
        =========================== */

        const stars =
            document.querySelectorAll(
                ".stars span"
            );


        const starsContainer =
            document.querySelector(
                ".stars"
            );


        let selectedRating =
            0;


        function updateStars(
            rating
        ) {


            stars.forEach(

                function (star) {


                    const value =
                        Number(
                            star.dataset.rating
                        );


                    if (

                        value
                        <=
                        rating

                    ) {

                        star.classList.add(
                            "active"
                        );

                    }

                    else {

                        star.classList.remove(
                            "active"
                        );

                    }

                }

            );

        }


        stars.forEach(

            function (star) {


                star.addEventListener(

                    "mouseenter",

                    function () {

                        updateStars(

                            Number(
                                star.dataset.rating
                            )

                        );

                    }

                );


                star.addEventListener(

                    "click",

                    function () {

                        selectedRating =
                            Number(
                                star.dataset.rating
                            );


                        updateStars(
                            selectedRating
                        );

                    }

                );

            }

        );


        if (starsContainer) {

            starsContainer.addEventListener(

                "mouseleave",

                function () {

                    updateStars(
                        selectedRating
                    );

                }

            );

        }

    }

);


/* =========================
   EMAILJS INITIALIZATION
========================= */

if (

    typeof emailjs
    !==
    "undefined"

) {

    emailjs.init({

        publicKey:
            "RsxrowgbVN97v98jA"

    });

}


const sendFeedback =
    document.getElementById(
        "sendFeedback"
    );


if (sendFeedback) {


    sendFeedback.addEventListener(

        "click",

        function () {


            const rating =
                document.querySelectorAll(

                    ".stars span.active"

                ).length;


            const feedback =
                document.querySelector(
                    "textarea"
                )
                .value
                .trim();


            if (

                rating
                ===
                0

            ) {

                alert(
                    "Please select a rating ⭐"
                );


                return;

            }


            if (

                feedback
                ===
                ""

            ) {

                alert(
                    "Please write your feedback 💬"
                );


                return;

            }


            sendFeedback.disabled =
                true;


            sendFeedback.textContent =
                "Sending...";


            const currentDateTime =
                new Date()
                    .toLocaleString(

                        "en-IN",

                        {

                            dateStyle:
                                "full",

                            timeStyle:
                                "short"

                        }

                    );


            const templateParams = {


                /*
                   USER ENTERED NAME
                */

                name:
                    (localStorage.getItem("receiverName") || "Someone Special"),


                rating:
                    rating
                    +
                    " / 5",


                feedback:
                    feedback,


                website:
                    "A Harshil Verse Experience",


                time:
                    currentDateTime

            };


            console.log(
                "SEND BUTTON CLICKED"
            );


            console.log(
                "EmailJS:",
                typeof emailjs
            );


            console.log(
                "Params:",
                templateParams
            );


            emailjs.send(

                "service_ypr9adh",

                "template_pqg59sg",

                templateParams

            )


            .then(

                function () {


                    alert(
                        "Thank you for your feedback! ✨"
                    );


                    document.querySelector(
                        "textarea"
                    ).value =
                        "";


                    document
                        .querySelectorAll(
                            ".stars span"
                        )
                        .forEach(

                            function (star) {

                                star.classList
                                    .remove(
                                        "active"
                                    );

                            }

                        );


                    sendFeedback.disabled =
                        false;


                    sendFeedback.textContent =
                        "Submit";

                }

            )


            .catch(

                function (error) {


                    console.error(

                        "EmailJS Error:",

                        error

                    );


                    alert(

                        "Something went wrong. Please try again."

                    );


                    sendFeedback.disabled =
                        false;


                    sendFeedback.textContent =
                        "Submit";

                }

            );

        }

    );

  }

})