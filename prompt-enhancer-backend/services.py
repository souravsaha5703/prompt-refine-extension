from langchain_huggingface import HuggingFaceEndpoint,ChatHuggingFace
from langchain_core.prompts import ChatPromptTemplate,SystemMessagePromptTemplate,HumanMessagePromptTemplate
from dotenv import load_dotenv

load_dotenv()

llm=HuggingFaceEndpoint(
    repo_id="openai/gpt-oss-120b",
    task="text-generation"
)

model = ChatHuggingFace(llm=llm)

def getPrompts(prompt:str):
    prompt_structure = ChatPromptTemplate.from_messages([
        SystemMessagePromptTemplate.from_template(
            """
            You are a professional AI assistant specialized in prompt engineering.  
            Your job is to take a user’s raw input prompt and return exactly 3 rewritten prompts that are:  

            1. Clear and easy to understand  
            2. More detailed and specific (add useful context if missing)  
            3. Diverse in style (e.g., creative, professional, instructional)  

            Guidelines:  
            - Always output **exactly 3 enhanced prompts**.  
            - Do NOT answer the user’s request directly.  
            - Do NOT add explanations.  
            - Each prompt should be a single standalone instruction.  
            - Format the output as a numbered list (1, 2, 3).  

            """
        ),
        HumanMessagePromptTemplate.from_template("{user_input}")
    ]);

    messages = prompt_structure.format_messages(user_input=prompt)

    response = model.invoke(messages)

    return response.content