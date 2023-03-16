import Entry from "../components/Entry";
const userName = "Roy";

export default function Home() {



    const entriesData = [
        {
          text: 'Entry 1',
          date: '2023-03-15',
          time: '14:00',
          entryId: 1,
        },
        {
          text: 'Entry 2',
          date: '2023-03-16',
          time: '10:00',
          entryId: 2,
        },
        // Add more entries if needed
      ];
    

    return (
        
        <div className="">
            <h1 className="text-xl font-bold ml-4 mt-2">Hi, {userName}</h1>
            <div className="flex flex-col">
                
                <Entry entries={entriesData} />
            </div>
        </div>

    )
}
