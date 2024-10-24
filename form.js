document.getElementById('form').addEventListener('submit', function(e) {
    e.preventDefault();  // Prevent form default submission

    const formData = new FormData(this);  // Create FormData object
    const data = Object.fromEntries(formData.entries());  // Convert form data to a JSON object

    fetch('http://localhost:3000/submit-form', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)  // Send the form data as JSON
    })
    .then(response => response.text())
    .then(data => {
        alert('Form submitted successfully!');
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
