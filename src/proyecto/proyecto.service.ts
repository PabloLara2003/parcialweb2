import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProyectoEntity } from './proyecto.entity';
import { EstudianteEntity } from '../estudiante/estudiante.entity';

@Injectable()
export class ProyectoService {
  constructor(
    @InjectRepository(ProyectoEntity)
    private readonly proyectoRepo: Repository<ProyectoEntity>,
    @InjectRepository(EstudianteEntity)
    private readonly estudianteRepo: Repository<EstudianteEntity>,
  ) {}

  async crearProyecto(data: Partial<ProyectoEntity>): Promise<ProyectoEntity> {
    if (!data.presupuesto || data.presupuesto <= 0) {
      throw new Error('El presupuesto debe ser mayor a 0');
    }

    if (!data.titulo || data.titulo.length <= 15) {
      throw new Error('El título debe tener más de 15 caracteres');
    }

    const nuevo = this.proyectoRepo.create(data);
    return await this.proyectoRepo.save(nuevo);
  }

  async avanzarProyecto(id: number): Promise<ProyectoEntity> {
    const proyecto = await this.proyectoRepo.findOne({ where: { id } });
    if (!proyecto) throw new Error('Proyecto no encontrado');

    if (proyecto.estado >= 4) {
      throw new Error('El proyecto ya está en el estado máximo');
    }

    proyecto.estado += 1;
    return await this.proyectoRepo.save(proyecto);
  }

  async findAllEstudiantes(idProyecto: number): Promise<EstudianteEntity[]> {
    const proyecto = await this.proyectoRepo.findOne({
      where: { id: idProyecto },
      relations: ['lider'],
    });

    if (!proyecto) throw new Error('Proyecto no encontrado');

    return [proyecto.lider];
  }
}
