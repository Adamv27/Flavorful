FROM python:3.12-slim

WORKDIR /code

COPY ./requirements.txt /code/requirements.txt 

RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

COPY ./app /code/app
COPY .env /code/app


CMD ["uvicorn", "app.backend:app", "--host", "0.0.0.0", "--reload", "--port", "80"]
