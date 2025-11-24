FROM python:3.14-alpine

RUN apk add --no-cache curl ca-certificates

WORKDIR /app

RUN pip install --no-cache-dir sherlock-project flask

COPY server.py /app/server.py

RUN chmod +x /app/server.py

EXPOSE 8080

# HEALTHCHECK --interval=10s --timeout=5s --start-period=5s --retries=3 \
# 	CMD curl --fail http://localhost:8080/health || exit 1

ENTRYPOINT ["python3", "/app/server.py"]

LABEL org.opencontainers.image.source=https://github.com/nurodev/sherlock
