const inputTask = document.querySelector('#inputTask');
const buttonAdd = document.querySelector('#buttonAdd');
let ul = document.querySelector('ul');
let delBlock = document.querySelector('.delBlock');
let editBlock = document.querySelector('.editBlock');
let doneUl = document.querySelector('.doneUl');

inputTask.onclick = function () {
    inputTask.value = '';
};
buttonAdd.onclick = function () {
    if(inputTask.value !== ''){
        createElement();
    }

};
function createElement() {

    let li = document.createElement('li');
    let task = document.createElement('div');
    let buttonNav = document.createElement('div');
    let butDone = document.createElement('button');
    let butEdit = document.createElement('button');
    let butDel = document.createElement('button');

    li.className = 'li';
    task.className = 'task';
    buttonNav.className = 'buttonNav';
    butDone.className = 'butSave';
    butEdit.className = 'butEdit';
    butDel.className = 'butDel';

    ul.appendChild(li);
    li.appendChild(task);
    li.appendChild(buttonNav);
    buttonNav.appendChild(butDone);
    buttonNav.appendChild(butEdit);
    buttonNav.appendChild(butDel);

    butDone.innerHTML = '<i class="fas fa-check"></i>';
    butEdit.innerHTML = '<i class="fas fa-pen"></i>';
    butDel.innerHTML = '<i class="fas fa-trash"></i>';

    task.innerHTML = inputTask.value;

    delItem (li,butDel);
    editItem (butEdit,task);
    doneItem (butDone,li);

    inputTask.value = '';

}

 function delItem(li,butDel) {
    butDel.addEventListener('click', function () {
     let yes = document.querySelector('.yes');
     let no = document.querySelector('.no');
     delBlock.style.display = 'block';
     yes.onclick = function(){
         li.remove();
         delBlock.style.display = 'none';
     };
     no.onclick = function(){
             delBlock.style.display = 'none';
         };
    })
 }

 function editItem(butEdit,task) {
     let save = document.querySelector('.save');
     let cancel = document.querySelector('.cancel');
     let inputEditTask = document.querySelector('#story');
     butEdit.addEventListener('click', function () {
         editBlock.style.display = 'block';
         inputEditTask.value = this.parentElement.parentElement.innerText;
         save.onclick = function(){
             task.innerHTML = inputEditTask.value;
             editBlock.style.display = 'none';
         };
         cancel.onclick = function(){
             editBlock.style.display = 'none';
         };
     })
 }

 function doneItem(butDone,li) {
         butDone.addEventListener('click', function () {
             if (li.className === 'li') {
                 doneUl.appendChild(li);
                 li.className = 'edit';
             } else {
                 ul.appendChild(li);
                 li.className = 'li';
             }
         });
 }








