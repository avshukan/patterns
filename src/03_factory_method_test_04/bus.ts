import { BookingDetailsBus, BookingResult, Seat, SeatBus, Transport, TransportType } from './transport';

export class Bus implements Transport {
    _transportType: TransportType = 'bus';

    _seats: SeatBus[];

    constructor(seatsCount: number) {
        console.log('Creating bus with', seatsCount);

        this._seats = [];

        for (let seatId = 1; seatId <= seatsCount; seatId++) {
            const seat: SeatBus = {
                transportType: 'bus',
                id: `seat-${seatId}`,
                isBooked: false
            };

            this._seats.push(seat);

            console.log('Bus created with', seatsCount, 'seats', this._seats);
        }
    }

    getSeatsInfo(): string[] {
        const seatsInfo = this._seats.map((s) => `Seat ID: ${s.id}, booked: ${s.isBooked}`);

        return seatsInfo;
    }

    getSeat(seatId: string): Seat | null {
        const seat = this._seats.find((s) => s.id === seatId);

        return seat ?? null;
    }

    getAvailableSeats(): Seat[] {
        const availableSeats = this._seats.filter((s) => !s.isBooked);

        return availableSeats;
    }

    bookSeat(details: BookingDetailsBus): BookingResult {
        const availableSeats = this.getAvailableSeats();

        if (availableSeats.length === 0) {
            const error: BookingResult = { success: false, error: "All seats are booked already" };
            return error;
        }

        const seatForBooking = availableSeats[0];

        seatForBooking.isBooked = true;

        const success: BookingResult = { success: true, seat: seatForBooking };

        return success;
    }
}
