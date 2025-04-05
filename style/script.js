// Таймер
let timer;
let timeLeft = 25 * 60; // в секундах
let isRunning = false;
let pomodoroCount = 0;

const timeDisplay = document.getElementById("time");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");
const pomodoroCountDisplay = document.getElementById("pomodoro-count");

function updateDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    timeDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startTimer() {
    if (isRunning) return;
    isRunning = true;
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateDisplay();
        } else {
            clearInterval(timer);
            isRunning = false;
            pomodoroCount++;
            pomodoroCountDisplay.textContent = pomodoroCount;
            alert("Время вышло! Сделай перерыв.");
            timeLeft = 25 * 60;
            updateDisplay();
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    timeLeft = 25 * 60;
    updateDisplay();
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

// Запускаем первый раз отображение
updateDisplay();

// Задачи
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    const li = document.createElement("li");
    li.textContent = taskText;
    li.style.cursor = "pointer";

    // Клик — отмечаем как выполненное
    li.addEventListener("click", () => {
        li.classList.toggle("done");
    });

    // Правый клик — удалить задачу
    li.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        li.remove();
    });

    taskList.appendChild(li);
    taskInput.value = "";
});
