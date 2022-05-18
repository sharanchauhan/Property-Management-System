let addbtn=document.querySelector(".add-btn")
let modalCont=document.querySelector(".modal-cont")
let mainCont = document.querySelector(".main-cont")
let addModal=true;
let removeBtn=document.querySelector(".delete-btn");
let removeFlag=false;
let sizeCont=document.querySelector(".size");
var uid = new ShortUniqueId();
let ticketArr=[];
let rightSide=document.querySelector(".right-side-text");
let nameo = document.querySelector("#name");
let desc = document.querySelector("#desc");
let size = document.querySelector("#size");
let enter = document.querySelector("#enter");

enter.addEventListener("click",function()
{
    if(nameo.value=="" || desc.value=="" || size.value=="")
    {
        nameo.value="";
        desc.value="";
        size.value="";
    }
    else
    {
        createTicket(nameo.value,desc.value,size.value);
        modalCont.style.display="none";
        nameo.value="";
        desc.value="";
        size.value="";
        addModal=!addModal;
    }
})
addbtn.addEventListener("click",function()
{
    if(addModal)
    {
        modalCont.style.display="flex";
    }
    else
    {
        modalCont.style.display="none";
    }
    addModal=!addModal;
})

function createTicket(name,description,size)
{
    let id=uid();
    let infoCont=document.createElement("div");
    infoCont.setAttribute("class","information");
    infoCont.innerHTML=`<span class="id">#${id}</span>
                        <span class="name">${name}</span>
                        <span class="desc">${description}</span>
                        <span class="size">${size}</span>`
    mainCont.appendChild(infoCont);
}


removeBtn.addEventListener("click",function()
{
    if(removeFlag)
    {
        removeBtn.style.color='black';
    }
    else
    {
        removeBtn.style.color='red';
    }
    removeFlag=!removeFlag;
})

// Function to get the index
function getIndex(id) 
{
    for(let i=0;i<ticketArr.length;i++)
    {
        if(ticketArr[i].id==id)
        {
            return i;
        }
    }
}

// Function to update the local storage
function updateLocalStorage()
{
    let stringify=JSON.stringify(ticketArr);
    localStorage.setItem("tickets",stringify);
}