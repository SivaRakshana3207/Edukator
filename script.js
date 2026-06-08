const form = document.getElementById('subscribeForm');
const modal = document.getElementById('successModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const emailInput = document.getElementById('emailInput');

form.addEventListener('submit', function(event) {
    event.preventDefault(); 

    modal.classList.remove('hidden');
    form.reset();

});

closeModalBtn.addEventListener('click', function() {
    modal.classList.add('hidden');
});

modal.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.classList.add('hidden');
    }
});

document.getElementById('admissionForm').addEventListener('submit', async (e) => {
    e.preventDefault();
        
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    try {

        const response = await fetch('http://localhost:3000/api/apply', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Application Submitted Successfully!');
            document.getElementById('admissionForm').reset();
        } else {
            alert('Error: ' + data.message);
        }
    } catch (error) {
        console.error('Submission Error:', error);
        alert('Could not connect to the server.');
    }
});
