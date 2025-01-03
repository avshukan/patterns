export class ServiceC {
    public payWithToken(token: string, value: number): boolean {
        return Math.random() > 0.5; // Случайно успешный или неуспешный результат
    }
}
