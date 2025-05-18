import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProfesorService } from './profesor.service';
import { ProfesorEntity } from './profesor.entity';
import { EvaluacionEntity } from '../evaluacion/evaluacion.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';

describe('ProfesorService', () => {
  let service: ProfesorService;
  let profesorRepo: Repository<ProfesorEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ProfesorService],
    }).compile();

    service = module.get<ProfesorService>(ProfesorService);
    profesorRepo = module.get<Repository<ProfesorEntity>>(getRepositoryToken(ProfesorEntity));
  });

  it('crearProfesor - caso positivo', async () => {
    const profesor = await service.crearProfesor({
      cedula: 123,
      nombre: 'Ana',
      departamento: 'Sistemas',
      extension: 12345,
      esParEvaluador: false,
    });
    expect(profesor).toBeDefined();
  });

  it('crearProfesor - caso negativo por extensión', async () => {
    await expect(service.crearProfesor({
      cedula: 456,
      nombre: 'Carlos',
      departamento: 'Arte',
      extension: 1234,
    })).rejects.toThrow('extensión');
  });
});
