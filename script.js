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
    task = document.createElement('div');
    buttonNav = document.createElement('div');
    butDone = document.createElement('button');
    butEdit = document.createElement('button');
    butDel = document.createElement('button');

    task.className = 'task';
    buttonNav.className = 'buttonNav';
    butDone.className = 'butSave';
    butEdit.className = 'butEdit';
    butDel.className = 'butDel';

    buttonNav.appendChild(butDone);
    buttonNav.appendChild(butEdit);
    buttonNav.appendChild(butDel);

    butDone.innerHTML = '<i class="fas fa-check"></i>';
    butEdit.innerHTML = '<i class="fas fa-pen"></i>';
    butDel.innerHTML = '<i class="fas fa-trash"></i>';

}

let arr = [];

if(localStorage.getItem('items')!== null) {
    arr = JSON.parse(localStorage.getItem('items'))
}
//////////////////////
let arrDone = [];
if(localStorage.getItem('itemsDone')!== null) {
    arrDone = JSON.parse(localStorage.getItem('itemsDone'))
}

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
    li = document.createElement('li'); ///////////
    li.className = 'li'; ///////////
    ul.appendChild(li);///////////
    li.appendChild(task);///////////
    li.appendChild(buttonNav);///////////

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

function delItem(li,butDel) {
    butDel.addEventListener('click', function () {
        let yes = document.querySelector('.yes');
        let no = document.querySelector('.no');
        delBlock.style.display = 'block';
        let thisEl = this.parentElement.parentElement;
        yes.onclick = function(){
            thisEl.remove();
            arr = [];
            for (let i = 0; i<document.querySelectorAll('.li').length; i++) {
                arr.push(document.querySelectorAll('.li')[i].innerText);
            }
            arrDone = [];
            for (let i = 0; i<document.querySelectorAll('.edit').length; i++) {
                arrDone.push(document.querySelectorAll('.edit')[i].innerText);
            }

            localStorage.setItem('items', JSON.stringify(arr));
            localStorage.setItem('itemsDone', JSON.stringify(arrDone));


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
            arr = [];
            for (let i = 0; i<document.querySelectorAll('.li').length; i++) {
                arr.push(document.querySelectorAll('.li')[i].innerText);
            }
            arrDone = [];
            for (let i = 0; i<document.querySelectorAll('.edit').length; i++) {
                arrDone.push(document.querySelectorAll('.edit')[i].innerText);
            }

            localStorage.setItem('items', JSON.stringify(arr));
            localStorage.setItem('itemsDone', JSON.stringify(arrDone));

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

            arr = [];
            for (let i = 0; i<document.querySelectorAll('.li').length; i++) {
                arr.push(document.querySelectorAll('.li')[i].innerText);
            }
            localStorage.setItem('items', JSON.stringify(arr));

            arrDone = [];
            for (let i = 0; i<document.querySelectorAll('.edit').length; i++) {
                arrDone.push(document.querySelectorAll('.edit')[i].innerText);
            }
            localStorage.setItem('itemsDone', JSON.stringify(arrDone));

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

for (let i = 0; i<arr.length; i++) {
    createBlock ();
    li = document.createElement('li'); ///////////
    li.className = 'li'; ///////////
    ul.appendChild(li);///////////
    li.appendChild(task);///////////
    li.appendChild(buttonNav);///////////

    task.textContent = arr[i];
    delItem (li,butDel);
    editItem (butEdit,task);
    doneItem (butDone,li);
}

for (let i = 0; i<arrDone.length; i++) {
    createBlock ();
    liEdit = document.createElement('li'); ///////////
    liEdit.className = 'edit'; ///////////
    doneUl.appendChild(liEdit);///////////
    liEdit.appendChild(task);///////////
    liEdit.appendChild(buttonNav);///////////

    task.textContent = arrDone[i];

    delItem (li,butDel);
    editItem (butEdit,task);
    doneItem (butDone,li);
}


