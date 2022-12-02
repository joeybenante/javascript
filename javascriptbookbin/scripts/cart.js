const baseUrl = "https://localhost:7038/api/books";

function getCart()
{
    let sum = 0.0;
    cartList= JSON.parse(window.localStorage.getItem("cartList"));
    
    if (cartList == null)
    {
      cartList = [];
    }
    const allBooksApiUrl = baseUrl;
    let html = `<table class="table table-striped">
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Price</th>
                </tr>`;
    fetch(allBooksApiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      bookList = json;
      console.log(bookList);
      console.log(cartList)
    //   cartList.forEach(element => {
    //     if(bookList.id == element.id)
    //     {
    //         console.log(element.id);
    //         html += `<td>${bookList.id}</td>`
    //     }

        cartList.forEach(element => {
            bookList.forEach(book => {
                if(element == book.bookId)
                {
                    // console.log(element.id);
                    // html += `<td>${bookList.id}</td>`
                    console.log(cartList);
    
                    html += "<tr>";
                    html += ` <td>${book.title}</td>
                                    <td>${book.price}</td>
                                   
                    `;
                    sum += book.price;
                }
            })
            
            html += "</tr>";
            // count++;
            // bLCount++;

        });
        html+= `<tr>
                <td style= "font-weight: bold">Total</td>
                <td style= "font-weight: bold"> ${sum}</td>
                </tr>`
        html += "</table>";
        html+= `<button onclick="sendToBuyTrans(${cartList})">Submit</button>`
        document.getElementById("loadCart").innerHTML = html;
    });


}

function sendToBuyTrans(cartList)
{
    cartList= JSON.parse(window.localStorage.getItem("cartList"));
    const sendToBuyUrl = "https://localhost:7038/api/transaction";
    let count = 0;
    console.log(localStorage.getItem("custId"));
    cartList.forEach(element=> 
    {
        const sendTrans = 
        {
            CustomerId : localStorage.getItem("custId"),
            BookId : cartList[count],
        }
        count++;
        fetch(sendToBuyUrl, {
        method: "POST",
        headers: 
        {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(sendTrans),
        }).then((response) => 
        {
            console.log(response);
            
        })
    })
    alert("Purchase was successful.");
    clearCart();
    putBook(cartList, bookList);
    getCart();
    console.log(cartList);
}

function putBook(cartList,bookList) {
    myBook = {};
    cartList.forEach(element => 
    {
        bookList.forEach(book => 
        {
            if(element == book.bookId)
            {
                myBook = book;
            }
        }
    )})
    const putBookApiUrl = baseUrl + "/" + myBook.bookId;
    const sendBook = {
      bookId: myBook.bookId,
      title: myBook.title,
      author: myBook.author,
      genre: myBook.genre,
      isbn: myBook.isbn,
      price: myBook.price,
      coverArtUrl: myBook.coverArtUrl,
      bookCondition: myBook.bookCondition,
      reviewed: 2
    };
    fetch(putBookApiUrl, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendBook),
    }).then((response) => {

    });
}

function clearCart()
{
    window.localStorage.setItem("cartList", JSON.stringify([]));
}
