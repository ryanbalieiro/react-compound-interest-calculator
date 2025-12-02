export default function Divider({ className = "" } : { className?: string }) {
    return (
        <div className={`flex w-full justify-center items-center ${className}`}>
            <hr className={`bg-primary flex-grow max-w-[80px] md:max-w-[100px] h-[4px] opacity-100 border-0`}/>
        </div>
    );
}