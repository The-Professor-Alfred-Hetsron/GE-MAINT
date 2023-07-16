import NavBar from '../../../components/UIElements/NavBar'
import Header from '../../../components/UIElements/Header'


export default function RootLayout(
    { 
        children,
        params 
    }: {
        children: React.ReactNode,
        params: { username: string }
    }
){
    const userType = "Responsable"
    return (
        <div className="w-screen h-screen bg-stone-50 flex justify-center items-center">
            <div className="w-full h-full flex overflow-auto justify-center items-center">
                <NavBar username={params.username}/>
                <div className='w-full h-full flex flex-col pl-4 pr-2.5 py-2.5 bg-stone-50 justify-start items-center gap-4'>
                <Header username={params.username} role={userType}/>
                    <div className='w-full h-full flex justify-center items-center'>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}