import useFetch from '../hooks/useFetch';
import baseUrl from '../utilities/baseUrl';
import SingleCountryCard from './SingleCountryCard';

function Countries() {
  const countriesData = useFetch(baseUrl);

  return (
    <>
      {countriesData.isLoading && <div>Loading data...</div>}

      {countriesData.error !== undefined ? <div>{countriesData.error}</div> : ''}

      <div>
        {countriesData.response
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
    </>
  );
}

export default Countries;
