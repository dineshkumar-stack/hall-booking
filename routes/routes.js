const rooms = [
    {
        "RoomName": 101,
        "SeatsAvailable": 50,
        "Amenities": [
          "Air Conditioner",
          "Decorated Stage",
          "Decorated Chairs",
          "Music system"
        ],
        "PricePerHour": 50000
      },

      {
        "RoomName": 102,
        "SeatsAvailable": 50,
        "Amenities": [
          "Air Conditioner",
          "Decorated Stage",
          "Decorated Chairs",
          "Music system"
        ],
        "PricePerHour": 50000
      }
];
const bookings = [
    {
        "CustomerName": "CustomerOne",
        "Date": "2023-10-02",
        "StartTime": "12:00",
        "EndTime": "20:00",
        "RoomID": 99,
        "BookingDate": "2023-10-03"
    },
    {
        "CustomerName": "CustomerTwo",
        "Date": "2023-10-02",
        "StartTime": "12:00",
        "EndTime": "20:00",
        "RoomID": 99,
        "BookingDate": "2023-10-03"
    }
];

// Create a Room
const createRoom = (req, res) => {
    const { RoomName, SeatsAvailable, Amenities, PricePerHour } = req.body;
    const room = {
        RoomName,
        SeatsAvailable,
        Amenities,
        PricePerHour,
    };

    rooms.push(room);
    res.json({ message: 'Room created' });
}

// Room book
const bookRoom = (req, res) => {
    const {
        CustomerName,
        Date,
        StartTime,
        EndTime,
        RoomID,
        BookingDate,
    } = req.body;

    const booking = {
        CustomerName,
        Date,
        StartTime,
        EndTime,
        RoomID,
        BookingID: bookings.length + 1,
        BookingDate,
        BookingStatus: 'Booked',
    };

    bookings.push(booking);
    res.json({ message: `Room booked for ${CustomerName} on  ${BookingDate}` });
}

// List all Rooms with Booked data
const listRooms = (req, res) => {
    const bookedRooms = rooms;
    rooms.forEach((room) => {
        bookings.forEach((booking) => {
            if (room.RoomName === booking.RoomID) {
                const roomInfo = {
                    RoomName: room.RoomName,
                    BookedStatus: booking.BookingStatus,
                    CustomerName: booking.CustomerName,
                    Date: booking.Date,
                    StartTime: booking.StartTime,
                    EndTime: booking.EndTime,
                };
                bookedRooms.push(roomInfo);
            }
        });
    });
    res.json(bookedRooms);
}

// List all Customers with Booked Data
const listCustomers = (req, res) => {
    const bookedCustomers = [];

    bookings.forEach((booking) => {
        const customerInfo = {
            CustomerName: booking.CustomerName,
            RoomName: booking.RoomName,
            Date: booking.Date,
            StartTime: booking.StartTime,
            EndTime: booking.EndTime
        };
        bookedCustomers.push(customerInfo);
    });
    res.json(bookedCustomers);
}

// List how many times a customer has booked the room

const customerBookingHistory = (req, res) => {
    const { customer_name } = req.params;
    const customerHistory = bookings.filter(
        (booking) => booking.CustomerName === customer_name
    );
    res.json(customerHistory);
}

export { createRoom, bookRoom, listRooms, listCustomers, customerBookingHistory };