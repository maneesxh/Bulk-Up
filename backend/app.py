from flask import Flask, request, jsonify
from flask_cors import CORS
from together import Together
import os
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)
CORS(app)

client = Together(api_key=os.environ.get("TOGETHER_API_KEY"))

@app.route('/generate-plan', methods=['POST'])
def generate_plan():
    data = request.get_json()
    print("✅ Received data:", data)

    if not data:
        return jsonify({"error": "No data received"}), 400

    # Updated prompt for structured output
    prompt = f"""
Generate a clean, well-structured fitness meal plan for:
- Age: {data.get('age')}
- Gender: {data.get('gender')}
- Height: {data.get('height_cm')} cm
- Weight: {data.get('weight_kg')} kg
- Activity level: {data.get('activity_level')}
- Goal: {data.get('goal')}
- Diet type: {data.get('diet_type')}

Format:
**Your Custom Plan**

**Maintenance Calories:** <value>

**Target Calories:** <value>

**Macro Goals (g):**
- Protein: <value>
- Carbs: <value>
- Fat: <value>

**Example Meal Structure**
- **Breakfast:** <foods> (<calories> cal, <protein>g P, <carbs>g C, <fat>g F)
- **Snack:** <foods> (<calories> cal, <protein>g P, <carbs>g C, <fat>g F)
- **Lunch:** <foods> (<calories> cal, <protein>g P, <carbs>g C, <fat>g F)
- **Snack:** <foods> (<calories> cal, <protein>g P, <carbs>g C, <fat>g F)
- **Dinner:** <foods> (<calories> cal, <protein>g P, <carbs>g C, <fat>g F)

**Total Daily Calories and Macros**
<calories> cal, <protein>g P, <carbs>g C, <fat>g F

**Additional Tips**

Output must be clean and easy to read. No extra explanation.
"""

    try:
        response = client.chat.completions.create(
            model="mistralai/Mistral-7B-Instruct-v0.1",
            messages=[{"role": "user", "content": prompt}]
        )

        plan = response.choices[0].message.content
        print("✅ Generated plan preview:", plan[:100], "...")

        return jsonify({
            "plan": plan
        })

    except Exception as e:
        print("❌ Error generating plan:", str(e))
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run()
