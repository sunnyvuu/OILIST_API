class Cache {
    constructor(ttl = 604800000) {
        this.data = {};
        this.ttl = ttl;
    }
    get(key) {
        const item = this.data[key];
        if (!item) {
            return undefined;
        }
        if (Date.now() > item.expiry) {
            delete this.data[key];
            return undefined;
        }
        return item.value;
    }
    set(key, value) {
        const expiry = Date.now() + this.ttl;
        this.data[key] = { value, expiry };
    }
    has(key) {
        const item = this.data[key];
        return item !== undefined && Date.now() <= item.expiry;
    }
}
export const cache = new Cache();
