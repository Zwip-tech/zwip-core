import { ClientEvents } from "discord.js";

export class EventManager {
  public readonly botEvents: Map<string, [{ event: keyof ClientEvents, callback: (...args: ClientEvents[keyof ClientEvents]) => void}]>;
  public readonly zwipEvents: Map<string, [{ event: Event, callback: Function}]>; //TODO: Implement Zwip events

  constructor() {
    this.botEvents = new Map();
    this.zwipEvents = new Map();
  }

  public registerBotEvent(event: keyof ClientEvents, callback: (...args: ClientEvents[keyof ClientEvents]) => void, namespace: string) {
    const listeners = this.botEvents.get(namespace) ?? [] as unknown as [{ event: keyof ClientEvents, callback: (...args: ClientEvents[keyof ClientEvents]) => void}];

    listeners.push({ event, callback });
    this.botEvents.set(namespace, listeners);
  }

  public registerZwipEvent() {
    throw new Error("Feature not implemented.");
  }
}