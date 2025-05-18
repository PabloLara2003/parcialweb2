import { Controller, Post, Delete, Param, Body } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { EstudianteEntity } from './estudiante.entity';

@Controller('estudiantes')
export class EstudianteController {
  constructor(private readonly estudianteService: EstudianteService) {}

  @Post()
  async crearEstudiante(@Body() data: Partial<EstudianteEntity>) {
    return await this.estudianteService.crearEstudiante(data);
  }

  @Delete(':id')
  async eliminarEstudiante(@Param('id') id: number) {
    return await this.estudianteService.eliminarEstudiante(id);
  }
}
