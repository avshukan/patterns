import { IRoom, IRoomService, RoomStatusEnum, RoomStatusType } from "./types";

export class RoomService implements IRoomService {
    private rooms: IRoom[] = [];

    constructor(private roomsCount: number) {
        for (let i = 0; i < this.roomsCount; i++) {
            this.rooms.push({
                id: i,
                status: RoomStatusEnum.AVAILABLE,
            });
        }
    }

    public getCount(): number {
        return this.roomsCount;
    }

    public checkAvailability(roomId: number): RoomStatusType {
        return this.rooms[roomId].status;
    }

    public reserve(email: string, roomId: number): boolean {
        if (this.rooms[roomId].status === RoomStatusEnum.AVAILABLE) {
            this.rooms[roomId].status = RoomStatusEnum.RESERVED;

            this.rooms[roomId].holder = email;

            return true;
        }

        return false;
    }

    public book(email: string, roomId: number): boolean {
        if (this.rooms[roomId].status === RoomStatusEnum.AVAILABLE
            || this.rooms[roomId].status === RoomStatusEnum.RESERVED
        ) {
            this.rooms[roomId].status = RoomStatusEnum.BOOKED;

            this.rooms[roomId].holder = email;

            return true;
        }

        return false;
    }

    public cancel(email: string, roomId: number): boolean {
        if (this.rooms[roomId].status === RoomStatusEnum.AVAILABLE) {
            return true;
        }

        if (this.rooms[roomId].holder !== email) {
            return false;
        }

        this.rooms[roomId].status = RoomStatusEnum.AVAILABLE;

        this.rooms[roomId].holder = undefined;

        return true;
    }

    public pay(roomId: number): boolean {
        if (this.rooms[roomId].status === RoomStatusEnum.AVAILABLE) {
            throw new Error(`Room ${roomId} is not reserved`);
        }

        if (this.rooms[roomId].status === RoomStatusEnum.BOOKED) {
            throw new Error(`Room ${roomId} is already paid`);
        }

        if (!this.rooms[roomId].holder) {
            throw new Error(`Room ${roomId} has no holder`);
        }

        this.rooms[roomId].status = RoomStatusEnum.BOOKED;

        return true;
    }

}