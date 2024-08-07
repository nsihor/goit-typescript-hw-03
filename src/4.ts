interface IKey {
    getSignature(): number;
}
interface IPerson {
    getKey(): Key;
}
interface IHouse {
    door: boolean;
    key: Key;
    tenants: Person[]
    comeIn(p: Person): void;
    openDoor(key: Key): void;
}

class Key implements IKey {
    private signature = Math.random();

    getSignature(): number {
        return this.signature;
    }
}

class Person implements IPerson{
    constructor(private key: Key) {}

    getKey(): Key {
        return this.key;
    }
}

abstract class House implements IHouse{
    public tenants: Person[] = [];
    public door = false;

    constructor(public key: Key) {}

    comeIn(p: Person) {
        if (this.door) {
            this.tenants.push(p)
        }
    }

    abstract openDoor(key: Key): void;
}
class MyHouse extends House {
    openDoor(key: Key) {
        if (key.getSignature() === this.key.getSignature()) {
            this.door = true;
        }
    }
}

const key = new Key();

const house = new MyHouse(key);
const person = new Person(key);

house.openDoor(person.getKey());

house.comeIn(person);

export {};