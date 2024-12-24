import { BusFactory } from './busFactory';

import { TrainFactory } from './trainFactory';

import { TransportDetails, TransportFactory } from './transportFactory';

const factories: Array<[TransportFactory, TransportDetails]> = [
  [new BusFactory(), { seatsCount: 10 } as TransportDetails],
  [new TrainFactory(), { carriages: 2, seatsPerCarriage: 10 } as TransportDetails],
];

factories.forEach(([factory, details]) => {
  const transport = factory.createTransport(details);

  console.log(transport.getSeatsInfo());

  const result = transport.bookSeat({ seatId: 'seat-1' });
  console.log('Booking result:', result);

  const secondResult = transport.bookSeat({ seatId: 'seat-1' });
  console.log('Second booking attempt:', secondResult);
});
