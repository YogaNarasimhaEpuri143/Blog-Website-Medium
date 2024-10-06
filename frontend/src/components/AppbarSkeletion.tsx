export const AppbarSkeleton = () => {
  return (
    <div role="status" className="animate-pulse">
      <div className="border-b flex justify-between px-10 py-4">
        <div className="flex flex-col justify-center cursor-pointer py-2.5">
          <div className="h-7 w-20 bg-gray-200 rounded"></div>
        </div>
        <div className="flex items-center h-full">
          <div className="h-10 w-16 bg-gray-200 rounded-full mr-2"></div>
          <div className="h-10 w-10 bg-gray-200 rounded-full ml-2"></div>
        </div>
      </div>
    </div>
  );
};
