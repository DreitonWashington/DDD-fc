import EventDispatcher from "../event/@shared/eventDispatcher";
import CustomerAddressChangedEvent from "../event/customer/customerAddressChangedEvent";
import CustomerCreatedEvent from "../event/customer/customerCreatedEvent";
import EnviaConsoleLog1Handler from "../event/customer/handler/enviaConsoleLog1Handler";
import EnviaConsoleLog2Handler from "../event/customer/handler/enviaConsoleLog2Handler";
import EnviaConsoleLogHandler from "../event/customer/handler/enviaConsoleLogHandler";
import Address from "./address";

export default class Customer {
  private _id:string;
  private _name: string;
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints = 0;

  constructor(id:string, name:string) {
    this._id = id;
    this._name = name;
    this.validate();
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new EnviaConsoleLog1Handler();
    const eventHandler2 = new EnviaConsoleLog2Handler();
    eventDispatcher.register("CustomerCreatedEvent", eventHandler);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);
    const customerCreatedEvent = new CustomerCreatedEvent(this);
    eventDispatcher.notify(customerCreatedEvent);
  }

  validate() {
    if(this._id.length === 0) {
      throw new Error("Id is required");
    }
    if(this._name.length === 0) {
      throw new Error("Name is required");
    }
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  get address(): Address {
    return this._address;
  }

  changeName(name:string) {
    this._name = name;
  }

  changeAddress(address:Address) {
    this._address = address;
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new EnviaConsoleLogHandler();
    eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);
    const customerAddressChangedEvent = new CustomerAddressChangedEvent(this)
    eventDispatcher.notify(customerAddressChangedEvent);
  }

  isActive(): boolean {
    return this._active;
  }

  activate() {
    if(this._address === undefined) {
      throw new Error("Address is mandatory to activate a customer")
    }
    this._active = true;
  }

  deactive() {
    this._active = false;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }

}