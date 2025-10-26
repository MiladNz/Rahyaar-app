import TourCard from "./TourCard";
import getFaCityName from "@/utils/getFaCityName";
import ConvertDate from "@/utils/ConvertDate";

function TourList({ tours, filters = {}, hasFilters = false }) {
  const showTitle = () => {
    if (!hasFilters) {
      return "همه تورها";
    }

    if (tours.length === 0) {
      return "نتایج جستجو";
    }

    const titleParts = [];

    if (filters.originId) {
      const originName = getFaCityName(filters.originId);
      titleParts.push(`از ${originName}`);
    }

    if (filters.destinationId) {
      const destinationName = getFaCityName(filters.destinationId);
      titleParts.push(`به ${destinationName}`);
    }

    if (filters.startDate && filters.endDate) {
      const startDate = ConvertDate(filters.startDate);
      const endDate = ConvertDate(filters.endDate);
      titleParts.push(`- ${startDate} تا ${endDate}`);
    } else if (filters.startDate) {
      const startDate = ConvertDate(filters.startDate);
      titleParts.push(`از تاریخ ${startDate}`);
    }

    return (
      <>
        نتایج جستجو{" "}
        <span className="bg-sky-100 text-primary px-2 py-1 rounded-md mr-2 text-base">
          {titleParts.join(" ")}
        </span>
      </>
    );
  };

  const title = showTitle();

  return (
    <div className="w-full flex flex-col mt-10 lg:max-w-screen-xl xl:max-w-screen-2xl mx-auto">
      <h2 className="text-xl font-medium md:text-2xl lg:text-3xl pr-4 ">
        {title}
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
