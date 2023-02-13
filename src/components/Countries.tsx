import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import baseUrl from '../utilities/baseUrl';
import handleSortAndFilter from '../utilities/countryUtils';
import SingleCountryCard from './SingleCountryCard';

enum FilterTypes {
  BY_REGION = 'FILTER_BY_REGION',
  BY_LITHUANIA = 'FILTER_COUNTRIES_SMALLER_THAN_LITHUANIA',
}

enum SortOrder {
  ASC = 'ASC_ORDER',
  DESC = 'DESC_ORDER',
}

function Countries() {
  const countriesData = useFetch(baseUrl);
  const [countries, setCountries] = useState(countriesData.response);

  const allCountries = [...countriesData.response];

  useEffect(() => {
    setCountries([...countriesData.response]);
  }, [countriesData.response]);

  return (
    <div>
      {countriesData.isLoading && (<div className="flex justify-center items-center h-screen text-3xl text-red-600">Loading data...</div>)}

      {countriesData.error !== undefined && (<div className="flex justify-center items-center h-screen text-3xl text-red-600">{countriesData.error}</div>)}

      {!countriesData.isLoading && countriesData.error === undefined && (
      <div className="text-stone-300">
        <div>
          <form className="flex flex-col m-2 gap-8 sm:flex-row sm:justify-center sm:m-6">
            <label htmlFor="sort">
              <span className="text-yellow-500 text-lg font-semibold">Sorting order: </span>
              <select className="bg-inherit border-b-2" onChange={(e) => handleSortAndFilter(countries, setCountries, e.currentTarget.value as SortOrder)} id="sort" defaultValue="sort-order">
                <option value="sort-order" disabled>Select sorting order:</option>
                <option value={SortOrder.ASC}>Ascending</option>
                <option value={SortOrder.DESC}>Descending</option>
              </select>
            </label>
            <label htmlFor="filter">
              <span className="text-yellow-500 text-lg font-semibold">Filter by: </span>
              <select className="bg-inherit border-b-2 " onChange={(e) => handleSortAndFilter(allCountries, setCountries, e.currentTarget.value as FilterTypes)} id="filter" defaultValue="filter-type">
                <option value="filter-type" disabled>Select preferred filter</option>
                <option value="">All countries</option>
                <option value={FilterTypes.BY_LITHUANIA}>Countries smaller than Lithuania</option>
                <option value={FilterTypes.BY_REGION}>Oceania region</option>
              </select>
            </label>
          </form>
        </div>

        <div className="h-screen overflow-auto">
          <div className="grid grid-cols-1 mx-2 mb-28 sm:grid-cols-2 sm:mb-26 lg:grid-cols-3 xl:grid-cols-4 2xl:w-[1440px] 2xl:mx-auto">
            {countries
              .map((country) => (
                <SingleCountryCard
                  key={country.name}
                  name={country.name}
                  area={country.area}
                  flag={country.flag}
                  region={country.region}
                />
              ))}
          </div>
        </div>
      </div>
      )}
    </div>
  );
}

export default Countries;
