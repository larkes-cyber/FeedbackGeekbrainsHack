# Install base Python image
FROM python:3.11

# Copy files to the container
COPY * /app/
COPY requirements.txt /app/

# Set working directory to previously added app directory
WORKDIR /app/

# Install dependencies
RUN pip install -r requirements.txt

# Expose the port uvicorn is running on
EXPOSE 8080

# Run uvicorn server
CMD ["uvicorn", "app.app:app", "--reload", "--host", "0.0.0.0", "--port", "8080"]