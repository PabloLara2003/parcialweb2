import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProyectoService } from './proyecto.service';
import { ProyectoEntity } from './proyecto.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';

describe('ProyectoService', () => {
  let service: ProyectoService;
  let proyectoRepo: Repository<ProyectoEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ProyectoService],
    }).compile();

    service = module.get<ProyectoService>(ProyectoService);
    proyectoRepo = module.get<Repository<ProyectoEntity>>(getRepositoryToken(ProyectoEntity));
  });

  it('crearProyecto - caso positivo', async () => {
    const proyecto = await service.crearProyecto({
      titulo: 'Sistema inteligente para IoT',
      area: 'Ingeniería',
      presupuesto: 100000,
      notaFinal: 4,
      estado: 0,
      fechaInicio: '2024-01-01',
      fechaFin: '2024-12-31',
    });
    expect(proyecto).toBeDefined();
  });

  it('crearProyecto - caso negativo por presupuesto', async () => {
    await expect(service.crearProyecto({
      titulo: 'Proyecto económico',
      area: 'Finanzas',
      presupuesto: -1,
      notaFinal: 4,
      estado: 0,
      fechaInicio: '2024-01-01',
      fechaFin: '2024-12-31',
    })).rejects.toThrow('presupuesto');
  });
});
