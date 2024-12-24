const transportType = {
    Bus: 'bus',
    Train: 'train',
    Plane: 'plane',
} as const;

export type TransportType = typeof transportType[keyof typeof transportType];

export interface SeatBase {
    transportType: TransportType;
    id: string;
    isBooked: boolean;
}

export interface SeatBus extends SeatBase {
}

export interface SeatTrain extends SeatBase {
    carriageId: number;
}

export interface SeatPlane extends SeatBase {
    classType: 'economy' | 'business';
}

export type Seat = SeatBus | SeatTrain | SeatPlane;

export interface BookingDetailsBus { }

export interface BookingDetailsTrain {
    carriageId?: number;
    seatId?: string;
}

export interface BookingDetailsPlane {
    classType?: 'economy' | 'business';
    seatId?: string;
}

export type BookingDetails = BookingDetailsBus | BookingDetailsTrain | BookingDetailsPlane;

export const errorMessages = {
    SeatAlreadyBooked: 'Seat already booked',
    SeatNotFound: 'Seat not found',
    AllSeatsBooked: 'All seats are booked already',
};

export type ErrorMessage = typeof errorMessages[keyof typeof errorMessages];

interface BookingResultBase {
    success: boolean;
}

interface BookingResultSuccess extends BookingResultBase {
    success: true;
    seat: Seat;
}

interface BookingResultError extends BookingResultBase {
    success: false;
    error: ErrorMessage;
}

export type BookingResult = BookingResultSuccess | BookingResultError;

export interface Transport {
    _transportType: TransportType;

    _seats: Seat[],

    getSeatsInfo(): string[];

    getSeat(seatId: string): Seat | null;

    getAvailableSeats(): Seat[];

    bookSeat(details: BookingDetails): BookingResult;
}


// function bookSeat(transportType: string, details: BookingDetails): BookingResult;
// Входные данные (details):

// Тип транспорта (автобус, поезд, самолёт).
// Номер места, вагон или класс.
// Результат (BookingResult):

// Успешно: { success: true, seat: "12A" }.
// Ошибка: { success: false, error: "Seat already booked" }.