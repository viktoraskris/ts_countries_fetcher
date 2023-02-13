interface Response {
  area: number,
  flag: string,
  independent: boolean,
  name: string,
  region: string,
}

const OCEANIA = 'Oceania';
const LITHUANIA = 'Lithuania';
const DEFAULT_SORT_VALUE = 'sort-order';

enum FilterTypes {
  BY_REGION = 'FILTER_BY_REGION',
  BY_LITHUANIA = 'FILTER_COUNTRIES_SMALLER_THAN_LITHUANIA',
}

enum SortOrder {
  ASC = 'ASC_ORDER',
  DESC = 'DESC_ORDER',
}

const handleSortAndFilter = (
  data: Response[],
  setData: React.Dispatch<React.SetStateAction<Response[]>>,
  operation: FilterTypes | SortOrder,
) => {
  let getOceaniaRegion: Response[];
  let getLithuaniaArea: number[];
  let countriesSmallerThanLithuania: Response[];
  let descOrder: Response[];
  let ascOrder: Response[];
  const sortingOrderSelect = document.getElementById('sort') as HTMLSelectElement;

  switch (operation) {
    case FilterTypes.BY_REGION:
      getOceaniaRegion = data.filter((country) => country.region === OCEANIA);

      setData(getOceaniaRegion);

      sortingOrderSelect.value = DEFAULT_SORT_VALUE;
      break;
    case FilterTypes.BY_LITHUANIA:
      getLithuaniaArea = data.filter((country) => country.name === LITHUANIA)
        .map((lithuania) => lithuania.area);

      countriesSmallerThanLithuania = data.filter((country) => country.area <= getLithuaniaArea[0]);

      setData(countriesSmallerThanLithuania);

      sortingOrderSelect.value = DEFAULT_SORT_VALUE;
      break;
    case SortOrder.DESC:
      descOrder = data.sort((a, b) => b.name.localeCompare(a.name));

      setData([...descOrder]);

      break;
    case SortOrder.ASC:
      ascOrder = data.sort((a, b) => a.name.localeCompare(b.name));

      setData([...ascOrder]);

      break;
    default: setData(data);
      sortingOrderSelect.value = DEFAULT_SORT_VALUE;
  }
};

export default handleSortAndFilter;
