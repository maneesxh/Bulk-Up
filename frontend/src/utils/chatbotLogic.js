const chatbotLogic = {
  start: {
    key: "start",
    text: "👋 Welcome to BulkUp Assistant! Let's start with your age.",
    validate: (input) => /^\d+$/.test(input) && parseInt(input) > 10,
    next: "gender",
    saveKey: "age",
  },
  gender: {
    key: "gender",
    text: "Select your gender:",
    options: ["Male", "Female", "Other"],
    validate: (input) => ["male", "female", "other"].includes(input.toLowerCase()),
    next: "height_cm",
    saveKey: "gender",
  },
  height_cm: {
    key: "height_cm",
    text: "What is your height in cm?",
    validate: (input) => /^\d+$/.test(input) && parseInt(input) > 100,
    next: "weight_kg",
    saveKey: "height_cm",
  },
  weight_kg: {
    key: "weight_kg",
    text: "What is your weight in kg?",
    validate: (input) => /^\d+$/.test(input) && parseInt(input) > 30,
    next: "activity_level",
    saveKey: "weight_kg",
  },
  activity_level: {
    key: "activity_level",
    text: "What's your activity level?",
    options: ["Sedentary", "Moderate", "Active"],
    validate: (input) =>
      ["sedentary", "moderate", "active"].includes(input.toLowerCase()),
    next: "goal",
    saveKey: "activity_level",
  },
  goal: {
    key: "goal",
    text: "What's your fitness goal?",
    options: ["Weight Loss", "Weight Gain", "Weight Maintenance"],
    validate: (input) =>
      ["weight loss", "weight gain", "weight maintenance"].includes(
        input.toLowerCase()
      ),
    next: "diet_type",
    saveKey: "goal",
  },
  diet_type: {
    key: "diet_type",
    text: "What's your diet preference?",
    options: ["Vegetarian", "Non-Vegetarian", "Vegan"],
    validate: (input) =>
      ["vegetarian", "non-vegetarian", "vegan"].includes(input.toLowerCase()),
    next: "submit",
    saveKey: "diet_type",
  },
  submit: {
    key: "submit",
    autoSubmit: true,
    response: "🚀 Generating your personalized plan...",
    next: "done",
  },
  done: {
    key: "done",
    text: "✅ You're all set! If you want to restart, refresh the page.",
    validate: () => true,
  },

  collectedData: {},

  async getNextStep(currentKey, input) {
    const current = this[currentKey];

    if (!current) {
      return {
        key: "done",
        text: "Something went wrong. Please refresh to restart.",
        validate: () => true,
      };
    }

    // Save input
    if (current.saveKey) {
      this.collectedData[current.saveKey] = input;
    }

    if (current.autoSubmit) {
      return {
        ...this["submit"],
        collectedData: { ...this.collectedData },
      };
    }

    const nextStep = this[current.next];
    return nextStep;
  },

  async submit(data) {
    try {
      const res = await fetch("http://localhost:5000/generate-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      return result.plan || "✅ Plan generated successfully.";
    } catch (err) {
      return "❌ Failed to generate plan. Please try again.";
    }
  },
};

export default chatbotLogic;
