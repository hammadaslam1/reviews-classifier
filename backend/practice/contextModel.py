"""
At the command line, only need to run once to install the package via pip:

$ pip install google-generativeai
"""
import os
# import google.generativeai as genai
import google.generativeai as genai
print(genai.__file__)


def extract_context(array, title, topics, reviewBody):
    # load_dotenv()
    def load_env():
        env_file_path = "C:/Hammad Aslam/BS IT (post ADP)/3rd Semester/Capstone Project/Project/backend/.env"
        with open(env_file_path) as f:
            # print(f)
            for line in f:
                # print(line)
                key, value = line.strip().split("=")
                # print(key, value)
                os.environ[key] = value.strip("'\"")
    # Load environment variables from the .env file
    load_env()
    MY_API = os.environ.get("GEMINIAPI")
    genai.configure(api_key=MY_API)
    # Set up the model
    generation_config = {
        "temperature": 0.9,
        "top_p": 1,
        "top_k": 1,
        "max_output_tokens": 2048,
    }

    safety_settings = [
        {
            "category": "HARM_CATEGORY_HARASSMENT",
            "threshold": "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
            "category": "HARM_CATEGORY_HATE_SPEECH",
            "threshold": "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
            "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            "threshold": "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
            "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
            "threshold": "BLOCK_MEDIUM_AND_ABOVE"
        },
    ]

    # model = genai.GenerativeModel(model_name="gemini-1.5-pro-latest",
    #                               generation_config=generation_config,
    #                               safety_settings=safety_settings)
    model = genai.GenerativeModel(model_name="gemini-1.0-pro",
                                  generation_config=generation_config,
                                  safety_settings=safety_settings)

    prompt_parts = array + [
        f"review_body: {reviewBody}",
        f"topics: {topics}",
        f"product_title: {title}",
        "context:",
    ]

    try:
        response = model.generate_content(prompt_parts)
        if response:
            # print(response.text)
            return response.text
    except ValueError as e:
        print("The response contains no valid Part or was blocked. ", e)
        return "context not found"


# extract_context([1, 2], 'hammad', 'hammad', 'hammad')
