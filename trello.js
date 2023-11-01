// array for storing task
const AllTasks = [];

// function for adding main task
const mainTaskButton = document.getElementById("main-task-button");
const mainTaskInput = document.getElementById("main-task-input");

mainTaskButton.addEventListener("click", function () {
  const mainTaskInput = document.getElementById("main-task-input");
  const taskInput = mainTaskInput.value;
  if (AllTasks.length === 3) {
    mainTaskInput.style.display="none"
    mainTaskButton.style.display="none"
  }else{
    if (taskInput.trim() !== "") {
      const newMainTask = {
        text: taskInput,
        subTasks: [],
        dateTime: getCurrentDateTime()
      };
      // push to main array name is all tasks
      AllTasks.push(newMainTask);
      mainTaskInput.value = "";
      displayTasks();
      hideinput()
    }
  }
  
});

// hide main input

function hideinput() {
  if (AllTasks.length === 3) {
    mainTaskInput.style.display="none"
    mainTaskButton.style.display="none"
  }
}

hideinput();

// function for adding date and time
function getCurrentDateTime() {
  const now = new Date();
  const options = { weekday: 'long',  year: 'numeric', month: 'short', day: 'numeric',  };
  return now.toLocaleString('en-US', options);
}

// function for add sub task
function addSubTask(mainTaskIndex) {
  const subTaskInput = document.getElementById("sub-task-" + mainTaskIndex);
  const subtaskselection = document.getElementById( "sub-task-select-" + mainTaskIndex );
  const subtaskassign = document.getElementById( "sub-task-assign" + mainTaskIndex );
  const subTaskText = subTaskInput.value;
  const subTaskSelectText =subtaskselection.value;
  const subtaskassignText = subtaskassign.value;

  if (subTaskText && subTaskSelectText && subtaskassignText) {
    AllTasks[mainTaskIndex].subTasks.push({
      subinput1: subTaskText,
      subinput2:subTaskSelectText ,
      subinput3:subtaskassignText
    });
    displayTasks();
    subTaskInput.value = "";
    subtaskselection.value = "";
    subtaskassign.value="";

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

    // for adding date 

    const datesection = document.createElement('p');
    task.appendChild(datesection);
    datesection.classList.add("task-date")
    datesection.innerHTML = "Created On " + mainTask.dateTime;

    // Subtask input and button

    const model = document.createElement('div');
    model.classList.add('model')
    const subinputdiv = document.createElement("div");
    subinputdiv.classList.add('model-div')
    // first
    const subinput = document.createElement("input");
    subinput.id = "sub-task-" + index;
    subinput.type = "text";
    subinput.placeholder = "Add Sub Task Description";
    subinput.classList.add('sub-input');
    // second
    const subinputassign = document.createElement("input");
    subinputassign.id = "sub-task-assign" + index;
    subinputassign.type = "text";
    subinputassign.placeholder = "Add Sub Task ";
    subinputassign.classList.add('sub-input');
// select
    const subTaskSelect = document.createElement("select"); 
    subTaskSelect.id = "sub-task-select-" +  index;
    subTaskSelect.classList.add('sub-input');
    // option1
    const option1 = document.createElement('option')
    option1.value="Select Name"
    option1.innerHTML=option1.value;
    // option2
    const option2 = document.createElement('option')
    option2.value="Asad"
    option2.innerHTML=option2.value;
    // option3
    const option3 = document.createElement('option')
    option3.value="Dawood"
    option3.innerHTML=option3.value;
    subTaskSelect.appendChild(option1);
    subTaskSelect.appendChild(option2);
    subTaskSelect.appendChild(option3);
  
    // button
    const subTaskButton = document.createElement("button");
    const modelClose = document.createElement("button");
    subTaskButton.innerHTML = "Add Sub-Task";
    modelClose.innerHTML="Close"
    subTaskButton.classList.add('sub-task-btn');
    modelClose.classList.add('sub-task-model')
    subTaskButton.onclick = () => addSubTask(index);

    // sub task list
    const subTaskList = document.createElement("div");
    subTaskList.classList.add('sub-task-list')
    subinputdiv.appendChild(subinput);
    subinputdiv.appendChild(subinputassign);
    subinputdiv.appendChild(subTaskSelect);
    subinputdiv.appendChild(subTaskButton);
    // subinputdiv.appendChild(modelClose)
    task.appendChild(subTaskList);
    

    // Display existing subtasks
    mainTask.subTasks.forEach((subTask) => {
      const listforItem = document.createElement('div');
      listforItem.classList.add('list')
      subTaskList.appendChild(listforItem);

      const subTaskItem = document.createElement("p");
      const subTaskItemSelect = document.createElement("p");
      const subTaskItemAssign = document.createElement("p");
      subTaskItem.classList.add('paragraph')
      subTaskItemSelect.classList.add('paragraph')
      subTaskItemAssign.classList.add('paragraph');
      subTaskItem.innerHTML ="Task Description : " +  subTask.subinput1;
      subTaskItemSelect.innerHTML ="Task Assign To : " + subTask.subinput2;
      subTaskItemAssign.innerHTML="Task Name : " + subTask.subinput3;
      listforItem.appendChild(subTaskItem);
      listforItem.appendChild(subTaskItemSelect);
      listforItem.appendChild(subTaskItemAssign)
    });

    // close model
    modelClose.addEventListener('click',function(){
      model.style.display="none";
    })

    // "Add New" button for subtasks
    const btnForsubTask = document.createElement("button");
    btnForsubTask.innerHTML = "Add New ";
    btnForsubTask.classList.add('add-new-btn')
    btnForsubTask.classList.add("sub-task-button");

    // Event listener for "Add New" button
    btnForsubTask.addEventListener("click", function () {
      task.appendChild(model);
      model.style.display="flex"
      model.appendChild(subinputdiv);
      subinputdiv.appendChild(subinput);
      subinputdiv.appendChild(subTaskButton);
      
      
    });

    // Append elements to the task
    task.appendChild(btnForsubTask);
    task.appendChild(subTaskList);
  });
}
