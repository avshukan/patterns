// import { container } from "./diConfig";

import { container } from "./diConfig";

import { IHotelBookingFacadeToken } from "./diTokens";

import { ICreditCard, IHotelBookingFacade } from "./types";


const hotel: IHotelBookingFacade = container.get(IHotelBookingFacadeToken);


// Данные для бронирования
const email = "user@example.com";

const roomId = 3;

const creditCard: ICreditCard = {
    number: "1234-5678-9876-5432",
    name: "John Doe",
    expiry: "12/26",
    cvc: "123",
};


// Тестируем бронирование
hotel.book(email, roomId, creditCard).then((success) => {
    if (success) {
        console.log("✅ Бронирование успешно!");
    }
    else {
        console.log("❌ Бронирование не удалось.");
    }
});