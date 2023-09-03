import Navbar from './components/Navbar';
import RegisterForm from './components/RegisterForm';
import Pagination from './components/Pagination';

function App() {
    return (
        <>
            <Navbar />
            <main className='w-screen h-screen'>
                <div className='grid grid-cols-2 h-full'>
                    <RegisterForm />
                    <Pagination />
                </div>
            </main>
        </>
    );
}

export default App;
