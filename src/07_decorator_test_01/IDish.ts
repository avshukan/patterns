export interface IDish {
    getCost(): number;
    [key: string]: any;
}

export type EnhancedDish = IDish & {
    getSauce?: () => boolean;
    setSauce?: (state?: boolean) => void;
    getCheese?: () => boolean;
    setCheese?: (state?: boolean) => void;
};
