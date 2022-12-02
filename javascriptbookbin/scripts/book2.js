

function handleOnLoad() {
  populateList();
}

function handleOnChange() {
  //const getBookApiUrl = baseUrl + "/" + book.bookId;
  const selectedId = document.getElementById("selectListBox").value;
  bookList.forEach((book)=>
  {
    if(book.bookId == selectedId)
    {
      myBook = book;
      makeReadOnly();
    }
  })
  console.log(selectedId);
  populateForm();
}

function calculatePrice(id){
  const bnPrice = document.getElementById("originalprice").value;
  const bookCondition = document.getElementById("conditionDropDown").value;
  bookList.forEach((book)=>
  {
    if(book.bookId == id)
    {
      myBook = book;
    }
  })
  console.log(myBook);
  console.log(bnPrice);

  if(bookCondition == "new"){
    myBook.Price = bnPrice * .90;
  }
  else if(bookCondition == "fairly used"){
    myBook.Price = bnPrice * .70;
  }
  else if(bookCondition == "very used"){
    myBook.Price = bnPrice * .40;
  }
  console.log("price after calc:" + myBook.Price);
}

function handleEditClick() {
  makeEditable();
  hideButtons();
  console.log(myBook.bookId);
  var buttonHtml =
    '<button class="btn btn-primary btn-lg" onclick="handleEditSave(' +
    myBook.bookId + ')">Save</button>';
  buttonHtml +=
    '<button class="btn btn-warning btn-lg btn-cancle" onclick="handleCancelSave()">Cancel</button>';
  document.getElementById("saveButton").innerHTML = buttonHtml;
  document.getElementById("saveButton").style.display = "inline-block";
}

// function handleAcceptClick(){
//   var buttonHtml =
//     '<button class="btn btn-primary btn-lg" onclick="handleEditSave(' +
//     myBook.bookId +
//     ')">Save</button>';
// }

function handleNewClick() {
  makeEditable();
  hideButtons();
  blankFields();
  var buttonHtml =
    '<button class ="btn btn-primary btn-lg" onclick="handleNewSave()">Save</button>';
  buttonHtml +=
    '<button class ="btn btn-warning btn-lg btn-cancle" onclick="handleCancelSave()">Cancel</button>';
  document.getElementById("saveButton").innerHTML = buttonHtml;
  document.getElementById("saveButton").style.display = "inline-block";
}


function handleCancelSave() {
  populateForm();
  makeReadOnly();
  showButtons();
}

function handleEditSave(id) {
  calculatePrice(id);
  putBook(id);
  makeReadOnly();
  document.getElementById("originalprice").value = "";
  showButtons();
  alert("Book submission was successful.");
}

function handleNewSave() {
  postBook();
  makeReadOnly();
  showButtons();
  blankFields();
}

function populateForm() {
  document.getElementById("bookTitle").value = myBook.title;
  document.getElementById("bookAuthor").value = myBook.author;
  document.getElementById("bookGenre").value = myBook.genre;
  document.getElementById("bookIsbn").value = myBook.isbn;
  document.getElementById("bookCover").value = myBook.coverArtUrl;
  var html = '<img class = "coverArt" src= "' + myBook.coverArtUrl + '"></img>';
  document.getElementById("conditionDropDown").value = myBook.bookCondition;
  document.getElementById("reviewedDropDown").value = myBook.reviewed;
  document.getElementById("picBox").innerHTML = html;
}

function hideButtons() {
  document.getElementById("newButton").style.display = "none";
  document.getElementById("editButton").style.display = "none";
  // document.getElementById("deleteButton").style.display = "none";
  // document.getElementById("rentButton").style.display = "none";
  // document.getElementById("returnButton").style.display = "none";
}

function showButtons() {
  document.getElementById("newButton").style.display = "inline-block";
  document.getElementById("editButton").style.display = "inline-block";
  // document.getElementById("deleteButton").style.display = "inline-block";
  // document.getElementById("rentButton").style.display = "inline-block";
  // document.getElementById("returnButton").style.display = "inline-block";
  document.getElementById("saveButton").style.display = "none";
}

function makeEditable() {
  document.getElementById("bookTitle").readOnly = false;
  document.getElementById("bookAuthor").readOnly = false;
  document.getElementById("bookGenre").readOnly = false;
  document.getElementById("bookIsbn").readOnly = false;
  document.getElementById("bookCover").readOnly = false;
  document.getElementById("conditionDropDown").readOnly = false;
  document.getElementById("reviewedDropDown").readOnly = false;
}

function blankFields() {
  document.getElementById("bookTitle").value = "";
  document.getElementById("bookAuthor").value = "";
  document.getElementById("bookGenre").value = "";
  document.getElementById("bookIsbn").value = "";
  document.getElementById("bookCover").value = "";
  document.getElementById("bookPrice").value = "";
  document.getElementById("originalprice").value = "";
  document.getElementById("conditionDropDown").value = "";
  document.getElementById("reviewedDropDown").value = "";


  // document.getElementById("bookCondition").value = "";
}

function blankFieldsCustomerForm() {
  document.getElementById("bookTitle").value = "";
  document.getElementById("bookAuthor").value = "";
  document.getElementById("bookGenre").value = "";
  document.getElementById("bookIsbn").value = "";
  document.getElementById("bookCover").value = "";
}

function makeReadOnly() {
  document.getElementById("bookTitle").readOnly = true;
  document.getElementById("bookAuthor").readOnly = true;
  document.getElementById("bookGenre").readOnly = true;
  document.getElementById("bookIsbn").readOnly = true;
  document.getElementById("bookCover").readOnly = true;
  document.getElementById("conditionDropDown").readOnly = true;
  document.getElementById("reviewedDropDown").readOnly = true;

}


