
export interface IDraftMessage {

  title?: string
  body?: string
  transactionHash?: string
}

export interface IMessage extends IDraftMessage {
  id: string
}
