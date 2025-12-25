export interface ISet {
    weight?: number,
    reps: number
}

export interface IExerciseTable {
    title: string,
    sets: ISet[]
}

export interface IModalProps {
    isOpen: boolean,
    onClose: () => void
}