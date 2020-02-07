import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Router, RoutesRecognized } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-group-chat',
  templateUrl: './group-chat.component.html',
  styleUrls: ['./group-chat.component.css']
})

export class GroupChatComponent implements OnInit {
  public username: String = '';
  public chatForm: FormGroup;
  constructor(public socket: Socket, public fb: FormBuilder,public router: Router, private chatService: ChatService) { }

  ngOnInit() {
    const name = (JSON.parse(localStorage.getItem('currentUser'))).name;
    this.username = name;
    this.chatForm = this.fb.group({
      from: [''],
      message: ['']
    });
    this.chatService.init(this.username);
    this.chatService.pushMessage('Admin','Chat Here');
    this.router.events.subscribe((e: any) => {
      if(e instanceof RoutesRecognized)
      {
        this.chatService.disconnect(this.username);
      }
    });
  }

  public get message()
  {
    return this.chatForm.controls.message;
  }

  onSubmit()
  {
    var x = {from: this.username,message:this.chatForm.get('message').value};
    this.chatForm = this.fb.group({
      from: [''],
      message: ['']
    });
    this.chatService.sendMessage(x);
  }
}
