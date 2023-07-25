import NavBar from '@/components/UIElements/NavBar'
import Header from '@/components/UIElements/Header'


export default function DashboardLayout(
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
                <NavBar username={decodeURI(params.username)}/>
                <div className='w-4/5 h-full flex flex-col pl-4 pr-2.5 py-2.5 bg-stone-50 justify-start items-center gap-2'>
                    <Header username={decodeURI(params.username)} role={userType}/>
                    {children}
                </div>
            </div>
        </div>
    )
}