var id=0;



function DeleteItem(num){
var child= document.getElementById("card" +num);
console.log(child.parentNode);

child.parentNode.removeChild(child);


}
function EditItem(num){
document.getElementById("edit"+num).style.display="none";
 document.getElementById("delete"+num).style.display="none";
	
 var name=document.getElementById("name"+num);
 var price=document.getElementById("price"+num);
 var description=document.getElementById("description"+num);
 name.innerHTML="<input type='text' id='name"+num +"' >";
 price.innerHTML="<input type='text' id='price"+num +"' >";
 description.innerHTML="<input type='text' id='description"+num +"'>";
 
}
function AddItem(){
    document.getElementById("add").style.display="none";

   
var Edit= document.createElement("button");
var Delete= document.createElement("button");
var parent= document.getElementById("addParent");
Edit.setAttribute("id", id );
id++;
Delete.setAttribute("id", id);
id++;

Edit.setAttribute("type", "button");
Delete.setAttribute("type", "button");
Edit.setAttribute("value", "Edit");
Delete.setAttribute("value", "Delete");
Edit.setAttribute("class", "btn btn-success");
Delete.setAttribute("class", "btn btn-danger");
Edit.innerHTML="Edit";
Delete.innerHTML="Delete";
var plus= document.getElementById("plus");
var name=document.createElement("input");
var price=document.createElement("input");
var description=document.createElement("input");

name.setAttribute("id", id);
id++;
price.setAttribute("id", id);
id++;
description.setAttribute("id", id);
id++;
var parentbtn= document.getElementById("parentbtn");
parent.removeChild(plus);
parent.appendChild(name);
parent.appendChild(price);
parent.appendChild(description);
parentbtn.appendChild(Edit)
parentbtn.appendChild(Delete);
}

function DeleteUser(num){
    var row= document.getElementById("row" + num);
    row.parentNode.removeChild(row);

}
function EditUser(num){
document.getElementById("EditUser"+num).style.display="none";
document.getElementById("DeleteUser"+num).style.display="none";
var btn= document.createElement("button");
btn.setAttribute("id", id);
btn.setAttribute("class", "btn btn-success btn-sm")
id++;
btn.innerHTML="Save";
btn.setAttribute("value", "save");
btn.setAttribute("onclick", "save(" + num + ")") ;
var data= document.getElementById("btn" + num);
data.appendChild(btn);

var number= document.getElementById("num" + num);	
var Fname= document.getElementById("Fname" + num);	
var Lname= document.getElementById("Lname" + num);	
var Address= document.getElementById("Address" + num);	
var Phone= document.getElementById("Phone" + num);

number.innerHTML="<input type='text' id='num"+num +"' >";
 Fname.innerHTML="<input type='text' id='Fname"+num +"' >";
 Lname.innerHTML="<input type='text' id='Lname"+num +"'>";
 Address.innerHTML="<input type='text' id='Address"+num +"'>";
 Phone.innerHTML="<input type='text' id='Phone"+num +"'>";

 
console.log(number.innerHTML.value);

    //         var object= {"number": number.value, "drink" : item.querySelector("#drink").innerText, "numCups": item.querySelector('#num').innerText};
            
    //         }

    // var x= JSON.stringify(object);
    // console.log(object);
    // localStorage.setItem("items", x);
    
    // var row= document.getElementById("row" + num);
    // var dataNum= document.createElement(td);
    // dataNum.innerHTML= numD;
    // var dataFname= document.createElement(td);
    // dataFname.innerHTML= FnameD;
    // var dataLname= document.createElement(td);
    // dataLname.innerHTML= LnameD;
    // var dataAddress= document.createElement(td);
    // dataAddress.innerHTML= AddressD;
    // var dataPhone= document.createElement(td);
    // dataPhone.innerHTML= PhoneD;


    // row.appendChild(dataNum);
    // row.appendChild(dataFname);
    // row.appendChild(dataLname);
    // row.appendChild(dataAddress);
    // row.appendChild(dataPhone);


}

function save(num){
    var number= document.getElementById("num" + num)
	
    console.log(number.innerText);
var Fname= document.getElementById("Fname" + num).value;	
var Lname= document.getElementById("Lname" + num).value;	
var Address= document.getElementById("Address" + num).value;	
var Phone= document.getElementById("Phone" + num).value;
 




}
 
function addUser()
{
    var table= document.getElementById("mytable");
    var rowCount = $("#mytable tr").length; 
console.log(rowCount);
    var row = table.insertRow(rowCount);

// Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
var cell1 = row.insertCell(0);
var cell2 = row.insertCell(1);
var cell3= row.insertCell(2);
var cell4=row.insertCell(3);
var cell5=row.insertCell(4);
var cell6= row.insertCell(5);

cell1.innerHTML="<input type='text' id='num" + rowCount +"' >";
 cell2.innerHTML="<input type='text' id='Fname"+rowCount +"' >";
 cell3.innerHTML="<input type='text' id='Lname"+rowCount +"'>";
 cell4.innerHTML="<input type='text' id='Address"+rowCount +"'>";
 cell5.innerHTML="<input type='text' id='Phone"+rowCount +"'>";

 var btn= document.createElement("button");
 btn.setAttribute("id", id);
 btn.setAttribute("class", "btn btn-success btn-sm")
 id++;
 btn.innerHTML="Save";
 btn.setAttribute("value", "save");
 btn.setAttribute("onclick", "save(" + rowCount + ")") ;
 cell5.appendChild(btn);
//  var new_name=document.getElementById("new_name").value;
//  var new_country=document.getElementById("new_country").value;
//  var new_age=document.getElementById("new_age").value;
	
//  var table=document.getElementById("data_table");
//  var table_len=(table.rows.length)-1;
//  var row = table.insertRow(table_len).outerHTML="<tr id='row"+table_len+"'><td id='name_row"+table_len+"'>"+new_name+"</td><td id='country_row"+table_len+"'>"+new_country+"</td><td id='age_row"+table_len+"'>"+new_age+"</td><td><input type='button' id='edit_button"+table_len+"' value='Edit' class='edit' onclick='edit_row("+table_len+")'> <input type='button' id='save_button"+table_len+"' value='Save' class='save' onclick='save_row("+table_len+")'> <input type='button' value='Delete' class='delete' onclick='delete_row("+table_len+")'></td></tr>";

//  document.getElementById("new_name").value="";
//  document.getElementById("new_country").value="";
//  document.getElementById("new_age").value="";
}




