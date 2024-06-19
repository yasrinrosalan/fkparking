document.addEventListener('DOMContentLoaded', () => {
    const filterForm = document.getElementById('viewFilterForm');
    const availableSpacesDiv = document.getElementById('availableSpaces');
    const ParkingForm = document.getElementById('createParkingForm');
    const confirmationDiv = document.getElementById('confirmation');
    const ParkInfo = document.getElementById('parking-info');
    const ParkingListDiv = document.getElementById('ParkList');
    const parkingUl = document.getElementById('parkings');

    let pendingParking = {};

    filterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const date = document.getElementById('date').value;
        const location = document.getElementById('location').value;

        // Fetch available spaces based on filter criteria
        // Replace the following line with an actual fetch call
        const availableSpaces = fetchAvailableSpaces(date, location);
        displayAvailableSpaces(availableSpaces);
    });

    ParkingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const spaceId = document.getElementById('spaceId').value;
        const studentId = document.getElementById('studentId').value;
        const date = document.getElementById('parkingDate').value;
        const time = document.getElementById('time').value;

        pendingParking = { spaceId, studentId, date, time };

        ParkInfo.innerText = `Space ID: ${spaceId}, Student ID: ${studentId}, Date: ${date}, Time: ${time}`;
        confirmationDiv.style.display = 'block';
    });

    document.getElementById('confirmParkingBtn').addEventListener('click', () => {
        // Handle booking confirmation
        confirmParking(pendingParking);
        confirmationDiv.style.display = 'none';
    });

    document.getElementById('cancelParkingBtn').addEventListener('click', () => {
        confirmationDiv.style.display = 'none';
    });

    function fetchAvailableSpaces(date, location) {
        // Simulated data
        return [
            { id: 1, location: 'north', available: true },
            { id: 2, location: 'south', available: true },
            { id: 3, location: 'south', available: false },
            // More spaces...
        ].filter(space => space.location === location && space.available);
    }

    function displayAvailableSpaces(spaces) {
        availableSpacesDiv.innerHTML = '';
        spaces.forEach(space => {
            const spaceDiv = document.createElement('div');
            spaceDiv.innerText = `Space ID: ${space.id}`;
            availableSpacesDiv.appendChild(spaceDiv);
        });
    }

    function confirmParking(parking) {
        // Save the booking
        // Generate a QR code (simplified for this example)
        parking.qrCode = 'QR_CODE_' + parking.spaceId + '_' + parking.studentId + '_' + parking.date + '_' + parking.time;

        // ajax to store booking data
        $.ajax({
            url: "ajax/store_parking_spaces.php",
            type: "POST",
            data: {qrcode: parking.qrCode, spaceId: parking.spaceId, studentId: parking.studentId, date: parking.date, time: parking.time},
            cache: false,
            // contentType: "application/json",
            dataType: "json",
            success: function(data){
                if(data.success==true){
                    alert("Data successfully saved.");
                    // Update bookings list
                    addParkingToList(parking);
                }else{
                    alert("Error!");
                }
            }
        });
    }

    function addParkingToList(parking) {
        const li = document.createElement('li');
        li.innerText = `Space ID: ${parking.spaceId}, Date: ${parking.date}, Time: ${parking.time}, QR Code: ${parking.qrCode}`;
        li.dataset.parkingId = parking.spaceId; // Simplified booking ID
        li.appendChild(createParkingActions(parking));
        parkingUl.appendChild(li);
    }

    function createParkingActions(parking) {
        const actionsDiv = document.createElement('div');
        const updateBtn = document.createElement('button');
        updateBtn.innerText = 'Update';
        updateBtn.addEventListener('click', () => updateParking(parking));

        const cancelBtn = document.createElement('button');
        cancelBtn.innerText = 'Cancel';
        cancelBtn.addEventListener('click', () => cancelParking(parking));

        actionsDiv.appendChild(updateBtn);
        actionsDiv.appendChild(cancelBtn);

        return actionsDiv;
    }

    function updateParking(parking) {
        // Populate the booking form with existing booking details for editing
        document.getElementById('spaceId').value = parking.spaceId;
        document.getElementById('studentId').value = parking.studentId;
        document.getElementById('parkingDate').value = parking.date;
        document.getElementById('time').value = parking.time;

        pendingParking = parking;
    }

    function cancelParking(parking) {
        // Remove booking from the list
        const parkingLi = document.querySelector(`li[data-parking-id="${parking.spaceId}"]`);
        if (parkingLi) {
            parkingLi.remove();
        }

        // Perform any additional cancellation logic such as updating backend
    }

    // Initial load of bookings
    function loadParking() {
        $.ajax({
            url: "ajax/load_parking_spaces.php",
            type: "POST",
            cache: false,
            // contentType: "application/json",
            dataType: "json",
            success: function(data){
                if(data.success==true){
                    const parking = data.parking_spaces;
                    parking.forEach(parking => addParkingToList(parking));
                }else{
                    alert("Error!");
                }
            }
        });
    }

    loadParking();
});