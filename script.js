// var addMaintaskBtn = document.getElementById("add-main-task-btn");
// var mainTaskInput = document.getElementById("input-main-task");
// var taskList = document.getElementById("main-task-list");
// var taskTitle = document.querySelector(".task-title");
// var task = document.getElementById("task-title");
// var taskModel = document.getElementById("task-model");
// var closeModel = document.getElementById('close-sub-task-model');
// var addSubTaskBtn  = document.getElementById('add-sub-task-btn');
// var subTaskCardInput = document.getElementById('sub-task-input');
// var currentMainTask = null; // Track the current main task




// addMaintaskBtn.addEventListener("click", function () {
//   const mainTaskInputText = mainTaskInput.value;
//   const newtask = document.createElement("div");
//   const taskname = document.createElement("h1");
//   const subtaskbtn = document.createElement("button");
//   if (mainTaskInputText.trim() !== "") {
//     newtask.classList.add("task");
//     newtask.setAttribute("id", "singletask");
//     taskList.appendChild(newtask);
//     taskname.innerText = mainTaskInputText;
//     newtask.appendChild(taskname);
//     subtaskbtn.innerText = "Add Sub Task";
//     subtaskbtn.classList.add("sub-task-btn");
//     newtask.appendChild(subtaskbtn);
//     // code for add sub task btn
//      // Set the current main task to the newly created one
//      currentMainTask = newtask;
//     mainTaskInput.value = "";
//     subtaskbtn.addEventListener("click", function () {
//       taskModel.style.display = "flex";
//     });
//   }
  

// //   add sub task
// addSubTaskBtn.addEventListener('click', function (e) {

//     const newSubtask =document.createElement('div')
//     const newsubtaskTitle = document.createElement('h3')
//     const subtasinputText = subTaskCardInput.value;
// if (subtasinputText.trim()!== "") {
//     newtask.appendChild(newSubtask);
//     newSubtask.classList.add('sub-task-card');
//     newsubtaskTitle.innerText = subtasinputText
//     newSubtask.appendChild(newsubtaskTitle);
//     currentMainTask.appendChild(newSubtask);
// subTaskCardInput.value=""
// }
// })

// });

// closeModel.addEventListener('click',function(){
//     taskModel.style.display="none"
//     currentMainTask = null; // Reset the current main task when closing the model
// })



var addMainTaskBtn = document.getElementById("add-main-task-btn");
var mainTaskInput = document.getElementById("input-main-task");
var taskList = document.getElementById("main-task-list");
var taskModel = document.getElementById("task-model");
var closeModel = document.getElementById('close-sub-task-model');
var addSubTaskBtn = document.getElementById('add-sub-task-btn');
var subTaskCardInput = document.getElementById('sub-task-input');
var currentMainTask = null; // Track the current main task

addMainTaskBtn.addEventListener("click", function () {
  const mainTaskInputText = mainTaskInput.value;
  if (mainTaskInputText.trim() !== "") {
    const newMainTask = document.createElement("div");
    newMainTask.classList.add("task");
    newMainTask.setAttribute("id", "singletask");
    taskList.appendChild(newMainTask);
    
    const taskName = document.createElement("h1");
    taskName.innerText = mainTaskInputText;
    newMainTask.appendChild(taskName);
    
    const subTaskBtn = document.createElement("button");
    subTaskBtn.innerText = "Add Sub Task";
    subTaskBtn.classList.add("sub-task-btn");
    newMainTask.appendChild(subTaskBtn);
    
    // Set the current main task to the newly created one
    currentMainTask = newMainTask;
    
    mainTaskInput.value = "";
    
    subTaskBtn.addEventListener("click", function () {
      taskModel.style.display = "flex";
    });
  }
});

// Add sub task
addSubTaskBtn.addEventListener('click', function (e) {
  const subTaskInputText = subTaskCardInput.value;
  if (subTaskInputText.trim() !== "" && currentMainTask) {
    const newSubTask = document.createElement('div');
    newSubTask.classList.add('sub-task-card');
    
    const subTaskTitle = document.createElement('h3');
    subTaskTitle.innerText = subTaskInputText;
    newSubTask.appendChild(subTaskTitle);
    
    currentMainTask.appendChild(newSubTask); // Use currentMainTask
    
    subTaskCardInput.value = "";
  }
});

closeModel.addEventListener('click', function () {
  taskModel.style.display = "none";
 
});
