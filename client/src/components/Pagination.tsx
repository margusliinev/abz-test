import { useGetUsersQuery } from '@/features/api/apiSlice';
import { Avatar, AvatarFallback, AvatarImage } from './ui';

export default function Pagination() {
    const { data } = useGetUsersQuery({ page: 1, count: 6 });
    return (
        <section className='bg-gray-100 pt-20 pb-20 px-20'>
            <div className='flex justify-between mb-10'>
                <h1 className='text-xl font-medium'>Users Pagination</h1>
                <p>Total Users: {data?.total_users}</p>
            </div>
            <div className='grid grid-cols-3 gap-4'>
                {data?.users.map((user) => {
                    return (
                        <article key={user.id} className='bg-white shadow-md rounded-lg w-full h-fit p-4'>
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
                                <p className='capitalize text-xs flex items-center justify-between gap-4'>
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
        </section>
    );
}
