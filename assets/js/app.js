let cl=console.log;


const studentform=document.getElementById("studentform");
const fname=document.getElementById("fname");
const lname=document.getElementById("lname");
const email=document.getElementById("email");
const contact=document.getElementById("contact");
const stdinfo=document.getElementById("stdinfo");
const submitbtn=document.getElementById("submitbtn");
const updatebtn=document.getElementById("updatebtn");

let stdarray=[]


if(getdatafromls()){
    stdarray =getdatafromls();
    templating(stdarray);
}

function getdatafromls(){
    return JSON.parse(localStorage.getItem('studentInfo'));
}


function uuidv4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

const onsubmithandler =(e) =>{
    e.preventDefault();
    // cl(e.target);
    let obj={
        firstname: fname.value,
        lastname:lname.value,
        email:email.value,
        contact:contact.value,
        id: uuidv4()
    }
    cl(obj)
    stdarray.push(obj);
    localStorage.setItem('studentInfo', JSON.stringify(stdarray));
    studentform.reset();
    templating(stdarray);
}


function templating(arr){
    let result= '';
    arr.forEach((ele, i) =>{
        result +=`
          <tr>
          <td>${i + 1}</td>
          <td>${ele.firstname}</td>
          <td>${ele.lastname}</td>
          <td>${ele.email}</td>
          <td>${ele.contact}</td>
          <td><button class="btn btn-success" data-id="${ele.id}" onclick="onEditHandler(this)">Edit</button></td>
          <td><button class="btn btn-danger"data-id="${ele.id}" onclick="onDeletHandler(this)">Delete</button></td>
          </tr>`
    })
    stdinfo.innerHTML=result;
}

const onEditHandler = (ele) =>{
    // cl( "edit", ele);
    let getid = ele.dataset.id;
   localStorage.setItem("setid", getid);


    let getlocaldata =getdatafromls();
    cl(getlocaldata)

    let getobj=getlocaldata.filter((ele) => ele.id===getid)
    cl(getobj);
    fname.value = getobj[0].firstname;
    lname.value = getobj[0].lastname;
    email.value = getobj[0].email;
    contact.value = getobj[0].contact;
    updatebtn.classList.remove("d-none");
    submitbtn.classList.add("d-none");
}

const onUpdateHandler= () =>{
    // cl("update")
    let getid=localStorage.getItem("setid");
    cl(getid);

    let getlocaldata=getdatafromls();

    getlocaldata.forEach(ele =>{
        if(ele.id===getid){
            ele.firstname=fname.value;
            ele.lastname=lname.value;
            ele.email=email.value;
            ele.contact=contact.value;
        }
    })
    localStorage.setItem('studentInfo', JSON.stringify(getlocaldata));
    templating(getlocaldata)
    studentform.reset()
    updatebtn.classList.remove("d-none");
    submitbtn.classList.add("d-none");

}
const onDeletHandler = (ele) =>{
    // cl("delet", ele);

    let getid=ele.getAttribute("data-id");
    cl(getid)
    let getlocaldata=getdatafromls();
    let newlocaldata = getlocaldata.filter(ele => ele.id != getid)
    templating(newlocaldata)
    newlocaldata.setItem('studentInfo',JSON.stringify(newlocaldata));
}



studentform.addEventListener("submit",onsubmithandler);
updatebtn.addEventListener("click",onUpdateHandler)

// stdarray=JSON.parse(localStorage.getItem('studentInfo'));
// cl(stdarray);

