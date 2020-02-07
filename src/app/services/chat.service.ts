import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public messages: any[] = [];
  public firstTime: boolean = true;
  constructor(public socket: Socket) { }

  init(username)
  {
    this.messages = [];
    this.socket.connect();
    this.socket.emit('username',username);
    if(this.firstTime)
    {
      this.socket.on('is_online',(m)=>{
        this.messages.push(m);
      })
      this.socket.on('chat_message',(m)=>{
        this.messages.push(m);
      })
      this.firstTime = false;
    }
  }

  pushMessage(from,message)
  {
    this.messages.push({from,message});
  }

  disconnect(username)
  {
    this.messages = [];
    this.socket.disconnect(username)
  }

  sendMessage(x)
  {
    this.socket.emit('chat_message',x)
  }
}
