FROM python:3.6.8

RUN python -m pip install --upgrade pip
RUN apt update -y \
    && apt install -y poppler-utils libgl1-mesa-glx \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /code/
COPY ./requirements.txt .
RUN pip install -r ./requirements.txt
COPY ./ .

CMD ["python"]