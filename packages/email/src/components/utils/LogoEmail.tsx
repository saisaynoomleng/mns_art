import { Section, Img } from 'react-email';
import { LOGO_URL } from '../../lib/utils';

export const LogoEmail = () => {
  return (
    <Section className="mobile:px-6 px-[40px] pt-[40px] pb-[24px]">
      <Img
        src={LOGO_URL}
        alt="MNS Art Logo"
        width={100}
        height={100}
        className="block mx-auto"
      />
    </Section>
  );
};
