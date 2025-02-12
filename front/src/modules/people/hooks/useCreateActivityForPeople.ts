import { useRecoilCallback } from 'recoil';

import { useOpenCreateActivityDrawerForSelectedRowIds } from '@/activities/hooks/useOpenCreateActivityDrawerForSelectedRowIds';
import {
  ActivityTargetableEntity,
  ActivityTargetableEntityType,
} from '@/activities/types/ActivityTargetableEntity';
import { selectedRowIdsSelector } from '@/ui/data/data-table/states/selectors/selectedRowIdsSelector';
import { entityFieldsFamilyState } from '@/ui/data/field/states/entityFieldsFamilyState';
import { ActivityType, Person } from '~/generated/graphql';

export const useCreateActivityForPeople = () => {
  const openCreateActivityRightDrawer =
    useOpenCreateActivityDrawerForSelectedRowIds();

  return useRecoilCallback(
    ({ snapshot }) =>
      (type: ActivityType) => {
        const relatedEntites: ActivityTargetableEntity[] = [];
        const selectedRowIds = Object.keys(
          snapshot.getLoadable(selectedRowIdsSelector).getValue(),
        );
        for (const id of selectedRowIds) {
          const person = snapshot
            .getLoadable(entityFieldsFamilyState(id))
            .getValue() as Person;
          if (
            person?.company?.id &&
            !relatedEntites.find((x) => x.id === person?.company?.id)
          ) {
            relatedEntites.push({
              id: person.company.id,
              type: ActivityTargetableEntityType.Company,
            });
          }
        }

        openCreateActivityRightDrawer(
          type,
          ActivityTargetableEntityType.Person,
          relatedEntites,
        );
      },
    [openCreateActivityRightDrawer],
  );
};
