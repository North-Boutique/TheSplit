export type MuscleGroup = {
  bodyPart: 'legs' | 'arms' | 'shoulders' | 'abs' | 'back';
  name:
    | 'Quads'
    | 'Biceps'
    | 'Shoulders'
    | 'Chest'
    | 'Triceps'
    | 'Back'
    | 'Glutes'
    | 'Hamstrings'
    | 'Abs';
};

export type MuscleGroups = MuscleGroup[];

export type Workout = {
  weight: 0 | 1 | 2;
  muscleGroup: MuscleGroup;
  name: string;
  description: string;
};

export type WorkoutList = {
  [name: string]: Workout;
};
