const ButtonSpinner = () => {
    return (
        <div
            className='animate-spin duration-500 inline-block w-5 h-5 border-[3px] border-current border-t-transparent text-primary-foreground rounded-full'
            role='status'
            aria-label='loading'
        >
            <span className='sr-only'>Loading...</span>
        </div>
    );
};

export default ButtonSpinner;
