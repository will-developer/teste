'use client';

import { createContext, useState, useContext, useEffect, ReactNode } from 'react';

export interface Turma {
    id: number;
    nome: string;
    anoLetivo: number;
}

interface TurmasContextType {
    turmas: Turma[];
    addTurma: (turma: Omit<Turma, 'id'>) => void;
    removeTurma: (turmaId: number) => void;
    updateTurma: (turmaId: number, updatedData: Partial<Omit<Turma, 'id'>>) => void;
    getNomeTurma: (turmaId: number) => string;
}

const TurmasContext = createContext<TurmasContextType | undefined>(undefined);

interface TurmasProviderProps {
    children: ReactNode;
}

const TURMAS_INICIAIS: Turma[] = [
    { id: 1, nome: "Turma A", anoLetivo: 2025 },
    { id: 2, nome: "Turma B", anoLetivo: 2025 },
    { id: 3, nome: "Turma C", anoLetivo: 2025 },
    { id: 4, nome: "Turma D", anoLetivo: 2025 },
    { id: 5, nome: "Turma E", anoLetivo: 2025 }
];

export const TurmasProvider = ({ children }: TurmasProviderProps) => {
    const [turmas, setTurmas] = useState<Turma[]>([]);

    useEffect(() => {
        const savedTurmas = localStorage.getItem('turmas');
        if (savedTurmas) {
            try {
                setTurmas(JSON.parse(savedTurmas));
            } catch (e) {
                console.error('Failed to parse turmas from localStorage', e);
            }
        } else {
            setTurmas(TURMAS_INICIAIS);
        }
    }, []);

    useEffect(() => {
        if (turmas.length > 0) {
            localStorage.setItem('turmas', JSON.stringify(turmas));
        }
    }, [turmas]);

    const addTurma = (turma: Omit<Turma, 'id'>) => {
        setTurmas((prevTurmas) => {
            const novoId = prevTurmas.length > 0
                ? Math.max(...prevTurmas.map(t => t.id)) + 1
                : 1;
            return [...prevTurmas, { ...turma, id: novoId }];
        });
    };

    const removeTurma = (turmaId: number) => {
        setTurmas((prevTurmas) => prevTurmas.filter((turma) => turma.id !== turmaId));
    };

    const updateTurma = (turmaId: number, updatedData: Partial<Omit<Turma, 'id'>>) => {
        setTurmas((prevTurmas) =>
            prevTurmas.map((turma) =>
                turma.id === turmaId
                    ? { ...turma, ...updatedData }
                    : turma
            )
        );
    };

    const getNomeTurma = (turmaId: number): string => {
        const turma = turmas.find(t => t.id === turmaId);
        return turma ? `${turma.nome} - ${turma.anoLetivo}` : 'Turma não encontrada';
    };

    return (
        <TurmasContext.Provider value={{
            turmas,
            addTurma,
            removeTurma,
            updateTurma,
            getNomeTurma
        }}>
            {children}
        </TurmasContext.Provider>
    );
};

export const useTurmas = () => {
    const context = useContext(TurmasContext);
    if (context === undefined) {
        throw new Error('useTurmas must be used within a TurmasProvider');
    }
    return context;
};