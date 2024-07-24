import json
import re
import os

js_file = './src/data/news_articles.js'
images_dir = './public/assets/ai_generated'

# Read the JavaScript file with UTF-8 encoding
with open(js_file, 'r', encoding='utf-8') as file:
    content = file.read()

# Remove the 'export default ' prefix from the content
if content.startswith('export default '):
    content = content[len('export default '):]

# Remove the trailing '];' to make it a valid JSON
if content.endswith('];'):
    content = content[:-2] + ']'

# Try parsing the JSON data
try:
    json_data = json.loads(content)
    print("JSON loaded successfully!")
except json.JSONDecodeError as e:
    print("Error decoding JSON:", e)
    # Output the problematic portion of the JSON data
    error_position = e.pos
    start = max(error_position - 50, 0)
    end = min(error_position + 50, len(content))
    print("Error context:")
    print(content[start:end])

    # Trying to print around the error line
    line_start = content.rfind('\n', 0, error_position)
    line_end = content.find('\n', error_position)
    line_start = max(line_start, 0)
    line_end = min(line_end if line_end != -1 else len(content), len(content))
    print("Error line context:")
    print(content[line_start:line_end])
    exit(1)

# Function to normalize title and date
def normalize_item(item):
    normalized_title = item['title'].strip().lower()
    normalized_date = item['date'].strip()
    return (normalized_title, normalized_date)

# Remove duplicates by using a set to track seen titles and sentiment_scores
seen = set()
new_data = []
for item in json_data:
    identifier = normalize_item(item)
    if identifier not in seen:
        new_data.append(item)
        seen.add(identifier)

# Convert the cleaned list back to JSON
cleaned_json = json.dumps(new_data, indent=4, ensure_ascii=False)

# Write the cleaned JSON back to the JavaScript file with UTF-8 encoding
with open(js_file, 'w', encoding='utf-8') as file:
    file.write(f'export default {cleaned_json};')

print("Duplicates removed and file updated successfully!")


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

def find_unreferenced_images(js_data, image_directory):
    """Find images in the directory that are not referenced in the JSON data."""
    # Extract all image URLs from the JSON data
    image_urls = set(item.get('image_url') for item in js_data if item.get('image_url'))
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
    js_data = extract_json_from_js(js_file)

    # Find unreferenced images
    unreferenced_images = find_unreferenced_images(js_data, images_dir)

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

print("Deprecated AI images removed successfully!")
