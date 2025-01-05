# Installation Guide

This guide provides step-by-step instructions to set up and run the project, which consists of two main components:

1. **Generate_mock_data**: A Python-based module for generating and seeding mock social media data into Astra DB.
2. **Frontend**: A Next.js application that fetches data from Astra DB, displays insights using Recharts, and includes a chat interface connected to a Langflow API.

---

## Prerequisites

### Tools and Dependencies:

- **Python 3.8+**
- **Node.js 18+**
- **npm** or **yarn** (for frontend dependencies)
- **Astra DB** account
- **Langflow API** access credentials

### Python Libraries:

- `pandas`
- `numpy`
- `random` (built-in)
- `cassandra-driver`

### Frontend Libraries:

- `Next.js`
- `recharts`
- `shadcn ui`

---

## Setup Instructions

### 1. Clone the Repository

```bash
# Clone the repository
git clone https://github.com/idityaGE/Social-Media-Performance-Analysis.git
cd Social-Media-Performance-Analysis
```

---


### 2. Create Astra DB Database

1. Log in to your [Astra DB Console](https://www.datastax.com/astra).
2. Click on **"Create Database"**.
3. Fill in the required details:
   - **Cloud Provider**: Choose your preferred provider (e.g., AWS, GCP, Azure).
   - **Region**: Select a region.
   - **Database Name**: Provide a unique name for your database.
4. Click on **"Create Database"** and wait for it to be provisioned.
5. Download the **Secure Connect Bundle**:
   - Navigate to the **Connect** tab.
   - Select **"Python"** as the driver and download the bundle.
   - Place the bundle in the `Generate_mock_data` directory.

---

### 3. Create Langflow on Cloud

1. Log in to your preferred cloud platform.
2. Deploy the Langflow application:
   - Use the provided Langflow installation guide or Docker image for deployment.
3. After deploying, access the Langflow dashboard.
4. Import the provided `langflow.json` file:
   - Navigate to the **Import Workflow** section in the Langflow UI.
   - Upload the `langflow.json` file located in the project root.
5. Generate an API Token:
   - Navigate to the **API Settings**.
   - Generate an API token and copy it.
6. Update the `.env.local` file in the `frontend` directory with the generated token:
   ```env
   LANGFLOW_API_TOKEN = <your_generated_langflow_api_token>
   ```

---

### 4. Setup Generate_mock_data

#### Navigate to the Directory:

```bash
cd Generate_Mock_Data
```

#### Install Python Dependencies:

Create a virtual environment (optional):

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

Install the required libraries:

```bash
pip install pandas numpy cassandra-driver python-dotenv
```

#### Generate Mock Data:

1. Create a `.env` file in the `Generate_mock_data` directory with the following variables:

```env
ASTRA_DB_TOKEN = <your_astra_db_token>
ASTRA_DB_END_POINT = <your_astra_db_end_point>
```

Run the script to generate mock social media data:

```bash
python ./generate_mock_social_media_data.py
```

#### Seed Data into Astra DB:

Make sure you have your Astra DB Secure Connect Bundle ready.

1. Place your Secure Connect Bundle in the `Generate_mock_data` directory.
2. Run the seeding script:
   ```bash
   python ./seed.py
   ```

---

### 5. Setup Frontend

#### Navigate to the Directory:

```bash
cd ../frontend
```

#### Install Frontend Dependencies:

```bash
npm install
```

#### Configure Environment Variables:

Create a `.env.local` file in the `frontend` directory with the following variables:

```env
ASTRA_DB_TOKEN = <your_astra_db_token>
ASTRA_DB_END_POINT = <your_astra_db_end_point>
LANGFLOW_API_TOKEN = <your_langflow_api_token>
```

#### Run the Development Server:

```bash
npm run dev
```

Access the application at `http://localhost:3000`.

---

## Project Overview

### Generate_mock_data

- **Purpose**: Generate and seed mock social media data into Astra DB.
- **Key Scripts**:
  - `generate_mock_social_media_data.py`: Creates a dataset using `pandas` and `numpy`.
  - `seed.py`: Loads the generated data into Astra DB.

### Frontend

- **Purpose**: Fetch and display insights from Astra DB using `recharts`.
- **Key Features**:
  - **Home Page**: Displays calculated insights based on the data.
  - **Chat Page**: Interacts with Langflow API to handle user questions and display responses.

---

## Troubleshooting

### Common Issues:

1. **Dependency Installation Errors**:

   - Ensure you are using the correct Python/Node.js version.
   - Run `pip list` or `npm list` to verify dependencies.

2. **Astra DB Connection**:

   - Verify the Secure Connect Bundle path.
   - Ensure Astra DB credentials are correct.

3. **Frontend Environment Variables**:
   - Double-check the `.env.local` file for accuracy.
