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
  0.1: 'Good',
  0.2: 'Better',
  0.3: 'Best',
};

export type Workout = {
  id: number;
  importance: 0.1 | 0.2 | 0.3;
  muscleGroup: MuscleGroupNames[];
  name: string;
  description: string;
  long?: string;
};

export type WorkoutList = Workout[];

export type WorkoutByReference = {
  id: string;
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

export type DefaultsDefinition = {
  muscleGroups: MuscleGroups;
  workoutList: WorkoutList;
};

export type UserData = {
  generatedWorkouts: WorkoutByReference[];
  generatedSplits: SplitGroup;
  defaultData: {
    muscleGroups: MuscleGroups;
    workoutList: WorkoutList;
  };
};

export type UpdateUserDataSplits = {
  data: Split;
};

export type UpdateUserDataWorkouts = {
  name: string;
  data: {workouts: Workout[]; muscleGroups: MuscleGroups};
};

export const DEFAULT_USER_DATA = {
  generatedSplits: [],
  generatedWorkouts: [],
  defaultData: {
    muscleGroups: [],
    workoutList: [],
  },
};

export type LocallyStoredKeys =
  | '@DEFAULTS'
  | '@LOCAL_WORKOUTS'
  | '@LOCAL_SPLITS';

export type GetDataReturns =
  | DefaultsDefinition
  | WorkoutByReference[]
  | SplitGroup;
