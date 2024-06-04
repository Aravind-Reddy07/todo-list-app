'use strict';

const addButton = document.querySelector('.add-btn');
const taskInput = document.querySelector('.input');
const tasks = document.querySelector('.task-list');

addButton.addEventListener('click', function (e) {
  e.preventDefault();
  const taskValue = taskInput.value.trim();
  if (taskValue === '') {
    alert('Please add a task');
  } else {
    const listItem = document.createElement('li');
    listItem.classList.add('list-item');
    listItem.insertAdjacentHTML(
      'afterbegin',
      `<div class="task-main"><input class="checkbox" type="checkbox"><span class="task-content">${taskValue}</span></div><div class="icons"><i class="fa fa-pencil" aria-hidden="true"></i><i class="fa fa-trash-o" aria-hidden="true"></i></div>`
    );
    tasks.appendChild(listItem);
    taskInput.value = '';

    
    const checkBox = listItem.querySelector('.checkbox');
    const taskContent = listItem.querySelector('.task-content');
    checkBox.addEventListener('change', function () {
      if (checkBox.checked) {
        taskContent.style.textDecoration = 'line-through';
      } else {
        taskContent.style.textDecoration = 'none';
      }
    });

    const deleteIcon = listItem.querySelector('.fa-trash-o');
    deleteIcon.addEventListener('click', function () {
      tasks.removeChild(listItem);
    });

    
    const editIcon = listItem.querySelector('.fa-pencil');
    
    editIcon.addEventListener('click', function () {
      const currentTask = taskContent.textContent;
      const inputField = document.createElement('input');
      inputField.classList.add('edit-task')
      inputField.type = 'text';
      inputField.value = currentTask;
      taskContent.textContent = '';
      taskContent.appendChild(inputField);

      inputField.addEventListener('blur', function () {
        taskContent.textContent = inputField.value || currentTask;
        inputField.remove();
      });

      inputField.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
          taskContent.textContent = inputField.value || currentTask;
          inputField.remove();
        }
      });

      inputField.focus();
    });
  }
});
