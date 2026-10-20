import { PERKS } from '../../data/perks';
import PerkItem from '../ui/PerkItem';

export default function PerksBar() {
  return (
    <section className="relative z-20 mx-auto max-w-5xl px-4 md:px-6 -mt-12 sm:-mt-14">
      <div className="rounded-3xl md:rounded-full border border-[#E5E7EB] bg-white p-5 md:py-6 md:px-8 shadow-pill">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-gray-100">
          {PERKS.map((perk) => (
            <PerkItem key={perk.id} perk={perk} />
          ))}
        </div>
      </div>
    </section>
  );
}
