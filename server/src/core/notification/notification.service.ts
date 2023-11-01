import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class NotificationService {
  constructor(private readonly prismaService: PrismaService) {}

  // Find
  findFirst = this.prismaService.client.notification.findFirst;
  findFirstOrThrow = this.prismaService.client.notification.findFirstOrThrow;

  findUnique = this.prismaService.client.notification.findUnique;
  findUniqueOrThrow = this.prismaService.client.notification.findUniqueOrThrow;

  findMany = this.prismaService.client.notification.findMany;

  // Create
  create = this.prismaService.client.notification.create;
  createMany = this.prismaService.client.notification.createMany;

  // Update
  update = this.prismaService.client.notification.update;
  upsert = this.prismaService.client.notification.upsert;
  updateMany = this.prismaService.client.notification.updateMany;

  // Delete
  delete = this.prismaService.client.notification.delete;
  deleteMany = this.prismaService.client.notification.deleteMany;

  // Aggregate
  aggregate = this.prismaService.client.notification.aggregate;

  // Count
  count = this.prismaService.client.notification.count;

  // GroupBy
  groupBy = this.prismaService.client.notification.groupBy;
}
