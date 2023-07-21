let name = document.querySelector(".fullnames")
let contactadd = document.querySelector("#contact")
let imagelink = document.querySelector("#image")
localStorage.setItem("details","");
let displayusers = document.querySelector(".displayusers")
let tag = "";
let submit = document.querySelector("#submit")
// localStorage.getItem("lastname");

class Contact{
    adduser(){
        let name = document.querySelector(".fullnames")
        let contactadd = document.querySelector("#contact")
        let imagelink = document.querySelector("#image") 
        let submit = document.querySelector("#submit")
        submit.addEventListener("click",(e)=>{
            e.preventDefault();
            this.addnewuser(name,contactadd,imagelink)
        })
    }
    addnewuser(name,contactadd,imagelink){
        let array = localStorage.getItem("details")
        let array2 = []
        array2.push(array)
        if((array2[array2.length-1])==""){
            array2.pop()
        }
        
        localStorage.clear()
        
            if((name!=="") && (contactadd!=="") && (imagelink!=="")){
                // let tag
                tag = `
                <div class="user">
                    <div class="pic">
                        <img src="${imagelink}" alt="">
                    </div>
                    <div class="name">
                        <p>NAME: </p>
                        <p>${name}</p>
                    </div>
                    <div class="contact">
                        <p>Contact:</p>
                        <p>${contactadd}</p>
                    </div>
                    <div class="options">
                        <input type="button" class="update" placeholder="update">
                        <input type="button" class="delete" placeholder="delete">
                    </div>
                </div>
                `
                array2.push(tag)
                // console.log(array2)
                localStorage.setItem("details", (array2))
                let m = localStorage.getItem("details")
                // console.log(m);
            }
         this.displayuser()
    }
    displayuser(){
        let displayusers = document.querySelector(".displayusers")
        let m = localStorage.getItem("details")

        let p = []
        p = m
        console.log(p);
        // p = JSON.parse(m)
        // p.forEach(element => {
        //     console.log(element);
        // });
        
        // displayusers.innerHTML = m
    }
}

let a = new Contact
// a.addnewuser("calvince","20 raps", "https://pixabay.com/photos/child-boy-portrait-cute-kid-817373/")
// a.addnewuser("yes","20 raps", "google.com")
a.adduser()
