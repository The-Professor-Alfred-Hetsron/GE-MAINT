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
        <div className="w-screen h-screen bg-stone-50 flex justify-center items-center overflow-auto">
            <NavBar username={decodeURI(params.username)}/>
            <div className='w-[calc(100%-320px)] h-full fixed top-0 right-0 flex flex-col gap-2 p-2 bg-stone-50 justify-start items-center overflow-y-auto'>
                <Header username={decodeURI(params.username)} role={userType}/>
                {children}
            </div>
        </div>
    )
}