import { getOperationName } from '@apollo/client/utilities';
import { useRecoilCallback, useSetRecoilState } from 'recoil';

import { useFavorites } from '@/favorites/hooks/useFavorites';
import { useResetTableRowSelection } from '@/ui/data/data-table/hooks/useResetTableRowSelection';
import { selectedRowIdsSelector } from '@/ui/data/data-table/states/selectors/selectedRowIdsSelector';
import { tableRowIdsState } from '@/ui/data/data-table/states/tableRowIdsState';
import {
  IconCheckbox,
  IconHeart,
  IconHeartOff,
  IconNotes,
  IconTrash,
} from '@/ui/display/icon';
import { actionBarEntriesState } from '@/ui/navigation/action-bar/states/actionBarEntriesState';
import { contextMenuEntriesState } from '@/ui/navigation/context-menu/states/contextMenuEntriesState';
import {
  ActivityType,
  useDeleteManyPersonMutation,
  useGetFavoritesQuery,
} from '~/generated/graphql';

import { GET_PEOPLE } from '../graphql/queries/getPeople';

import { useCreateActivityForPeople } from './useCreateActivityForPeople';

export const usePersonTableContextMenuEntries = () => {
  const setContextMenuEntries = useSetRecoilState(contextMenuEntriesState);
  const setActionBarEntriesState = useSetRecoilState(actionBarEntriesState);
  const createActivityForPeople = useCreateActivityForPeople();

  const setTableRowIds = useSetRecoilState(tableRowIdsState);
  const resetRowSelection = useResetTableRowSelection();

  const { data } = useGetFavoritesQuery();
  const favorites = data?.findFavorites;
  const { insertPersonFavorite, deletePersonFavorite } = useFavorites();

  const handleFavoriteButtonClick = useRecoilCallback(({ snapshot }) => () => {
    const selectedRowIds = snapshot
      .getLoadable(selectedRowIdsSelector)
      .getValue();

    const selectedPersonId =
      selectedRowIds.length === 1 ? selectedRowIds[0] : '';

    const isFavorite =
      !!selectedPersonId &&
      !!favorites?.find((favorite) => favorite.person?.id === selectedPersonId);

    resetRowSelection();
    if (isFavorite) deletePersonFavorite(selectedPersonId);
    else insertPersonFavorite(selectedPersonId);
  });

  const [deleteManyPerson] = useDeleteManyPersonMutation({
    refetchQueries: [getOperationName(GET_PEOPLE) ?? ''],
  });

  const handleDeleteClick = useRecoilCallback(({ snapshot }) => async () => {
    const rowIdsToDelete = snapshot
      .getLoadable(selectedRowIdsSelector)
      .getValue();

    resetRowSelection();

    await deleteManyPerson({
      variables: {
        ids: rowIdsToDelete,
      },
      optimisticResponse: {
        __typename: 'Mutation',
        deleteManyPerson: {
          count: rowIdsToDelete.length,
        },
      },
      update: () => {
        setTableRowIds((tableRowIds) =>
          tableRowIds.filter((id) => !rowIdsToDelete.includes(id)),
        );
      },
    });
  });

  return {
    setContextMenuEntries: useRecoilCallback(({ snapshot }) => () => {
      const selectedRowIds = snapshot
        .getLoadable(selectedRowIdsSelector)
        .getValue();

      const selectedPersonId =
        selectedRowIds.length === 1 ? selectedRowIds[0] : '';

      const isFavorite =
        !!selectedPersonId &&
        !!favorites?.find(
          (favorite) => favorite.person?.id === selectedPersonId,
        );

      setContextMenuEntries([
        {
          label: 'New task',
          Icon: IconCheckbox,
          onClick: () => createActivityForPeople(ActivityType.Task),
        },
        {
          label: 'New note',
          Icon: IconNotes,
          onClick: () => createActivityForPeople(ActivityType.Note),
        },
        ...(!!selectedPersonId
          ? [
              {
                label: isFavorite
                  ? 'Remove from favorites'
                  : 'Add to favorites',
                Icon: isFavorite ? IconHeartOff : IconHeart,
                onClick: () => handleFavoriteButtonClick(),
              },
            ]
          : []),
        {
          label: 'Delete',
          Icon: IconTrash,
          accent: 'danger',
          onClick: () => handleDeleteClick(),
        },
      ]);
    }),
    setActionBarEntries: useRecoilCallback(() => () => {
      setActionBarEntriesState([
        {
          label: 'Task',
          Icon: IconCheckbox,
          onClick: () => createActivityForPeople(ActivityType.Task),
        },
        {
          label: 'Note',
          Icon: IconNotes,
          onClick: () => createActivityForPeople(ActivityType.Note),
        },
        {
          label: 'Delete',
          Icon: IconTrash,
          accent: 'danger',
          onClick: () => handleDeleteClick(),
        },
      ]);
    }),
  };
};
