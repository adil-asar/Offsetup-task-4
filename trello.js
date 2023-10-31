// array for storing task
const AllTasks = [];

// function for adding main task
const mainTaskButton = document.getElementById("main-task-button");
const mainTaskInput = document.getElementById("main-task-input");

mainTaskButton.addEventListener("click", function () {
  const mainTaskInput = document.getElementById("main-task-input");
  const taskInput = mainTaskInput.value;
  if (taskInput.trim() !== "") {
    const newMainTask = {
      text: taskInput,
      subTasks: [],
    };
    // push to main array name is all tasks
    AllTasks.push(newMainTask);
    mainTaskInput.value = "";
    displayTasks();
  }
});

// function for add sub task
function addSubTask(mainTaskIndex) {
  const subTaskInput = document.getElementById("sub-task-" + mainTaskIndex);
  const subtaskassignInput = document.getElementById(
    "sub-task-assign" + mainTaskIndex
  );
  const subTaskText = subTaskInput.value;
  const subTaskassignText = subtaskassignInput.value;

  if (subTaskText && subTaskassignText) {
    AllTasks[mainTaskIndex].subTasks.push({
      subinput1: subTaskText,
      subinput2: subTaskassignText,
    });
    displayTasks();
    subTaskInput.value = "";
    subtaskassignInput.value = "";
  }
}

function displayTasks() {
  const mainTaskList = document.getElementById("task-list");
  mainTaskList.innerHTML = "";

  AllTasks.forEach((mainTask, index) => {
    const task = document.createElement("div");
    task.classList.add("task");
    mainTaskList.appendChild(task);

    const maintitle = document.createElement("h3");
    maintitle.classList.add("task-title")
    task.appendChild(maintitle);
    maintitle.innerHTML = mainTask.text;

    // Subtask input and button
    const subinputdiv = document.createElement("div");
    // first
    const subinput = document.createElement("input");
    subinput.id = "sub-task-" + index;
    subinput.type = "text";
    subinput.placeholder = "Add Sub Task Assign";
    subinput.classList.add('sub-input');
    // second
    const subinputassign = document.createElement("input");
    subinputassign.id = "sub-task-assign" + index;
    subinputassign.type = "text";
    subinputassign.placeholder = "Add Sub Task ";
    subinputassign.classList.add('sub-input');
    // button
    const subTaskButton = document.createElement("button");
    subTaskButton.innerHTML = "Add Sub-Task";
    subTaskButton.classList.add('sub-task-btn')
    subTaskButton.onclick = () => addSubTask(index);

    // sub task list
    const subTaskList = document.createElement("div");
    subTaskList.classList.add('sub-task-list')
    subinputdiv.appendChild(subinput);
    subinputdiv.appendChild(subinputassign);
    subinputdiv.appendChild(subTaskButton);
    task.appendChild(subTaskList);

    // Display existing subtasks
    mainTask.subTasks.forEach((subTask) => {
      const subTaskItem = document.createElement("p");
      const subTaskItemassign = document.createElement("p");
      subTaskItem.classList.add('paragraph')
      subTaskItemassign.classList.add('paragraph')
      subTaskItem.innerHTML =  subTask.subinput1;
      subTaskItemassign.innerHTML =  subTask.subinput2;
      subTaskList.appendChild(subTaskItem);
      subTaskList.appendChild(subTaskItemassign);
    });

    // "Add New" button for subtasks
    const btnForsubTask = document.createElement("button");
    btnForsubTask.innerHTML = "Add New ";
    btnForsubTask.classList.add('add-new-btn')
    btnForsubTask.classList.add("sub-task-button");

    // Event listener for "Add New" button
    btnForsubTask.addEventListener("click", function () {
      task.appendChild(subinputdiv);
      subinputdiv.appendChild(subinput);
      subinputdiv.appendChild(subTaskButton);
    });

    // Append elements to the task
    task.appendChild(btnForsubTask);
    task.appendChild(subTaskList);
  });
}
