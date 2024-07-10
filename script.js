const inputname = document.getElementById("StudentName");
const inputsid = document.getElementById("SID");
const inputmail = document.getElementById("email");
const inputcontact = document.getElementById("Contactno");
const fulltable = document.getElementById("bigtable");

const submit = document.querySelector(".Submit-button");

let currentRow = null;

// used to do work even when refreshed
// go to know the difference between DOMcontentloaded and Load
document.addEventListener("DOMContentLoaded", loadLocaldata);

// I added onclick button to submit to decide if the button is in update mode or submit mode
submit.addEventListener("click",selector);

// 2 modes Update but to change and submit to add
function selector(){
    if (submit.classList=="Update"){
        update();
    }
    else if(submit.classList!=="Update"){
        addingrow();
        localStorage.setItem("table" , fulltable);
    }
}

// ---------------------------------------------------------------------------------------

// this fuction is basically to add rows to the table
function addingrow(){

    // created a temp row 
    const tablerow = document.createElement("tr");


    // adding Edit and Delete Buttons
    const EditButton = document.createElement("button"); 
    EditButton.classList.add("Editbutton");
    EditButton.innerHTML='Edit';
    const DeleteButton = document.createElement("button");
    DeleteButton.classList.add("Deletebutton");
    DeleteButton.innerHTML="Delete"

    // adding data
    const cell1name = document.createElement("td");
    const cell2id = document.createElement("td");
    const cell3mail = document.createElement("td");
    const cell4contact = document.createElement("td");
    const cell5Buttons = document.createElement("td");

    // to give alert if there are empty values
    if(inputname.value=="" || inputsid.value=="" || inputmail.value=="" || inputcontact.value==""){
       return alert("Please Fill all the input !!");
    }

    // Adding data to the rows
    cell1name.innerHTML=inputname.value;
    cell2id.innerHTML=inputsid.value;
    cell3mail.innerHTML=inputmail.value;
    cell4contact.innerHTML=inputcontact.value;
    

    // Adding Edit and delete Buttons
    cell5Buttons.appendChild(EditButton);
    cell5Buttons.appendChild(DeleteButton);

    // adding cells
    tablerow.appendChild(cell1name);
    tablerow.appendChild(cell2id);
    tablerow.appendChild(cell3mail);
    tablerow.appendChild(cell4contact);
    tablerow.appendChild(cell5Buttons);
    // adding Buttons TO the Row


    // adding row to the table
    fulltable.appendChild(tablerow); 
    console.log(tablerow.querySelectorAll("td")) ;

    // resetting the value in the code

    inputname.value="";
    inputsid.value="";
    inputmail.value="";
    inputcontact.value="";

    // function to store data in the local storage
    savedatatoStorage();
}
// ---------------------------------------------------------------------------------------

// added functionality to edit and delte buttons

fulltable.addEventListener("click",deleterow);

function deleterow(e){
    e.preventDefault();
    // console.log(e.target);
    if(e.target.classList=="Deletebutton"){
        const parentrow = e.target.parentNode.parentNode;
        // console.log(parentrow);
        parentrow.remove();
        savedatatoStorage();
    }

    else if(e.target.classList.contains("Editbutton")){
        let parentrow = e.target.parentNode.parentNode;

        // select all the data into an array -
        const cells = parentrow.querySelectorAll("td");

        inputname.value = cells[0].textContent;
        inputsid.value = cells[1].textContent;
        inputmail.value = cells[2].textContent;
        inputcontact.value = cells[3].textContent;
        console.log(cells[0]);

        currentRow = parentrow;

        // cells[0].innertext = inputname.value;

        submit.classList.remove("Submit-button");
        submit.innerHTML="Update";
        submit.classList.add("Update");

    }
}

// ---------------------------------------------------------------------------------------
function update() {
    if (currentRow) {
        const cells = currentRow.querySelectorAll("td");

        cells[0].textContent = inputname.value;
        cells[1].textContent = inputsid.value;
        cells[2].textContent = inputmail.value;
        cells[3].textContent = inputcontact.value;

        // Resetting the input values
        inputname.value = "";
        inputsid.value = "";
        inputmail.value = "";
        inputcontact.value = "";

        // Changing back the button to submit
        submit.classList.remove("Update");
        submit.innerHTML = "Submit";
        submit.classList.add("Submit-button");

        currentRow = null;
        savedatatoStorage();
    }
}

// ---------------------------------------------------------------------------------------

// Creating Function To store all Elments in the Local Storage

function savedatatoStorage(){
    // created a temp array
    const tablestore = [];

    const rows = fulltable.querySelectorAll("tr");
    // console.log(rows);
    // store all the data into rows
    rows.forEach(row => {
        const data = row.querySelectorAll("td");
    // console.log(data[0].textContent);
    if(data.length==5){
        tablestore.push(
            { 
                StudentName :data[0].textContent,
                SID : data[1].textContent,
                Email : data[2].textContent,
                contact : data[3].textContent
            })
        
    }});  
    // converted the colletd array into string
    const studentdata = JSON.stringify(tablestore);
    localStorage.setItem("Studentdata", studentdata);
    
}

// ---------------------------------------------------------------------------------------

function loadLocaldata(){
    const storeddata = localStorage.getItem("Studentdata");

    if(storeddata){
        const tabledata = JSON.parse(storeddata);

        tabledata.forEach(row => {
            const tablerow = document.createElement("tr"); 
            
            const cell1name = document.createElement("td");
            const cell2id = document.createElement("td");
            const cell3mail = document.createElement("td");
            const cell4contact = document.createElement("td");
            const cell5Buttons = document.createElement("td");

           cell1name.innerHTML=row.StudentName;
           cell2id.innerHTML=row.SID;
           cell3mail.innerHTML=row.Email;
           cell4contact.innerHTML=row.contact;

           const EditButton = document.createElement("button"); 
           EditButton.classList.add("Editbutton");
           EditButton.innerHTML='Edit';
           const DeleteButton = document.createElement("button");
           DeleteButton.classList.add("Deletebutton");
           DeleteButton.innerHTML="Delete";

           cell5Buttons.appendChild(EditButton);
           cell5Buttons.appendChild(DeleteButton);

           tablerow.appendChild(cell1name);
           tablerow.appendChild(cell2id);
           tablerow.appendChild(cell3mail);
           tablerow.appendChild(cell4contact);
           tablerow.appendChild(cell5Buttons);

           fulltable.appendChild(tablerow);


        });
    }

}

// ---------------------------------------------------------------------------------------

