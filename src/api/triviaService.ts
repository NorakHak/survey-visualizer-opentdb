import type { TriviaCategory, TriviaQuestion } from "../interfaces";

const BASE_URL = "https://opentdb.com"

export const triviaService = {

    async getCategories(): Promise<TriviaCategory[]> {
        const response = await fetch(`${BASE_URL}/api_category.php`);
        if (!response.ok) {
            throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        return data.trivia_categories;
    },

    async getQuestions(amount = 50, category?: number): Promise<TriviaQuestion[]> {

        const url = new URL(`${BASE_URL}/api.php`);

        url.searchParams.append('amount', amount.toString());

        if (category) url.searchParams.append('category', category.toString());

        const response = await fetch(url.toString());

        if (!response.ok) {
            throw new Error('Failed to fetch questions');
        }

        const data = await response.json();

        return data.results;
    },

}