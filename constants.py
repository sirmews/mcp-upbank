import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Get the token directly from environment variables
UP_API_TOKEN = os.getenv("UP_API_TOKEN")

if not UP_API_TOKEN:
    raise ValueError("UP_API_TOKEN not found in environment variables")

# Export values for use in other modules
__all__ = [
    "UP_API_TOKEN",
]
