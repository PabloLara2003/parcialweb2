import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EvaluacionEntity } from './evaluacion.entity';
import { ProyectoEntity } from '../proyecto/proyecto.entity';
import { ProfesorEntity } from '../profesor/profesor.entity';
import { EvaluacionService } from './evaluacion.service';
import { EvaluacionController } from './evaluacion.controller';

@Module({
  imports: [TypeOrmModule.forFeature([EvaluacionEntity, ProyectoEntity, ProfesorEntity])],
  providers: [EvaluacionService],
  controllers: [EvaluacionController],
})
export class EvaluacionModule {}
