var myCustomer = {};
function loginOnClick() {
  const allCustomersApiUrl = "https://localhost:7038/api/customer";
  const loginEmail = document.getElementById("email").value;
  const loginPassword = document.getElementById("password").value;
  const submitBtn = document.getElementById("loginclick");
  const form = document.getElementById("form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let html = "";
    let custId = -1;
    fetch(allCustomersApiUrl)
      .then(function (response) {
        console.log(response); //see what comes back
        return response.json();
      })
      .then(function (json) {
        json.forEach((customer) => {
          console.log(customer);
          if (
            customer.emailAddress == loginEmail &&
            customer.userPassword == loginPassword
          ) {
            // myCustomer = customer;
            custId = customer.custId;
            localStorage.setItem("custId", custId);

            console.log(myCustomer.custId);
            window.location = "./customerhtmls/CustomerHome.html";
            // Redirecting to other page.

          } 
        });
        document.getElementById("login").innerHTML = html;
        if (custId == -1) 
        {
          console.log("NO");
          alert("Error: Incorrect email or password.");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  });

  // let html = '';
  // fetch(allCustomersApiUrl)
  //   .then(function (response) {
  //     console.log(response); //see what comes back
  //     return response.json();
  //   })
  //   .then(function (json) {
  //     json.forEach((customer) => {
  //         console.log(customer)
  //       if (customer.emailAddress == loginEmail && customer.userPassword == loginPassword) {
  //         html += '<a href="./customerhtmls/CustomerHome.html"></a>'
  //        } else {
  //         console.log('NO')
  //        }
  //     });
  //     document.getElementById("login").innerHTML = html;
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
}
