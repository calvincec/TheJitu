// localStorage.clear()
let form = document.querySelector(".inputform")
let todotitle  = document.querySelector("#titleinput")
let todocontent  = document.querySelector("#new-todo-input")
let done = document.querySelector("#check")
let submit = document.querySelector(".submit")
let alltodo = []
let deadline = document.querySelector("#expectedcompletion")
let bodytask = document.querySelector(".bodytask")

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
		this.#task.push(obj)
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
			completedtasks.push(this.#task)
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
		this.#task.push(obj)
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
			uncompletedtasks.push(this.#task)
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
	displayActive()
})

displayActive()
function displayActive() {
	let tag = ''
	let c = new Uncompleted
	let tasks = c.gettask()
	if ((tasks !== null)&&(tasks !== undefined)){
		tasks.forEach(task => {
			tag+=`
			<div class="element1">
				<div class="title1"><h1>
					${task.title}
				</h1>    
				</div>
				<div class="body1">
					<p>${task.content}
					</p>
					<div class="bottom">
							<p style="margin-right: 10px;">Submitted 5 days earlier, from ${task.deadline}</p>
							<div class="action">
								<div class="edit">Edit</div>
								<div class="delete">Delete</div>
							</div>
					</div>
				</div>
			</div>
			`
		});

	}
	
	bodytask.innerHTML = tag
}

// title: title,
// 			content: content,
// 			deadline: deadline,
// 			done: done










// function promptinput(displaytext,type) {
// 	let entry = prompt(displaytext);
// 	if (entry == "") {
// 		alert("Null value is not accepted")
// 		promptinput(displaytext,type)
// 	}
// 	else if(type=="date"){
// 		const dateformart = /^\d{4}-\d{2}-\d{2}$/;
// 		if (!dateformart.test(entry)) {
// 		  alert("Invalid date format. Please use the format (YYYY-MM-DD).");
// 		  promptinput(displaytext,type);
// 		} else {
// 		  return entry;
// 		}
// 	}
// 	else{
// 		return entry;
// 	}
// }