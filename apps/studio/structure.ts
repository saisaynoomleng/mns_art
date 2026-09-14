import { BsFillSuitcaseLgFill } from 'react-icons/bs';

import {
  MdOutlineDesignServices,
  MdOutlineSettings,
  MdQuestionAnswer,
} from 'react-icons/md';
import { PiTextAlignJustifyFill } from 'react-icons/pi';
import { RiToolsFill } from 'react-icons/ri';
import { TfiSupport } from 'react-icons/tfi';
import { StructureResolver } from 'sanity/structure';

export const structure: StructureResolver = (S) =>
  S.list()
    .title('MNS Art')
    .items([
      S.divider().title('Operations'),
      S.listItem()
        .title('Site Setting')
        .icon(MdOutlineSettings)
        .child(
          S.document()
            .schemaType('siteSetting')
            .documentId('2198265d-1ded-4902-b22a-75ccc48f3361'),
        ),

      S.documentTypeListItem('service')
        .title('Services')
        .icon(MdOutlineDesignServices),
      S.documentTypeListItem('project')
        .title('Projects')
        .icon(BsFillSuitcaseLgFill),
      S.documentTypeListItem('faqs').title('FAQs').icon(MdQuestionAnswer),
      S.documentTypeListItem('capability')
        .title('Capabilities')
        .icon(RiToolsFill),
      S.documentTypeListItem('carePlan').title('Care Plans').icon(TfiSupport),

      S.divider().title('Pages'),
      S.documentTypeListItem('page')
        .title('Pages')
        .icon(PiTextAlignJustifyFill),
    ]);
