window.onload = function () {
  taskId = 0;
  dataSet = JSON.parse(localStorage.getItem("dataSet"));

  if (dataSet) {
    showTasks();

    taskId = dataSet[dataSet.length - 1].id + 1;
  } else dataSet = [];
};

function addTask() {
  event.preventDefault();
  let input = document.getElementById("input").value;

  if (input === "") {
    input = document.getElementById("input");
    input.blur();
    input.classList.add("invalid");
    setTimeout(function () {
      input.classList.remove("invalid");
    }, 1500);
    return;
  }

  data = {
    task: input,
    done: false,
    id: taskId++,
  };
  dataSet.push(data);

  showTasks();

  document.getElementById("input").value = "";
}

function showTasks() {
  const listItem = document.getElementById("listItem");

  function updateList() {
    listItem.innerHTML = "";

    for (let i = dataSet.length - 1; i >= 0; i--) {
      const item = document.createElement("li");
      item.className = "item";

      const itemText = document.createElement("p");
      itemText.className = "item-text";
      itemText.textContent = dataSet[i].task;
      item.appendChild(itemText);

      const doneInput = document.createElement("input");
      doneInput.type = "checkbox";
      doneInput.className = "";
      doneInput.addEventListener("change", function () {
        if (dataSet[i].done) {
          dataSet[i].done = false;
        } else {
          dataSet[i].done = true;
        }
        updateList();
      });
      if (dataSet[i].done) {
        itemText.classList.toggle("done-item-text");
        doneInput.click();
      }
      item.appendChild(doneInput);

      const deleteButton = document.createElement("button");
      deleteButton.className = "del-item-btn";
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", function () {
        dataSet.splice(i, 1);
        updateList();
      });
      const deleteIcon = document.createElement("img");
      deleteIcon.className = "del-btn-icon";
      deleteIcon.src = "./assets/icons8-cross-96.png";
      deleteButton.appendChild(deleteIcon);
      item.appendChild(deleteButton);

      listItem.appendChild(item);
    }

    localStorage.setItem("dataSet", JSON.stringify(dataSet));
  }

  updateList();
}

function deleteAll() {
  dataSet = [];

  showTasks();
}

function allDone() {
  for (let i = 0; i < dataSet.length; i++) {
    dataSet[i].done = true;
  }

  showTasks();
}
