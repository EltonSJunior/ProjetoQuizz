import Link from 'next/link';
import { FC } from 'react';

const Home: FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black-100 p-4">
      <h1 className="text-4xl font-bold mb-4">Bem-vindo ao Quizz App</h1>
      <p className="text-xl text-center mb-8">
        Este projeto é um sistema de perguntas e respostas onde você pode criar, listar e responder perguntas.
      </p>
      <div className="flex space-x-4">
        <Link href="/create" legacyBehavior>
          <a className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Criar Pergunta</a>
        </Link>
        <Link href="/list" legacyBehavior>
          <a className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700">Listar Perguntas</a>
        </Link>
        <Link href="/quizz" legacyBehavior>
          <a className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-700">Responder Quizz</a>
        </Link>
      </div>
    </div>
  );
}

export default Home;
