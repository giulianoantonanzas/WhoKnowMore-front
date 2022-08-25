type EventName =
  | "JoinRoom"
  | "CreateRoom"
  | "Disconect"
  | "PlayerJoin"
  | "GetSuggeredQuestions"
  | "PlayerReady";

type EventResult = "failed" | "success";

class WhoKnowMoreEvent {
  eventName: EventName;
  eventResult: EventResult;
  data: Record<string, unknown>;
  constructor(option: {
    eventName: EventName;
    eventResult: EventResult;
    data: Record<string, unknown>;
  }) {
    this.eventName = option.eventName;
    this.eventResult = option.eventResult;
    this.data = option.data;
  }
}

export default WhoKnowMoreEvent;
