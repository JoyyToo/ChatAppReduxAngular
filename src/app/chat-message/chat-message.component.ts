import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../message/message.model';

@Component({
  selector: 'chat-message',
  templateUrl: './chat-message.component.html',
})
export class ChatMessageComponent implements OnInit {
  @Input() message: Message;
  incoming: boolean;

  constructor() { }

  ngOnInit(): void {
    this.incoming = !this.message.author.isClient;
  }

}
