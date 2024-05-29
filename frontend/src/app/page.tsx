import { FC } from 'react';

const Home: FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl text-black font-bold mb-4">Bem-vindo ao Quizz App</h1>
      <p className="text-xl text-black text-center mb-8">
        Este projeto é um sistema de perguntas e respostas onde você pode criar, listar e responder perguntas.
      </p>
    </div>
  );
}

export default Home;
