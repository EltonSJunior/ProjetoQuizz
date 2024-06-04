'use client'
import { post } from '@/api/api';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

export default function Login() {
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState(null);
    const router = useRouter();

    const onSubmit = async (data: any) => {
        try {
            const response = await post('auth/login', data);
            localStorage.setItem('token', response.data.access_token);
            router.push('/');
        } catch (err) {
            Swal.fire({
                title: 'Erro ao logar!',
                text: 'Verifique usuário e senha!',
                icon: 'error'
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full bg-white p-8 rounded shadow-md">
                <h2 className="text-2xl text-black font-bold mb-8 text-center">Login</h2>
                {error && <p className="text-red-600 mb-4">{error}</p>}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-black">Username</label>
                        <input
                            {...register('username')}
                            className=" text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-black">Password</label>
                        <input
                            {...register('password')}
                            type="password"
                            className=" text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
