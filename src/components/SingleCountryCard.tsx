interface CountryProps {
  name: string;
  flag: string;
  area: number;
  region: string;
}

function SingleCountryCard(props: CountryProps) {
  const {
    area, name, flag, region,
  } = props;

  const areaNum = new Intl.NumberFormat().format(area);

  return (
    <div className="flex items-center gap-4 py-6 border-b">
      <div>
        <img className="w-36" src={flag} alt="Country flag" />
      </div>

      <div>
        <p className="font-bold text-xl text-orange-300">{name}</p>
        <p>
          Region:
          {' '}
          <span className="text-red-500">{region}</span>
        </p>
        <p>
          Area:
          {' '}
          <span className="text-green-500">{areaNum === 'NaN' ? 'No data exists' : areaNum}</span>
          {' '}
          &#13218;
        </p>
      </div>
    </div>
  );
}

export default SingleCountryCard;
