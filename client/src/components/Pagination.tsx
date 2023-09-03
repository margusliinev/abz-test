import { useGetUsersQuery } from '@/features/api/apiSlice';
import { Avatar, AvatarFallback, AvatarImage } from './ui';
import PageSpinner from './PageSpinner';
import { useState } from 'react';

const initialPageState = {
    page: 1,
    count: 6,
};

export default function Pagination() {
    const [pageState, setPageState] = useState(initialPageState);
    const { data, isLoading } = useGetUsersQuery(pageState, { refetchOnMountOrArgChange: true });

    const nextPage = () => {
        let newPage = pageState.page + 1;
        if (newPage > data!.total_pages) {
            newPage = 1;
        }
        setPageState({ ...pageState, page: newPage });
    };

    const prevPage = () => {
        let newPage = pageState.page - 1;
        if (newPage < 1) {
            newPage = data!.total_pages;
        }
        setPageState({ ...pageState, page: newPage });
    };

    if (isLoading) {
        return (
            <section className='pt-20 pb-20 px-20 grid place-items-center'>
                <PageSpinner />
            </section>
        );
    }

    return (
        <section className='pt-4 pb-20 px-4 2xl:px-20 2xl:pt-20'>
            <div className='flex justify-between mb-4'>
                <h1 className='text-xl font-medium'>Users Pagination</h1>
                <div className='flex items-center gap-4'>
                    <p className='font-medium'>Total Users: {data?.total_users}</p>
                </div>
            </div>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {data?.users.map((user) => {
                    return (
                        <article key={user.id} className='bg-white shadow-md rounded-lg w-full md:w-64 h-fit p-4'>
                            <Avatar className='w-12 h-12 mb-4 rounded-full'>
                                <AvatarImage src={user.photo} />
                                <AvatarFallback className='text-2xl bg-neutral-200'>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div className='text-left'>
                                <h1 className='capitalize text-xs flex items-center justify-between gap-4'>
                                    <span className='text-sm'>Name:</span> {user.name}
                                </h1>
                                <h2 className='capitalize text-xs flex items-center justify-between gap-4'>
                                    <span className='text-sm'>Position:</span> {user.position}
                                </h2>
                                <p className='capitalize text-xs flex items-center justify-between gap-4'>
                                    <span className='text-sm'>Position ID:</span> {user.position_id}
                                </p>
                                <p className='text-xs flex items-center justify-between gap-4'>
                                    <span className='text-sm'>Email:</span> {user.email}
                                </p>
                                <p className='capitalize text-xs flex items-center justify-between gap-4'>
                                    <span className='text-sm'>Phone:</span> {user.phone}
                                </p>
                                <p className='capitalize text-xs flex items-center justify-between gap-4'>
                                    <span className='text-sm'>Reg Date:</span> {new Date(user.registration_timestamp).toLocaleString()}
                                </p>
                            </div>
                        </article>
                    );
                })}
            </div>
            <div className='relative flex items-center justify-center mt-10 gap-2'>
                <button onClick={prevPage} className='left-0 grid place-items-center text-gray-900 transition-colors w-10 h-10 rounded-md'>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='2'
                        stroke='currentColor'
                        className='w-5 h-5 text-gray-900'
                    >
                        <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                    </svg>
                </button>
                <div className='flex justify-center items-center flex-wrap gap-2'>
                    {data?.total_pages &&
                        Array.from({ length: data.total_pages }, (_, index) => {
                            const page = index + 1;

                            return (
                                <button
                                    key={index}
                                    className='bg-blue-500 text-sm text-white transition-colors hover:bg-blue-600 w-10 h-10 rounded-md disabled:bg-blue-700'
                                    disabled={page === pageState.page}
                                    onClick={() => setPageState({ ...pageState, page: page })}
                                >
                                    {page}
                                </button>
                            );
                        })}
                </div>
                <button onClick={nextPage} className='right-0 grid place-items-center text-sm transition-colors w-10 h-10 rounded-md'>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='2'
                        stroke='currentColor'
                        className='w-5 h-5 text-gray-900'
                    >
                        <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                    </svg>
                </button>
            </div>
        </section>
    );
}
