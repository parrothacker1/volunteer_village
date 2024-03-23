# Use the official Python image
FROM python:3.9

# Set working directory
WORKDIR /app

# Copy only requirements to cache them in Docker layer
COPY pyproject.toml poetry.lock /app/

# Install poetry
RUN apt update
RUN apt install python3-poetry -y
# Install dependencies
RUN poetry config virtualenvs.create false && poetry install --no-dev --no-interaction --no-root

# Copy the application code
COPY . /app/

# Expose the port on which the FastAPI server will run
EXPOSE 443

# Command to run the FastAPI server
CMD ["uvicorn", "volunteer_village:app", "--host", "0.0.0.0", "--port", "443", "--ssl-keyfile", "key.pem", "--ssl-certfile", "cert.pem"]
