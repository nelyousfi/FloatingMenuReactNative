import { Machine } from 'xstate';

export const floatingMenuMachine = Machine({
  initial: 'closed',
  states: {
    closed: {
      on: {
        TOGGLE: 'opened',
      },
      onEntry: ['rotateIcon']
    },
    opened: {
      on: {
        TOGGLE: 'closed',
        FLOATING_ITEM_CLICKED: {
          closed: {
            actions: ['onFloatingItemClicked']
          }
        }
      },
      onEntry: ['rotateIcon']
    }
  }
});
