import { SortDefinition } from '@/ui/data/sort/types/SortDefinition';
import {
  IconBuildingSkyscraper,
  IconCalendarEvent,
  IconLink,
  IconMap,
  IconUsers,
} from '@/ui/display/icon/index';

export const companyTableSortDefinitions: SortDefinition[] = [
  {
    fieldId: 'name',
    label: 'Name',
    Icon: IconBuildingSkyscraper,
  },
  {
    fieldId: 'employees',
    label: 'Employees',
    Icon: IconUsers,
  },
  {
    fieldId: 'domainName',
    label: 'Url',
    Icon: IconLink,
  },
  {
    fieldId: 'address',
    label: 'Address',
    Icon: IconMap,
  },
  {
    fieldId: 'createdAt',
    label: 'Creation',
    Icon: IconCalendarEvent,
  },
];
