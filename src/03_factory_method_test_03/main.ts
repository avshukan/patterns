import { processPayment } from './paymentProcessor';

const paymentMethod = 'credit_card'; // Тип платёжного метода

processPayment(paymentMethod, 100.0); // Сумма платежа
