'use client';

import { createContext, useState, useContext, useEffect, ReactNode } from 'react';

export interface Aluno {
    id: number;
    nome: string;
    matricula: string;
    turmaId: number;
}

interface AlunosContextType {
    alunos: Aluno[];
    addAluno: (aluno: Omit<Aluno, 'id'>) => void;
    removeAluno: (alunoId: number) => void;
    updateAluno: (alunoId: number, updatedData: Partial<Omit<Aluno, 'id'>>) => void;
    getNomeAluno: (alunoId: number) => string;
}

const AlunosContext = createContext<AlunosContextType | undefined>(undefined);

interface AlunosProviderProps {
    children: ReactNode;
}

const ALUNOS_INICIAIS: Aluno[] = [
    { id: 1, nome: "João Silva", matricula: "2025001", turmaId: 1 },
    { id: 2, nome: "Maria Santos", matricula: "2025002", turmaId: 1 },
    { id: 3, nome: "Pedro Costa", matricula: "2025003", turmaId: 2 },
    { id: 4, nome: "Ana Oliveira", matricula: "2025004", turmaId: 2 },
    { id: 5, nome: "Carlos Pereira", matricula: "2025005", turmaId: 3 },
];

export const AlunosProvider = ({ children }: AlunosProviderProps) => {
    const [alunos, setAlunos] = useState<Aluno[]>([]);

    useEffect(() => {
        const savedAlunos = localStorage.getItem('alunos');
        if (savedAlunos) {
            try {
                setAlunos(JSON.parse(savedAlunos));
            } catch (e) {
                console.error('Failed to parse alunos from localStorage', e);
            }
        } else {
            setAlunos(ALUNOS_INICIAIS);
        }
    }, []);

    useEffect(() => {
        if (alunos.length > 0) {
            localStorage.setItem('alunos', JSON.stringify(alunos));
        }
    }, [alunos]);

    const addAluno = (aluno: Omit<Aluno, 'id'>) => {
        setAlunos((prevAlunos) => {
            const novoId = prevAlunos.length > 0
                ? Math.max(...prevAlunos.map(a => a.id)) + 1
                : 1;
            return [...prevAlunos, { ...aluno, id: novoId }];
        });
    };

    const removeAluno = (alunoId: number) => {
        setAlunos((prevAlunos) => prevAlunos.filter((aluno) => aluno.id !== alunoId));
    };

    const updateAluno = (alunoId: number, updatedData: Partial<Omit<Aluno, 'id'>>) => {
        setAlunos((prevAlunos) =>
            prevAlunos.map((aluno) =>
                aluno.id === alunoId
                    ? { ...aluno, ...updatedData }
                    : aluno
            )
        );
    };

    const getNomeAluno = (alunoId: number): string => {
        const aluno = alunos.find(a => a.id === alunoId);
        return aluno ? aluno.nome : 'Aluno não encontrado';
    };

    return (
        <AlunosContext.Provider value={{
            alunos,
            addAluno,
            removeAluno,
            updateAluno,
            getNomeAluno
        }}>
            {children}
        </AlunosContext.Provider>
    );
};

export const useAlunos = () => {
    const context = useContext(AlunosContext);
    if (context === undefined) {
        throw new Error('useAlunos must be used within an AlunosProvider');
    }
    return context;
};