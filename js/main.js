//get elemnts
let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let total=document.getElementById('total');
let count=document.getElementById('count');
let category=document.getElementById('category');
let submit=document.getElementById('submit');
let search=document.getElementById('search');

let mode="create";
let tmp;
//get total
function getTotal(){
    if(price.value!=''){
        let result=(+price.value+ +taxes.value + +ads.value)
        - +discount.value;
        total.innerHTML=result;
        total.style.background="#040"
    }
    else{
        total.innerHTML="";
        total.style.background="#a00d02"
    }
}


//create products
let dataPro;
if(localStorage.getItem('product')){
    dataPro=JSON.parse(localStorage.getItem('product'));
}else{
    dataPro=[];
}

submit.onclick=function(){
    let newPro={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase()
    }

    //number of products
    if(title.value!=''&&price.value!=""&&category.value!=""&&count.value<100){
        if(mode==="create"){
        if(newPro.count>1){
        for(let i=0;i<newPro.count;i++){
            dataPro.push(newPro);
        }
    }
    else{
        dataPro.push(newPro);
    }
    }else{
        dataPro[tmp]=newPro;
        mode='create';
        submit.innerHTML="Create";
        count.style.display="block";

    }
        //clear inputs
    clearData();
    }
    //save in localStorage
    localStorage.setItem('product', JSON.stringify(dataPro));


    //show Data
    showData();
}


//clear inputs
function clearData(){
    title.value="";
    price.value="";
    taxes.value="";
    ads.value="";
    discount.value="";
    total.innerHTML="";
    count.value="";
    category.value="";

}

//read data
function showData(){
    getTotal();
    let table="";
    for(let i=0;i<dataPro.length;i++){
        table+=`
        <tr>
                    <td>${i+1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button id="update" onclick='updateData(${i})'>update</button></td>
                    <td><button id="delete" onclick='deleteData(${i})'>delete</button></td>

                </tr>`
    }
    let btnDelete=document.getElementById('deleteAll');
    document.getElementById('tbody').innerHTML=table;

    //delete All
    if(dataPro.length>0){
        btnDelete.innerHTML=`<button onclick='deleteAll()'>delete All (${dataPro.length})</button>`
    }
    else{
        btnDelete.innerHTML="";
    }

}
showData();



//delete button
function deleteData(i){
    dataPro.splice(i,1);
    localStorage.product=JSON.stringify(dataPro);
    showData();
}

//delete All
function deleteAll(){
    dataPro.length=0;
    localStorage.clear();
    showData();
}

//update Button
function updateData(i){
    title.value=dataPro[i].title;
    price.value=dataPro[i].price;
    taxes.value=dataPro[i].taxes;
    ads.value=dataPro[i].ads;
    discount.value=dataPro[i].discount;
    category.value=dataPro[i].category;
    getTotal();
    count.style.display="none";
    submit.innerHTML="Update";
    mode="update";
    tmp=i;
    scroll({
        top:0,
        behavior:"smooth"
    })
}


//Search Functions
//first select box

let searchMode="title";
function getSearchMode(id){
    if(id=="searchTitle"){
        searchMode="title";

    }else{
        searchMode="category";
    }
    search.placeholder="Search By "+searchMode;
    search.focus();
    search.value="";
    showData();
}

//second search function
function searchData(value){
    let table="";
    if(searchMode=="title"){
        for(let i=0;i<dataPro.length;i++){
            if(dataPro[i].title.includes(value.toLowerCase())){
                table+=`
        <tr>
                    <td>${i+1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button id="update" onclick='updateData(${i})'>update</button></td>
                    <td><button id="delete" onclick='deleteData(${i})'>delete</button></td>

                </tr>`
            }
        }
    }else{
        for(let i=0;i<dataPro.length;i++){
            if(dataPro[i].category.includes(value.toLowerCase())){
                table+=`
        <tr>
                    <td>${i+1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button id="update" onclick='updateData(${i})'>update</button></td>
                    <td><button id="delete" onclick='deleteData(${i})'>delete</button></td>

                </tr>`
            }
        }
    }
    document.getElementById('tbody').innerHTML=table;
}

//clean data
