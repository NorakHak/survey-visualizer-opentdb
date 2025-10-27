import React, { createContext, useState, useEffect, useCallback } from 'react';
import { triviaService } from "../api/triviaService"
import type { CategoryStats, TriviaCategory, TriviaQuestion } from '../interfaces';
import { getRandomColor, getRandomQuestionsNumber } from '../utils';

interface AppContextI {
    theme: 'light' | 'dark';
    categories: TriviaCategory[];
    questions: TriviaQuestion[];
    categoryStats: CategoryStats[];
    selectedCategory: TriviaCategory | null;
    error: boolean;

    showOverallChart: boolean;
    isCategoriesLoadingActive: boolean;
    isQuestionsLoadingActive: boolean;

    setTheme: (theme: 'light' | 'dark') => void;
    setSelectedCategory: (category: TriviaCategory | null) => void;
    setShowOverallChart: (value: boolean) => void;
    setIsCategoriesLoading: (value: boolean) => void;
    setIsQuestionsLoadingActive: (value: boolean) => void;
    setError: (value: boolean) => void;

    retryFetchQuestions: () => void;
    fetchCategories: () => void;
}

const AppContext = createContext<AppContextI | undefined>(undefined);

const globalQuestionsCache: Record<number, TriviaQuestion[]> = JSON.parse(sessionStorage.getItem("questionsCache") || "{}");

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [categories, setCategories] = useState<TriviaCategory[]>([]);
    const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
    const [categoryStats, setCategoryStats] = useState<CategoryStats[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<TriviaCategory | null>(null);
    const [isCategoriesLoadingActive, setIsCategoriesLoading] = useState<boolean>(false);
    const [isQuestionsLoadingActive, setIsQuestionsLoadingActive] = useState<boolean>(false);
    const [showOverallChart, setShowOverallChart] = useState<boolean>(true)
    const [error, setError] = useState<boolean>(false)

    const updateCategoryStats = useCallback(
        (categoryId: number, questionCount: number) => {
            const category = categories.find(c => c.id === categoryId);
            if (!category) return;

            const newCategory = {
                id: categoryId,
                name: category.name,
                questionCount,
                color: getRandomColor(),
            };

            setCategoryStats(prev => {
                const updated = [...prev, newCategory];
                sessionStorage.setItem('categoryStats', JSON.stringify(updated));
                return updated;
            });
        },
        [categories, setCategoryStats]
    );

    const fetchQuestionsForCategory = useCallback(

        async (categoryId: number, forceRefetch = false) => {
            console.log(globalQuestionsCache)

            try {

                if (!forceRefetch && globalQuestionsCache[categoryId]) {
                    setQuestions(globalQuestionsCache[categoryId]);
                    return;
                }

                setIsQuestionsLoadingActive(true);

                const questionsNumber = getRandomQuestionsNumber();
                const data = await triviaService.getQuestions(questionsNumber, categoryId);

                globalQuestionsCache[categoryId] = data;
                sessionStorage.setItem("questionsCache", JSON.stringify(globalQuestionsCache));

                setQuestions(data);
                updateCategoryStats(categoryId, data.length);
                setError(false);
            } catch (error) {
                console.error(error);
                setError(true);
            } finally {
                setIsQuestionsLoadingActive(false);
            }
        },
        [updateCategoryStats]
    );

    useEffect(() => {

        fetchCategories()

    }, []);

    useEffect(() => {

        const storedStats = sessionStorage.getItem('categoryStats');
        if (storedStats) {
            setCategoryStats(JSON.parse(storedStats));
        }

    }, []);

    useEffect(() => {

        if (!selectedCategory) return;

        fetchQuestionsForCategory(selectedCategory.id);

    }, [selectedCategory, fetchQuestionsForCategory])

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    async function fetchCategories() {

        try {

            setIsCategoriesLoading(true);

            const data = await triviaService.getCategories();

            setCategories(
                data.sort((a, b) => a.name.localeCompare(b.name))
            );
            setSelectedCategory(data[0])

            setError(false)

        } catch (error) {

            console.error(error);
            setError(true)

        } finally {

            setIsCategoriesLoading(false);

        }

    }

    function retryFetchQuestions() {

        if (selectedCategory) {
            fetchQuestionsForCategory(selectedCategory.id, true);
        }

    }

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
                setIsQuestionsLoadingActive,
                retryFetchQuestions,
                fetchCategories,
                error,
                setError,
                categoryStats,
                showOverallChart,
                setShowOverallChart
            }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContext;
