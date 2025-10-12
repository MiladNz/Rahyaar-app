import TourCard from "./TourCard";

function TourList({ tours }) {
  return (
    <div className="w-full flex flex-col mt-10 lg:max-w-screen-xl mx-auto">
      <h2 className="text-xl font-medium md:text-2xl lg:text-3xl pr-4 ">
        {/* {hasFilters ? (
          <span>نتایج جستجو {titleParts.length > 0 && searchTitle}</span>
        ) : (
          "همه تورها"
        )} */}
        همه تورها
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 my-4 ">
        {tours.length > 0 ? (
          tours.map((tour) => <TourCard key={tour.id} tour={tour} />)
        ) : (
          <p className="text-center col-span-full text-gray-500 mt-4 md:text-2xl">
            هیچ توری یافت نشد.
          </p>
        )}
      </div>
    </div>
  );
}

export default TourList;
