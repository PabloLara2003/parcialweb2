import { Controller, Post, Body } from '@nestjs/common';
import { EvaluacionService } from './evaluacion.service';
import { EvaluacionEntity } from './evaluacion.entity';

@Controller('evaluaciones')
export class EvaluacionController {
  constructor(private readonly evaluacionService: EvaluacionService) {}

  @Post()
  async crearEvaluacion(@Body() data: Partial<EvaluacionEntity>) {
    return await this.evaluacionService.crearEvaluacion(data);
  }
}
