export type SetType = 'weighted' | 'reps' | 'hold' | 'distance';

export type TrainingType =
    | 'strength'
    | 'hypertrophy'
    | 'power'
    | 'skill'
    | 'endurance'
    | 'conditioning'
    | 'mobility'
    | 'stability';

export type MuscleGroup =
    | 'legs'
    | 'back'
    | 'chest'
    | 'shoulders'
    | 'arms'
    | 'core'
    | 'full_body';

export interface Exercise {
    id: string;
    name: string;
    muscleGroup: muscleGroup;
    trainingType: trainingType;
    setType: setType;
    notes?: string;
}