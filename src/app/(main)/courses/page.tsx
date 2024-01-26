'use client';
import React, { Suspense } from 'react';
import Container from '../core/Container';
import { Program } from '@/app/(admin)/admin/programs/modal/program';
import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Skeleton,
} from '@nextui-org/react';
import { Faculties } from '@/app/(admin)/admin/programs/modal/faculty';
import { programRepository } from '@/app/(admin)/admin/programs/repository';
import { useQueryState } from 'nuqs';

export default function CoursesPage() {
  return (
    <Container>
      <h1 className='text-2xl font-semibold text-default-900'>Courses</h1>
      <Filter />
      <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-10'>
        <Suspense fallback={<Loader />}>
          <CourseList />
        </Suspense>
      </section>
    </Container>
  );
}

function Filter() {
  const [faculty, setFaculty] = useQueryState('faculty');
  return (
    <nav className=''>
      <ul className='flex gap-3 mt-5'>
        {Faculties.map((faculty) => (
          <li key={faculty.code}>
            <button
              className='text-default-500 hover:text-default-900'
              onClick={() => setFaculty(faculty.code)}
            >
              {faculty.tag}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function CourseList() {
  const [faculty] = useQueryState('faculty');
  const [programs, setPrograms] = React.useState<Program[]>([]);

  React.useEffect(() => {
    const filter = faculty ? { field: 'faculty', value: faculty } : undefined;
    programRepository
      .getAll(50, filter)
      .then((programs) => setPrograms(programs));
  }, [faculty]);

  return programs.map((program) => (
    <CourseCard key={program.id} program={program} />
  ));
}

function CourseCard({ program }: { program: Program }) {
  return (
    <Card className='bg-default-100 border border-transparent'>
      <CardHeader className='flex gap-3'>
        <div className='flex flex-col text-start'>
          <p className='text-md'>{program.name}</p>
          <p className='text-tiny text-default-500'>
            {Faculties.find((it) => it.code === program.faculty)?.name}
          </p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className='text-small'>
        <p>Make beautiful websites regardless of your design experience.</p>
      </CardBody>
    </Card>
  );
}

function Loader() {
  return Array.from({ length: 4 }).map((_, i) => (
    <Skeleton key={i} className='w-full h-36 rounded-lg' />
  ));
}