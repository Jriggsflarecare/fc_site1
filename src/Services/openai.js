import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function recognizeFood(foodText) {
  try {
    const prompt = `Analyze this food item for IBD patients: "${foodText}"
    
    Consider:
    1. Common IBD triggers
    2. FODMAP content
    3. Fiber content
    4. Inflammatory potential
    5. Nutritional benefits
    6. Preparation recommendations
    
    Format the response as a JSON object with these fields:
    - productName: standardized name
    - brandName: if applicable
    - nutrition: key nutritional info
    - ibdConsiderations: specific IBD-related notes
    - riskLevel: "Low", "Medium", or "High"
    - safetyTips: preparation/portion advice
    - alternatives: safer alternatives if risky
    
    Return variations if ambiguous.`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4-1106-preview",
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 500
    });

    const response = JSON.parse(completion.choices[0].message.content);
    
    // Transform the response into variations if needed
    const variations = Array.isArray(response.variations) 
      ? response.variations 
      : [response];

    return {
      variations: variations.map(item => ({
        productName: item.productName || foodText,
        brandName: item.brandName || '',
        nutrition: item.nutrition || '',
        ibdConsiderations: item.ibdConsiderations || '',
        riskLevel: item.riskLevel || 'Medium',
        safetyTips: item.safetyTips || '',
        alternatives: item.alternatives || []
      }))
    };

  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error('Failed to analyze food item');
  }
}

export async function analyzeMeal(foodItems) {
  try {
    const prompt = `Analyze this meal combination for IBD patients. Foods: ${foodItems.join(", ")}
    
    Provide:
    1. Overall meal safety rating
    2. Potential interactions
    3. Digestion timing recommendations
    4. Portion suggestions
    5. Meal modification tips
    
    Format as JSON with:
    - overallRisk
    - interactions
    - timingAdvice
    - portionTips
    - modifications`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4-1106-preview",
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 500
    });

    return JSON.parse(completion.choices[0].message.content);

  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error('Failed to analyze meal combination');
  }
}

export async function generateMealPlan(preferences, restrictions) {
  try {
    const prompt = `Create an IBD-friendly meal plan considering:
    Preferences: ${JSON.stringify(preferences)}
    Restrictions: ${JSON.stringify(restrictions)}
    
    Include:
    1. 3 meals per day
    2. 2-3 snacks
    3. Portion sizes
    4. Preparation tips
    5. Timing recommendations
    
    Format as JSON with:
    - breakfast
    - lunch
    - dinner
    - snacks
    - tips`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4-1106-preview",
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 1000
    });

    return JSON.parse(completion.choices[0].message.content);

  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error('Failed to generate meal plan');
  }
} 