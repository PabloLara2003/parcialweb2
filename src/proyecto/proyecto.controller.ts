import { Controller, Post, Patch, Get, Param, Body } from '@nestjs/common';
import { ProyectoService } from './proyecto.service';
import { ProyectoEntity } from './proyecto.entity';

@Controller('proyectos')
export class ProyectoController {
  constructor(private readonly proyectoService: ProyectoService) {}

  @Post()
  async crearProyecto(@Body() data: Partial<ProyectoEntity>) {
    return await this.proyectoService.crearProyecto(data);
  }

  @Patch(':id/avanzar')
  async avanzarProyecto(@Param('id') id: number) {
    return await this.proyectoService.avanzarProyecto(id);
  }

  @Get(':id/estudiantes')
  async findAllEstudiantes(@Param('id') id: number) {
    return await this.proyectoService.findAllEstudiantes(id);
  }
}
