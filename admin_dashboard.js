document.addEventListener('DOMContentLoaded', function() {
    fetch('get_admin_dashboard.php')
    .then(response => response.json())
    .then(data => {
        const dashboard = document.getElementById('admin_dashboard');
        dashboard.innerHTML = `
            <p>Total Parking Spaces: ${data.totalParkingSpaces}</p>
            <p>Total Available Spaces: ${data.totalAvailableSpaces}</p>
            <p>Total Closed Spaces: ${data.totalClosedSpaces}</p>
        `;
    })
    .catch(error => console.error('Error:', error));
});

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.sidebar-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = btn.getAttribute('href');
        });
    });
});
