let addbtn=document.querySelector(".add-btn")
let modalCont=document.querySelector(".modal-cont")
let mainCont = document.querySelector(".main-cont")
let addModal=true;
let removeBtn=document.querySelector(".delete-btn");
let removeFlag=false;
var uid = new ShortUniqueId();
let propertyArr=[];
let nameo = document.querySelector("#name");
let desc = document.querySelector("#desc");
let size = document.querySelector("#size");
let enter = document.querySelector("#enter");
let sortAscendingBtn=document.querySelector(".sort-asc-btn");
let sortDescendingBtn=document.querySelector(".sort-desc-btn");

if(localStorage.getItem("properties"))
{
    let str=localStorage.getItem("properties");
    let arr=JSON.parse(str);
    propertyArr=arr;
    for(let i=0;i<propertyArr.length;i++)
    {
        let obj=propertyArr[i];
        createTicket(obj.Name,obj.Description,obj.size,obj.id);
    }
}

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

function createTicket(name,description,size,oid)
{
    let id;
    if(oid==undefined)
    {
        id=uid();
    }
    else
    {
        id=oid;
    }
    let infoCont=document.createElement("div");
    infoCont.setAttribute("class","information");
    infoCont.innerHTML=`<span class="id">#${id}</span>
                        <span class="name">${name}</span>
                        <span class="desc">${description}</span>
                        <span class="size">${size}</span>`
    mainCont.appendChild(infoCont);
    infoCont.addEventListener("click",function()
    {
        if(removeFlag)
        {
            infoCont.remove();
            let idx=getIndex(id);
            propertyArr.splice(idx,1);
            updateLocalStorage();
        }
    })
    if(oid==undefined)
    {
        propertyArr.push({"id":id,"Name":name,"Description":description,"size":size});
        updateLocalStorage();
    }
    
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

sortAscendingBtn.addEventListener("click",function()
{
    let ascendingArr=propertyArr;
    ascendingArr.sort(function(a,b)
    {
        return a.size-b.size;
    });
    mainCont.innerHTML="";
    // for(let i=0;i<infoCont.length;i++)
    // {
    //     infoCont[i].remove;
    // }
    for(let i=0;i<ascendingArr.length;i++)
    {
        createTicket(ascendingArr[i].Name,ascendingArr[i].Description,ascendingArr[i].size,ascendingArr[i].id);
    }
});

sortDescendingBtn.addEventListener("click",function()
{
    let descendingArr=propertyArr;
    descendingArr.sort(function(a,b)
    {
        return b.size-a.size;
    });
    mainCont.innerHTML="";
    for(let i=descendingArr.length;i>=0;i--)
    {
        createTicket(descendingArr[i].Name,descendingArr[i].Description,descendingArr[i].size,descendingArr[i].id);
    }
});

// Function to get the index
function getIndex(id) 
{
    for(let i=0;i<propertyArr.length;i++)
    {
        if(propertyArr[i].id==id)
        {
            return i;
        }
    }
}

// Function to update the local storage
function updateLocalStorage()
{
    let stringify=JSON.stringify(propertyArr);
    localStorage.setItem("properties",stringify);
}