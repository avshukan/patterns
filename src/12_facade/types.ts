export interface IHotelConfig {
    email: string;
    roomsCount: number;
    paymentAccount: string;
}

export const RoomStatusEnum = {
    AVAILABLE: 'AVAILABLE',
    RESERVED: 'RESERVED',
    BOOKED: 'BOOKED',
} as const;

export type RoomStatusType = keyof typeof RoomStatusEnum;

export interface IRoom {
    id: number;
    status: RoomStatusType;
    holder?: string;
}

export interface ICreditCard {
    number: string;
    name: string;
    expiry: string;
    cvc: string;
}

export interface IRoomService {
    getCount(): number;
    checkAvailability(roomId: number): RoomStatusType;
    reserve(email: string, roomId: number): boolean;
    book(email: string, roomId: number, card: ICreditCard): boolean;
    cancel(email: string, roomId: number): boolean;
    pay(roomId: number, card: ICreditCard): boolean;
}

export interface IPaymentService {
    pay(sender: ICreditCard, reciever: string, amount: number): Promise<boolean>;
}

export interface INotificationService {
    send(reciever: string, message: string): boolean;
}

export interface IHotelBookingFacade {
    reserve(email: string, roomId: number): boolean;
    book(email: string, roomId: number, card: ICreditCard): Promise<boolean>;
    cancel(email: string, roomId: number): boolean;
}
