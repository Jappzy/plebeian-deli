import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';
import { AuthService } from 'src/app/services/auth.service';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-message-view',
  templateUrl: './message-view.component.html',
  styleUrls: ['./message-view.component.scss']
})
export class MessageViewComponent implements OnInit {
  chat$: Observable<any[]>;

  constructor(
    private route: ActivatedRoute,
    private msgs: ChatService,
    private auth: AuthService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(async params => {
      const id = params.get('id');

      this.chat$ = this.msgs.messages$.asObservable().pipe(
        map((chats: any[] = []) => {
          return chats.find(chat => chat.recipientId === id);
        })
      );
    });
  }

  async sendMessage(msgText?: string, chatId?: string, chatMsgs?: any[], el?: any) {
    const { uid } = await this.auth.getCurrentUser();

    if (!msgText || !msgText.trim() || !chatId || !uid) return;

    const newMessage = {
      content: msgText.trim(),
      timestamp: Date.now(),
      userId: uid
    };

    await this.msgs.addChatMessage(chatId, [...chatMsgs, newMessage]);

    el.value = '';
    el.blur();

    this.snackbar.open('Message Sent!', '', { duration: 2000 });
  }

}
