import TokenButton from '../components/TokenButton';

export default function Navbar() {
    return (
        <nav className='absolute top-0 h-20 w-full grid place-items-center'>
            <div className='flex items-center justify-between w-11/12'>
                <TokenButton />
                <></>
            </div>
        </nav>
    );
}
