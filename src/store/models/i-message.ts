
export interface IDraftMessage {

  title?: string
  body?: string
}

export interface IMessage extends IDraftMessage {
  id: string
}
