import { Observable } from '@nativescript/core';
import { Dialogs } from '@nativescript/core';

export function createViewModel() {
    const viewModel = new Observable();

    // Available languages
    const languages = [
        "English",
        "Spanish",
        "French",
        "German",
        "Italian",
        "Portuguese",
        "Dutch",
        "Russian",
        "Chinese (Mandarin)",
        "Polish",
        "Swedish",
        "Norwegian"
    ];

    // Initialize properties
    viewModel.set("isListening", false);
    viewModel.set("currentTranscript", "Tap 'Start Conversation' to begin...");
    viewModel.set("fromLanguage", "German");
    viewModel.set("toLanguage", "German");
    viewModel.set("suggestions", []);

    // Language selection dialogs
    viewModel.showFromLanguageDialog = () => {
        Dialogs.action({
            message: "Select source language",
            cancelButtonText: "Cancel",
            actions: languages
        }).then(result => {
            if (result !== "Cancel") {
                viewModel.set("fromLanguage", result);
                updateSuggestions();
            }
        });
    };

    viewModel.showToLanguageDialog = () => {
        Dialogs.action({
            message: "Select target language",
            cancelButtonText: "Cancel",
            actions: languages
        }).then(result => {
            if (result !== "Cancel") {
                viewModel.set("toLanguage", result);
                updateSuggestions();
            }
        });
    };

    // Toggle listening state
    viewModel.toggleListening = () => {
        viewModel.set("isListening", !viewModel.get("isListening"));
        
        if (viewModel.get("isListening")) {
            viewModel.set("currentTranscript", "Listening...");
            simulateConversation();
        } else {
            viewModel.set("currentTranscript", "Conversation stopped");
            viewModel.set("suggestions", []);
        }
    };

    // Simulate conversation for demo
    function simulateConversation() {
        if (!viewModel.get("isListening")) return;

        const conversations = [
            "Hello, how are you today?",
            "I'm looking for directions to the museum.",
            "Could you recommend a good restaurant?",
            "What time does the train leave?"
        ];

        let index = 0;
        const interval = setInterval(() => {
            if (!viewModel.get("isListening")) {
                clearInterval(interval);
                return;
            }

            viewModel.set("currentTranscript", conversations[index]);
            updateSuggestions();

            index = (index + 1) % conversations.length;
        }, 3000);
    }

    // Update suggestions based on current transcript
    function updateSuggestions() {
        const suggestions = [
            "I'm doing well, thank you. How are you?",
            "The museum is two blocks away, on the right.",
            "I'd recommend trying the local cuisine.",
            "Let me check the schedule for you."
        ];

        viewModel.set("suggestions", suggestions);
    }

    return viewModel;
}