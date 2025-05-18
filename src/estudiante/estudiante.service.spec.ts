import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EstudianteService } from './estudiante.service';
import { EstudianteEntity } from './estudiante.entity';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';

describe('EstudianteService', () => {
  let service: EstudianteService;
  let repository: Repository<EstudianteEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [EstudianteService],
    }).compile();

    service = module.get<EstudianteService>(EstudianteService);
    repository = module.get<Repository<EstudianteEntity>>(getRepositoryToken(EstudianteEntity));
  });

  it('crearEstudiante - caso positivo', async () => {
    const estudiante = await service.crearEstudiante({
      cedula: 1,
      nombre: 'Juan',
      programa: 'Ingeniería',
      semestre: 5,
      promedio: 4.0,
    });
    expect(estudiante).toBeDefined();
    expect(estudiante.id).toBeGreaterThan(0);
  });

  it('crearEstudiante - caso negativo por promedio', async () => {
    await expect(service.crearEstudiante({
      cedula: 2,
      nombre: 'Luis',
      programa: 'Derecho',
      semestre: 5,
      promedio: 3.0,
    })).rejects.toThrow('promedio');
  });
});
