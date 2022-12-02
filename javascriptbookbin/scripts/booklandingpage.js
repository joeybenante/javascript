const baseUrl = "https://localhost:7038/api/books";
const cartApiUrl = "https://localhost:7038/api/cart";
var bookId = "";
var myBook = {};
var cartList = [];
var value = "none";
// function populateList() {
//   const allBooksApiUrl = baseUrl;
//   fetch(allBooksApiUrl)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (json) {
//       bookList = json;
//       let html =
//         '<select class = "listBox" onchange = "handleOnChange()" id= "selectListBox" name = "list_box" size=5 width="100%">';
//       json.forEach((book) => {
//         html +=
//           "<option value = " + book.bookId + ">" + book.title + "</option>"; //book.id  + ">" + book.title ??
//       });
//       html += "</select>";
//       document.getElementById("listBox").innerHTML = html;
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// }

// function bookCoverOnLoad() {
//   const allBooksApiUrl = baseUrl;
//   fetch(allBooksApiUrl)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (json) {
//       bookList = json;
//       let html =
//         '<select class = "box" id= "bookLandingPage" name = "bookLandingPage">';
//       json.forEach((book) => {
//         html += `
//                  <option value = ${book.bookId} >
//                  <a ><img src="${book.coverArtUrl}" alt=""></a>
//                  </option>
//                 `
//       });
//       html += "</select>";
//       document.getElementById("box").innerHTML = html;
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// }

function bookCoverOnLoad() { //home
  const allBooksApiUrl = baseUrl;
  fetch(allBooksApiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      bookList = json;
      console.log(bookList);
      let html = `
            <section class="main-container" >
            <div class="location" id="home">
                <h1 id="home">New on BookBin</h1>
                <div class="box">
             `;

      //   ('<select class = "box" id= "bookLandingPage" name = "bookLandingPage">');
  
      json.forEach((book) => {
      if(book.reviewed == 1){
          html += `
                   <a  id = "anchor" value = ${book.bookId}><img  onclick = "onCoverClick(${book.bookId})" id = "coverFormat" src="${book.coverArtUrl}" alt=""></a>
                  `;
      }
        //href="./bookhtmls/singlebookinfo.html" to put after anchor
        
      });
      html += `
            </div>
            </div>
            </section>     
        
            `;
      document.getElementById("loadBooks").innerHTML = html;
    })
    .catch(function (error) {
      console.log(error);
    });
}

function romance()
{
  
}

function invBookCoverOnLoad(value) { //customer
  console.log("value: " + value);
  const allBooksApiUrl = baseUrl;
  fetch(allBooksApiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      bookList = json;
      console.log(bookList);
      let html = `
            <section class="main-container" >
            <div class="location" id="home">
          
            <h1 id="home">Book Bin Inventory
            <i onClick = "sortByTitle()" class="fas fa-sort-alpha-down"></i>
            <i class="fas fa-sort-numeric-down" onClick="sortByPrice()"></i>
            <svg onClick="sortByGenre()"xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sort-down" viewBox="0 0 16 16">
            <path d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293V2.5zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"/>
            </svg>
            </h1>
            <div class="box">
             `;

      //   ('<select class = "box" id= "bookLandingPage" name = "bookLandingPage">');
      json.forEach((book) => {
      if(book.reviewed == 1){
          // bookList.sort()
          html += `
                   <a  id = "anchor" value = ${book.bookId}><img  onclick = "onCoverClick(${book.bookId})" id = "coverFormat" src="${book.coverArtUrl}" alt=""></a>
                  `;
      }
        //href="./bookhtmls/singlebookinfo.html" to put after anchor
        
      });
      html += `
            </div>
            </div>
            </section>     
        
            `;
      document.getElementById("loadBooks").innerHTML = html;
    })
    .catch(function (error) {
      console.log(error);
    });
}

function sortByTitle()
{
  bookList.sort(function (a,b){
    if(a.title < b.title)
    {
      return -1;
    }
    if(a.title > b.title)
    {
      return 1;
    }
    return 0;
  }) 
  console.log( bookList);
  let html = `
            <section class="main-container" >
            <div class="location" id="home">
          
            <h1 id="home">Book Bin Inventory
            <i onClick = "sortByTitle()" class="fas fa-sort-alpha-down"></i>
            <i class="fas fa-sort-numeric-down" onClick="sortByPrice()"></i>
            <svg onClick="sortByGenre()"xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sort-down" viewBox="0 0 16 16">
            <path d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293V2.5zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"/>
            </svg>
            </h1>
            <div class="box">
             `;
  bookList.forEach((book) => {
    if(book.reviewed == 1){
        // bookList.sort()
        html += `
                 <a  id = "anchor" value = ${book.bookId}><img  onclick = "onCoverClick(${book.bookId})" id = "coverFormat" src="${book.coverArtUrl}" alt=""></a>
                `;
    }
      //href="./bookhtmls/singlebookinfo.html" to put after anchor
      
  });
    html += `
    </div>
    </div>
    </section>     

    `;
    document.getElementById("loadBooks").innerHTML = html;
}


function sortByPrice()
{
  bookList.sort(function (a,b){
    if(a.price < b.price)
    {
      return -1;
    }
    if(a.price > b.price)
    {
      return 1;
    }
    return 0;
  }) 
  console.log( bookList);
  let html = `
            <section class="main-container" >
            <div class="location" id="home">
          
            <h1 id="home">Book Bin Inventory
            <i onClick = "sortByTitle()" class="fas fa-sort-alpha-down"></i>
            <i class="fas fa-sort-numeric-down" onClick="sortByPrice()"></i>
            <svg onClick="sortByGenre()"xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sort-down" viewBox="0 0 16 16">
            <path d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293V2.5zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"/>
            </svg>
            </h1>
            <div class="box">
             `;
  bookList.forEach((book) => {
    if(book.reviewed == 1){
        // bookList.sort()
        html += `
                 <a  id = "anchor" value = ${book.bookId}><img  onclick = "onCoverClick(${book.bookId})" id = "coverFormat" src="${book.coverArtUrl}" alt=""></a>
                `;
    }
      //href="./bookhtmls/singlebookinfo.html" to put after anchor
      
  });
    html += `
    </div>
    </div>
    </section>     

    `;
    document.getElementById("loadBooks").innerHTML = html;
}
function sortByGenre()
{
  bookList.sort(function (a,b){
    if(a.genre < b.genre)
    {
      return -1;
    }
    if(a.genre > b.genre)
    {
      return 1;
    }
    return 0;
  }) 
  console.log( bookList);
  let html = `
            <section class="main-container" >
            <div class="location" id="home">
          
            <h1 id="home">Book Bin Inventory
            <i  onClick = "sortByTitle()" class="fas fa-sort-alpha-down"></i>
            <i class="fas fa-sort-numeric-down" onClick="sortByPrice()"></i>
            <svg onClick="sortByGenre()"xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sort-down" viewBox="0 0 16 16">
            <path d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293V2.5zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"/>
            </svg></h1>
            </h1>
            <div class="box">
             `;
  bookList.forEach((book) => {
    if(book.reviewed == 1){
        // bookList.sort()
        html += `
                 <a  id = "anchor" value = ${book.bookId}><img  onclick = "onCoverClick(${book.bookId})" id = "coverFormat" src="${book.coverArtUrl}" alt=""></a>
                `;
    }
      //href="./bookhtmls/singlebookinfo.html" to put after anchor
      
  });
    html += `
    </div>
    </div>
    </section>     

    `;
    document.getElementById("loadBooks").innerHTML = html;
}

function empBookCoverOnLoad() {
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
      console.log(bookList);
      let html = `
            <section class="main-container" >
            <div class="location" id="home">
                <h1 id="home">Book Bin Inventory
                <i class="fas fa-sort-alpha-down" onClick= "sortByTitle()"></i>
                <i class="fas fa-sort-numeric-down" onClick= "sortByPrice()"></i>
                <svg onClick="sortByGenre()"xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sort-down" viewBox="0 0 16 16">
                <path d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293V2.5zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"/>
                </svg></h1>
             `;

      //   ('<select class = "box" id= "bookLandingPage" name = "bookLandingPage">');
      json.forEach((book) => {
      if(book.reviewed == 1){
          html += `
                   <a  id = "anchor" value = ${book.bookId}><img  onclick = "empOnCoverClick(${book.bookId})" id = "coverFormat" src="${book.coverArtUrl}" alt=""></a>
                  `;
        }
        //href="./bookhtmls/singlebookinfo.html" to put after anchor
        
      });
      html += `
            </div>
            </div>
            </section>     
        
            `;
      document.getElementById("loadBooks").innerHTML = html; 
    })
    .catch(function (error) {
      console.log(error);
    });
}

function onCoverClick(id) {
  bookId = id;
  console.log(bookId);
  bookList.forEach((book) => {
    if (book.bookId == bookId) {
      console.log("made it here");
      console.log(book.bookId);
      json = book;

      // makeReadOnly();
    }
  });
  console.log(bookId);
  localStorage.setItem("bookId", bookId);
  window.location = "../bookhtmls/singlebookinfo.html"; // Redirecting to other page.
  // viewSingleBook(selectedId);
  // document.getElementById("singlebook").innerHTML = html;
}

function empOnCoverClick(id) {
  bookId = id;
  console.log(bookId);
  bookList.forEach((book) => {
    if (book.bookId == bookId) {
      console.log("made it here");
      console.log(book.bookId);
      json = book;

      // makeReadOnly();
    }
  });
  console.log(bookId);
  localStorage.setItem("bookId", bookId);
  window.location = "../bookhtmls/empSingleBook.html"; // Redirecting to other page.
  // viewSingleBook(selectedId);
  // document.getElementById("singlebook").innerHTML = html;
}

function addToCartFunction(id){
  cartList= JSON.parse(window.localStorage.getItem("cartList"));
  if (cartList == null)
  {
    cartList = [];
  }
  console.log('made it here???')
  custId = localStorage.getItem("custId");
  console.log(id); //bookid
  console.log(custId);

  // const postCartApiUrl = cartApiUrl;
  // const sendToCart = {
  //   custId: custId,
  //   bookId: id
  // };
  // fetch(postCartApiUrl,{
  //   method: "POST",
  //   headers: {
  //     Accept: "application/json",
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(sendToCart),
  // }).then((response) => {
  //   alert("Added to Cart")

  // });
  cartList.push(id);
  localStorage.setItem("cartList", JSON.stringify(cartList));
  // var fullCart = JSON.parse(localStorage.getItem("cartList"));
  console.log("cart list " + cartList);
}

// function viewSingleBook() {
//   console.log(json);
//   let html = `<table>
//     <tr>
//       <th>Title</th>
//       <th>Author</th>
//       <th>ISBN</th>
//       <th>Condition</th>
//       <th>Price</th>
//       <th>Genre</th>
//     </tr>`;
//   html += "<tr>";
//   html += ` <td>${json.title}</td>
//               <td>${json.author}</td>
//               <td>${json.isbn}</td>
//               <td>${json.bookCondition}</td>
//               <td>${json.price}</td>
//               <td>${json.genre}</td>
//     `;
//   html += "</tr>";
//   html += "</table>";
//   document.getElementById("singleBook").innerHTML = html;
// }

function viewSingleBook() {
  console.log("here " + localStorage.getItem("bookId"));
  bookId = localStorage.getItem("bookId");
  const singleBookApiUrl = "https://localhost:7038/api/books/" + bookId;
  // let html = `<table>
  //               <tr>
  //               <th>Title</th>
  //               <th>Author</th>
  //               <th>ISBN</th>
  //               <th>Condition</th>
  //               <th>Price</th>
  //               <th>Genre</th>
  //               </tr>`;

  fetch(singleBookApiUrl)
    .then(function (response) {
      console.log(response); //see what comes back
      return response.json();
    })
    .then(function (json) {
      document.getElementById("bookTitle").value = json.title;
      document.getElementById("bookAuthor").value = json.author;
      document.getElementById("bookGenre").value = json.genre;
      document.getElementById("bookIsbn").value = json.isbn;
      document.getElementById("bookPrice").value = json.price;
      document.getElementById("bookCover").value = json.coverArtUrl;
      var html =
        '<img class = "coverArt" src= "' + json.coverArtUrl + '"></img>';
      document.getElementById("bookCondition").value = json.bookCondition;
      var cartHtml = `
      <button class = "btn btn-primary" onclick = "addToCartFunction(${json.bookId})">Add To Cart</button>
                  `;
      document.getElementById("addToCart").innerHTML = cartHtml;
      document.getElementById("picBox").innerHTML = html;


      // let addToCartButton = document.createElement("button");
      // addToCartButton.className = "btn btn-primary";
      // addToCartButton.innerText = "Add to Cart";
      // addToCartButton.addEventListener('click', function(e)
      // {
      //   addToCart(id);
      // })
      

      // html += "<tr>";
      // html += ` <td>${json.title}</td>
      //                   <td>${json.isbn}</td>
      //                   <td>${json.bookCondition}</td>
      //                   <td>${json.price}</td>
      //                   <td>${json.genre}</td>
      //         `;

      // html += "</tr>";

      // html += "</table>";
      console.log(json);
      document.getElementById("singlebook").innerHTML = html;
    })
    .catch(function (error) {
      console.log(error);
    });
}

function empViewSingleBook() {
  console.log("here " + localStorage.getItem("bookId"));
  bookId = localStorage.getItem("bookId");
  const singleBookApiUrl = "https://localhost:7038/api/books/" + bookId;

  fetch(singleBookApiUrl)
    .then(function (response) {
      console.log(response); //see what comes back
      return response.json();
    })
    .then(function (json) {
      document.getElementById("bookTitle").value = json.title;
      document.getElementById("bookAuthor").value = json.author;
      document.getElementById("bookGenre").value = json.genre;
      document.getElementById("bookIsbn").value = json.isbn;
      document.getElementById("bookPrice").value = json.price;
      document.getElementById("bookCover").value = json.coverArtUrl;
      var html =
        '<img class = "coverArt" src= "' + json.coverArtUrl + '"></img>';
      document.getElementById("bookCondition").value = json.bookCondition;
      document.getElementById("picBox").innerHTML = html;

      console.log(json);
      document.getElementById("empsinglebook").innerHTML = html;
    })
    .catch(function (error) {
      console.log(error);
    });
}
