type EventName =
  | "JoinRoom"
  | "CreateRoom"
  | "Disconect"
  | "PlayerJoin"
  | "GetSuggeredQuestions"
  | "GetEnemyQuestions"
  | "PlayerReady"
  | "GameResult";

type EventResult = "failed" | "success";

type WhoKnowMoreEvent = {
  eventName: EventName;
  eventResult: EventResult;
  data: Record<string, unknown>;
};

export default WhoKnowMoreEvent;
