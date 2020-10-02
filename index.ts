const lines = document.querySelectorAll("#selection .line");
const circles = document.querySelectorAll("#selection .circle");
const sections = document.querySelectorAll("section");

function sln(n: number) {
  const x = (x: Element, i: number) => {
    if (i == n) x.classList.add("active");
    else x.classList.remove("active");
    if (i <= n) {
      x.classList.add("selected");
    } else {
      x.classList.remove("selected");
    }
  };
  lines.forEach((e, i) => x(e, i + 1));
  circles.forEach(x);
}

function sln2(n: number) {
  sections.forEach((x, i) => {
    if (i == n) {
      x.className = "active";
    } else if (i == n + 1) {
      x.className = "right";
    } else {
      if (x.className == "right") {
        x.style.display = "none";
        setTimeout(() => (x.style.display = ""), 500);
      }
      x.className = "";
    }
  });
}

sections.forEach((x, i) => {
  x.addEventListener("click", () => {
    if (x.className !== "right") return;
    sln(i);
    sln2(i);
    moves = document.querySelectorAll(".active *[data-move]");
  });
});

circles.forEach((x, i) => {
  x.addEventListener("click", () => {
    sln(i);
    sln2(i);
    moves = document.querySelectorAll(".active *[data-move]");
  });
});

let springMouse = { x: 0, y: 0, tx: 0, ty: 0, vx: 0, vy: 0 };
let moves = document.querySelectorAll(".active *[data-move]");

function draw() {
  springMouse.vx += (springMouse.tx - springMouse.x) * 0.02;
  springMouse.vy += (springMouse.ty - springMouse.y) * 0.02;
  springMouse.x += springMouse.vx;
  springMouse.y += springMouse.vy;
  springMouse.vx *= 0.7;
  springMouse.vy *= 0.7;
  let centeredX = springMouse.x - window.innerWidth / 2;
  let centeredY = springMouse.y - window.innerHeight / 2;
  moves.forEach(x => {
    let el = x as HTMLElement;
    let mv = +el.getAttribute("data-move");
    el.style.transform = `translate(${centeredX * -mv}px, ${centeredY * -mv}px)`;
  });
  requestAnimationFrame(draw);
}
draw();

document.addEventListener("mousemove", (e) => {
  springMouse.tx = e.clientX;
  springMouse.ty = e.clientY;
});
