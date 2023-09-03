import { Button } from '../components/ui';
import { setAuthToken } from '../features/auth/authSlice';
import { useAppDispatch } from '../hooks';
import { useToast } from '../components/ui';

type TokenResponse = {
    success: boolean;
    token: string;
};

export default function TokenButton() {
    const dispatch = useAppDispatch();
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        const res = (await fetch('/api/v1/token').then((res) => res.json())) as TokenResponse;
        if (res.success) {
            dispatch(setAuthToken(res.token));
            toast({
                title: 'Token acquired',
                description: 'You can now add a new user',
            });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='flex items-center gap-4'>
                <Button>Get Token</Button>
                <p className='flex items-center gap-2'>
                    <span>
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
                    </span>
                    You need a token to add a new user
                </p>
            </div>
        </form>
    );
}
