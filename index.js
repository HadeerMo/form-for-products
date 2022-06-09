var inputName = document.getElementById("productName");
var inputPrice = document.getElementById("productPrice");
var inputCatgory = document.getElementById("productCatgory");
var inputDescription = document.getElementById("productDescription");
var searchInput = document.getElementById("searchInput");
var addEditBtn = document.getElementById("addedit")
var addProductBtn =document.getElementById("addProduct")
var prodectList = [];
if (localStorage.getItem("product") != null) {
    prodectList = JSON.parse(localStorage.getItem("product"));
    displayData();
}
function addProduct() {
    if((valid(/^[A-Z][a-z]{3,10}[0-9]?$/,inputName,"alertName")==true) 
    && 
    (valid(/^[1-9][0-9]{1,3}$/,inputPrice,"alertPrice")==true)){
        var product = {
            name: inputName.value,
            price: inputPrice.value,
            Catgory: inputCatgory.value,
            description: inputDescription.value
        }
        prodectList.push(product);
        localStorage.setItem("product", JSON.stringify(prodectList))
        displayData();
    }
    
}
function displayData() {
    temp = "";
    for (var i = 0; i < prodectList.length; i++) {
        temp += `<tr>
        <td>`+ i + `</td>
        <td>`+ prodectList[i].name + `</td>
        <td>`+ prodectList[i].price + `</td>
        <td>`+ prodectList[i].Catgory + `</td>
        <td>`+ prodectList[i].description + `</td>

        <td>
            <button class=" btn btn-outline-warning" onclick="updateProduct(`+ i + `)">Update</button>
        </td>
        <td>
            <button class=" btn btn-outline-danger" onclick="deleteProduct(`+ i + `)">delete</button>
        </td>
    </tr>`
    }
    document.getElementById("tableBody").innerHTML = temp;
}

function deleteProduct(i) {
    prodectList.splice(i, 1);
    localStorage.setItem("product", JSON.stringify(prodectList));
    displayData();
}
function updateData(i) {
    inputName.value = prodectList[i].name;
    inputPrice.value = prodectList[i].price;
    inputCatgory.value = prodectList[i].Catgory;
    inputDescription.value = prodectList[i].description;
}

function addEdit(i){
    prodectList[i].name = inputName.value;
    prodectList[i].price= inputPrice.value;
    prodectList[i].Catgory=inputCatgory.value;
    prodectList[i].description=inputDescription.value;
    localStorage.setItem("product", JSON.stringify(prodectList));
    displayData();
}
function updateProduct(i) {
    addProductBtn.style.display="none"
    updateData(i);
    ayhaga=`<button onclick="addEdit(${i})" class="btn btn-outline-info">add edit</button>`;
    document.getElementById("addedit").innerHTML=ayhaga;
}

function clearForm() {
    inputName.value = "";
    inputPrice.value = "";
    inputCatgory.value = "";
    inputDescription.value = "";
}
function searchProduct() {
    var userSearch = searchInput.value;
    temp = "";
    for (var i = 0; i < prodectList.length; i++) {
        if (prodectList[i].name.toLowerCase().includes(userSearch.toLowerCase())
            ||
            prodectList[i].Catgory.toLowerCase().includes(userSearch.toLowerCase())) { 
            temp += `<tr>
        <td>`+ i + `</td>
        <td>`+ prodectList[i].name + `</td>
        <td>`+ prodectList[i].price + `</td>
        <td>`+ prodectList[i].Catgory + `</td>
        <td>`+ prodectList[i].description + `</td>

        <td>
            <button class=" btn btn-outline-warning" onclick="updateProduct(`+ i + `)">Update</button>
        </td>
        <td>
            <button class=" btn btn-outline-danger" onclick="deleteProduct(`+ i + `)">delete</button>
        </td>
    </tr>`
        }

    }
    document.getElementById("tableBody").innerHTML = temp;
}

function valid(reg,inputValue,alerttype){
    var regx=reg;
    var testValid=false;
    if(regx.test(inputValue.value)==true){
        document.getElementById(alerttype).style.display="none";
        testValid=true;
    }
    else{
        document.getElementById(alerttype).style.display="block";
        testValid=false;
    }
    return testValid;
}
