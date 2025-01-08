export interface IDish {
    getCost(): number;
    getDescription(): string;
    [key: string]: any;
}

export type EnhancedDish = IDish & {
    switchSauce?: (state?: boolean) => void;
    isSauceEnabled?: () => boolean;
    switchCheese?: (amount: "none" | "extra" | "double") => void;
    getCheeseAmount?: () => "none" | "extra" | "double";
};
