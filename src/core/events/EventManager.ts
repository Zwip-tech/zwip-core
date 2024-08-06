import { ClientEvents } from "discord.js";
import { ZwipEventEmitter } from "./ZwipEventEmitter";
import { ZwipEvents } from "./ZwipEvents";

type EventCallback<Event extends keyof ClientEvents> = {
  event: Event;
  callback: (...args: ClientEvents[Event]) => void;
};

export class EventManager {
  public readonly botEvents: Map<string, Array<EventCallback<keyof ClientEvents>>>;
  public readonly zwipEventsEmitter: ZwipEventEmitter;

  constructor() {
    this.botEvents = new Map();
    this.zwipEventsEmitter = new ZwipEventEmitter();
  }

  public registerBotEvent<Event extends keyof ClientEvents>(event: Event, callback: (...args: ClientEvents[Event]) => void, namespace: string) {
    const listeners = this.botEvents.get(namespace) ?? [] ;
    const eventCallback: EventCallback<Event> = { event, callback };

    listeners.push(eventCallback as unknown as EventCallback<keyof ClientEvents>);
    this.botEvents.set(namespace, listeners);
  }

  public registerZwipEvent<Event extends keyof ZwipEvents>(zwipEvent: Event, callback: (...args: ZwipEvents[Event]) => void) {
    this.zwipEventsEmitter.on(zwipEvent, callback);
  }

  public emitZwipEvent<Event extends keyof ZwipEvents>(zwipEvent: Event, ...args: ZwipEvents[Event]) {
    this.zwipEventsEmitter.emit(zwipEvent, ...args);
  }
}