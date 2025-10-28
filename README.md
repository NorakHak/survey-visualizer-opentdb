# 🎯 Trivia Dashboard

**Trivia Dashboard** is an interactive web application built with **Vite**, **React**, and **TypeScript**, designed to visualize data from the **Open Trivia DB API**.

---

## 🚀 Key Features

### 🧭 Category Menu  
Quick access to the full list of trivia categories.

### 📊 Two Main Views with Charts

#### **1. Distribution of Questions by Category**
Instead of initially fetching a random number of questions from random categories and displaying them in a single chart, I chose a more dynamic approach:

- Each time the user fetches a specific category, that category — along with its question count — is added to the chart.  
- The chart dynamically updates to visualize the percentage distribution of questions across all fetched categories, adjusting in real time as new ones are loaded.  

Implementing the version described in the task would actually be quite simple — it would just require an initial API call with a predefined number of questions (for example, a random number between 50 and the API’s limit, if such exists).  
However, I felt my approach reflects a more realistic user scenario than simply fetching random data. I even considered adding an extra button for random fetching but didn’t manage to include it in time — and at this point, I’d rather not modify the functionality further to keep things honest.

#### **2. Distribution of Questions by Difficulty**
When a category is selected, a random number of questions is fetched (from 10–50), and their difficulty distribution is displayed in a separate chart.

---

### 💾 Data Caching  
API calls are not repeated when switching categories if data has already been fetched.

### 🧠 Session Storage  
Cached data is stored in `sessionStorage` to persist between page reloads.

---

## ⚠️ Error Handling

- Handles API errors (e.g., **429 Too Many Requests**) during both initial and per-category requests.  
- Displays a dedicated “No Data” message when the API returns an empty array.  
- Includes a **Retry** button to re-fetch data easily.

---

## 🧩 Additional Features

- 🌗 **Theme Switcher** — Light/Dark mode toggle  
- 🧹 **Cache Reset** — Clear `sessionStorage` and reload data  
- 📱 **Responsive Design** — Adapts to any screen size

---

## 🧠 Technical Details

**Tech Stack:**  
Vite · React · TypeScript · CSS Modules  

**API:**  
Open Trivia DB  

**Implementation Notes:**  
- Randomized question counts for varied chart data  
- Data caching to reduce API load  
- Comprehensive error handling for a smoother UX  

---

## 💬 Final Note

I believe I’ve covered all key scenarios and edge cases within the scope of this task.  
It was a genuinely interesting and enjoyable project to work on — thank you for the opportunity!  
I’m looking forward to your feedback.  

---

## 🔍 Transparency Note

For the deployed version, a **separate repository** was created.  
Since I’m a bit of a perfectionist, I tested the app on many devices and made a few small **CSS refinements** — purely visual, no functional changes.  
I know the task was already submitted, but I couldn’t leave those minor UI issues unfixed.  
I just wanted to be transparent about it — you can review the project without considering the last commit if needed.
