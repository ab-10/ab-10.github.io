console.log('email.js loaded');
const form = document.querySelector("#email-form");

async function sendData() {
  // Associate the FormData object with the form element
  const formData = new FormData(form);

    const response = await fetch("https://buttondown.com/api/emails/embed-subscribe/armin", {
      method: "POST",
      // Set the FormData instance as the request body
      body: formData,
    });
    console.log(await response.ok);
    var response_msg = document.createElement('p');
    if (response.ok) {
        response_msg.innerHTML = "Success: a confirmation email has been sent to your email address.";
    } else {
        response_msg.innerHTML = "Fail: there was an error in submitting the form. Please try again.";
    }

    form.parentNode.replaceChild(response_msg, form);
}

// Take over form submission
form.addEventListener("submit", (event) => {
  event.preventDefault();
  sendData();
});

