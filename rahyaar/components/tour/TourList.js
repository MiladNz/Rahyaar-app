import TourCard from "./TourCard";

function TourList({ tours, hasFilters = false }) {
  const showTitle = () => {
    if (!hasFilters) {
      return "همه تورها";
    }

    if (tours.length === 0) {
      return "نتایج جستجو";
    }

    return "نتایج جستجو";
  };

  const title = showTitle();

  return (
    <div className="w-full flex flex-col mt-10 lg:max-w-screen-xl  mx-auto">
      <h2 className="text-xl font-medium md:text-2xl lg:text-3xl  ">{title}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-6 my-4 ">
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
