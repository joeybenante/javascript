const baseUrl = "https://localhost:7038/api/books";
var bookList = [];
var myBook = {};
// const cartList = [];
// function getBooks() {
//   const allbooksApiUrl = baseUrl;
//   let html = `<table>
//                 <tr>
//                   <th>Book ID</th>
//                   <th>Price</th>
//                   <th>ISBN</th>
//                   <th>Title</th>
//                   <th>Genre</th>
//                   <th>Cover Art URL</th>
//                 </tr>`;

//   fetch(allBooksApiUrl)
//     .then(function (response) {
//       console.log(response); //see what comes back
//       return response.json();
//     })
//     .then(function (json) {
//       json.forEach((book) => {
//         // if (book.fired == 0) {
//         html += "<tr>";
//         html += ` <td>${book.custId}</td>
//                       <td>${book.fName}</td>
//                       <td>${book.lName}</td>
//                       <td>${book.emailAddress}</td>
//                       <td>${book.phoneNumber}</td>
//                       <td>${book.address}</td>
//                       <td>${book.city}</td>
//                       <td>${book.state}</td>
//                       <td>${book.zipCode}</td>
//                       <td>${book.credit}</td>
//             `;
//         // }
//         html += "</tr>";
//       });
//       html += "</table>";
//       document.getElementById("books").innerHTML = html;
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// }

function populateList() {
  empId = localStorage.getItem("empId");
  console.log(empId.adminAccess);
  if(empId == 12)
  {
    let html =  `<a href="../employeehtmls/EmpInventory.html">Inventory</a>
    <a href="../bookhtmls/BookForm.html">Review</a> 
    <a href="../employeehtmls/AdminCust.html">Customers</a> 
            <a href="../employeehtmls/Admin.html">Employees</a>`
    document.getElementById("main-nav").innerHTML = html;
  }
  const allBooksApiUrl = baseUrl;
  fetch(allBooksApiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      bookList = json;
      
      let html =
        '<select class = "listBox" onchange = "handleOnChange()" id= "selectListBox" name = "list_box" size=5 width="100%">';
      json.forEach((book) => {
        if(book.reviewed == 0){
          html +=
          "<option value = " + book.bookId + ">" + book.title + "</option>"; 
        }
        
      });
      html += "</select>";
      document.getElementById("listBox").innerHTML = html;
    })
    .catch(function (error) {
      console.log(error);
    });
}

function putBook(id) {
  const putBookApiUrl = baseUrl + "/" + id;
  console.log(document.getElementById("reviewedDropDown").value)
  console.log(document.getElementById("conditionDropDown").value)
  console.log(myBook.Price);
  const sendBook = {
    bookId: id,
    title: document.getElementById("bookTitle").value,
    author: document.getElementById("bookAuthor").value,
    genre: document.getElementById("bookGenre").value,
    isbn: document.getElementById("bookIsbn").value,
    price: myBook.Price,
    coverArtUrl: document.getElementById("bookCover").value,
    bookCondition: document.getElementById("conditionDropDown").value,
    reviewed: document.getElementById("reviewedDropDown").value
  };
  fetch(putBookApiUrl, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sendBook),
  }).then((response) => {
    myBook = sendBook;
    console.log(myBook);
    populateList();
    populateForm();
    let reviewed = document.getElementById("reviewedDropDown").value;
    postSellTrans(id, reviewed)
    let price = myBook.price;
    if(reviewed == 1)
    {
      addCredits(price);
    }
  });
}

function postBook() {
  const postBookApiUrl = baseUrl;
  const sendBook = {
    title: document.getElementById("bookTitle").value,
    author: document.getElementById("bookAuthor").value,
    genre: document.getElementById("bookGenre").value,
    isbn: document.getElementById("bookIsbn").value,
    coverArtUrl: document.getElementById("bookCover").value,
    bookCondition: document.getElementById("conditionDropDown").value,
  };
  fetch(postBookApiUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sendBook),
    // JSON.stringify({
    //   Title: title,
    //   Author: author,
    //   Genre: genre,
    //   Isbn: isbn,
    //   CoverArtUrl: coverArtUrl,
    //   BookCondition: bookCondition
  }).then((response) => {
    console.log(response);
    alert("Book submission was successful.");
    myBook = sendBook;
    console.log(myBook);
    populateList();
    blankFields();
  });
}

function postBookCustomer() {
  const postBookApiUrl = baseUrl;
  const sendBook = {
    title: document.getElementById("bookTitle").value,
    author: document.getElementById("bookAuthor").value,
    genre: document.getElementById("bookGenre").value,
    isbn: document.getElementById("bookIsbn").value,
    coverArtUrl: document.getElementById("bookCover").value,
    bookCondition: 'Select condition'

  };
  fetch(postBookApiUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sendBook),
    
  }).then((response) => {
    console.log(response);
    alert("Book submission was successful.");
    myBook = sendBook;
    console.log(myBook);
    populateList();
    blankFieldsCustomerForm();

  });
}

function deleteBook() {
  const deleteBookApiUrl = baseUrl + "/" + myBook.id;
  fetch(deleteBookApiUrl, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((response) => {
    blankFields();
    populateList();
  });
}

function onSubmitClick() {
  postBookCustomer();
}

function postSellTrans(id, reviewed)
{

    const postSellTransUrl = "https://localhost:7038/api/selltransaction"
    const sendSell = {
      CustomerId: localStorage.getItem("custId"),
      BookId: id,
      EmployeeId: localStorage.getItem("empId"),
      TransAccepted: reviewed
    };
    fetch(postSellTransUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendSell),
      
    }).then((response) => {
      console.log(response);
    });
}

function addCredits(price)
{
  let id = localStorage.getItem("custId");
  console.log(id);
  const putCustomerUrl = "https://localhost:7038/api/customer/" + id;
  const updateCustomer = 
  {
    CustId: id,
    Credit: price,
    Address: '',
    City: '',
    EmailAddress: '',
    FName: '',
    LName:'',
    PhoneNumber:'',
    State: '',
    UserPassword: '',
  };
  fetch(putCustomerUrl, 
  {
    method: "PUT",
    headers: 
    {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateCustomer),
  }).then((response) => 
  {
    console.log(response);
  });
}
