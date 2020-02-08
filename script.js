const inputTask = document.querySelector('#inputTask');
const buttonAdd = document.querySelector('#buttonAdd');
let ul = document.querySelector('ul');
let delBlock = document.querySelector('.delBlock');
let editBlock = document.querySelector('.editBlock');
let doneUl = document.querySelector('.doneUl');
let filter = document.querySelector('#filter');
let li;
let task;
let buttonNav;
let butDone;
let butEdit;
let butDel;

function createBlock () {
    li = document.createElement('li');
    task = document.createElement('div');
    buttonNav = document.createElement('div');
    butDone = document.createElement('button');
    butEdit = document.createElement('button');
    butDel = document.createElement('button');

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

}
/////////////////////
let arr = [];

if(localStorage.getItem('items')!== null) {
    arr = JSON.parse(localStorage.getItem('items'))
}

for (let i = 0; i<arr.length; i++) {
    createBlock ();
    task.textContent = arr[i];
    delItem (li,butDel);
    editItem (butEdit,task);
    doneItem (butDone,li);
}
//////////////////////////////////////////////
inputTask.onclick = function () {
    inputTask.value = '';
};

buttonAdd.onclick = function () {
    if(inputTask.value !== ''){
        createElement();
    }
};


function createElement() {

    createBlock();

    task.textContent = inputTask.value;

    delItem (li,butDel);
    editItem (butEdit,task);
    doneItem (butDone,li);

    inputTask.value = '';

    arr.push(task.textContent);
localStorage.setItem('items', JSON.stringify(arr));

}

filter.onclick= function () {
    filter.value = '';

};
filter.onkeyup = function () {
    filters(task);
};

////////////////////////////////////////////////////////////
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

            task.textContent = inputEditTask.value;
            localStorage.setItem('items', JSON.stringify(arr));
            editBlock.style.display = 'none';
            arr = [];
            for (let i = 0; i<document.querySelectorAll('li').length; i++) {
                arr.push(document.querySelectorAll('li')[i].innerText);
            }
            localStorage.setItem('items', JSON.stringify(arr));
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

function filters(task) {
    let text = filter.value.toLocaleLowerCase();
    console.log(task.parentElement);
    document.querySelectorAll('li').forEach
    (function (task) {
        let item = task.textContent;
        console.log(item.indexOf(text));
        if(item.toLowerCase().indexOf(text) !== -1){
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}







