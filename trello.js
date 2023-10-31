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
  const subTaskText = subTaskInput.value;

  if (subTaskText) {
    AllTasks[mainTaskIndex].subTasks.push(subTaskText);
      displayTasks();
      subTaskInput.value = "";
  }
}


function displayTasks() {
  const mainTaskList = document.getElementById("task-list");
  mainTaskList.innerHTML = "";

  AllTasks.forEach((mainTask, index) => {
    const task = document.createElement("div");
    task.classList.add('task');
    mainTaskList.appendChild(task);

    const maintitle = document.createElement("h3");
    task.appendChild(maintitle);
    maintitle.innerHTML = mainTask.text;
    
    // Subtask input and button
    const subinputdiv = document.createElement('div');
    const subinput = document.createElement('input');
    subinput.id = "sub-task-" + index;
    subinput.type = "text";
    subinput.placeholder = "Add a sub-task";
    const subTaskButton = document.createElement("button");
    subTaskButton.innerHTML = "Add Sub-Task";
    subTaskButton.onclick = () => addSubTask(index);

     // sub task list
    const subTaskList = document.createElement("div");
subinputdiv.appendChild(subinput);
subinputdiv.appendChild(subTaskButton);
task.appendChild(subTaskList);

    // Display existing subtasks
    mainTask.subTasks.forEach((subTask) => {
      const subTaskItem = document.createElement("p");
      subTaskItem.innerHTML = subTask;
      subTaskList.appendChild(subTaskItem);
    });
    
    // "Add New" button for subtasks
    const btnForsubTask = document.createElement('button');
    btnForsubTask.innerHTML = "Add New";
    btnForsubTask.classList.add('sub-task-button');

   
    // Event listener for "Add New" button
    btnForsubTask.addEventListener('click', function () {
      task.appendChild(subinputdiv);
      subinputdiv.appendChild(subinput);
      subinputdiv.appendChild(subTaskButton);
    });

    // Append elements to the task
    task.appendChild(btnForsubTask);
    task.appendChild(subTaskList);

    
  });
}
