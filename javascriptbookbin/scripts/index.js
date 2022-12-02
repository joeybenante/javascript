const baseUrl = "https://localhost:7038/api/";
let totalNum = document.getElementById("totalNum");

let cartCount = 0;

function onBookClick() {
  cartCount++;
  displayCartCount();
}

function onCartClick() {
  cartCount--;
  displayCartCount();
}

function displayCartCount() {
  totalNum.innerHTML = `<a>${cartCount}</a>`;
}

function getEmployees() {
  const allEmployeesApiUrl = "https://localhost:7038/api/employees";
  let html = `<table class="table table-striped">
              <tr>
                <th>Employee ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email Address</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th>City</th>
                <th>State</th>
                <th>Zip Code</th>
                <th>Start Date</th>
              </tr>`;

  fetch(allEmployeesApiUrl)
    .then(function (response) {
      console.log(response); //see what comes back
      return response.json();
    })
    .then(function (json) {
      json.forEach((employee) => {
        if (employee.adminAccess != 2) {
        html += "<tr id= 'tr'>";
        // let tr = document.getElementById('tr');
        let dateStr = new Date(employee.startDate);
        html += ` <td>${employee.employeeId}</td>
                    <td>${employee.fName}</td>
                    <td>${employee.lName}</td>
                    <td>${employee.emailAddress}</td>
                    <td>${employee.phoneNumber}</td>
                    <td>${employee.address}</td>
                    <td>${employee.city}</td>
                    <td>${employee.state}</td>
                    <td>${employee.zipCode}</td>
                    <td>${dateStr.toLocaleDateString()}</td>
                    <td>
                      <button class = "btn btn-outline-secondary" onClick = "fireEmployee(${employee.employeeId})">Remove</button>
                    </td>
          `;
        // }
        html += "</tr>";
    }});
      html += "</table>";
      document.getElementById("employees").innerHTML = html;
    })
    .catch(function (error) {
      console.log(error);
    });
}

function createEmployee()
{
  window.location = "../employeehtmls/createemployee.html";
}

//add all the ids I made in the html for each part of the form as consts and then
//pass these in the body (line 34 rn)

function newEmployeeClick() {
  const postEmployeeApiUrl = baseUrl + "employees";
  const fName = document.getElementById("fname").value;
  const lName = document.getElementById("lname").value;
  const emailAddress = document.getElementById("emailaddress").value;
  const phoneNumber = document.getElementById("phonenumber").value;
  const address = document.getElementById("address").value;
  const city = document.getElementById("city").value;
  const state = document.getElementById("state").value;
  const zipCode = document.getElementById("zipcode").value;
  // const jobPosition = document.getElementById("jobposition").value;
  const password = document.getElementById("password").value;

  //go to back end
  fetch(postEmployeeApiUrl, {
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
      // JobPosition: jobPosition,
      ZipCode: zipCode,
      UserPassword: password,
    }),
  }).then((response) => {
    console.log(response);
    // getEmployees();
  });
}

function fireEmployee(id)
{
    //$(ctl).parents("tr").remove();
    const fireEmployeeApiUrl = baseUrl + 'employees/' + id;
    
    fetch(fireEmployeeApiUrl, {
        method : 'DELETE', 
        headers : 
        {
            "Accept": 'application/json',
            "Content-Type" : 'application/json'
        },
    }).then(function(response)
    {
        console.log(response);
        getEmployees();
    }).catch(function(error)
    {
        console.log(error);
    });
}
