const questions = [
  { prompt: "6 x 4 = ?", correct: 24, wrong: 36 },
  { prompt: "Half of 54 = ?", correct: 27, wrong: 24 },
  { prompt: "15 + 18 = ?", correct: 33, wrong: 32 },
  { prompt: "9 x 5 = ?", correct: 45, wrong: 40 },
  { prompt: "72 - 28 = ?", correct: 44, wrong: 54 }
];

const state = {
  index: 0,
  selected: "left",
  chests: 0,
  seconds: 120,
  locked: false
};

const el = {
  hero: document.querySelector("#heroCard"),
  left: document.querySelector('[data-choice="left"]'),
  right: document.querySelector('[data-choice="right"]'),
  leftAnswer: document.querySelector("#leftAnswer"),
  rightAnswer: document.querySelector("#rightAnswer"),
  leftLabel: document.querySelector("#leftLabel"),
  rightLabel: document.querySelector("#rightLabel"),
  question: document.querySelector("#questionText"),
  title: document.querySelector("#promptTitle"),
  pick: document.querySelector("#pickButton"),
  toast: document.querySelector("#gameToast"),
  time: document.querySelector("#timeText"),
  chests: document.querySelector("#chestText"),
  stage: document.querySelector(".stage"),
  leftControl: document.querySelector("#leftControl"),
  rightControl: document.querySelector("#rightControl")
};

function renderQuestion() {
  const q = questions[state.index % questions.length];
  const correctSide = state.index % 2 === 0 ? "left" : "right";
  const leftValue = correctSide === "left" ? q.correct : q.wrong;
  const rightValue = correctSide === "right" ? q.correct : q.wrong;
  el.question.textContent = q.prompt;
  el.title.textContent = state.chests >= 5 ? "Final island!" : "Choose the gate!";
  el.leftAnswer.textContent = leftValue;
  el.rightAnswer.textContent = rightValue;
  el.leftLabel.textContent = correctSide === "left" ? "Open gold chest" : "Whirlpool trap";
  el.rightLabel.textContent = correctSide === "right" ? "Open gold chest" : "Whirlpool trap";
  selectSide(state.selected);
}

function selectSide(side) {
  state.selected = side;
  el.left.classList.toggle("selected", side === "left");
  el.right.classList.toggle("selected", side === "right");
  el.hero.classList.toggle("sail-left", side === "left");
  el.hero.classList.toggle("sail-right", side === "right");
  el.leftControl.classList.toggle("active", side === "left");
  el.rightControl.classList.toggle("active", side === "right");
  const value = side === "left" ? el.leftAnswer.textContent : el.rightAnswer.textContent;
  el.pick.textContent = `Pick ${value}`;
}

function choose() {
  if (state.locked) return;
  state.locked = true;
  const q = questions[state.index % questions.length];
  const chosen = Number(state.selected === "left" ? el.leftAnswer.textContent : el.rightAnswer.textContent);
  const choiceEl = state.selected === "left" ? el.left : el.right;
  if (chosen === q.correct) {
    state.chests += 1;
    el.chests.textContent = state.chests;
    flash(choiceEl, "correct-flash");
    el.hero.classList.add("celebrate");
    sparkle(choiceEl);
    showToast(randomGood(), "good");
    state.index += 1;
    setTimeout(() => {
      el.hero.classList.remove("celebrate");
      state.locked = false;
      renderQuestion();
    }, 900);
  } else {
    flash(choiceEl, "wrong-flash");
    showToast("Nice try. Sail away from that whirlpool.", "try");
    setTimeout(() => {
      state.locked = false;
      selectSide(state.selected === "left" ? "right" : "left");
    }, 700);
  }
}

function sparkle(anchor) {
  const stageBox = el.stage.getBoundingClientRect();
  const box = anchor.getBoundingClientRect();
  const x = box.left + box.width / 2 - stageBox.left;
  const y = box.top + box.height / 2 - stageBox.top;
  for (let i = 0; i < 14; i += 1) {
    const spark = document.createElement("span");
    const angle = (Math.PI * 2 * i) / 14;
    const distance = 54 + Math.random() * 52;
    spark.className = "spark";
    spark.style.left = `${x}px`;
    spark.style.top = `${y}px`;
    spark.style.setProperty("--dx", `${Math.cos(angle) * distance}px`);
    spark.style.setProperty("--dy", `${Math.sin(angle) * distance}px`);
    el.stage.append(spark);
    setTimeout(() => spark.remove(), 820);
  }
}

function flash(node, className) {
  node.classList.remove(className);
  void node.offsetWidth;
  node.classList.add(className);
  setTimeout(() => node.classList.remove(className), 540);
}

function showToast(message, tone) {
  el.toast.textContent = message;
  el.toast.className = `toast ${tone} show`;
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    el.toast.className = "toast";
  }, 1500);
}

function randomGood() {
  const lines = [
    "Treasure found!",
    "Sharp thinking, captain!",
    "Brave choice!",
    "That gate was golden!",
    "Quest brain activated!"
  ];
  return lines[Math.floor(Math.random() * lines.length)];
}

function tick() {
  state.seconds = Math.max(0, state.seconds - 1);
  const mins = String(Math.floor(state.seconds / 60)).padStart(2, "0");
  const secs = String(state.seconds % 60).padStart(2, "0");
  el.time.textContent = `${mins}:${secs}`;
  if (state.seconds === 0) {
    showToast(`Quest complete. ${state.chests} chests found.`, "good");
  }
}

document.querySelectorAll("[data-choice]").forEach((button) => {
  button.addEventListener("click", () => selectSide(button.dataset.choice));
});

document.querySelectorAll("[data-move]").forEach((button) => {
  button.addEventListener("click", () => selectSide(button.dataset.move));
});

el.pick.addEventListener("click", choose);
window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") selectSide("left");
  if (event.key === "ArrowRight") selectSide("right");
  if (event.key === "Enter" || event.key === " ") choose();
});

renderQuestion();
setInterval(tick, 1000);
