
import { Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class NonDbService {

  user: any;
  currentClient: any;
  payButton: boolean = true
  adesuaChatData: any = { chatMessages: [], chatRooms: [], onlineUsers: {}, chatsContacts: [] }
  currentChatRoom: any;
  notifications: any =  { chats: {}, brNtcs: {} }

}