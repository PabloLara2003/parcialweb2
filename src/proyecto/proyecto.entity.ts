import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { EstudianteEntity } from '../estudiante/estudiante.entity';
import { ProfesorEntity } from '../profesor/profesor.entity';
import { EvaluacionEntity } from '../evaluacion/evaluacion.entity';

@Entity()
export class ProyectoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  area: string;

  @Column()
  presupuesto: number;

  @Column()
  notaFinal: number;

  @Column()
  estado: number;

  @Column()
  fechaInicio: string;

  @Column()
  fechaFin: string;

  @ManyToOne(() => EstudianteEntity, estudiante => estudiante.proyectos)
  lider: EstudianteEntity;

  @ManyToOne(() => ProfesorEntity, profesor => profesor.mentorias)
  mentor: ProfesorEntity;

  @OneToMany(() => EvaluacionEntity, evaluacion => evaluacion.proyecto)
  evaluaciones: EvaluacionEntity[];
}
