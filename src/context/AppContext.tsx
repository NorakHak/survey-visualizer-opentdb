import React, { createContext, useState, useEffect } from 'react';
import { triviaService } from "../api/triviaService"
import type { TriviaCategory, TriviaQuestion } from '../interfaces';

interface Category {
    id: number;
    name: string;
}

interface AppContextI {
    theme: 'light' | 'dark';
    categories: TriviaCategory[];
    questions: TriviaQuestion[];
    selectedCategory: TriviaCategory | null;

    isCategoriesLoadingActive: boolean;
    isQuestionsLoadingActive: boolean;

    setTheme: (theme: 'light' | 'dark') => void;
    setSelectedCategory: (category: TriviaCategory | null) => void;
    setIsCategoriesLoading: (value: boolean) => void;
    setIsQuestionsLoadingActive: (value: boolean) => void
}

const AppContext = createContext<AppContextI | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [categories, setCategories] = useState<Category[]>([]);
    const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<TriviaCategory | null>(null);
    const [isCategoriesLoadingActive, setIsCategoriesLoading] = useState<boolean>(false);
    const [isQuestionsLoadingActive, setIsQuestionsLoadingActive] = useState<boolean>(false);

    const [questionsCache, setQuestionsCache] = useState<Record<number, TriviaQuestion[]>>({});

    useEffect(() => {

        const loadCategories = async () => {
            try {
                setIsCategoriesLoading(true);

                const data = await triviaService.getCategories();

                setCategories(
                    data.sort((a, b) => a.name.localeCompare(b.name))
                );
                setSelectedCategory(data[0])
            } catch (error) {
                console.error("Failed to load categories:", error);
            } finally {
                setIsCategoriesLoading(false);
            }
        };

        loadCategories();

    }, []);

    useEffect(() => {

        if (!selectedCategory)
            return

        const categoryId = selectedCategory.id;

        if (questionsCache[categoryId]) {
            setQuestions(questionsCache[categoryId]);
            return;
        }

        const fetchQuestions = async (categoryId: number) => {
            try {
                setIsQuestionsLoadingActive(true);

                const data = await triviaService.getQuestions(50, categoryId);

                setQuestionsCache(prev => ({ ...prev, [categoryId]: data }));
                setQuestions(data);
            } catch (err) {
                console.error(err);
            } finally {
                setIsQuestionsLoadingActive(false);
            }
        };

        fetchQuestions(selectedCategory.id)

    }, [selectedCategory])

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <AppContext.Provider
            value={{
                theme,
                setTheme,
                categories,
                selectedCategory,
                setSelectedCategory,
                isCategoriesLoadingActive,
                setIsCategoriesLoading,
                questions,
                isQuestionsLoadingActive,
                setIsQuestionsLoadingActive

            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppContext;
