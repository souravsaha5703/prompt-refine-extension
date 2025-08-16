from fastapi import FastAPI,HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from services import getPrompts
import re

app = FastAPI(title="Prompt Refine")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PromptRequest(BaseModel):
    prompt:str


@app.post("/refine")
def refinePrompt(req:PromptRequest):
    try:
        result = getPrompts(req.prompt)
        enhanced_text = result.strip()
        prompts = re.split(r"\n?\s*\d+\.\s*", enhanced_text)
        prompts = [p.strip() for p in prompts if p.strip()]

        prompts = prompts[:3]

        if not prompts:
            raise HTTPException(status_code=500, detail="No prompts generated")

        return {"prompts": prompts}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating prompts: {str(e)}")
