import { Observation } from '../models';

import {
  CreateObservationDTO,
  ObservationFilter,
  UpdateObservationDTO,
} from '../types';

export class ObservationsRepository {
  public async findAll(order: 'asc' | 'desc') {
    const observations = await Observation.find().sort({
      updatedAt: order === 'desc' ? -1 : 1,
    });

    return observations;
  }

  public async findAllByPatient(patientId: string, order: 'asc' | 'desc') {
    const observations = await Observation.find({ patient: patientId }).sort({
      updatedAt: order === 'desc' ? -1 : 1,
    });

    return observations;
  }

  public async find(filter: ObservationFilter) {
    const observation = await Observation.findOne(filter);
    return observation;
  }

  public async create(body: CreateObservationDTO) {
    const observation = await Observation.create(body);
    return observation;
  }

  public async update(filter: ObservationFilter, body: UpdateObservationDTO) {
    const observation = await Observation.findOneAndUpdate(filter, body, {
      new: true,
    });

    return observation;
  }

  public async delete(filter: ObservationFilter) {
    await Observation.findOneAndDelete(filter);
  }
}
