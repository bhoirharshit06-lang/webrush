# webrush
# LIFE//THREADS — Your Life, In Receipts

> **Raw Data → Insights → Connections → Story**

LIFE//THREADS is an interactive frontend experience that transforms scattered digital "life receipts" into meaningful patterns, connections, and stories.

Instead of presenting personal activity as a simple chronological timeline or collection of tables, LIFE//THREADS connects different pieces of activity — such as music, purchases, transactions, places, and moments — to reveal how they relate to each other.

---

## ✨ What is LIFE//THREADS?

Our digital lives are made up of thousands of small fragments:

* 🎵 Songs we listen to
* 🛍️ Things we purchase
* 💳 Transactions we make
* 📍 Places we visit
* 📸 Photos and memories
* 💬 Messages and interactions
* 🔎 Things we search for
* 📅 Events we attend
* 📝 Personal notes

Individually, these records may not mean much.

**LIFE//THREADS connects them.**

The project turns raw records into an interactive personal data story where users can explore activity, discover patterns, and follow connections between seemingly unrelated moments.

---

## 🎯 The Problem

Digital activity is usually stored as disconnected records.

A transaction tells us **what was purchased**.

A music history tells us **what was listened to**.

A location record tells us **where something happened**.

But looking at these records independently makes it difficult to understand the bigger picture.

### LIFE//THREADS asks:

> **What happens when these fragments are connected?**

The goal is not simply to display data, but to transform:

```text
Raw Data
   ↓
Insights
   ↓
Connections
   ↓
Story
```

---

## 🚀 Key Features

### 🧾 Receipt Explorer

Explore different types of life receipts through an interactive interface.

Users can:

* Search records
* Filter by category
* Explore individual receipts
* Navigate between connected records
* Discover activity across different periods

---

### 🧵 Threads

The core concept of LIFE//THREADS.

Related records are connected using signals such as:

* Date
* Time
* Location
* Category
* Merchant
* Activity type
* Music activity
* Transaction patterns

For example:

```text
🎵 Song
   ↓
📍 Location
   ↓
🛍️ Purchase
   ↓
💳 Transaction
   ↓
📅 Event
```

Instead of seeing five independent records, users can explore them as one **thread**.

---

### 💡 Insight Discovery

LIFE//THREADS identifies patterns within the available data.

Examples include:

* Repeated locations
* Spending patterns
* Activity spikes
* Recurring routines
* Frequently played artists
* Frequently visited places
* Cross-category relationships
* Changes in activity over time

---

### 📖 Interactive Storytelling

The project converts discovered patterns into a visual story rather than displaying raw data alone.

Users can move from:

**Receipt → Pattern → Connection → Story**

This creates a more human-readable way of exploring personal data.

---

### 📊 Activity Pulse

Visualize activity across different periods to identify:

* High-activity periods
* Changes in behavior
* Spending patterns
* Music activity
* Recurring activity

---

### 🗺️ Life Map

Location-based records can be represented geographically to reveal relationships between:

* Places
* Transactions
* Merchants
* Activities

---

### 🔗 Connection Graph

A visual relationship graph represents how different receipts are connected.

Example:

```text
             🎵 Music
                │
                │
📍 Location ─── 🧵 Moment ─── 🛍️ Purchase
                │
                │
             💳 Transaction
```

---

## 📦 Dataset

The project uses organizer-provided datasets containing fictional/synthetic activity records.

### Current datasets

| Dataset                                      | Used For                                                    |
| -------------------------------------------- | ----------------------------------------------------------- |
| `spotify_history.csv`                        | Music listening activity                                    |
| `Daily Household Transactions.csv`           | Purchases and spending patterns                             |
| `Augmented_IndiaTransactMultiFacet2024.json` | Transactions, merchants, categories, locations and activity |

### Spotify Data

Used to explore:

* Tracks
* Artists
* Listening activity
* Listening patterns
* Time-based relationships

### Household Transactions

Used to explore:

* Purchases
* Spending
* Categories
* Transaction frequency
* Recurring patterns

### Multi-Facet Transactions

Provides transaction-level information such as:

* Transaction date/time
* Merchant
* Category
* Amount
* City
* State
* Latitude/longitude
* Customer/activity information

> The project uses the available organizer-provided datasets and does not invent records that are not present in the source data.

---

## 🧠 Connection Logic

LIFE//THREADS uses frontend logic to discover relationships between records.

Connections can be created when records share meaningful attributes such as:

```text
Same Date
     +
Same / Nearby Time
     +
Same Location
     +
Related Category
     ↓
Potential Connection
```

The system can then group related records into moments or threads.

This allows the interface to move beyond:

> "Here are your records."

and toward:

> "Here is how these records relate."

---

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* JavaScript
* HTML
* CSS / Tailwind CSS

### Visualization

* Recharts
* React Flow
* Leaflet

### UI & Animation

* Framer Motion
* Lucide Icons

### Deployment

* Vercel

---

## 🏗️ Project Structure

```text
LIFE-THREADS/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── ReceiptCard
│   │   ├── InsightCard
│   │   ├── ChapterCard
│   │   ├── ThreadGraph
│   │   └── LifeMap
│   │
│   ├── pages/
│   │   ├── Home
│   │   ├── Explore
│   │   ├── Threads
│   │   └── Story
│   │
│   ├── data/
│   │   └── receipts.json
│   │
│   ├── utils/
│   │   ├── connections
│   │   ├── insights
│   │   ├── moments
│   │   └── chapters
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
└── README.md
```

*The exact structure may vary depending on the final implementation.*

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/LIFE-THREADS.git
```

### 2. Navigate to the project

```bash
cd LIFE-THREADS
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

### 5. Open the application

Open the local URL shown by Vite, usually:

```text
http://localhost:5173
```

---

## 🔒 Frontend-Only Architecture

LIFE//THREADS was designed as a **frontend-only hackathon project**.

There is:

* ❌ No backend
* ❌ No database
* ❌ No authentication system
* ❌ No external API dependency
* ❌ No server-side processing

The application processes and visualizes the provided datasets directly within the frontend.

This keeps the project lightweight and suitable for a rapid hackathon environment.

---

## 🎨 Design Philosophy

LIFE//THREADS is designed around the idea that **data should feel personal rather than technical**.

Instead of presenting:

```text
Date | Category | Amount | Location
```
