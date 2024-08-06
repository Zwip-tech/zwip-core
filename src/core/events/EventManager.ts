import { ClientEvents } from "discord.js";

type EventCallback<Event extends keyof ClientEvents> = {
  event: Event;
  callback: (...args: ClientEvents[Event]) => void;
};

export class EventManager {
  public readonly botEvents: Map<string, Array<EventCallback<keyof ClientEvents>>>;
  public readonly zwipEvents: Map<string, [{ event: Event, callback: Function}]>; //TODO: Implement Zwip events

  constructor() {
    this.botEvents = new Map();
    this.zwipEvents = new Map();
  }

  public registerBotEvent<Event extends keyof ClientEvents>(event: Event, callback: (...args: ClientEvents[Event]) => void, namespace: string) {
    const listeners = this.botEvents.get(namespace) ?? [] ;
    const eventCallback: EventCallback<Event> = { event, callback };

    listeners.push(eventCallback as unknown as EventCallback<keyof ClientEvents>);
    this.botEvents.set(namespace, listeners);
  }

  public registerZwipEvent() {
    throw new Error("Feature not implemented.");
  }
}