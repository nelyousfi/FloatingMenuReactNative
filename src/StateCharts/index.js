import { Machine } from 'xstate';

export const floatingMenuMachine = Machine({
  initial: 'closed',
  states: {
    closed: {
      on: {
        OPEN: 'opened',
      },
      onEntry: ['rotateIcon']
    },
    opened: {
      on: {
        CLOSE: 'closed',
        FLOATING_ITEM_CLICKED: {
          closed: {
            actions: ['onFloatingItemClicked']
          }
        },
      },
      onEntry: ['rotateIcon']
    }
  }
});
