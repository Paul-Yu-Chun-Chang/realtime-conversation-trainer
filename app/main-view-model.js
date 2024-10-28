import { Observable } from '@nativescript/core';

export function createViewModel() {
    const viewModel = new Observable();
    
    // Initialize properties
    viewModel.isListening = false;
    viewModel.currentText = "Waiting to start...";
    viewModel.translatedText = "";
    viewModel.suggestion = "";
    
    // Toggle listening state
    viewModel.toggleListening = () => {
        viewModel.set("isListening", !viewModel.isListening);
        
        if (viewModel.isListening) {
            viewModel.set("currentText", "Listening...");
            simulateConversation(viewModel);
        } else {
            viewModel.set("currentText", "Stopped listening");
            viewModel.set("translatedText", "");
            viewModel.set("suggestion", "");
        }

        // Update button text
        const button = viewModel.page.getViewById("recordButton");
        if (button) {
            button.text = viewModel.isListening ? "Stop Recording" : "Start Recording";
        }
    };

    return viewModel;
}

function simulateConversation(viewModel) {
    if (!viewModel.isListening) return;

    const phrases = [
        "Hello, how are you?",
        "What's the weather like?",
        "Nice to meet you!"
    ];

    const translations = [
        "¡Hola, ¿cómo estás?",
        "¿Qué tiempo hace?",
        "¡Encantado de conocerte!"
    ];

    let index = 0;
    const interval = setInterval(() => {
        if (!viewModel.isListening) {
            clearInterval(interval);
            return;
        }

        viewModel.set("currentText", phrases[index]);
        viewModel.set("translatedText", translations[index]);
        viewModel.set("suggestion", "Try responding naturally!");

        index = (index + 1) % phrases.length;
    }, 3000);
}