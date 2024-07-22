import json

js_file = './src/data/news_articles.js'

# Read the JavaScript file with UTF-8 encoding
with open(js_file, 'r', encoding='utf-8') as file:
    content = file.read()

# Remove the 'export default ' prefix from the content
if content.startswith('export default '):
    content = content[len('export default '):]

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

# Remove duplicates by converting each dictionary to a string with sorted keys
seen = set()
new_data = []
for item in json_data:
    item_str = json.dumps(item, sort_keys=True)
    if item_str not in seen:
        new_data.append(item)
        seen.add(item_str)

# Convert the cleaned list back to JSON
cleaned_json = json.dumps(new_data, indent=4)

# Write the cleaned JSON back to the JavaScript file with UTF-8 encoding
with open(js_file, 'w', encoding='utf-8') as file:
    file.write(f'export default {cleaned_json};')
