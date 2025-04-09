from fastapi import FastAPI, Form
from fastapi.responses import PlainTextResponse
import glob
import subprocess

app = FastAPI()

@app.post("/search", response_class=PlainTextResponse)
async def search_logs(pattern: str = Form(...)):
    files = glob.glob('../audit/*.log')
    proc = subprocess.run(['grep', pattern] + files, capture_output=True, text=True)
    return proc.stdout or "(No matches found)"
