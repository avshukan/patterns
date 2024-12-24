import { BookingDetailsPlane, BookingResult, errorMessages, Seat, SeatPlane, Transport, TransportType } from './transport';

export class Plane implements Transport {
    _transportType: TransportType = 'plane';

    _seats: SeatPlane[];

    constructor(businessSeatsCount: number, economySeatsCount: number, letters: string[]) {
        this._seats = [];

        let counter = 0;

        for (let businessSeat = 1; businessSeat <= businessSeatsCount; businessSeat++) {
            counter += 1;

            for (let letter of letters) {
                const seat: SeatPlane = {
                    transportType: 'plane',
                    id: `${counter}${letter}`,
                    isBooked: false,
                    classType: 'business'
                };

                this._seats.push(seat);
            }
        }

        for (let economySeat = 1; economySeat <= economySeatsCount; economySeat++) {
            counter += 1;

            for (let letter of letters) {
                const seat: SeatPlane = {
                    transportType: 'plane',
                    id: `${counter}${letter}`,
                    isBooked: false,
                    classType: 'economy'
                };

                this._seats.push(seat);
            }
        }
    }

    getSeatsInfo(): string[] {
        const seatsInfo = this._seats.map((s) => `Seat ID: ${s.id}, class: ${s.classType}, booked: ${s.isBooked}`);

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

    bookSeat(details: BookingDetailsPlane): BookingResult {

        const { classType, seatId } = details;

        if (seatId) {
            const seat = this.getSeat(seatId);

            if (!seat) {
                const error: BookingResult = { success: false, error: errorMessages.SeatNotFound };

                return error;
            }

            if (seat.isBooked) {
                const error: BookingResult = { success: false, error: errorMessages.SeatAlreadyBooked };

                return error;
            }

            seat.isBooked = true;

            const success: BookingResult = { success: true, seat };

            return success;
        }

        console.log('classType', classType);

        const availableSeats = !classType
            ? this.getAvailableSeats()
            : this.getAvailableSeats().filter((seat) => (seat as SeatPlane).classType === classType);

        console.log('availableSeats', availableSeats);

        if (availableSeats.length === 0) {
            const error: BookingResult = { success: false, error: errorMessages.AllSeatsBooked };

            return error;
        }

        const seatForBooking = availableSeats[0];

        const success: BookingResult = { success: true, seat: seatForBooking };

        return success;
    }
}
