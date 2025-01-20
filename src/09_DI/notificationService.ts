import "reflect-metadata";

import { injectable } from "inversify";

import { INotificationService } from "./interfaces";

@injectable()
export class NotificationService implements INotificationService {
    _notifications: string[] = [];

    sendNotification(orderId: number): void {
        const notification = `Notification sent for order #${orderId}`;

        this._notifications.push(notification);

        console.log(notification);
    }
}
