var myEmployee = {};
function empLoginOnClick() {
  const allEmployeesApiUrl = "https://localhost:7038/api/employees";
  const loginEmail = document.getElementById("email").value;
  const loginPassword = document.getElementById("password").value;
  const submitBtn = document.getElementById("loginclick");
  const form = document.getElementById("form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let html = "";
    let empId = -1;
    fetch(allEmployeesApiUrl)
      .then(function (response) {
        console.log(response); //see what comes back
        return response.json();
      })
      .then(function (json) {
        json.forEach((employee) => {
          console.log(employee);
          if (employee.emailAddress == loginEmail &&
                employee.userPassword == loginPassword) 
            {
                // myemployee = employee;
                empId = employee.employeeId;
                localStorage.setItem("empId", empId);
                console.log(empId);
                console.log(myEmployee.empId);
                window.location = "./employeehtmls/EmpInventory.html";
                // Redirecting to other page.

            } 
        });
        document.getElementById("login").innerHTML = html;
        if(empId == -1)
        {
            console.log("NO");
            alert("Error: Incorrect email or password.");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  });
}