// Optional: Display the success message with a custom popup
document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
  
    fetch('/updateprofile', {
      method: 'POST',
      body: new FormData(e.target),
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('Profile updated successfully');
      } else {
        alert(data.message);
      }
    })
    .catch(err => {
      alert('Error updating profile');
    });
  });
  
