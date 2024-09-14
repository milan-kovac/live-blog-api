import { Logger } from '@nestjs/common';
import { WebSocketGateway, SubscribeMessage, OnGatewayInit, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Post } from './interfaces/post.interface';

@WebSocketGateway()
export class PostsGateway implements OnGatewayInit {
  @WebSocketServer()
  private server: Server;

  afterInit(server: Server) {
    this.server = server;
  }

  @SubscribeMessage('posts-upsert')
  handleSubscription(client: Socket): void {
    Logger.debug(`Client ${client.id} subscribed.`);
    client.join('posts-upsert');
  }

  @SubscribeMessage('post-updated')
  handlePostSubscription(client: Socket, postId: string): void {
    Logger.debug(`Client ${client.id} subscribed to post ${postId}.`);
    client.join(`post-updated-${postId}`);
  }

  broadcastNewPost(post: Post): void {
    this.server.to('posts-upsert').emit('created', post);
  }

  broadcastPostUpdate(post: Post): void {
    this.server.to(`post-updated-${post.id}`).emit('updated', post);
    this.server.to('posts-upsert').emit('updated', post);
  }
}
