import base64
import os
import requests
import uuid

# Stability AI API configuration
engine_id = "stable-diffusion-v1-6"
api_host = os.getenv('API_HOST', 'https://api.stability.ai')
# api_key = os.getenv("STABILITY_API_KEY")
api_key="sk-u20jzL9T79MKLKS4H67j54cqj0qelXpuXTiEsGgGobbsESZ5"


if api_key is None:
    raise Exception("Missing Stability API key.")

def generate_image(prompt):
    response = requests.post(
        f"{api_host}/v1/generation/{engine_id}/text-to-image",
        headers={
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": f"Bearer {api_key}"
        },
        json={
            "text_prompts": [
                {
                    "text": prompt
                }
            ],
            "cfg_scale": 7,
            "height": 1024,
            "width": 1024,
            "samples": 1,
            "steps": 30,
        },
    )

    if response.status_code != 200:
        raise Exception("Non-200 response: " + str(response.text))

    data = response.json()

    output_dir = './assets/ai_generated'
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    image_path = None
    for i, image in enumerate(data["artifacts"]):
        random_string = uuid.uuid4().hex
        image_path = f"{output_dir}/v1_txt2img_{random_string}.png"
        image_path_public = f"./public/assets/ai_generated/v1_txt2img_{random_string}.png"
        with open(image_path_public, "wb") as f:
            f.write(base64.b64decode(image["base64"]))

    return image_path
