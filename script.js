document.addEventListener('DOMContentLoaded', () => {

    const subscribeForm = document.getElementById('subscribeForm');
    const modal = document.getElementById('successModal');
    const closeModalBtn = document.getElementById('closeModalBtn');

    if (subscribeForm && modal && closeModalBtn) {
        subscribeForm.addEventListener('submit', function(event) {
            event.preventDefault(); 
            modal.classList.remove('hidden');
            subscribeForm.reset();
        });

        closeModalBtn.addEventListener('click', function() {
            modal.classList.add('hidden');
        });

        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.classList.add('hidden');
            }
        });
    }

    const admissionForm = document.getElementById('admissionForm');
    
    if (admissionForm) {
        admissionForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Stop reload immediately

            const formData = Object.fromEntries(new FormData(e.target));

            try {
                const response = await fetch('http://localhost:3000/api/apply', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        name: formData.name, 
                        email: formData.email 
                    })
                });

                const data = await response.json();

                if (response.ok) {
                    alert('Application Submitted Successfully!');
                    e.target.reset();
                } else {
                    alert('Error: ' + data.message);
                }
            } catch (error) {
                console.error('Submission Error:', error);
                alert('Could not connect to the server.');
            }
        });
    }

    const contactFormEl = document.getElementById('contactForm');

    if (contactFormEl) {
        contactFormEl.addEventListener('submit', async (e) => {
            e.preventDefault(); // Stop reload immediately

            const formData = Object.fromEntries(new FormData(e.target));

            try {
                const response = await fetch('http://localhost:3000/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();

                if (response.ok) {
                    alert('Message sent successfully!');
                    e.target.reset(); // Safely resets only this form
                } else {
                    alert('Server Error: ' + result.message);
                }
            } catch (error) {
                console.error('Submission error:', error);
                alert('Failed to connect to backend server. Make sure it is running on port 3000.');
            }
        });
    }
});