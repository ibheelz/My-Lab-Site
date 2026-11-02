const fullname = document.getElementById('author');
const email = document.getElementById('email');
const subject = document.getElementById('subject');
const message = document.getElementById('message');
const contact_us_form = document.getElementById('homeContactForm');
const selectType = document.getElementById("selectType")
// const correct_response_indicator = document.getElementById('correct_response');
// const error_response_indicator = document.getElementById('error_response');

const SubmitContactForm = (e) =>{
    e.preventDefault();
    // error_response_indicator.style.display="none";
    // correct_response_indicator.style.display="none";
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.post('https://api.web3forms.com/submit', {
    Subject: "Contact Form Questions/Inquiries",
    access_key: "41503514-4d3d-4aae-81d7-021ed04abe01",
    Select: selectType.value,
    Name: author.value,
    Email: email.value,
    Subject: subject.value,
    Message: message.value,
    
    })
    .then(response => response.status == 200 ? (console.log("success")): null)
    .catch(error => (console.log(error)));
    contact_us_form.reset();
}


    selectType.addEventListener('change', function() {
      if (this.value === "") {
        this.classList.remove('selected');
      } else {
        this.classList.add('selected');
      }
    });

    // To ensure the correct color is set on page load based on the initial selection
    window.addEventListener('DOMContentLoaded', (event) => {
      if (selectType.value !== "") {
        selectType.classList.add('selected');
      }
    });