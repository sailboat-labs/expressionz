const DummyPage = () => {
  return (
    <div className="flex h-screen items-center justify-center px-4">
      <div className="mx-auto  flex h-[90vh] max-w-7xl flex-1 items-end gap-x-[160px] ">
        <div className="h-[calc(100%-160px)] flex-1 border border-red-600">
          <div className="ml-auto h-full w-[calc(100%-40px)] -translate-y-10 border border-red-500">
            <div className=" ml-auto h-full w-[calc(100%-40px)]  -translate-y-10 border border-red-400">
              <div></div>
            </div>
          </div>
        </div>
        {/* <div className="w-8 bg-yellow"></div> */}
        <div className="h-[calc(100%-160px)] flex-1 border border-green-400"></div>
      </div>
    </div>
  );
};

export default DummyPage;
