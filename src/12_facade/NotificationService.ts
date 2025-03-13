import { INotificationService } from "./types";

export class NotificationService implements INotificationService {
    public send(reciever: string, message: string): boolean {
        console.log(`Notification to ${reciever}: ${message}`);

        return true;
    }
}
