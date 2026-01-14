export interface ISet {
    id: number,
    weight?: number,
    reps: number
}

export interface IExerciseTable {
    id: number,
    name: string,
    sets: ISet[]
}

export interface IModalProps {
    isOpen: boolean,
    onClose: () => void
}

export interface ITrainingProps {
    id: number,
    date: Date
}