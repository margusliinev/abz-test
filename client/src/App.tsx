import Navbar from './components/Navbar';
import RegisterForm from './components/RegisterForm';
import Pagination from './components/Pagination';

function App() {
    return (
        <>
            <Navbar />
            <main className='h-screen grid place-items-center'>
                <div className='grid 2xl:flex 2xl:justify-between'>
                    <RegisterForm />
                    <Pagination />
                </div>
            </main>
        </>
    );
}

export default App;
