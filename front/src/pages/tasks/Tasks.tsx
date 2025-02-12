import styled from '@emotion/styled';

import { TasksRecoilScopeContext } from '@/activities/states/recoil-scope-contexts/TasksRecoilScopeContext';
import { PageAddTaskButton } from '@/activities/tasks/components/PageAddTaskButton';
import { TaskGroups } from '@/activities/tasks/components/TaskGroups';
import { FilterDropdownButton } from '@/ui/data/filter/components/FilterDropdownButton';
import { FilterScope } from '@/ui/data/filter/scopes/FilterScope';
import { IconArchive, IconCheck, IconCheckbox } from '@/ui/display/icon/index';
import { RelationPickerHotkeyScope } from '@/ui/input/relation-picker/types/RelationPickerHotkeyScope';
import { PageBody } from '@/ui/layout/page/PageBody';
import { PageContainer } from '@/ui/layout/page/PageContainer';
import { PageHeader } from '@/ui/layout/page/PageHeader';
import { TabList } from '@/ui/layout/tab/components/TabList';
import { TopBar } from '@/ui/layout/top-bar/TopBar';
import { RecoilScope } from '@/ui/utilities/recoil-scope/components/RecoilScope';

import { TasksEffect } from './TasksEffect';

const StyledTasksContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
  overflow: auto;
`;

const StyledTabListContainer = styled.div`
  align-items: end;
  display: flex;
  height: 40px;
  margin-left: ${({ theme }) => `-${theme.spacing(2)}`};
`;

export const Tasks = () => {
  const TASK_TABS = [
    {
      id: 'to-do',
      title: 'To do',
      Icon: IconCheck,
    },
    {
      id: 'done',
      title: 'Done',
      Icon: IconArchive,
    },
  ];

  return (
    <PageContainer>
      <RecoilScope CustomRecoilScopeContext={TasksRecoilScopeContext}>
        <FilterScope filterScopeId="tasks-filter-scope">
          <TasksEffect />
          <PageHeader title="Tasks" Icon={IconCheckbox}>
            <PageAddTaskButton />
          </PageHeader>
          <PageBody>
            <StyledTasksContainer>
              <TopBar
                leftComponent={
                  <StyledTabListContainer>
                    <TabList
                      context={TasksRecoilScopeContext}
                      tabs={TASK_TABS}
                    />
                  </StyledTabListContainer>
                }
                rightComponent={
                  <FilterDropdownButton
                    key="tasks-filter-dropdown-button"
                    hotkeyScope={{
                      scope: RelationPickerHotkeyScope.RelationPicker,
                    }}
                  />
                }
              />
              <TaskGroups />
            </StyledTasksContainer>
          </PageBody>
        </FilterScope>
      </RecoilScope>
    </PageContainer>
  );
};
