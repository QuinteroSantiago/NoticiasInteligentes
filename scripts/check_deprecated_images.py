import json
import os

# Path to the JavaScript file containing the JSON data
js_file = './src/data/news_articles.js'
# Directory containing generated images
images_dir = './public/assets/ai_generated'

def extract_json_from_js(js_filepath):
    """Extract JSON content from a JS file starting with 'export default'."""
    with open(js_filepath, 'r', encoding='utf-8') as file:
        content = file.read()
    if content.startswith('export default '):
        content = content[len('export default '):].strip(' ;')
    return json.loads(content)

def list_images_in_directory(directory):
    """List all image files in the specified directory."""
    return {file for file in os.listdir(directory) if file.endswith(('.png', '.jpg', '.jpeg'))}

def find_unreferenced_images(json_data, image_directory):
    """Find images in the directory that are not referenced in the JSON data."""
    # Extract all image URLs from the JSON data
    image_urls = set(item.get('image_url') for item in json_data if item.get('image_url'))
    # Extract filenames from URLs
    image_filenames = set(url.split('/')[-1] for url in image_urls if 'ai_generated' in url)

    # List all images in the specified directory
    directory_images = list_images_in_directory(image_directory)

    # Find images not referenced in the JSON data
    unreferenced_images = directory_images - image_filenames
    return unreferenced_images

# Main execution
try:
    # Extract JSON data from JS file
    json_data = extract_json_from_js(js_file)

    # Find unreferenced images
    unreferenced_images = find_unreferenced_images(json_data, images_dir)

    if unreferenced_images:
        print("Unreferenced Images:")
        for image in unreferenced_images:
            os.remove(os.path.join(images_dir, image))
            print(f"Deleted: {image}")
    else:
        print("No unreferenced images found.")
except json.JSONDecodeError as e:
    print(f"Error decoding JSON: {e}")
except Exception as e:
    print(f"An error occurred: {e}")
