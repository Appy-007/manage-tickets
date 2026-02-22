import TicketDetails from "@/components/TicketDetails";

export default async function TicketDetailsPage({params}:{params:Promise<{id:string}>}){
    const {id}= await params
    console.log("id",id)
    return (
        <>
            <TicketDetails id={id}/>
        </>
    )
    
}