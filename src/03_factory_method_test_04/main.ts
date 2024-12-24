import { busFactory } from "./busFactory";
import { planeFactory } from "./plainFactory";
import { trainFactory } from "./trainFactory";
import { BookingDetails, Transport } from "./transport";
import { TransportFactory } from "./transportFactory";

const factoryDetails: {
  [key: string]: () => any;
} = {
  'bus': () => ({ seatsCount: 6 }),
  'train': () => ({ carriageCount: 2, carriageCapacity: 4 }),
  'plane': () => ({ businessSeatsCount: 2, economySeatsCount: 4, letters: ['A', 'B', 'C', 'D'] }),
};

const bookingDetails: {
  [key: string]: () => BookingDetails;
} = {
  'bus': () => ({ seatId: 'seat-3' }),
  'train': () => ({ carriadge: 1, seatId: '2' }),
  'plane': () => ({ classType: 'econonmy', seatId: '1A' }),
};

const randomFactor = Math.floor(Math.random() * 3);

const factory: TransportFactory<Transport> = randomFactor === 0
  ? new busFactory()
  : randomFactor === 1
    ? new trainFactory()
    : new planeFactory();

const type = factory.getTransportType();

console.log('type', type);

const fd = factoryDetails[type]();

console.log('fd', fd);

const transport = factory.createTransport(fd);

console.log(transport.getSeatsInfo());

const bd = bookingDetails[type]();

console.log('bd', bd);

const seat = transport.bookSeat(bd);

console.log(seat);

console.log(transport.getSeatsInfo());

const seat2 = transport.bookSeat(bd);

console.log(seat2);

console.log(transport.getSeatsInfo());





