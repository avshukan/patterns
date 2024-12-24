import { BookingDetailsTrain, BookingResult, errorMessages, Seat, SeatTrain, Transport, TransportType } from './transport';

export class Train implements Transport {
    _transportType: TransportType = 'train';

    _seats: SeatTrain[];

    constructor(carriageCount: number, carriageCapacity: number) {
        console.log('Creating train with', carriageCount, 'carriages and', carriageCapacity, 'seats per carriage');
        this._seats = [];

        for (let carriage = 1; carriage <= carriageCount; carriage++) {
            console.log('Creating carriage', carriage);
            for (let seatId = 1; seatId <= carriageCapacity; seatId++) {
                console.log('Creating seat', seatId);
                const seat: SeatTrain = {
                    transportType: 'train',
                    id: `${seatId}`,
                    isBooked: false,
                    carriageId: carriage
                };

                console.log('Adding seat', seatId, 'to carriage', carriage);

                this._seats.push(seat);
            }
        }
    }

    getSeatsInfo(): string[] {
        const seatsInfo = this._seats.map((s) => `Seat ID: ${s.id}, carriage ID: ${s.carriageId}, booked: ${s.isBooked}`);

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

    bookSeat(details: BookingDetailsTrain): BookingResult {
        const availableSeats = this.getAvailableSeats() as SeatTrain[];

        if (availableSeats.length === 0) {
            const error: BookingResult = { success: false, error: "All seats are booked already" };
            return error;
        }

        const { carriageId, seatId } = details;

        const seatByCarriage = !carriageId ? availableSeats : availableSeats.filter((s) => s.carriageId === carriageId);

        if (seatId) {
            const seat = seatByCarriage.find((s) => s.id === seatId);

            if (seat) {
                seat.isBooked = true;

                const success: BookingResult = { success: true, seat };

                return success;
            }

            const error: BookingResult = { success: false, error: errorMessages.SeatAlreadyBooked };

            return error;
        }

        if (seatByCarriage.length === 0) {
            const error: BookingResult = { success: false, error: errorMessages.SeatAlreadyBooked };

            return error;
        }

        const seatForBooking = seatByCarriage[0];

        seatForBooking.isBooked = true;

        const success: BookingResult = { success: true, seat: seatForBooking };

        return success;
    }
}
