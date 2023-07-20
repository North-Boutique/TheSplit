import {MuscleGroupNames} from '../../../services/types';

export type FilterComponentProps = {
  options: any[];
  selectedBackground: string;
  onTap: (name: MuscleGroupNames) => void;
  isDisabled: (name: MuscleGroupNames) => boolean;
};

export type FilterButtonProps = {
  title: MuscleGroupNames;
  selectedBackground: string;
  onTap: (name: MuscleGroupNames) => void;
  isDisabled: (name: MuscleGroupNames) => boolean;
};
