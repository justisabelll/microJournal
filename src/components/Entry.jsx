export default function Entry(entries) {
  return (
    <>
      <div className="p-4 bg-primary rounded-lg m-4">
        <h1 className="text-primary-content scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">What's on your mind?</h1>
        <textarea className="textarea primary-content w-full" placeholder="Type here..."/>

      </div>
      <div className="divider" />
      {entries.entries.map((entry) => {
        return (
          <div key={entry.entryId}>
            <div className="p-4 bg-primary rounded-lg m-4">
                <p className="leading-7 [&:not(:first-child)]:mt-6 text-primary-content"> 
                    {entry.text}
                </p>
            </div>
          </div>
        );
      })}
    </>
  );
}
