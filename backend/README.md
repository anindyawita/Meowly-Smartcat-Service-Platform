# Meowly Backend - FastAPI

## Setup

1. Create virtual environment:

```bash
python -m venv venv
```

2. Activate virtual environment:

```bash
# Windows
venv\Scripts\activate
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Run development server:

```bash
python main.py
```

Server will be available at `http://localhost:8000`

## API Docs

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py           # FastAPI app instance
│   ├── routes/           # API routes
│   │   ├── __init__.py
│   │   └── health.py
│   └── models/           # Pydantic models
│       └── __init__.py
├── main.py               # Entry point
├── requirements.txt
└── .env                  # Environment variables (create if needed)
```
