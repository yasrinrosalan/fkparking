document.addEventListener('DOMContentLoaded', () => {
    const filterForm = document.getElementById('viewFilterForm');
    const availableSpacesDiv = document.getElementById('availableSpaces');
    const bookingForm = document.getElementById('createBookingForm');
    const confirmationDiv = document.getElementById('confirmation');
    const bookingInfo = document.getElementById('bookingInfo');
    const bookingsListDiv = document.getElementById('bookingsList');
    const bookingsUl = document.getElementById('bookings');

    let pendingBooking = {};

    filterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const date = document.getElementById('date').value;
        const location = document.getElementById('location').value;

        // Fetch available spaces based on filter criteria
        // Replace the following line with an actual fetch call
        const availableSpaces = fetchAvailableSpaces(date, location);
        displayAvailableSpaces(availableSpaces);
    });

    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const spaceId = document.getElementById('spaceId').value;
        const studentId = document.getElementById('studentId').value;
        const date = document.getElementById('bookingDate').value;
        const time = document.getElementById('time').value;

        pendingBooking = { spaceId, studentId, date, time };

        bookingInfo.innerText = `Space ID: ${spaceId}, Student ID: ${studentId}, Date: ${date}, Time: ${time}`;
        confirmationDiv.style.display = 'block';
    });

    document.getElementById('confirmBookingBtn').addEventListener('click', () => {
        // Handle booking confirmation
        confirmBooking(pendingBooking);
        confirmationDiv.style.display = 'none';
    });

    document.getElementById('cancelBookingBtn').addEventListener('click', () => {
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

    function confirmBooking(booking) {
        // Save the booking
        // Generate a QR code (simplified for this example)
        booking.qrCode = 'QR_CODE_' + booking.spaceId + '_' + booking.studentId + '_' + booking.date + '_' + booking.time;

        // ajax to store booking data
        $.ajax({
            url: "ajax/store_booking_spaces.php",
            type: "POST",
            data: {qrcode: booking.qrCode, spaceId: booking.spaceId, studentId: booking.studentId, date: booking.date, time: booking.time},
            cache: false,
            // contentType: "application/json",
            dataType: "json",
            success: function(data){
                if(data.success==true){
                    alert("Data successfully saved.");
                    // Update bookings list
                    addBookingToList(booking);
                }else{
                    alert("Error!");
                }
            }
        });
    }

    function addBookingToList(booking) {
        const li = document.createElement('li');
        li.innerText = `Space ID: ${booking.spaceId}, Date: ${booking.date}, Time: ${booking.time}, QR Code: ${booking.qrCode}`;
        li.dataset.bookingId = booking.spaceId; // Simplified booking ID
        li.appendChild(createBookingActions(booking));
        bookingsUl.appendChild(li);
    }

    function createBookingActions(booking) {
        const actionsDiv = document.createElement('div');
        const updateBtn = document.createElement('button');
        updateBtn.innerText = 'Update';
        updateBtn.addEventListener('click', () => updateBooking(booking));

        const cancelBtn = document.createElement('button');
        cancelBtn.innerText = 'Cancel';
        cancelBtn.addEventListener('click', () => cancelBooking(booking));

        actionsDiv.appendChild(updateBtn);
        actionsDiv.appendChild(cancelBtn);

        return actionsDiv;
    }

    function updateBooking(booking) {
        // Populate the booking form with existing booking details for editing
        document.getElementById('spaceId').value = booking.spaceId;
        document.getElementById('studentId').value = booking.studentId;
        document.getElementById('bookingDate').value = booking.date;
        document.getElementById('time').value = booking.time;

        pendingBooking = booking;
    }

    function cancelBooking(booking) {
        // Remove booking from the list
        const bookingLi = document.querySelector(`li[data-booking-id="${booking.spaceId}"]`);
        if (bookingLi) {
            bookingLi.remove();
        }

        // Perform any additional cancellation logic such as updating backend
    }

    // Initial load of bookings
    function loadBookings() {
        // Simulated data
        const bookings = [
            { spaceId: 1, studentId: 'ST123', date: '2024-05-26', time: '08:00', qrCode: 'QR_CODE_1_ST123_2024-05-26_08:00' },
            // More bookings...
        ];

        bookings.forEach(booking => addBookingToList(booking));
    }

    loadBookings();
});
