import { MdOutlineSettings } from 'react-icons/md';
import { StructureResolver } from 'sanity/structure';

export const structure: StructureResolver = (S) =>
  S.list()
    .title('MNS Art')
    .items([
      S.divider().title('Operations'),
      S.documentTypeListItem('siteSetting')
        .title('Site Setting')
        .icon(MdOutlineSettings),
    ]);
