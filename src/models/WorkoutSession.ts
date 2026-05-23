export type DayType =
    | 'lower_strength'
    | 'upper_pull'
    | 'upper_push'
    | 'plyometric_power'
    | 'swim'
    | 'calisthenics_focus'
    | 'active_recovery'
    | 'custom';

export type CyclePhase = 'menstrual' | 'follicular' | 'ovulation' | 'luteal';

export type SessionStatus = 'planned' | 'in_progress' | 'completed';

export interface WorkoutSession {
    id: string;
    date : string;
    dayType: DayType;
    customDayName?: string;
    status: SessionStatus;

    //Optional tracking
    cycleDay?: number;
    cyclePhase?: CyclePhase;
    bodyWeight?: number;
    sleepHours?: number;
    energyRating?: number;
    overallRPE?: number;
    notes?: string;
    startedAt?: string;
    completedAt?: string;
}