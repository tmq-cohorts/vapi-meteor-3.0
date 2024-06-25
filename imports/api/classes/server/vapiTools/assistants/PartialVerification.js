export default {
    "name": "Partial Verification",
    "firstMessageMode": "assistant-speaks-first",
    "firstMessage": "Hi, in order to assist you better, I need to ask you a few questions to verify your identity.",
    "recordingEnabled": true,
    "hipaaEnabled": false,
    "silenceTimeoutSeconds": 30,
    "backchannelingEnabled": true,
    "backgroundDenoisingEnabled": true,
    "voicemailMessage": "Sorry, I am not available right now. Please leave a message after the beep.",
    "endCallMessage": "Thank you for calling. Goodbye.",
    "metadata": {},
    "serverUrl": "https://calf-true-llama.ngrok-free.app/api/session",
    "transcriber": {
        "provider": "deepgram",
        "model": "nova-2",
        "language": "en-US",
        "smartFormat": true,
        "keywords": []
    },
    "model": {
        "provider": "openai",
        "model": "gpt-4o",
        "temperature": 0.7,
        "maxTokens": 525,
        "emotionRecognitionEnabled": false,
        "messages": [
            {
                "role": "system",
                "content": "You are a voice assistant. That will initially verify the user's identity. You need to perform a series of steps in order and only move to the next step if the current step is verified.\n\n[Rules]\nNote: All of these rules must be followed and satisfied.\n1. Do not proceed to the next task if the current task is not resolved. If the current task is not resolved, try again until it is resolved. Not resolved mean the server response like not exist, not valid , incorrect or other related response.\n2. Before continuing to the task you should always spell back to the customer the input you received from them to confirm it. For example, if the customer says \"My name is Mark Vincent,\" respond with \"I will just confirm it, your name spells like 'M' 'A' 'R' 'K' 'V' 'I' 'N' 'C' 'E' 'N' 'T'.\" Apply this to all important details received from the customer. Wait until they confirm it.\n3. Do not generate your own response or result, always use as basis the RESULT from the server for each task.\n4. Keep your responses short and concise.\n\n[Task]\nNote: Execute the tasks in order.\n1. First ask for either their account (card number) or social security number, use the server to verify it\n2. Ask for zip code, validate using the server\n3. Lastly ask for their first and last name, validate using the server\n4. When all steps are completed transfer send the destination to the server and transfer to task router"
            }
        ],
        "tools": []
    },
    "voice": {
        "inputPreprocessingEnabled": true,
        "inputReformattingEnabled": true,
        "inputMinCharacters": 30,
        "inputPunctuationBoundaries": [
            "。",
            "，",
            ".",
            "!",
            "?",
            ";",
            ")",
            "،",
            "۔",
            "।",
            "॥",
            "|",
            "||",
            ",",
            ":"
        ],
        "fillerInjectionEnabled": true,
        "provider": "azure",
        "voiceId": "andrew"
    },
    "serverMessages": [
        "conversation-update",
        "end-of-call-report",
        "function-call",
        "hang",
        "model-output", "phone-call-control", "transcript",
        "speech-update",
        "status-update",
        "tool-calls",
        "transfer-destination-request",
        "user-interrupted", "voice-input"
    ],
};