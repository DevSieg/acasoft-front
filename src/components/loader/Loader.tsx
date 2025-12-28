export const Loader = () => {
    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-10 z-50 flex flex-col items-center justify-center space-y-4">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
            <p className="text-white text-sm animate-pulse">Cargando...</p>
        </div>
    );
}