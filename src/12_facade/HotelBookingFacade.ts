import { inject } from "inversify";

import { IHotelBookingFacade, ICreditCard, IRoomService, RoomStatusEnum, INotificationService, IPaymentService } from "./types";

import { INotificationServiceToken, IPaymentServiceToken, IRoomServiceToken } from "./diTokens";


export class HotelBookingFacade implements IHotelBookingFacade {
    constructor(
        @inject(IRoomServiceToken) private readonly roomService: IRoomService,
        @inject(INotificationServiceToken) private readonly notificationService: INotificationService,
        @inject(IPaymentServiceToken) private readonly paymentService: IPaymentService,
    ) { }

    public reserve(email: string, roomId: number): boolean {
        const isRoomAvailable = this.roomService.checkAvailability(roomId);

        if (isRoomAvailable !== RoomStatusEnum.AVAILABLE) {
            const message = `Room ${roomId} is not available`;

            this.notificationService.send(email, message);

            return false;
        }

        const reserved = this.roomService.reserve(email, roomId);

        if (reserved) {
            const message = `Room ${roomId} has been reserved for you`;

            this.notificationService.send(email, message);
        }

        return reserved;
    }

    public cancel(email: string, roomId: number): boolean {
        const isRoomAvailable = this.roomService.checkAvailability(roomId);

        if (isRoomAvailable === RoomStatusEnum.AVAILABLE) {
            const message = `Room ${roomId} is not reserved`;

            this.notificationService.send(email, message);

            return true;
        }

        const canceled = this.roomService.cancel(email, roomId);

        if (canceled) {
            const message = `Room ${roomId} reservation has been canceled`;

            this.notificationService.send(email, message);
        }

        return canceled;
    }

    public async book(email: string, roomId: number, card: ICreditCard): Promise<boolean> {
        this.reserve(email, roomId);

        const isBooked = this.roomService.book(email, roomId, card);

        if (!isBooked) {
            this.notificationService.send(email, `Booking room ${roomId} failed`);
            return false;
        }

        const isPayed = await this.paymentService.pay(card, roomId.toString(), 100);

        if (!isPayed) {
            const message = `Payment for room ${roomId} has failed`;

            this.notificationService.send(email, message);

            return false;
        } else {
            const message = `Payment for room ${roomId} has been done`;

            this.notificationService.send(email, message);

            return true;
        }
    }
}