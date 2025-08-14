'use client';

import { createContext, useState, useContext, useEffect, ReactNode } from 'react';

export interface Nota {
    id: number;
    alunoId: number;
    avaliacaoId: number;
    valor: number;
}

interface NotasContextType {
    notas: Nota[];
    adicionarNota: (nota: Omit<Nota, 'id'>) => void;
    editarNota: (notaId: number, updatedData: Partial<Omit<Nota, 'id'>>) => void;
    removerNota: (notaId: number) => void;
}

const NotasContext = createContext<NotasContextType | undefined>(undefined);

interface NotasProviderProps {
    children: ReactNode;
}

const NOTAS_INICIAIS: Nota[] = [

];

export const NotasProvider = ({ children }: NotasProviderProps) => {
    const [notas, setNotas] = useState<Nota[]>([]);

    useEffect(() => {
        const savedNotas = localStorage.getItem('notas');
        if (savedNotas) {
            try {
                setNotas(JSON.parse(savedNotas));
            } catch (e) {
                console.error('Failed to parse notas from localStorage', e);
            }
        } else {
            setNotas(NOTAS_INICIAIS);
        }
    }, []);

    useEffect(() => {
        if (notas.length > 0) {
            localStorage.setItem('notas', JSON.stringify(notas));
        }
    }, [notas]);

    const adicionarNota = (nota: Omit<Nota, 'id'>) => {
        setNotas((prevNotas) => {
            const novoId = prevNotas.length > 0
                ? Math.max(...prevNotas.map(a => a.id)) + 1
                : 1;
            return [...prevNotas, { ...nota, id: novoId }];
        });
    };

    const removerNota = (notaId: number) => {
        setNotas((prevNotas) => prevNotas.filter((nota) => nota.id !== notaId));
    };

    const editarNota = (notaId: number, updatedData: Partial<Omit<Nota, 'id'>>) => {
        setNotas((prevNotas) =>
            prevNotas.map((nota) =>
                nota.id === notaId
                    ? { ...nota, ...updatedData }
                    : nota
            )
        );
    };

    return (
        <NotasContext.Provider value={{
            notas,
            adicionarNota,
            removerNota,
            editarNota
        }}>
            {children}
        </NotasContext.Provider>
    );
};

export const useNotas = () => {
    const context = useContext(NotasContext);
    if (context === undefined) {
        throw new Error('useNotas must be used within an NotasProvider');
    }
    return context;
};