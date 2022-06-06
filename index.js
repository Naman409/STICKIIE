console.log('Hey!!');
showNotes();

let addBtn = document.getElementById('addBtn');

addBtn.addEventListener("click", function (e) {
    let addTitle = document.getElementById('addTitle');
    let addTxt = document.getElementById('addTxt');
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    let myObj = {
        title: addTitle.value,
        text: addTxt.value
    }

    if(myObj.title=="" && myObj.text==""){
        return alert("Please enter something");
    }
    if(myObj.title=="") myObj.title = "Add title";
    if(myObj.text=="") myObj.text = "Add text";
    notesObj.push(myObj);
    // notesObj.push();
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTitle.value = "";
    addTxt.value = "";

    let changeBtnTxt1 = document.getElementById('addBtn');
    let changeBtnTxt2= document.getElementById('editBtn');

    // console.log(changeBtnTxt1);
    // console.log(changeBtnTxt2);

    if(changeBtnTxt1.textContent==="Save note") changeBtnTxt1.textContent= 'Add note';

    showNotes();
})

function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `<div class="noteCard card my-2 mx-2 text" style="width: 18rem;">
        <div class="card-body">
        
          <p class="card-text"> ${element.title}</p>
          <p class="card-text text-small">${element.text}</p>
          <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary button button2 text"> Delete </button>
          <button id="editBtn" onclick="editNote(${index + 0})" class="btn btn-primary button button2 text mx-1 "> Edit </button>
        </div>
      </div>
        `;
    });

    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = "<p>Use add note button to add your stickiee</p> ";
        notesElm.style.paddingTop = "10px";
        notesElm.style.marginLeft = "2px";
    }

}

// function to delete a note

function deleteNote(index) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

// function to edit the note 
function editNote(index) {
    console.log(index);
    let notes = localStorage.getItem("notes");
    let addTitle = document.getElementById("addTitle");
    let addTxt = document.getElementById("addTxt");

    if (addTitle.value !== "" || addTxt.value !== "") {
          return alert("Please clear the form or save before editing a note")
    }

    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    // console.log(notesObj);

    let changeBtnTxt1 = document.getElementById('addBtn');
    let changeBtnTxt2= document.getElementById('editBtn');
    // console.log(changeBtnTxt1);
    // console.log(changeBtnTxt2);

    if(changeBtnTxt1.textContent==="Add note") changeBtnTxt1.textContent= 'Save note';
    // else changeBtnTxt1.textContent="Add note";
       
    

    notesObj.findIndex((element, index1) => {
        if (index == index1) {
            // console.log( notesObj[index].title);
            addTitle.value = notesObj[index].title;
            addTxt.value = notesObj[index].text;

        }
    })

    console.log(addTitle.value);
    console.log(addTxt.value);
    notesObj.splice(index,1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    //showNotes();
}



let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {
    console.log('You are on a search');
    let inputVal = search.value;
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        console.log(cardTxt);
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";

        }
    })
})