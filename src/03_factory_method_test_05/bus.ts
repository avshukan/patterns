import { Transport, Seat, BookingDetails, BookingResult } from './transport';

export interface BusDetails {
    seatsCount: number;
}

export class Bus implements Transport {
    private seats: Seat[] = [];

    constructor(details: BusDetails) {
        const { seatsCount } = details;

        for (let i = 1; i <= seatsCount; i++) {
            this.seats.push({ id: `seat-${i}`, isBooked: false });
        }
    }

    getSeatsInfo(): string[] {
        return this.seats.map(seat => `Seat ${seat.id}: ${seat.isBooked ? 'Booked' : 'Available'}`);
    }

    bookSeat(details: BookingDetails): BookingResult {
        const seat = this.seats.find(s => s.id === details.seatId);
        if (!seat) {
            return { success: false, error: 'Seat not found' };
        }
        if (seat.isBooked) {
            return { success: false, error: 'Seat already booked' };
        }
        seat.isBooked = true;
        return { success: true, seat };
    }
}
