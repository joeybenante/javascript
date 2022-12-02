const baseUrl = "https://localhost:7038/api/";
var custList = [];


function getCustomers() {
  const allCustomersApiUrl = "https://localhost:7038/api/customer";
  let html = `<table class="table table-striped">
              <tr>
                <th>Customer ID</th>
                <th>First Name</th>
                <th onClick = "sortByLastName()">Last Name</th>
                <th>Email Address</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th>City</th>
                <th>State</th>
                <th>Zip Code</th>
                <th onClick= "sortByCredit()">Credit</th>

              </tr>`;

  fetch(allCustomersApiUrl)
    .then(function (response) {
      console.log(response); //see what comes back
      return response.json();
    })
    .then(function (json) {
      custList = json;
      json.forEach((customer) => {
        if (customer.removed != 1) {
          html += "<tr>";
          html += ` <td>${customer.custId}</td>
                    <td>${customer.fName}</td>
                    <td>${customer.lName}</td>
                    <td>${customer.emailAddress}</td>
                    <td>${customer.phoneNumber}</td>
                    <td>${customer.address}</td>
                    <td>${customer.city}</td>
                    <td>${customer.state}</td>
                    <td>${customer.zipCode}</td>
                    <td>${customer.credit}</td>
                    <td>
                    <button class = "btn btn-outline-secondary" onClick = "removeCustomer(${customer.custId})">Remove</button>
                  </td>
          `;
        }
        html += "</tr>";
      });
      html += "</table>";
      document.getElementById("customers").innerHTML = html;
    })
    .catch(function (error) {
      console.log(error);
    });
}

function sortByLastName()
{
  let html = `<table class="table table-striped">
  <tr>
    <th>Customer ID</th>
    <th>First Name</th>
    <th onClick = "sortByLastName()">Last Name</th>
    <th>Email Address</th>
    <th>Phone Number</th>
    <th>Address</th>
    <th>City</th>
    <th>State</th>
    <th>Zip Code</th>
    <th onClick= "sortByCredit()">Credit</th>

  </tr>`;
  custList.sort(function (a,b){
    if(a.lName < b.lName)
    {
      return -1;
    }
    if(a.lName > b.lName)
    {
      return 1;
    }
    return 0;
  }) 
  
  custList.forEach((customer) => {
    if(customer.removed == 0){
      html += "<tr>";
      html += ` <td>${customer.custId}</td>
                <td>${customer.fName}</td>
                <td>${customer.lName}</td>
                <td>${customer.emailAddress}</td>
                <td>${customer.phoneNumber}</td>
                <td>${customer.address}</td>
                <td>${customer.city}</td>
                <td>${customer.state}</td>
                <td>${customer.zipCode}</td>
                <td>${customer.credit}</td>
                <td>
                <button class = "btn btn-outline-secondary" onClick = "removeCustomer(${customer.custId})">Remove</button>
              </td>
        `;
      // }
      html += "</tr>";
    }
  });
  html += "</table>";
  document.getElementById("customers").innerHTML = html;
}

function removeCustomer(id)
{
    //$(ctl).parents("tr").remove();
    const removeCustomerUrl = baseUrl + 'customer/' + id;
    
    fetch(removeCustomerUrl, {
        method : 'DELETE', 
        headers : 
        {
            "Accept": 'application/json',
            "Content-Type" : 'application/json'
        },
    }).then(function(response)
    {
        console.log(response);
        getCustomers();
    }).catch(function(error)
    {
        console.log(error);
    });
}

function sortByCredit()
{
  let html = `<table class="table table-striped">
  <tr>
    <th>Customer ID</th>
    <th>First Name</th>
    <th onClick = "sortByLastName()">Last Name</th>
    <th>Email Address</th>
    <th>Phone Number</th>
    <th>Address</th>
    <th>City</th>
    <th>State</th>
    <th>Zip Code</th>
    <th onClick= "sortByCredit()">Credit</th>

  </tr>`;
  custList.sort(function (a,b){
    if(a.credit < b.credit)
    {
      return -1;
    }
    if(a.credit > b.credit)
    {
      return 1;
    }
    return 0;
  }) 
  custList.forEach((customer) => 
  {if(customer.removed == 0){
    html += "<tr>";
    html += ` <td>${customer.custId}</td>
              <td>${customer.fName}</td>
              <td>${customer.lName}</td>
              <td>${customer.emailAddress}</td>
              <td>${customer.phoneNumber}</td>
              <td>${customer.address}</td>
              <td>${customer.city}</td>
              <td>${customer.state}</td>
              <td>${customer.zipCode}</td>
              <td>${customer.credit}</td>
              <td>
              <button class = "btn btn-outline-secondary" onClick = "removeCustomer(${customer.custId})">Remove</button>
            </td>
      `;
    // }
    html += "</tr>";
  }
  });
  html += "</table>";
  document.getElementById("customers").innerHTML = html;
}


//add all the ids I made in the html for each part of the form as consts and then 
//pass these in the body (line 34 rn)

function newCustomerClick(){ //post
    const postCustApiUrl = baseUrl + 'customer';
    const fName = document.getElementById("fname").value;
    const lName = document.getElementById("lname").value;
    const emailAddress = document.getElementById("emailaddress").value;
    const phoneNumber = document.getElementById("phonenumber").value;
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;
    const state = document.getElementById("state").value;
    const zipCode = document.getElementById("zipcode").value;
    const password = document.getElementById("password").value;
  
    //go to back end
    fetch(postCustApiUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        FName: fName,
        LName: lName,
        EmailAddress: emailAddress,
        PhoneNumber: phoneNumber,
        Address: address,
        City: city,
        State: state,
        ZipCode: zipCode,
        UserPassword: password
      }),
    }).then((response) => {
      console.log(response);
      // getCustomers();
      window.location="../login.html"
    });

}

function getSingleCustomer()
{
  custId = localStorage.getItem("custId");
  console.log(custId);
  json.forEach((customer) => {
    if (customer.custId == custId) {
      console.log("made it here");
      console.log(customer.custId);
      json = customer;

      // makeReadOnly();
    }
  });
  console.log(custId);
  window.location = "../customerhtmls/customerprofile.html"; // Redirecting to other page.
  // viewSingleBook(selectedId);
  // document.getElementById("singlebook").innerHTML = html;
}

function viewSingleCustomer()
{
  console.log("here " + localStorage.getItem("custId"));
  custId = localStorage.getItem("custId");
  const singleCustomerApiUrl = "https://localhost:7038/api/customer/" + custId;

  fetch(singleCustomerApiUrl)
    .then(function (response) {
      console.log(response); //see what comes back
      return response.json();
    })
    .then(function (json) {
      document.getElementById("custFName").value = json.fName;
      document.getElementById("custLName").value = json.lName;
      document.getElementById("credit").value = json.credit;
      document.getElementById("custEmail").value = json.emailAddress;
      document.getElementById("custPhone").value = json.phoneNumber;
      document.getElementById("custAddress").value = json.address;
      document.getElementById("custCity").value = json.city;
      document.getElementById("custState").value = json.state;
      document.getElementById("custZip").value = json.zipCode;
      
      console.log(json);
      document.getElementById("customerprofile").innerHTML = html;
    })
    .catch(function (error) {
      console.log(error);
    });
}