import "reflect-metadata";

import { Container } from "inversify";

import {
    IHotelBookingFacade,
    INotificationService,
    IPaymentService,
    IRoomService,
} from "./types";

import {
    IHotelBookingFacadeToken,
    INotificationServiceToken,
    IPaymentServiceToken,
    IRoomServiceToken,
} from "./diTokens";

import { HotelBookingFacade } from "./HotelBookingFacade";

import { RoomService } from "./RoomService";

import { NotificationService } from "./NotificationService";

import { PaymentService } from "./PaymentService";


export const container = new Container();

// Указываем количество комнат и платежный аккаунт
const roomsCount = 10;

const paymentAccount = "hotel-main-account";

container.bind<IRoomService>(IRoomServiceToken).toDynamicValue(() => new RoomService(roomsCount));

container.bind<INotificationService>(INotificationServiceToken).to(NotificationService);

container.bind<IPaymentService>(IPaymentServiceToken).toDynamicValue(() => new PaymentService(paymentAccount));

container.bind<IHotelBookingFacade>(IHotelBookingFacadeToken).to(HotelBookingFacade);
