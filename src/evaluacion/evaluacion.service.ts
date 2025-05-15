import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EvaluacionEntity } from './evaluacion.entity';
import { ProyectoEntity } from '../proyecto/proyecto.entity';
import { ProfesorEntity } from '../profesor/profesor.entity';

@Injectable()
export class EvaluacionService {
  constructor(
    @InjectRepository(EvaluacionEntity)
    private readonly evaluacionRepo: Repository<EvaluacionEntity>,
    @InjectRepository(ProyectoEntity)
    private readonly proyectoRepo: Repository<ProyectoEntity>,
    @InjectRepository(ProfesorEntity)
    private readonly profesorRepo: Repository<ProfesorEntity>,
  ) {}

  async crearEvaluacion(data: Partial<EvaluacionEntity>): Promise<EvaluacionEntity> {
    const proyecto = await this.proyectoRepo.findOne({
      where: { id: data.proyecto?.id },
      relations: ['mentor'],
    });

    if (!proyecto) throw new Error('Proyecto no encontrado');

    if (proyecto.mentor.id === data.profesor?.id) {
      throw new Error('El evaluador no puede ser el mentor del proyecto');
    }

    const evaluacion = this.evaluacionRepo.create(data);
    return await this.evaluacionRepo.save(evaluacion);
  }
}
