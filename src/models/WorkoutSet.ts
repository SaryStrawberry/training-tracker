import {SetType} from './Exercise';

export interface BaseSet {
    id : string;
    sessionId : string;
    exerciseId : string;
    setNumber : number;
    rpe? : number;
    notes? : string;
}

export interface WeightedSet extends BaseSet {
    type : 'weighted';
    reps : number;
    weight : number;
}

export interface RepSet extends BaseSet {
    type : 'reps';
    reps : number;
    addedWeight? : number;
}

export interface HoldSet extends BaseSet {
    type : 'hold';
    durationSeconds : 'number';
}

export interface DistanceSet extends BaseSet {
    type : 'distance';
    distanceMeters : number;
    durationSeconds? : number;
}

export type WorkoutSet = WeightedSet | RepSet | HoldSet | DistanceSet;