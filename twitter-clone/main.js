
let dropdown = document.querySelector(".dropdown")
let accountdetails = document.querySelector(".accountdetails")
let people;
let accountdrop = document.querySelector("#account")
let theposts = document.querySelector(".posts")
let thecomments = document.querySelector(".comments")
let postselected;

class Accounts{
    getusers(){
        const promise = new Promise((resolve,reject)=>{
            fetch("https://jsonplaceholder.typicode.com/users").then(
                response=>{
                    let values = response.json()
                    resolve(values)
                } ).catch(error=>{
                    reject(error)
                })
        }
        )
        return promise;
    }

    async modifydropdown() {
        let tag=''
        try {
            const users = await this.getusers();
            users.forEach(user=>{
            tag+=`
            <option value="${user.name}">${user.name}</option>
            `
        })
        } catch (error) {
            console.log("Error fetching users:", error);
            return [];
        }
   
        let ab = `
        ${tag}
        `
        tag = ab
        accountdrop.innerHTML=tag
    }
    async displayMainUser(username){
        let tag = ''
        try {
            const users = await this.getusers();
            users.forEach(user=>{
                if (user.name==username)
                {
                    tag+=`
                    <img src="./images/mypic.jpg" alt="">
                    <h4>${user.name}</h4>
                    <p>@${user.username}</p>
                    <a href="${user.website}">Link to my website</a>
                    <p>${user.company.catchPhrase}</p>
                    <p class = 'location'><img src="./images/icons8-location-50.png" alt="">  ${user.address.city} </p>
                    `
                }
        })
        accountdetails.innerHTML = tag
        } catch (error) {
            console.log("Error fetching users:", error);
            return [];
        }
        
    }

    getposts(){
        const promise = new Promise((resolve,reject)=>{
            fetch("https://jsonplaceholder.typicode.com/posts").then(
                response=>{
                    let values = response.json()
                    resolve(values)
                } ).catch(error=>{
                    reject(error)
                })
        }
        )
        return promise;
    }
    async makePosts(username){
        const users = await this.getusers();
        const posts = await this.getposts();
        let tag = ''
        users.forEach(user=>{
            if (user.name==username)
            {
                let id = user.id
                posts.forEach(post=>{
                    if(post.userId==id){

                        tag+=`
                        <div class="pos${post.id}">
                        <img src="./images/mypic.jpg" alt="">
                        <div class="content">
                            <p class="icon">${user.name}
                            <img src="./images/icons8-verified-account-48.png" alt="">
                            <img src="./images/icons8-twitter-48.png" alt="">
                            </p>
                            <p>${post.body}</p>
                            <div class="postpic">
                                <p><img src="./images/icons8-comment-50.png" alt=""> 200</p>
                                <p><img src="./images/icons8-retweet-24.png" alt="">200</p>
                                <p><img src="./images/icons8-like-48.png" alt="">200</p>
                            </div>
                            
                        </div>
                        </div>
                        `
                    }
                }) 
            }
            })
        theposts.innerHTML=tag   
    }

    getcomments(){
        const promise = new Promise((resolve,reject)=>{
            fetch("https://jsonplaceholder.typicode.com/comments").then(
                response=>{
                    let values = response.json()
                    // console.log(values);
                    resolve(values)
                } ).catch(error=>{
                    reject(error)
                })
        }
        )
        return promise;
    }
    async makeComments(username){
        let i;
        const users = await this.getusers();
        const posts = await this.getposts();
        const comments = await this.getcomments();
        let tag = ''
        users.forEach(user=>{
            if (user.name==username)
            {
                let id = user.id
                posts.forEach(post=>{
                    if(post.userId==id){
                       tag+=`
                       <div class = "postname"><p>Comments for post ${post.id}</p></div>
                       `
                       
                        comments.forEach(comment=>{
                            if(comment.postId==post.id){
                                tag+=`
                                <div class="${comment.id}">
                                    <img src="./images/mypic.jpg" alt="">
                                    <div class="content">
                                        <p class="icon">${comment.name}
                                        <img src="./images/icons8-verified-account-48.png" alt="">
                                        <img src="./images/icons8-twitter-48.png" alt="">
                                        </p>
                                        <p>${comment.body}</p>
                                        <div class="postpic">
                                            <p><img src="./images/icons8-comment-50.png" alt=""> 0</p>
                                            <p><img src="./images/icons8-retweet-24.png" alt=""> 0</p>
                                            <p><img src="./images/icons8-like-48.png" alt=""> 0</p>
                                        </div>
                                    </div>
                                </div>
                        `
                            }

                        })
                    }
                }) 
            }
            })
            thecomments.innerHTML=tag   
    }

 
    
}
let p = new Accounts()
p.modifydropdown()
p.displayMainUser('Leanne Graham')
p.makePosts('Leanne Graham')
p.makeComments('Leanne Graham')
accountdrop.addEventListener('click',(e)=>{
    e.preventDefault();
    let choice = accountdrop.value
    p.displayMainUser(choice)
    p.makePosts(choice)
    p.makeComments(choice)
})
