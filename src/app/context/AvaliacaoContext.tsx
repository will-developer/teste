'use client';

import { createContext, useState, useContext, useEffect, ReactNode } from 'react';

export interface Avaliacao {
    id: number;
    nome: string;
    turmaId: number;
}

interface AvaliacoesContextType {
    avaliacoes: Avaliacao[];
    addAvaliacao: (avaliacao: Omit<Avaliacao, 'id'>) => void;
    removeAvaliacao: (avaliacaoId: number) => void;
    updateAvaliacao: (avaliacaoId: number, updatedData: Partial<Omit<Avaliacao, 'id'>>) => void;
    getNomeAvaliacao: (avaliacaoId: number) => string;
}

const AvaliacoesContext = createContext<AvaliacoesContextType | undefined>(undefined);

interface AvaliacoesProviderProps {
    children: ReactNode;
}

const AVALIACOES_INICIAIS: Avaliacao[] = [
    { id: 1, nome: "Prova 1", turmaId: 1 },
    { id: 2, nome: "Trabalho em Grupo", turmaId: 1 },
    { id: 3, nome: "Prova 2", turmaId: 2 },
    { id: 4, nome: "Prova 3", turmaId: 2 },
    { id: 5, nome: "Prova 4", turmaId: 3 },
];

export const AvaliacoesProvider = ({ children }: AvaliacoesProviderProps) => {
    const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);

    useEffect(() => {
        const savedAvaliacoes = localStorage.getItem('avaliacoes');
        if (savedAvaliacoes) {
            try {
                setAvaliacoes(JSON.parse(savedAvaliacoes));
            } catch (e) {
                console.error('Failed to parse avaliacoes from localStorage', e);
            }
        } else {
            setAvaliacoes(AVALIACOES_INICIAIS);
        }
    }, []);

    useEffect(() => {
        if (avaliacoes.length > 0) {
            localStorage.setItem('avaliacoes', JSON.stringify(avaliacoes));
        }
    }, [avaliacoes]);

    const addAvaliacao = (avaliacao: Omit<Avaliacao, 'id'>) => {
        setAvaliacoes((prevAvaliacoes) => {
            const novoId = prevAvaliacoes.length > 0
                ? Math.max(...prevAvaliacoes.map(a => a.id)) + 1
                : 1;
            return [...prevAvaliacoes, { ...avaliacao, id: novoId }];
        });
    };

    const removeAvaliacao = (avaliacaoId: number) => {
        setAvaliacoes((prevAvaliacoes) => prevAvaliacoes.filter((avaliacao) => avaliacao.id !== avaliacaoId));
    };

    const updateAvaliacao = (avaliacaoId: number, updatedData: Partial<Omit<Avaliacao, 'id'>>) => {
        setAvaliacoes((prevAvaliacoes) =>
            prevAvaliacoes.map((avaliacao) =>
                avaliacao.id === avaliacaoId
                    ? { ...avaliacao, ...updatedData }
                    : avaliacao
            )
        );
    };

    const getNomeAvaliacao = (avaliacaoId: number): string => {
        const avaliacao = avaliacoes.find(a => a.id === avaliacaoId);
        return avaliacao ? avaliacao.nome : 'Avaliação não encontrada';
    };

    return (
        <AvaliacoesContext.Provider value={{
            avaliacoes,
            addAvaliacao,
            removeAvaliacao,
            updateAvaliacao,
            getNomeAvaliacao
        }}>
            {children}
        </AvaliacoesContext.Provider>
    );
};

export const useAvaliacoes = () => {
    const context = useContext(AvaliacoesContext);
    if (context === undefined) {
        throw new Error('useAvaliacoes must be used within an AvaliacoesProvider');
    }
    return context;
};