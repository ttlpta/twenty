import { useSetRecoilState } from 'recoil';

import { isRightDrawerExpandedState } from '../states/isRightDrawerExpandedState';
import { isRightDrawerOpenState } from '../states/isRightDrawerOpenState';
import { rightDrawerPageState } from '../states/rightDrawerPageState';
import { RightDrawerPages } from '../types/RightDrawerPages';

export const useRightDrawer = () => {
  const setIsRightDrawerOpen = useSetRecoilState(isRightDrawerOpenState);
  const setIsRightDrawerExpanded = useSetRecoilState(
    isRightDrawerExpandedState,
  );

  const setRightDrawerPage = useSetRecoilState(rightDrawerPageState);

  const openRightDrawer = (rightDrawerPage: RightDrawerPages) => {
    setRightDrawerPage(rightDrawerPage);
    setIsRightDrawerExpanded(false);
    setIsRightDrawerOpen(true);
  };

  const closeRightDrawer = () => {
    setIsRightDrawerExpanded(false);
    setIsRightDrawerOpen(false);
  };

  return {
    openRightDrawer,
    closeRightDrawer,
  };
};
