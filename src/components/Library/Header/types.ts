import {SplitGroup, WorkoutByReference} from '../../../services/types';

export type SwitchHeaderProps = {
  renderedData: WorkoutByReference[] | undefined | SplitGroup;
  type: 'Split' | 'Workout';
};
