import { PAYMENT_MESSAGES } from "./constants";

import { IPaymentResult } from "./IPaymentResult";

export const handleServiceError = (error: unknown): IPaymentResult => ({
    success: false,
    message: (error as Error).message ?? PAYMENT_MESSAGES.FAILED,
});
