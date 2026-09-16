import { Progress } from '#components/ui/progress';
import { clsx, twMerge } from 'cn';
import { GoDotFill } from 'react-icons/go';

type CapabilityCardProps = {
  className?: string;
  bgColor: string;
  textColor: string;
  value: number;
  name: string;
};

export const CapabilityCard = ({
  className,
  bgColor,
  textColor,
  value,
  name,
}: CapabilityCardProps) => {
  return (
    <div
      className={twMerge(
        clsx(
          'rounded-2xl border-2 border-brand-white px-2 py-4 min-w-80 flex flex-col gap-y-1',
          className,
        ),
      )}
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <div className="flex justify-between items-center">
        <p className="font-semibold flex items-center gap-x-2">
          <span>
            <GoDotFill
              className="text-brand-neon-400 animate-pulse rounded-full"
              aria-hidden
            />
          </span>

          <span>{name}</span>
        </p>
        <p>{value}%</p>
      </div>

      <Progress
        value={value}
        aria-label={`${name}'s Progress`}
        className="bg-brand-black"
      />
    </div>
  );
};
