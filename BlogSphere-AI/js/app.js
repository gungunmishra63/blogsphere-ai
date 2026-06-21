function register(){
let name=document.getElementById("name")?.value;
let email=document.getElementById("email")?.value;
let password=document.getElementById("password")?.value;

let users=JSON.parse(localStorage.getItem("users"))||[];

users.push({name,email,password});

localStorage.setItem("users",JSON.stringify(users));

alert("Registered Successfully");
window.location="login.html";
}

function login(){
let email=document.getElementById("loginEmail")?.value;
let password=document.getElementById("loginPassword")?.value;

let users=JSON.parse(localStorage.getItem("users"))||[];

let user=users.find(
u=>u.email===email && u.password===password
);

if(user){
localStorage.setItem("currentUser",JSON.stringify(user));
window.location="dashboard.html";
}
else{
alert("Invalid Login");
}
}

function logout(){
localStorage.removeItem("currentUser");
window.location="login.html";
}

function createBlog(){

let title=document.getElementById("title")?.value;
let content=document.getElementById("content")?.value;

let blogs=
JSON.parse(localStorage.getItem("blogs"))||[];

blogs.push({
title:title,
content:content,
likes:0
});

localStorage.setItem(
"blogs",
JSON.stringify(blogs)
);

window.location="dashboard.html";
}

function loadBlogs(){

let blogs=
JSON.parse(localStorage.getItem("blogs"))||[];

let container=
document.getElementById("blogs");

let count=
document.getElementById("blogCount");

if(!container) return;

if(count){
count.innerText=blogs.length;
}

let output="";

blogs.forEach((blog,index)=>{

output+=`

<div class="card p-3 mb-3 text-dark">
<h3>${blog.title}</h3>
<p>${blog.content}</p>
<p>❤️ ${blog.likes}</p>

<button class="btn btn-primary btn-sm me-2"
onclick="likeBlog(${index})">
Like </button>

<button class="btn btn-danger btn-sm"
onclick="deleteBlog(${index})">
Delete </button>

</div>
`;

});

container.innerHTML=output;
}

function likeBlog(index){

let blogs=
JSON.parse(localStorage.getItem("blogs"))||[];

blogs[index].likes++;

localStorage.setItem(
"blogs",
JSON.stringify(blogs)
);

loadBlogs();
}

function deleteBlog(index){

let blogs=
JSON.parse(localStorage.getItem("blogs"))||[];

blogs.splice(index,1);

localStorage.setItem(
"blogs",
JSON.stringify(blogs)
);

loadBlogs();
}

function searchBlogs(){

let search=
document.getElementById("search")?.value.toLowerCase()||"";

let blogs=
JSON.parse(localStorage.getItem("blogs"))||[];

let output="";

blogs.forEach((blog,index)=>{

if(blog.title.toLowerCase().includes(search)){

output+=`

<div class="card p-3 mb-3 text-dark">
<h3>${blog.title}</h3>
<p>${blog.content}</p>
</div>
`;

}

});

if(document.getElementById("blogs")){
document.getElementById("blogs").innerHTML=output;
}
}

document.addEventListener(
"DOMContentLoaded",
loadBlogs
);
