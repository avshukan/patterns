export interface Seat {
    id: string;
    isBooked: boolean;
}

export interface BookingDetails {
    seatId: string;
}

export interface BookingResult {
    success: boolean;
    seat?: Seat;
    error?: string;
}

export interface Transport {
    getSeatsInfo(): string[];
    bookSeat(details: BookingDetails): BookingResult;
}
