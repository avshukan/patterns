import { Transport, Seat, BookingDetails, BookingResult } from './transport';

export interface TrainDetails {
    carriages: number;
    seatsPerCarriage: number;
}

export class Train implements Transport {
    private seats: Seat[] = [];

    constructor(details: TrainDetails) {
        const { carriages, seatsPerCarriage } = details;

        for (let carriage = 1; carriage <= carriages; carriage++) {
            for (let seat = 1; seat <= seatsPerCarriage; seat++) {
                this.seats.push({ id: `carriage-${carriage}-seat-${seat}`, isBooked: false });
            }
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
