import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstudianteEntity } from './estudiante.entity';
import { ProyectoEntity } from '../proyecto/proyecto.entity';

@Injectable()
export class EstudianteService {
  constructor(
    @InjectRepository(EstudianteEntity)
    private readonly estudianteRepo: Repository<EstudianteEntity>,
    @InjectRepository(ProyectoEntity)
    private readonly proyectoRepo: Repository<ProyectoEntity>,
  ) {}

  async crearEstudiante(data: Partial<EstudianteEntity>): Promise<EstudianteEntity> {
    if (!data.promedio || data.promedio <= 3.2 || !data.semestre || data.semestre < 4) {
      throw new Error('El estudiante debe tener promedio > 3.2 y estar en semestre >= 4');
    }

    const nuevo = this.estudianteRepo.create(data);
    return await this.estudianteRepo.save(nuevo);
  }

  async eliminarEstudiante(id: number): Promise<void> {
    const estudiante = await this.estudianteRepo.findOne({ where: { id } });
    if (!estudiante) throw new Error('Estudiante no encontrado');

    const proyectos = await this.proyectoRepo.find({ where: { lider: { id }, estado: 0 } });
    if (proyectos.length > 0) throw new Error('No se puede eliminar el estudiante porque tiene proyectos activos');

    await this.estudianteRepo.remove(estudiante);
  }
}
