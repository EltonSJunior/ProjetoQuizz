'use client';
import withAppBar from '../components/AppBar';
import withAuth from '../components/withAuth';
import { FC } from 'react';

const Home: FC = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Bem-vindo ao Quizz App</h1>
      <p className="text-lg text-gray-700 text-center px-8">
        Este projeto é um sistema de perguntas e respostas onde você pode criar,
        ar e responder perguntas.
      </p>
    </div>
  );
};

export default withAuth(withAppBar(Home));
