Trivia Dashboard

Trivia Dashboard is an interactive web application built with Vite, React, and TypeScript, designed to visualize data from the Open Trivia DB API.

Key Features

Category Menu — quick access to the list of all trivia categories.

Two main views with charts:

Distribution of Questions by Category

Instead of initially fetching a random number of questions from random categories and displaying them in a single chart, I implemented it differently:

Each time the user fetches a specific category, that category with its number of questions is added to the chart.

The chart dynamically builds a visual representation showing the percentage of questions per fetched category, updating as more categories are loaded.

Distribution of Questions by Difficulty

When a category is selected, a random number of questions is fetched (from 10-50), and their difficulty distribution is displayed in a separate chart.


Data Caching — API calls are not repeated when switching categories if data has already been fetched.

Session Storage — cached data is stored in sessionStorage to persist between page reloads.


Error Handling

API errors (e.g., 429 Too Many Requests) are handled both during the initial category fetch and for individual category requests.

Sometimes the API returns an empty array; in this case, a dedicated component is displayed to inform the user that no questions are available for the selected category.

When an error/empty array occurs, the user can simply click on a category in the menu again or use the “Retry” button to trigger a new API call and reload the data.


Theme Switcher — built-in light/dark mode toggle.

Cache Reset — a button to clear sessionStorage and reload data.

Responsive Design — the interface adapts to different screen sizes.

Technical Details

Tech Stack: Vite, React, TypeScript, CSS Modules

API: Open Trivia DB

Implementation Notes:

Randomized question counts per category for more varied charts.

Cached data to avoid unnecessary API calls.

Comprehensive error handling for smooth user experience.


Final Note

I believe I’ve covered all possible scenarios and edge cases within the scope of this task.
It was a genuinely interesting and enjoyable project to work on — thank you for the opportunity!
I’m looking forward to your feedback.

Test update
