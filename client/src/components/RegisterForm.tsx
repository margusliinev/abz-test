import { Input, Label, Select, SelectValue, SelectTrigger, SelectContent, SelectItem, Button } from '../components/ui';
import { useToast } from '../components/ui';
import { Position, UserErrorResponse } from '@/types';
import { useEffect, useRef } from 'react';
import { useGetPositionsQuery, useCreateUserMutation } from '@/features/api/apiSlice';
import { setAuthToken } from '@/features/auth/authSlice';
import { useAppSelector, useAppDispatch } from '@/hooks';
import ButtonSpinner from './ButtonSpinner';

export default function RegisterForm() {
    const nameRef = useRef<HTMLParagraphElement>(null);
    const emailRef = useRef<HTMLParagraphElement>(null);
    const phoneRef = useRef<HTMLParagraphElement>(null);
    const positionRef = useRef<HTMLParagraphElement>(null);
    const photoRef = useRef<HTMLParagraphElement>(null);
    const { toast } = useToast();
    const { token } = useAppSelector((state) => state.auth);
    const { data } = useGetPositionsQuery(undefined);
    const [mutate, { isLoading, isError, error }] = useCreateUserMutation();
    const dispatch = useAppDispatch();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        await mutate(formData)
            .unwrap()
            .then((res) => {
                if (res.success) {
                    toast({
                        title: 'Created a new user',
                    });
                }
            })
            .catch((err: UserErrorResponse) => {
                console.log(err);
                if (err.data.message === 'The token is missing.' || err.data.message === 'The token is invalid.') {
                    toast({
                        title: 'Failed to create user',
                        description: err.data.message,
                        variant: 'destructive',
                    });
                }
            });
        dispatch(setAuthToken(null));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const nextElementSibling = e.target.nextElementSibling as HTMLParagraphElement;
        nextElementSibling.textContent = '';
    };

    const handleChange2 = () => {
        if (positionRef.current) {
            positionRef.current.textContent = '';
        }
    };

    useEffect(() => {
        if (nameRef.current && emailRef.current && phoneRef.current && positionRef.current && photoRef.current) {
            nameRef.current.textContent = (error as UserErrorResponse)?.data?.fails?.name ?? '';
            emailRef.current.textContent = (error as UserErrorResponse)?.data?.fails?.email ?? '';
            phoneRef.current.textContent = (error as UserErrorResponse)?.data?.fails?.phone ?? '';
            positionRef.current.textContent = (error as UserErrorResponse)?.data?.fails?.position_id ?? '';
            photoRef.current.textContent = (error as UserErrorResponse)?.data?.fails?.photo ?? '';
        }
    }, [isError, error]);

    return (
        <section className='bg-gray-100 grid place-items-center pt-20 pb-20'>
            <form className='w-full max-w-sm bg-white p-6 rounded-md border shadow-md grid gap-3' onSubmit={handleSubmit}>
                <div className='flex items-center justify-between mb-2'>
                    <h1 className='font-semibold text-lg'>Add new user</h1>
                    <span className='flex items-center gap-2'>
                        Token:{' '}
                        {token ? (
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth='1.5'
                                stroke='currentColor'
                                className='w-6 h-6 text-green-500'
                            >
                                <path strokeLinecap='round' strokeLinejoin='round' d='M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                            </svg>
                        ) : (
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth='1.5'
                                stroke='currentColor'
                                className='w-6 h-6 text-red-500'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                                />
                            </svg>
                        )}
                    </span>
                </div>
                <div className='grid gap-3'>
                    <Label htmlFor='name'>Name</Label>
                    <Input type='text' id='name' name='name' onChange={handleChange}></Input>
                    <p ref={nameRef} className='text-destructive text-sm' id='name-error'></p>
                </div>
                <div className='grid gap-3'>
                    <Label htmlFor='email'>Email</Label>
                    <Input type='email' id='email' name='email' onChange={handleChange}></Input>
                    <p ref={emailRef} className='text-destructive text-sm' id='email-error'></p>
                </div>
                <div className='grid gap-3'>
                    <Label htmlFor='phone'>Phone</Label>
                    <Input type='text' id='phone' name='phone' onChange={handleChange}></Input>
                    <p ref={phoneRef} className='text-destructive text-sm' id='phone-error'></p>
                </div>
                <div className='grid gap-3'>
                    <Label htmlFor='position_id'>Position ID</Label>
                    <Select name='position_id' onValueChange={handleChange2}>
                        <SelectTrigger>
                            <SelectValue placeholder='Select a position ID' />
                        </SelectTrigger>
                        <SelectContent>
                            {data?.positions.map((position: Position) => {
                                return (
                                    <SelectItem value={`${position.id}`} key={position.id}>
                                        {position.id}
                                    </SelectItem>
                                );
                            })}
                        </SelectContent>
                    </Select>
                    <p ref={positionRef} className='text-destructive text-sm' id='position-error'></p>
                </div>
                <div className='grid gap-3'>
                    <Label htmlFor='photo'>Photo</Label>
                    <Input type='file' id='photo' name='photo' onChange={handleChange}></Input>
                    <p ref={photoRef} className='text-destructive text-sm' id='photo-error'></p>
                </div>
                <Button type='submit' size={'sm'} className='mt-4'>
                    {isLoading ? <ButtonSpinner /> : 'Register'}
                </Button>
            </form>
        </section>
    );
}
