export class OutbrakeResponse<T> {
    data: T[]
    
    constructor(data: T[],) {
        this.data = data;

    }
}