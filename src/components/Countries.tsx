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
    <>
      {countriesData.isLoading && (<div>Loading data...</div>)}

      {countriesData.error !== undefined && (<div>{countriesData.error}</div>)}

      {!countriesData.isLoading && countriesData.error === undefined && (
      <div>
        <div>
          <form>
            <label htmlFor="sort">
              Sorting order:
              <select onChange={(e) => handleSortAndFilter(countries, setCountries, e.currentTarget.value as SortOrder)} id="sort" defaultValue="sort-order">
                <option value="sort-order" disabled>Select sorting order:</option>
                <option value={SortOrder.ASC}>Ascending</option>
                <option value={SortOrder.DESC}>Descending</option>
              </select>
            </label>
            <label htmlFor="filter">
              Filter by:
              <select onChange={(e) => handleSortAndFilter(allCountries, setCountries, e.currentTarget.value as FilterTypes)} id="filter" defaultValue="filter-type">
                <option value="filter-type" disabled>Select preferred filter</option>
                <option value="">All countries</option>
                <option value={FilterTypes.BY_LITHUANIA}>Countries smaller than Lithuania</option>
                <option value={FilterTypes.BY_REGION}>Oceania region</option>
              </select>
            </label>
          </form>
        </div>

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
      )}
    </>
  );
}

export default Countries;
