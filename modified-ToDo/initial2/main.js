// localStorage.clear()
let form = document.querySelector(".inputform")
let todotitle  = document.querySelector("#titleinput")
let todocontent  = document.querySelector("#new-todo-input")
let done = document.querySelector("#check")
let submit = document.querySelector(".submit")
let alltodo = []
let deadline = document.querySelector("#expectedcompletion")
let bodytask = document.querySelector(".bodytask")
let active = document.querySelector(".active")
let completed = document.querySelector(".completed")
let clearcompleted = document.querySelector(".clearcompleted")

class Completed{
	#task = []
	settask(title,content,deadline,done){
		let obj = {
			title: title,
			content: content,
			deadline: deadline,
			done: done
		}
		this.#task = []
		this.#task.unshift(obj)
		this.#handlestorage()
	}


	gettask(){
		let array = this.#accessstorage()
		// console.log(array);
		return  array
	}
	#handlestorage(){
		let taskto = JSON.stringify(this.#task)
		try {
			let completedtasks = localStorage.getItem("completed");
			localStorage.removeItem("completed")
			completedtasks = JSON.parse(completedtasks)
			completedtasks.unshift(this.#task)
			completedtasks = JSON.stringify(completedtasks)
        	localStorage.setItem("completed", completedtasks)
		} catch (error) {
			localStorage.setItem("completed", taskto)
		}
		
	}
	#accessstorage(){
		let tasks = localStorage.getItem("completed");
		tasks = JSON.parse(tasks)
		return tasks
	}
}

class Uncompleted{
	#task = []
	settask(title,content,deadline,done){
		let obj = {
			title: title,
			content: content,
			deadline: deadline,
			done: done
		}
		this.#task = []
		this.#task.unshift(obj)
		this.#handlestorage()
	}

	gettask(){
		let array = this.#accessstorage()
		// console.log(array);
		return  array
	}
	#handlestorage(){
		let taskto = JSON.stringify(this.#task)
		try {
			
			let uncompletedtasks = localStorage.getItem("uncompleted");
			localStorage.removeItem("uncompleted")
			uncompletedtasks = JSON.parse(uncompletedtasks)
			uncompletedtasks.unshift(this.#task)
			uncompletedtasks = JSON.stringify(uncompletedtasks)
        	localStorage.setItem("uncompleted", uncompletedtasks)
		} catch (error) {
			localStorage.setItem("uncompleted", taskto)
		}
	}
	#accessstorage(){
		let tasks = localStorage.getItem("uncompleted");
		tasks = JSON.parse(tasks)
		return tasks
	}
}


let a =new Completed
let b =new Uncompleted
let displaychoice = b.gettask()
submit.addEventListener('click',(e)=>{
	e.preventDefault()
	if(todotitle.value == ""){
		alert("Event not added due to missing Title")
	}
	if(todocontent.value == ""){
		alert("Event not added due to missing content")
	}
	if(deadline.value == ""){
		alert("Event not added due to missing deadline date")
	}
	if ((todotitle.value !== "")&&(todocontent.value !== "")&&(deadline.value !== "")){
		if (done.checked==true){
		
			a.settask(todotitle.value,todocontent.value,deadline.value,done.checked)
			a.gettask()
			todotitle.value = ""
			todocontent.value = ""
			deadline.value = ""
			done.checked = false
		}
		else if(done.checked==false){
			b.settask(todotitle.value,todocontent.value,deadline.value,done.checked)
			b.gettask()
			todotitle.value = ""
			todocontent.value = ""
			deadline.value = ""
			done.checked = false
		}
	}
	
	displayActive(displaychoice)
})

displayActive(displaychoice)

active.addEventListener('click',(e)=>{
	e.preventDefault()
	let d = new Uncompleted
	displaychoice = d.gettask()
	displayActive(displaychoice)
})
completed.addEventListener('click',(e)=>{
	e.preventDefault()
	let f = new Completed
	displaychoice = f.gettask()
	displayActive(displaychoice)
})

clearcompleted.addEventListener('click',(e)=>{
	e.preventDefault()
	try {
		localStorage.removeItem("completed")
		displayActive(displaychoice)
	} catch (error) {
		console.log("No completed task");
	}
	displayActive(displaychoice)
})
displayActive(displaychoice)
function displayActive(displaychoice) {
	let tag = ''
	let i = 0
	let tasks = displaychoice
	if ((tasks !== null)&&(tasks !== undefined)){
		
		tasks.forEach(task => {
			let tak = task
			if(tak[0]!==undefined){
				tak = tak[0]
			}
			
			let message = findDaysLeft(tak.deadline)
			tag+=`
			<div class="element${i}">
				<div class="title1"><h1>
					${tak.title}
				</h1>    
				</div>
				<div class="body1">
					<p>${tak.content}
					</p>
					<div class="bottom">
							<p style="margin-right: 10px;">${message}</p>
							<div class="action">
								<div style="color: red;" class="edit${i}">Edit</div>
								<div style = "color: red; margin-left: 10px;" class="delete${i}">Delete</div>
							</div>
					</div>
				</div>
			</div>
			`
			i+=1
		});
		

	}
	bodytask.innerHTML = tag
	try {
		for (let p=0; p<i; p+=1){
			let delet = document.querySelector(`.delete${p}`)
			let element = document.querySelector(`.element${p}`)
			delet.addEventListener('click',(e)=>{
				element.remove()
				let modtasks = tasks
				console.log(tasks.length);
				let itemsleft = tasks.length
				if (itemsleft==1){
					if(modtasks[0][0]!==undefined){
						modtasks = modtasks[0][0]
					}
					else{
						modtasks = modtasks[0]
					}
					if(modtasks.done==true){
						localStorage.removeItem("completed")
					}
					if(modtasks.done==false){
						localStorage.removeItem("uncompleted")
					}

				}
				else{
					modtasks.splice(p,1)
				
					let mod = modtasks
					modtasks = JSON.stringify(modtasks)
					let cond2
					if(mod[0][0]!==undefined){
						cond2 = mod[0][0]
					}
					else{
						cond2 = mod[0]
					}
					if(cond2.done==true){
						try {
							let ctask = localStorage.getItem("completed")
							localStorage.removeItem("completed")
							localStorage.setItem("completed",modtasks)
						} catch (error) {
							
							localStorage.setItem("completed",modtasks)
						}
					}
					if(cond2.done==false){
						try {
							let ctask2 = localStorage.getItem("uncompleted")
							localStorage.removeItem("uncompleted")
							localStorage.setItem("uncompleted",modtasks)
						} catch (error) {
							localStorage.setItem("uncompleted",modtasks)
						}
						
					}



				}
				
			})

		}	
	} catch (error) {
	}
	
}




function findDaysLeft(date) {
    let d1 = new Date();
    let d2 = new Date(date);
    let diff = Math.abs(d1-d2); 
    diff/=86400000
    diff = Math.round(diff)
    if((diff==0)){
        return "deadline is today";
    }
    else if((d2>d1)){
        return `${diff} days left to deadline`;
    }
    else{
        return `deadline passed by ${diff} days`;
    }
}