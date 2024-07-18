document.getElementById('dataForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const data = document.getElementById('userData').value;

    fetch('/api/data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data })
    })
    .then(response => response.json())
    .then(result => {
        console.log(result);
        alert('Data submitted successfully!');
    })
    .catch(error => console.error('Error:', error));
});
