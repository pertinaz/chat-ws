/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway()
export class WebsocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('websocketGateway');

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): void {
    this.logger.log(`Received message: ${payload}`);
    this.server.emit('message', payload);
  }

  afterInit(server: Server){
    this.logger.log('Websocket server initialized');
  }

  handleConnection(client: Socket, ...args: any[]) {
      this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
      this.logger.log(`Cliente disconnected: ${client.id}`)
  }

}
