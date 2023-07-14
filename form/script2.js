"use strict";

document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // prevent form from submitting normally

    // Clear previous error messages
    clearErrors();

    //collecting all values from the FormData
    const form = event.target;
    const formData = new FormData(form);

    //retrive form values
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const gender = formData.get("gender");

    const address = `${formData.get("plot")},${formData.get(
      "city"
    )},${formData.get("state")},${
      formData.get("country").split("-")[0]
    },${formData.get("pin")}`;
    const email = formData.get("email");
    const mobileNumber = formData.get("mobileNumber");
    const age = formData.get("age");
    const dob = formData.get("dob");
    const clubs = formData.getAll("clubs");

    const validation = [
      {
        regex: /^[a-zA-Z+$]/,
        value: firstName,
        fieldId: "firstName",
      },
      {
        regex: /^[a-zA-Z+$]/,
        value: lastName,
        fieldId: "lastName",
      },
      {
        regex: /^(Male|Female|Other)$/,
        value: gender,
        fieldId: "gender",
      },
      {
        regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        value: email,
        fieldId: "email",
      },
      // {
      //   regex: /^\+91[0-9]{10}$/,
      //   value: mobileNumber,
      //   fieldId: "mobileNumber",
      // },

      {
        regex: /^(?:[5-9]|[1-9][0-9])$/,
        value: age,
        fieldId: "age",
      },
      // {
      //   regex: /^(0[1-9]|1\d|2\d|3[01])-(0[1-9]|1[0-2])-\d{4}$/,
      //   value: dob,
      //   fieldId: "dob",
      // },
    ];
    let hasError = false;
    validation.forEach(function (validateData) {
      if (
        validateField(
          validateData.regex,
          validateData.value,
          validateData.fieldId
        )
      ) {
        hasError = true;
      }
    });

    if (hasError) return;

    const userData = {
      firstName,
      lastName,
      gender,
      address,
      email,
      mobileNumber,
      age,
      dob,
      clubs,
    };

    // retreiving exxisting data from local storage
    const storedData = localStorage.getItem("userData");
    let data1;

    if (storedData) {
      data1 = JSON.parse(storedData);
    } else {
      data1 = [];
    }
    console.log(data1);
    //add new form data to the array
    data1.push(userData);

    localStorage.setItem("userData", JSON.stringify(data1));

    // Render form data in table
    const table = document.getElementById("table");
    const row = table.insertRow(-1);
    const cells = Object.values(userData);
    for (let i = 0; i < cells.length; i++) {
      const cell = row.insertCell(i);
      cell.innerHTML = cells[i];
    }

    //Reset the form
    document.getElementById("contactForm").reset();
  });

function validateField(regex, value, fieldId) {
  const errorCheck = regex.test(value);
  if (!errorCheck) {
    document.getElementById(
      `${fieldId}Error`
    ).textContent = `Please Enter Correct ${fieldId}`;
  }
  return !errorCheck;
}

function clearErrors() {
  const errorElements = document.getElementsByClassName("error");
  for (let i = 0; i < errorElements.length; i++) {
    errorElements[i].textContent = "";
  }
}
