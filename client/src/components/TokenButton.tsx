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
                <Button className='whitespace-nowrap'>Get Token</Button>
            </div>
        </form>
    );
}
