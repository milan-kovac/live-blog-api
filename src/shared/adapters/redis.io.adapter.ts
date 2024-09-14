import { IoAdapter } from '@nestjs/platform-socket.io';
import { createClient, RedisClientType } from 'redis';
import { createAdapter } from '@socket.io/redis-adapter';
import { Logger } from '@nestjs/common';

export class RedisIoAdapter extends IoAdapter {
  private redisClient: RedisClientType;
  private redisSubscriber: RedisClientType;

  constructor(app: any) {
    super(app);
    this.redisClient = createClient({ url: process.env.REDIS_URL });
    this.redisSubscriber = this.redisClient.duplicate();

    this.redisClient.on('connect', () => {
      Logger.debug('Redis client connected');
    });

    this.redisSubscriber.on('connect', () => {
      Logger.debug('Redis subscriber connected');
    });

    this.redisClient.on('error', (err) => {
      Logger.debug('Redis client error:', err);
    });

    this.redisSubscriber.on('error', (err) => {
      Logger.debug('Redis subscriber error:', err);
    });

    this.redisClient.connect();
    this.redisSubscriber.connect();
  }

  createIOServer(port: number, options?: any) {
    const server = super.createIOServer(port, options);
    server.adapter(createAdapter(this.redisClient, this.redisSubscriber));
    return server;
  }
}
