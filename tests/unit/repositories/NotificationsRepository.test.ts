/* eslint-disable @typescript-eslint/no-explicit-any */
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Notification } from '../../../src/models';
import { NotificationsRepository } from '../../../src/repositories/NotificationsRepository';

import {
  mockCreateNotificationDTO,
  mockNotificationDocument,
  mockUpdateNotificationDTO,
} from '../../mocks/notificationMocks';

vi.mock('../../../src/models', () => ({
  Notification: {
    find: vi.fn(),
    findOne: vi.fn(),
    create: vi.fn(),
    findOneAndUpdate: vi.fn(),
    findOneAndDelete: vi.fn(),
  },
}));

describe('NotificationsRepository', () => {
  let notificationsRepository: NotificationsRepository;

  beforeEach(() => {
    vi.clearAllMocks();
    notificationsRepository = new NotificationsRepository();
  });

  it('should retrieve all notifications in descending order', async () => {
    (Notification.find as any).mockReturnValueOnce({
      sort: vi
        .fn()
        .mockResolvedValueOnce([
          { ...mockNotificationDocument, _id: 'other' },
          mockNotificationDocument,
        ]),
    });

    const result = await notificationsRepository.findAll('desc');
    expect(Notification.find).toHaveBeenCalled();

    expect(result).toEqual([
      { ...mockNotificationDocument, _id: 'other' },
      mockNotificationDocument,
    ]);
  });

  it('should retrieve all notifications in ascending order', async () => {
    (Notification.find as any).mockReturnValueOnce({
      sort: vi
        .fn()
        .mockResolvedValueOnce([
          mockNotificationDocument,
          { ...mockNotificationDocument, _id: 'other' },
        ]),
    });

    const result = await notificationsRepository.findAll('asc');
    expect(Notification.find).toHaveBeenCalled();

    expect(result).toEqual([
      mockNotificationDocument,
      { ...mockNotificationDocument, _id: 'other' },
    ]);
  });

  it('should retrieve all notifications by patient in descending order', async () => {
    (Notification.find as any).mockReturnValueOnce({
      sort: vi
        .fn()
        .mockResolvedValueOnce([
          { ...mockNotificationDocument, _id: 'other' },
          mockNotificationDocument,
        ]),
    });

    const result = await notificationsRepository.findAllByPatient(
      'patient123',
      'desc'
    );
    expect(Notification.find).toHaveBeenCalledWith({ patient: 'patient123' });

    expect(result).toEqual([
      { ...mockNotificationDocument, _id: 'other' },
      mockNotificationDocument,
    ]);
  });

  it('should retrieve all notifications by patient in ascending order', async () => {
    (Notification.find as any).mockReturnValueOnce({
      sort: vi
        .fn()
        .mockResolvedValueOnce([
          mockNotificationDocument,
          { ...mockNotificationDocument, _id: 'other' },
        ]),
    });

    const result = await notificationsRepository.findAllByPatient(
      'patient123',
      'asc'
    );
    expect(Notification.find).toHaveBeenCalledWith({ patient: 'patient123' });

    expect(result).toEqual([
      mockNotificationDocument,
      { ...mockNotificationDocument, _id: 'other' },
    ]);
  });

  it('should find a notification by filter', async () => {
    (Notification.findOne as any).mockResolvedValueOnce(
      mockNotificationDocument
    );

    const result = await notificationsRepository.find({
      _id: mockNotificationDocument._id,
    });

    expect(Notification.findOne).toHaveBeenCalledWith({
      _id: mockNotificationDocument._id,
    });
    expect(result).toEqual(mockNotificationDocument);
  });

  it('should create a new notification', async () => {
    (Notification.create as any).mockResolvedValueOnce(
      mockNotificationDocument
    );

    const result = await notificationsRepository.create(
      mockCreateNotificationDTO
    );

    expect(Notification.create).toHaveBeenCalledWith(mockCreateNotificationDTO);
    expect(result).toEqual(mockNotificationDocument);
  });

  it('should update an existing notification', async () => {
    (Notification.findOneAndUpdate as any).mockResolvedValueOnce(
      mockNotificationDocument
    );

    const result = await notificationsRepository.update(
      { _id: mockNotificationDocument._id },
      mockUpdateNotificationDTO
    );

    expect(Notification.findOneAndUpdate).toHaveBeenCalledWith(
      { _id: mockNotificationDocument._id },
      mockUpdateNotificationDTO,
      { new: true }
    );

    expect(result).toEqual(mockNotificationDocument);
  });

  it('should delete a notification by filter', async () => {
    (Notification.findOneAndDelete as any).mockResolvedValueOnce(undefined);
    await notificationsRepository.delete({ _id: mockNotificationDocument._id });

    expect(Notification.findOneAndDelete).toHaveBeenCalledWith({
      _id: mockNotificationDocument._id,
    });
  });
});
