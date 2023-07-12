export type MuscleGroup = {
  bodyPart: BodyParts;
  name: MuscleGroupNames;
};

export type BodyParts =
  | 'legs'
  | 'arms'
  | 'shoulders'
  | 'abs'
  | 'back'
  | 'chest';

export type MuscleGroupNames =
  | 'Quads'
  | 'Biceps'
  | 'Shoulders'
  | 'Chest'
  | 'Triceps'
  | 'Back'
  | 'Glutes'
  | 'Hamstrings'
  | 'Abs';

export type MuscleGroups = MuscleGroup[];

export const ImportantMappings = {
  0: 'Mid',
  1: 'Better',
  2: 'Best',
};

export type Workout = {
  id: number;
  importance: 0 | 1 | 2;
  muscleGroup: MuscleGroupNames[];
  name: string;
  description: string;
};

export type WorkoutList = {
  [name: string]: Workout;
};

export type WorkoutByReference = {
  name: string;
  workouts: Workout[];
  createdAt: string;
  muscleGroups: MuscleGroups;
};

export type Split = {
  id: number;
  name?: string;
  createdAt: string;
  monday: {
    workout: WorkoutByReference[];
    muscleGroup: MuscleGroup;
  };
  tuesday: {
    workout: WorkoutByReference[];
    muscleGroup: MuscleGroup;
  };
  wednesday: {
    workout: WorkoutByReference[];
    muscleGroup: MuscleGroup;
  };
  thursday: {
    workout: WorkoutByReference[];
    muscleGroup: MuscleGroup;
  };
  friday: {
    workout: WorkoutByReference[];
    muscleGroup: MuscleGroup;
  };
  saturday: {
    workout: WorkoutByReference[];
    muscleGroup: MuscleGroup;
  };
  sunday: {
    workout: WorkoutByReference[];
    muscleGroup: MuscleGroup;
  };
};

export type SplitGroup = Split[];

export type UserData = {
  generatedWorkouts: WorkoutByReference[];
  generatedSplits: SplitGroup;
  defaultData: {
    muscleGroups: MuscleGroups;
    workoutList: WorkoutList;
  };
};

export type UpdateUserDataSplits = {
  key: 'generatedSplits';
  data: Split;
};

export type UpdateUserDataWorkouts = {
  key: 'generatedWorkouts';
  name: string;
  data: {workouts: Workout[]; muscleGroups: MuscleGroups};
};

export const DEFAULT_USER_DATA = {
  generatedSplits: [],
  generatedWorkouts: [],
  defaultData: {
    muscleGroups: [],
    workoutList: {},
  },
};
