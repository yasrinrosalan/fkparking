document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("manageClosureForm");
    const closureTable = document.getElementById("closureTable").getElementsByTagName('tbody')[0];

    form.addEventListener("submit", function(e) {
        e.preventDefault();
        const formData = new FormData(form);

        fetch('manage_parking_area.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            console.log('Response status:', response.status);
            return response.json();
        })
        .then(data => {
            console.log('Response data:', data);
            if (data.status === "success") {
                alert("Closure created successfully!");
                form.reset();
                loadClosures();
            } else {
                alert("Error: " + data.message);
            }
        })
        .catch(error => console.error('Error:', error));
    });

    function loadClosures() {
        fetch('manage_parking_area.php', {
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => {
            closureTable.innerHTML = "";
            data.forEach(closure => {
                const row = closureTable.insertRow();
                row.insertCell(0).innerText = closure.space_id;
                row.insertCell(1).innerText = closure.start_datetime;
                row.insertCell(2).innerText = closure.end_date;
                row.insertCell(3).innerText = closure.reason;
                const actionsCell = row.insertCell(4);
                const deleteButton = document.createElement('button');
                deleteButton.innerText = "Delete";
                deleteButton.classList.add("action-btn", "cancel-btn");
                deleteButton.addEventListener('click', function() {
                    if (confirm("Are you sure you want to delete this closure?")) {
                        deleteClosure(closure.closure_id);
                    }
                });
                actionsCell.appendChild(deleteButton);
            });
        });
    }

    function deleteClosure(closure_id) {
        fetch('manage_parking_area.php', {
            method: 'DELETE',
            body: new URLSearchParams({ closure_id: closure_id })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                alert("Closure deleted successfully!");
                loadClosures();
            } else {
                alert("Error: " + data.message);
            }
        });
    }

    loadClosures();
});
