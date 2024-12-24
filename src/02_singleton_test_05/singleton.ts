export class Singleton {
    private static instance: Singleton;

    private static isInitializing: Promise<Singleton> | null = null;

    private constructor() { }

    public static async getInstance(): Promise<Singleton> {
        if (!this.instance) {
            if (!this.isInitializing) {
                const isInitializing: Promise<Singleton> = new Promise((resolve) => {
                    const instance: Singleton = new Singleton();
                    resolve(instance);
                })

                this.isInitializing = isInitializing;
            }

            this.instance = await this.isInitializing;

            this.isInitializing = null;
        }

        return this.instance;
    }
}
