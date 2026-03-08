//inputs
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const telInput = document.getElementById("tel");
const detailsInput = document.getElementById("details");

const stringLengthDisplay = document.getElementById("stringLength");

//error messages
const nameError = document.getElementById("nameErrorMessage");
const mailError = document.getElementById("mailErrorMessage");
const telError = document.getElementById("telErrorMessage");
const purpError = document.getElementById("purposeErrorMessage");
const detailsError = document.getElementById("detailsErrorMessage");


// let profanity = [];

// window.addEventListener("load", (event) => {
//     fetchProfanity();
// });

// async function fetchProfanity(){
//     const res = await fetch('https://vector.profanity.dev', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' }
//     })
//     if (res.ok) profanity = res.json();
//     console.log(profanity);
// }

detailsInput.addEventListener("input", (event) => {
  stringLengthDisplay.innerText = `${detailsInput.value.length}/200`;
  if(detailsInput.value.length > 200){
    stringLengthDisplay.classList.add("invalid");
  } else{
    stringLengthDisplay.classList.remove("invalid");
  }
})

function validateForm() {
//   let mail = document.forms["contactForm"]["mail"].value;
//   if (mail.search("@") < 0) {
//     alert("Invalid email format");
//     return false;
//   }
  
  let name = nameInput.value;
  //can not leave blank
  if (name.length == 0){
    nameError.innerText = "Do not leave blank";
    nameError.classList.remove("hidden");
    return false;
  } else {nameError.classList.add("hidden");}
  // must be two words
  if(name.search(" ") < 0){
    nameError.innerText = "Please write first and last name";
    nameError.classList.remove("hidden");
    return false;
  } else {nameError.classList.add("hidden");}

  let mail = emailInput.value;
  console.log(mail.search("@"));
  //can not be blank
  if (mail.length == 0){
    mailError.innerText = "Do not leave blank";
    mailError.classList.remove("hidden");
    return false;
  } else {mailError.classList.add("hidden");}
  // must be an email
  if(mail.search("@") < 0){ 
    mailError.innerText = "Must be in email format";
    mailError.classList.remove("hidden");
    return false;
  } else {mailError.classList.add("hidden");}

  let tel = telInput.value;
  // can not be blank
  if (tel.length == 0){
    telError.innerText = "Do not leave blank";
    telError.classList.remove("hidden");
    return false;
  } else {telError.classList.add("hidden");}
  // ensure input is a number
  console.log(isNaN(tel))
  if (isNaN(tel)){ 
    telError.innerText = "Input numbers only";
    telError.classList.remove("hidden");
    return false;
  } else {telError.classList.add("hidden");}
  if (tel.length < 10){
    telError.innerText = "Enter a valid phone number";
    telError.classList.remove("hidden");
    return false;
  } else {telError.classList.add("hidden");}

  let purpose = document.forms["contactForm"]["purpose"].value;
  let otherWriteIn = document.forms["contactForm"]["other-write-in"].value;
  console.log(purpose);
  // do not leave blank
  if (!purpose){
    purpError.innerText = "Select an option";
    purpError.classList.remove("hidden");
    return false;
  } else {purpError.classList.add("hidden");}
  if(purpose == 'other' && otherWriteIn.length == 0){
    purpError.innerText = 'Do not leave "other" input blank';
    purpError.classList.remove("hidden");
    return false;
  } else {purpError.classList.add("hidden");}

  let details = detailsInput.value;
  //must not be empty
  if(details.length == 0){
    detailsError.innerText = "Do not leave blank";
    detailsError.classList.remove("hidden");
    return false;
  } else {detailsError.classList.add("hidden");}
  //profanity filter
  if ((details.search("faggot")) >= 0
        || (details.search("fuck")) >= 0
        || (details.search("shit")) >= 0
        || (details.search("fag")) >= 0
        || (details.search("retard")) >= 0) { //I would add more profanity to this filter but i'm not super comfortable typing everything out.
    detailsError.innerText = "Please keep your language appropriate";
    detailsError.classList.remove("hidden");
    return false;
  } else {detailsError.classList.add("hidden");}
  //check message length
  if(details.length > 200){
    detailsError.innerText = "Message too long";
    detailsError.classList.remove("hidden");
    return false;
  } else {detailsError.classList.add("hidden");}

  
} 