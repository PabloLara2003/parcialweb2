import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EvaluacionService } from './evaluacion.service';
import { EvaluacionEntity } from './evaluacion.entity';
import { ProyectoEntity } from '../proyecto/proyecto.entity';
import { ProfesorEntity } from '../profesor/profesor.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';

describe('EvaluacionService', () => {
  let service: EvaluacionService;
  let evaluacionRepo: Repository<EvaluacionEntity>;
  let proyectoRepo: Repository<ProyectoEntity>;
  let profesorRepo: Repository<ProfesorEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [EvaluacionService],
    }).compile();

    service = module.get<EvaluacionService>(EvaluacionService);
    evaluacionRepo = module.get<Repository<EvaluacionEntity>>(getRepositoryToken(EvaluacionEntity));
    proyectoRepo = module.get<Repository<ProyectoEntity>>(getRepositoryToken(ProyectoEntity));
    profesorRepo = module.get<Repository<ProfesorEntity>>(getRepositoryToken(ProfesorEntity));
  });

  it('crearEvaluacion - caso negativo evaluador igual al mentor', async () => {
    const profesor = await profesorRepo.save({
      cedula: 1,
      nombre: 'Eva',
      departamento: 'Matemáticas',
      extension: 12345,
      esParEvaluador: false,
    });

    const proyecto = await proyectoRepo.save({
      titulo: 'IA aplicada a educación',
      area: 'Ingeniería',
      presupuesto: 5000,
      notaFinal: 5,
      estado: 0,
      fechaInicio: '2024-01-01',
      fechaFin: '2024-12-31',
      mentor: profesor,
    });

    await expect(service.crearEvaluacion({
        proyecto: { id: proyecto.id } as ProyectoEntity,
        profesor: { id: profesor.id } as ProfesorEntity,
    })).rejects.toThrow('evaluador');
  });
});
