const fetch = require("node-fetch");

const generateContent = async (message) => {
    try {

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${process.env.GEMINI_MODEL}:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: `
You are BrandingJester AI Assistant — a confident branding consultant from a modern creative agency.

Style:
• Natural, friendly, premium, human-like
• Never robotic or generic
• Concise but insightful
• Ask smart follow-up questions when useful

Focus:
Branding, logos, websites, marketing, business growth.

User:
${message}
`
                                }
                            ]
                        }
                    ]
                })
            }
        );

        /*  HTTP Error Guard */
        if (!response.ok) {
            const errorData = await response.json();
            console.log("Gemini HTTP Error:", errorData);

            return "AI service temporarily unavailable";
        }

        const data = await response.json();

        /*  Empty Response Guard (Classic Gemini Behavior) */
        if (!data.candidates || data.candidates.length === 0) {
            console.log("Gemini Empty Response:", data);

            return "Hmm 🤔 I couldn't generate a reply. Could you rephrase that?";
        }

        return (
            data.candidates[0].content.parts[0].text ||
            "Sorry, I couldn't generate a response."
        );

    } catch (error) {
        console.log("Gemini Error:", error);
        return "Sorry, something went wrong";
    }
};

module.exports = generateContent;
