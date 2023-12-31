// array for storing task
const AllTasks = [];

// function for adding main task
const mainTaskButton = document.getElementById("main-task-button");
const mainTaskInput = document.getElementById("main-task-input");

mainTaskButton.addEventListener("click", function () {
  const mainTaskInput = document.getElementById("main-task-input");
  const taskInput = mainTaskInput.value;
  if (AllTasks.length === 3) {
    mainTaskInput.style.display = "none";
    mainTaskButton.style.display = "none";
  } else {
    if (taskInput.trim() !== "") {
      const newMainTask = {
        text: taskInput,
        subTasks: [],
        dateTime: getCurrentDateTime(),
      };
      // push to main array name is all tasks
      AllTasks.push(newMainTask);
      mainTaskInput.value = "";
      displayTasks();
      hideinput();
    }
  }
});

// hide main input

function hideinput() {
  if (AllTasks.length === 3) {
    mainTaskInput.style.display = "none";
    mainTaskButton.style.display = "none";
  }
}

hideinput();

// function for adding date and time
function getCurrentDateTime() {
  const now = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return now.toLocaleString("en-US", options);
}

// function for add sub task
function addSubTask(mainTaskIndex) {
  const subTaskInput = document.getElementById("sub-task-" + mainTaskIndex);
  const subtaskselection = document.getElementById(
    "sub-task-select-" + mainTaskIndex
  );
  const subtaskassign = document.getElementById(
    "sub-task-assign" + mainTaskIndex
  );
  const subTaskText = subTaskInput.value;
  const subTaskSelectText = subtaskselection.value;
  const subtaskassignText = subtaskassign.value;

  if (subTaskText && subTaskSelectText && subtaskassignText) {
    AllTasks[mainTaskIndex].subTasks.push({
      subinput1: subTaskText,
      subinput2: subTaskSelectText,
      subinput3: subtaskassignText,
    });
    displayTasks();
    subTaskInput.value = "";
    subtaskselection.value = "";
    subtaskassign.value = "";
  }
}
// for deleting sub task
function deleteSubTask(mainTaskIndex, subTaskIndex) {
  AllTasks[mainTaskIndex].subTasks.splice(subTaskIndex, 1);
  displayTasks();
}
// for deleting main task
function deleteMainTask(mainTaskIndex) {
  AllTasks.splice(mainTaskIndex, 1);
  displayTasks();
}

function displayTasks() {
  const mainTaskList = document.getElementById("task-list");
  mainTaskList.innerHTML = "";

  AllTasks.forEach((mainTask, index) => {
    const task = document.createElement("div");
    task.classList.add("task");
    mainTaskList.appendChild(task);
    // operation btns main task
    const mainbtndiv = document.createElement("div");
    mainbtndiv.classList.add("main-div-btns");
    const mainmodel = document.createElement("div");
    mainmodel.classList.add("main-model");
    task.appendChild(mainbtndiv);

    // main model contents
    const dialog = document.createElement("div");
    const maininputedit = document.createElement("input");
    const updatebtn = document.createElement("button");
    dialog.classList.add("model-div");
    maininputedit.classList.add("main-task-input");
    updatebtn.classList.add("edit-main-task");
    updatebtn.innerText = "Update";

    const pushmodel = document.createElement("div");
    const pushdialog = document.createElement("div");
    const selectinputforpush = document.createElement("select");
    const btnmove = document.createElement("button");
    btnmove.innerHTML = "Move";
    btnmove.classList.add("add-new-btn");

    // delete and edit main task btn
    const mainTaskDelete = document.createElement("button");
    const editMainTaskBtn = document.createElement("button");
    const pushbtn = document.createElement("button");
    mainTaskDelete.classList.add("main-task-delete-btn");
    editMainTaskBtn.classList.add("edit-main-task");
    pushbtn.classList.add("edit-main-task");
    pushmodel.classList.add("model");
    pushdialog.classList.add("model-div");
    selectinputforpush.classList.add("sub-input");
    mainTaskDelete.innerHTML = "x";
    editMainTaskBtn.innerText = "Edit";
    pushbtn.innerHTML = "Move";
    mainbtndiv.appendChild(mainTaskDelete);
    mainbtndiv.appendChild(editMainTaskBtn);
    mainbtndiv.appendChild(pushbtn);

    // open push model
    pushbtn.addEventListener("click", function (mainTaskIndex) {
      pushmodel.style.display = "flex";
      mainbtndiv.appendChild(pushmodel);
      pushmodel.appendChild(pushdialog);
      pushdialog.appendChild(selectinputforpush);
      pushdialog.appendChild(btnmove);
      AllTasks.forEach((mainTask, i) => {
        if (i !== mainTaskIndex) {
          const option = document.createElement("option");
          option.value = i;
          option.textContent = mainTask.text;
          selectinputforpush.appendChild(option);
        }
      });
    });

    // now move the subtasks
    btnmove.addEventListener("click", function () {
      const mainTaskIndex = index; // Capture the current main task index
      const targetMainTaskIndex = selectinputforpush.value;
      if (targetMainTaskIndex !== "") {
        moveSubtasks(mainTaskIndex, targetMainTaskIndex);
        pushmodel.style.display = "none";
      }
    });

    // Function to move subtasks from one main task to another
    function moveSubtasks(sourceMainTaskIndex, targetMainTaskIndex) {
      if (sourceMainTaskIndex !== targetMainTaskIndex) {
        const subtasksToMove = AllTasks[sourceMainTaskIndex].subTasks;
        AllTasks[targetMainTaskIndex].subTasks.push(...subtasksToMove);
        AllTasks[sourceMainTaskIndex].subTasks = [];
        displayTasks();
      }
    }

    // add eventlistener to delete main task
    mainTaskDelete.addEventListener("click", function () {
      deleteMainTask(index);
      hideinput();
    });

    //add eventlistener to edit main task
    editMainTaskBtn.addEventListener("click", () => {
      openEditMainTaskForm(index, mainTask);
      task.appendChild(mainmodel);
      mainmodel.appendChild(dialog);
      dialog.appendChild(maininputedit);
      maininputedit.value = mainTask.text;
      dialog.appendChild(updatebtn);
      mainmodel.style.display = "flex";
    });

    function openEditMainTaskForm(mainTaskIndex, mainTask) {
      // update main text add evenlistener
      updatebtn.addEventListener("click", function () {
        AllTasks[mainTaskIndex].text = maininputedit.value;
        mainmodel.style.display = "none";
        displayTasks();
      });
    }

    const maintitle = document.createElement("h3");
    maintitle.classList.add("task-title");
    task.appendChild(maintitle);
    maintitle.innerHTML = mainTask.text;

    // for adding date

    const datesection = document.createElement("p");
    task.appendChild(datesection);
    datesection.classList.add("task-date");
    datesection.innerHTML = "Created On " + mainTask.dateTime;

    // Subtask input and button

    const model = document.createElement("div");
    model.classList.add("model");
    const subinputdiv = document.createElement("div");
    subinputdiv.classList.add("model-div");
    // first
    const subinput = document.createElement("input");
    subinput.id = "sub-task-" + index;
    subinput.type = "text";
    subinput.placeholder = "Add Sub Task Description";
    subinput.classList.add("sub-input");
    // second
    const subinputassign = document.createElement("input");
    subinputassign.id = "sub-task-assign" + index;
    subinputassign.type = "text";
    subinputassign.placeholder = "Add Sub Task ";
    subinputassign.classList.add("sub-input");
    // select
    const subTaskSelect = document.createElement("select");
    subTaskSelect.id = "sub-task-select-" + index;
    subTaskSelect.classList.add("sub-input");
    // option1
    const option1 = document.createElement("option");
    option1.value = "Select Name";
    option1.innerHTML = option1.value;
    // option2
    const option2 = document.createElement("option");
    option2.value = "Asad";
    option2.innerHTML = option2.value;
    // option3
    const option3 = document.createElement("option");
    option3.value = "Dawood";
    option3.innerHTML = option3.value;
    subTaskSelect.appendChild(option1);
    subTaskSelect.appendChild(option2);
    subTaskSelect.appendChild(option3);

    // button
    const subTaskButton = document.createElement("button");
    const modelClose = document.createElement("button");
    subTaskButton.innerHTML = "Add";
    modelClose.innerHTML = "Close";
    subTaskButton.classList.add("sub-task-btn");
    modelClose.classList.add("sub-task-model");
    subTaskButton.onclick = () => addSubTask(index);

    // sub task list
    const subTaskList = document.createElement("div");
    subTaskList.classList.add("sub-task-list");
    subinputdiv.appendChild(subinput);
    subinputdiv.appendChild(subinputassign);
    subinputdiv.appendChild(subTaskSelect);
    subinputdiv.appendChild(subTaskButton);
    // subinputdiv.appendChild(modelClose)
    task.appendChild(subTaskList);

    // Display existing subtasks
    mainTask.subTasks.forEach((subTask, subTaskIndex) => {
      const listforItem = document.createElement("div");
      listforItem.classList.add("list");
      subTaskList.appendChild(listforItem);
      // paragraph
      const subTaskItem = document.createElement("p");
      const subTaskItemSelect = document.createElement("p");
      const subTaskItemAssign = document.createElement("p");
      // for delete and edit button
      const btndiv = document.createElement("div");
      btndiv.classList.add("operation-btns");
      const deletebtn = document.createElement("button");
      const editbtn = document.createElement("button");
      deletebtn.innerText = "Delete";
      editbtn.innerHTML = "Update";
      deletebtn.classList.add("delete-sub-task");
      editbtn.classList.add("delete-sub-task");
      // sub task model
      const subtaskmodel = document.createElement("div");
      const subtaskdialog = document.createElement("div");
      const subtaskinput1 = document.createElement("input");
      const subtaskinput3 = document.createElement("input");
      const subtaskinput2 = document.createElement("select");
      const option1edit = document.createElement("option");
      const option2edit = document.createElement("option");
      const option3edit = document.createElement("option");

      const updatesubtask = document.createElement("button");

      updatesubtask.innerHTML = "Update";
      subtaskinput1.value = subTask.subinput1;
      subtaskinput2.value = subTask.subinput2;
      subtaskinput3.value = subTask.subinput3;
      option1edit.value = "Select Name";
      option2edit.value = "Asad";
      option3edit.value = "Dawood";
      option1edit.innerHTML = option1edit.value;
      option2edit.innerHTML = option2edit.value;
      option3edit.innerHTML = option3edit.value;

      subTaskItem.classList.add("paragraph");
      subTaskItemSelect.classList.add("paragraph");
      subTaskItemAssign.classList.add("paragraph");
      subtaskmodel.classList.add("sub-task-input-model");
      subtaskdialog.classList.add("sub-task-dialog");
      subTaskItem.innerHTML = "Task Description : " + subTask.subinput1;
      subTaskItemSelect.innerHTML = "Task Assign To : " + subTask.subinput2;
      subTaskItemAssign.innerHTML = "Task Name : " + subTask.subinput3;
      subtaskinput1.classList.add("sub-input");
      subtaskinput2.classList.add("sub-input");
      subtaskinput3.classList.add("sub-input");
      updatesubtask.classList.add("update-sub-task");
      listforItem.appendChild(subTaskItem);
      listforItem.appendChild(subTaskItemSelect);
      listforItem.appendChild(subTaskItemAssign);
      listforItem.appendChild(btndiv);
      btndiv.appendChild(deletebtn);
      btndiv.appendChild(editbtn);

      // Event listener to delete the sub-task
      deletebtn.addEventListener("click", () => {
        deleteSubTask(index, subTaskIndex);
        displayTasks();
      });

      // Event listener to edit the sub-task
      editbtn.addEventListener("click", function () {
        listforItem.appendChild(subtaskmodel);
        subtaskmodel.style.display = "flex";
        subtaskmodel.appendChild(subtaskdialog);
        subtaskdialog.appendChild(subtaskinput3);
        subtaskdialog.appendChild(subtaskinput2);
        subtaskdialog.appendChild(subtaskinput1);
        subtaskdialog.appendChild(updatesubtask);
        subtaskinput2.appendChild(option1edit);
        subtaskinput2.appendChild(option2edit);
        subtaskinput2.appendChild(option3edit);
        // function calling here
        openEditSubTaskForm(index, subTaskIndex, subTask);
      });

      // edit sub task function
      function openEditSubTaskForm(mainTaskIndex, subTaskIndex, subTask) {
        updatesubtask.addEventListener("click", function () {
          AllTasks[mainTaskIndex].subTasks[subTaskIndex].subinput1 =
            subtaskinput1.value;
          AllTasks[mainTaskIndex].subTasks[subTaskIndex].subinput2 =
            subtaskinput2.value;
          AllTasks[mainTaskIndex].subTasks[subTaskIndex].subinput3 =
            subtaskinput3.value;
          subtaskmodel.style.display = "none";
          displayTasks();
        });
      }
    });

    // close model
    modelClose.addEventListener("click", function () {
      model.style.display = "none";
    });

    // "Add New" and sorting button for subtasks
    const divforsorting = document.createElement("div");
    const btnForsubTask = document.createElement("button");
    const btnforsortAB = document.createElement("button");
    const randomsort = document.createElement("button");
    btnForsubTask.innerHTML = "Add Sub Task";
    btnforsortAB.innerHTML = "Alphabetically";
    randomsort.innerHTML = "Random";
    divforsorting.classList.add("sorting-operation");
    btnForsubTask.classList.add("add-new-btn");
    btnforsortAB.classList.add("add-new-btn");
    randomsort.classList.add("add-new-btn");

    // Event listener for "Add New" button
    btnForsubTask.addEventListener("click", function () {
      task.appendChild(model);
      model.style.display = "flex";
      model.appendChild(subinputdiv);
      subinputdiv.appendChild(subinput);
      subinputdiv.appendChild(subTaskButton);
    });

    // event listener for sort a to b

    randomsort.addEventListener("click", function () {
      AllTasks.forEach((mainTask, index) => {
        AllTasks[index].subTasks.sort(() => Math.random() - 0.5);
      });
      displayTasks();
      updateSortButtonsVisibility();
    });

    btnforsortAB.addEventListener("click", function () {
      AllTasks.forEach((mainTask, index) => {
        mainTask.subTasks.sort((a, b) =>
          a.subinput1.localeCompare(b.subinput1)
        );
        AllTasks[index].subTasks.sort((a, b) =>
          a.subinput1.localeCompare(b.subinput1)
        );
      });

      // Update the display
      displayTasks();
      updateSortButtonsVisibility();
    });

    function updateSortButtonsVisibility() {
      const hasSubtasks = AllTasks.some(
        (mainTask) => mainTask.subTasks.length > 0
      );
      if (hasSubtasks) {
        btnforsortAB.removeAttribute("hidden");
        randomsort.removeAttribute("hidden");
        pushbtn.removeAttribute("hidden");
      } else {
        btnforsortAB.setAttribute("hidden", "true");
        randomsort.setAttribute("hidden", "true");
        pushbtn.setAttribute("hidden", "true");
      }
    }

    // Call the function initially and after any updates to AllTasks
    updateSortButtonsVisibility();

    // Append elements to the task
    task.appendChild(divforsorting);
    divforsorting.appendChild(btnForsubTask);
    divforsorting.appendChild(btnforsortAB);
    divforsorting.appendChild(randomsort);
    task.appendChild(subTaskList);
  });
}
