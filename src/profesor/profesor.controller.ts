import { Controller, Post, Param, Body } from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { ProfesorEntity } from './profesor.entity';

@Controller('profesores')
export class ProfesorController {
  constructor(private readonly profesorService: ProfesorService) {}

  @Post()
  async crearProfesor(@Body() data: Partial<ProfesorEntity>) {
    return await this.profesorService.crearProfesor(data);
  }

  @Post(':id/asignar-evaluador')
  async asignarEvaluador(@Param('id') id: number) {
    return await this.profesorService.asignarEvaluador(id);
  }
}
