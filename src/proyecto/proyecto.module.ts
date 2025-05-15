import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProyectoEntity } from './proyecto.entity';
import { EstudianteEntity } from '../estudiante/estudiante.entity';
import { ProyectoService } from './proyecto.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProyectoEntity, EstudianteEntity])],
  providers: [ProyectoService],
  exports: [ProyectoService],
})
export class ProyectoModule {}
