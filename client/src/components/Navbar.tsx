import TokenButton from '../components/TokenButton';

export default function Navbar() {
    return (
        <nav className='absolute top-0 h-20 w-full grid place-items-center'>
            <div className='flex items-center justify-center w-11/12'>
                <div className='flex items-center gap-6'>
                    <span className='hidden lg:flex items-center gap-2 '>
                        You need a token to add a new user
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.5'
                            stroke='currentColor'
                            className='w-5 h-5'
                        >
                            <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75' />
                        </svg>
                    </span>
                    <TokenButton />
                    <span className='hidden lg:flex items-center gap-2'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.5'
                            stroke='currentColor'
                            className='w-5 h-5'
                        >
                            <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75' />
                        </svg>
                        Token can only be used for 1 request
                    </span>
                </div>
            </div>
        </nav>
    );
}
