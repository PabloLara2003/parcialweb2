import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfesorEntity } from './profesor.entity';
import { EvaluacionEntity } from '../evaluacion/evaluacion.entity';

@Injectable()
export class ProfesorService {
  constructor(
    @InjectRepository(ProfesorEntity)
    private readonly profesorRepo: Repository<ProfesorEntity>,
    @InjectRepository(EvaluacionEntity)
    private readonly evaluacionRepo: Repository<EvaluacionEntity>,
  ) {}

  async crearProfesor(data: Partial<ProfesorEntity>): Promise<ProfesorEntity> {
    if (!data.extension || !/^\d{5}$/.test(data.extension.toString())) {
      throw new Error('La extensión debe tener exactamente 5 dígitos');
    }
    const nuevo = this.profesorRepo.create(data);
    return await this.profesorRepo.save(nuevo);
  }

  async asignarEvaluador(profesorId: number): Promise<void> {
    const evaluaciones = await this.evaluacionRepo.find({ where: { profesor: { id: profesorId } } });
    if (evaluaciones.length >= 3) {
      throw new Error('El profesor ya tiene 3 o más evaluaciones activas');
    }

    const profesor = await this.profesorRepo.findOne({ where: { id: profesorId } });
    if (!profesor) throw new Error('Profesor no encontrado');

    profesor.esParEvaluador = true;
    await this.profesorRepo.save(profesor);
  }
}
