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

  return (
    <div>
      <p>{flag}</p>
      <p>{name}</p>
      <p>{area}</p>
      <p>{region}</p>
    </div>
  );
}

export default SingleCountryCard;
