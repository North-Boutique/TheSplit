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

export type Workout = {
  id: number;
  importance: 0 | 1 | 2;
  muscleGroup: MuscleGroup;
  name: string;
  description: string;
};

export type WorkoutList = {
  [name: string]: Workout;
};

export type Split = {
  id: number;
  name?: string;
  createdAt: string;
  monday: {
    workout: WorkoutList;
    muscleGroup: MuscleGroup;
  };
  tuesday: {
    workout: WorkoutList;
    muscleGroup: MuscleGroup;
  };
  wednesday: {
    workout: WorkoutList;
    muscleGroup: MuscleGroup;
  };
  thursday: {
    workout: WorkoutList;
    muscleGroup: MuscleGroup;
  };
  friday: {
    workout: WorkoutList;
    muscleGroup: MuscleGroup;
  };
  saturday: {
    workout: WorkoutList;
    muscleGroup: MuscleGroup;
  };
  sunday: {
    workout: WorkoutList;
    muscleGroup: MuscleGroup;
  };
};

export type SplitGroup = Split[];

export type UserData = {
  generatedWorkouts: WorkoutList;
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
  data: Workout;
};

export const DEFAULT_USER_DATA = {
  generatedSplits: [],
  generatedWorkouts: {},
  defaultData: {
    muscleGroups: [],
    workoutList: {},
  },
};
