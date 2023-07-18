let alltasks = []

let form = document.querySelector('.inputform')
let newtodo = document.getElementById('new-todo-input')
let checkbox = document.querySelector('#checkBox')


let all = document.querySelector(".all")
let active = document.querySelector('.active')
let completed = document.querySelector('.completed')
let clearcompleted = document.querySelector('.clearcompleted')
let statuses = 1;

if(localStorage.getItem("task")!==null){
    renderTasks(statuses);
}
active.addEventListener('click',(e)=>{
    e.preventDefault();
    statuses = 2;
    renderTasks(statuses);
})
completed.addEventListener('click',(e)=>{
    e.preventDefault();
    statuses = 3;
    renderTasks(statuses);
})
all.addEventListener('click',(e)=>{
    e.preventDefault();
    statuses = 1;
    renderTasks(statuses);
})

clearcompleted.addEventListener('click',(e)=>{
    e.preventDefault();
    statuses = 4;
    renderTasks(statuses);
    statuses = 1;
})

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    
   
   if (localStorage.getItem("task") !== null){
        alltasks = localStorage.getItem("task");
        alltasks = JSON.parse(alltasks)
    }
    if(newtodo.value !== ''){
        alltasks.push({
            task: newtodo.value,
            checked: checkbox.checked
        })

        if (localStorage.getItem("task") !== null){
            localStorage.clear()
        }
        p = JSON.stringify(alltasks)
        localStorage.setItem('task', p);

        newtodo.value= '';
        checkbox.checked= false
        renderTasks(statuses);

    }
})




function renderTasks(option){
    let taskItems = document.querySelectorAll(".lower-inner .taskitem");
    taskItems.forEach(el=>el.remove())

    let notchecked = 0

    let itemsleft = document.querySelector('.itemsleft')
    itemsleft.textContent = notchecked + " Items left"

    let alltasks2 = localStorage.getItem("task");
    alltasks2 = JSON.parse(alltasks2)

    if(option==4){
        localStorage.clear()

        for(let i =0; i<alltasks2.length;i++){
            if(alltasks2[i].checked==true){
                        delete alltasks2[i]
            }
        }
        
        alltasks2 = alltasks2.filter(el=>{
            return el !== "";
        }
        )
        
        k = JSON.stringify(alltasks2)
        localStorage.setItem('task', k);

        alltasks2 = localStorage.getItem("task");
        alltasks2 = JSON.parse(alltasks2)
    }
    
    alltasks2 = localStorage.getItem("task");
    alltasks2 = JSON.parse(alltasks2)

    alltasks2.forEach(({
        task,
        checked
    }, index)=>{
        let checkbox = document.createElement('input')
        checkbox.type = "checkbox";
        checkbox.className = "itemcheckbox"
        checkbox.checked = checked

        let taskContainer = document.createElement('div')
        taskContainer.className = 'singletask';
        taskContainer.textContent = task
        taskContainer.style.textDecoration = "none"
        if(checkbox.checked == true){
            taskContainer.style.textDecoration = 'line-through'
        }
        else{
            notchecked += 1
            itemsleft.textContent = notchecked + " Items left"
        }
        checkbox.addEventListener('click' , ()=>{
            if(taskContainer.style.textDecoration == "none"){
                taskContainer.style.textDecoration = "line-through"
                notchecked -= 1
            }else{
                taskContainer.style.textDecoration = "none"
                notchecked += 1
            }
            itemsleft.textContent = notchecked + " Items left"
        })
       
        displayStatus(checkbox,taskContainer,option);  
        
    })
  
}

function displayStatus(checkbox,taskContainer,option){
    let taskitem = document.createElement('div')
    taskitem.className="taskitem";
    switch (option) {
        case 1:
            taskitem.appendChild(checkbox)
            taskitem.appendChild(taskContainer)
            let alltasksContainer = document.querySelector('.lower-inner')
            alltasksContainer.appendChild(taskitem)
            break;
        case 2:
            if (checkbox.checked==false){
                taskitem.appendChild(checkbox)
                taskitem.appendChild(taskContainer)
                let alltasksContainer = document.querySelector('.lower-inner')
                alltasksContainer.appendChild(taskitem)
            }
            break;
        case 3: 
            if(checkbox.checked==true){
                taskitem.appendChild(checkbox)
                taskitem.appendChild(taskContainer)
                let alltasksContainer = document.querySelector('.lower-inner')
                alltasksContainer.appendChild(taskitem)
            }
            break;
        case 4:
            taskitem.appendChild(checkbox)
            taskitem.appendChild(taskContainer)
            let alltasksContain = document.querySelector('.lower-inner')
            alltasksContain.appendChild(taskitem)
            break;
    
        default:
            
            break;
    }
    
}