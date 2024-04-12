import { WIZARDS_FILTER_TRAITS } from "@/data/wizards-filter-traits";
import FilterTraits from "../moonbirds/filter_traits";

const WizardsFilterTraits = () => {
  return (
    <FilterTraits collection="wizards" filterTraits={WIZARDS_FILTER_TRAITS} />
  );
};

export default WizardsFilterTraits;
