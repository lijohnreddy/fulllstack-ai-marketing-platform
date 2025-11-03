# use an oficial python as a parent runtime image
FROM python:3.13-slim

# TODO: add the dependencies to the Dockerfile
RUN apt-get update && apt-get install -y ffmpeg 

# set the working directory in the container
WORKDIR /app

# copy the dependencies file into the container
COPY pyproject.toml poetry.lock /app/

# install poetry
RUN pip install poetry

# install depencencies with poetry
RUN poetry install --no-root

# copy the rest of the application code into the container
COPY . /app/


# start the application
CMD ["poetry", "run", "python", "src/asset_processing_service"]
